import React, { useState, useEffect, useContext } from 'react'
import { Link as RouterLink, useHistory, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet'
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme
} from '@material-ui/core/styles'
import {
  Grid,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box,
  CardHeader,
  Badge,
  Link,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  CircularProgress
} from '@material-ui/core'
import { Skeleton, Alert } from '@material-ui/lab'
import {
  GetContentBookmarkByUserQuery,
  GetFlagByUserQuery,
  Language,
  ContentType,
  CreateStreamBookmarkMutation,
  CreateStreamCommentMutation,
  GetStreamQuery
} from 'types/appsync/API'
import { AuthUserContext } from 'context/Auth'
import API, { graphqlOperation } from '@aws-amplify/api'
import Storage from '@aws-amplify/storage'
import {
  GetStreamById,
  OnUpdateStreamById,
  GetContentBookmarkIdByUser,
  GetFlagIdByUser,
  CreateStreamBookmark,
  DeleteBookmark,
  DeleteFlagById,
  CreateStreamComment
} from 'graphql/custom'
import TafalkShareContentDialog from 'components/common/dialogs/GenericShareContentDialog'
import TafalkConfirmationDialog from 'components/common/dialogs/GenericConfirmationDialog'
import TafalkLoginRequiredDialog from 'components/common/dialogs/TheLoginRequiredDialog'
import TafalkFlagContentDialog from 'components/content/dialogs/FlagContentDialog'
import { getContentRoute } from 'utils/derivations'
import Observable from 'zen-observable'
import DotsVerticalIcon from 'mdi-material-ui/DotsVertical'
import AccessPointIcon from 'mdi-material-ui/AccessPoint'
import StopIcon from 'mdi-material-ui/Stop'
import BalloonIcon from 'mdi-material-ui/Balloon'
import SleepIcon from 'mdi-material-ui/Sleep'
import BookmarkIcon from 'mdi-material-ui/Bookmark'
import BookmarkOutlineIcon from 'mdi-material-ui/BookmarkOutline'
import ShareVariantIcon from 'mdi-material-ui/ShareVariant'
import FlagIcon from 'mdi-material-ui/Flag'
import FlagRemoveIcon from 'mdi-material-ui/FlagRemove'
import FlagCheckeredIcon from 'mdi-material-ui/FlagCheckered'
import CommentOutlineIcon from 'mdi-material-ui/CommentOutline'
import SendIcon from 'mdi-material-ui/Send'
import { red } from '@material-ui/core/colors'
import { formatDistanceToNow } from 'date-fns'
import { getUserLocale } from 'utils/conversions'
import { SmallAvatar } from 'components/common/avatars/SmallAvatar'
import { useSnackbar } from 'notistack'

interface StreamRouteParams {
  id: string
}

interface StreamDataType
  extends Omit<Exclude<GetStreamQuery['getStream'], null>, '__typename'> {}

const topBarActionsMenuId = 'top-bar-actions-menu'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1
    },
    topAppBar: {
      width: '100%',
      paddingInline: theme.spacing(2, 0, 2, 0)
    },
    avatar: {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main
    },
    smallAvatarSealed: {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main
    },
    smallAvatarLive: {
      color: theme.palette.primary.contrastText,
      backgroundColor: red.A700
    },
    addCommentCard: {
      flexGrow: 1
    }
  })
)

const Stream: React.FC = () => {
  let routerHistory = useHistory()
  const theme = useTheme()
  const { t } = useTranslation()
  const classes = useStyles()
  const { user: authUser } = useContext(AuthUserContext)
  const routeParams = useParams<StreamRouteParams>()
  const { enqueueSnackbar } = useSnackbar()

  const [infoLoaded, setInfoLoaded] = useState(false)
  const [stream, setStream] = useState<StreamDataType | null>(null)

  const [
    authorProfilePictureObjectUrl,
    setAuthorProfilePictureObjectUrl
  ] = useState('')
  const [authUserBookmarkId, setAuthUserBookmarkId] = useState('')
  const [authUserFlagId, setAuthUserFlagId] = useState('')
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [newComment, setNewComment] = useState('')
  const [commentSaveInProgress, setCommentSaveInProgress] = useState(false)
  const [shareContentDialogOpen, setShareContentDialogOpen] = useState(false)
  const [
    confirmRetractFlagDialogOpen,
    setConfirmRetractFlagDialogOpen
  ] = useState(false)
  const [flagDialogOpen, setFlagDialogOpen] = useState(false)
  const [loginRequiredDialogOpen, setLoginRequiredDialogOpen] = useState(false)

  // Derive some constants
  const routeStreamId = routeParams.id
  const isTopBarActionsMenuOpen = Boolean(anchorEl)

  // Side effects: Load initial stream data
  useEffect(() => {
    ;(async () => {
      try {
        let unsubscribe
        // DB data
        const streamGraphqlQuery = API.graphql(
          graphqlOperation(GetStreamById, {
            id: routeStreamId
          })
        ) as PromiseLike<{
          data: GetStreamQuery
        }>
        const streamAuthUserBookmarkGraphqlQuery = API.graphql(
          graphqlOperation(GetContentBookmarkIdByUser, {
            userId: authUser.id
          })
        ) as PromiseLike<{
          data: GetContentBookmarkByUserQuery
        }>
        const streamAuthUserFlagGraphqlQuery = API.graphql(
          graphqlOperation(GetFlagIdByUser, {
            flaggerUserId: authUser.id
          })
        ) as PromiseLike<{
          data: GetFlagByUserQuery
        }>

        const [
          streamGraphqlResponse,
          streamAuthUserBookmarkGraphqlResponse,
          streamAuthUserFlagGraphqlResponse
        ] = (await Promise.all([
          streamGraphqlQuery,
          streamAuthUserBookmarkGraphqlQuery,
          streamAuthUserFlagGraphqlQuery
        ])) as [
          { data: GetStreamQuery },
          {
            data: GetContentBookmarkByUserQuery
          },
          { data: GetFlagByUserQuery }
        ]

        const streamResult = streamGraphqlResponse.data.getStream
        const streamAuthUserBookmarkResult =
          streamAuthUserBookmarkGraphqlResponse.data.getContentBookmarkByUser
        const streamAuthUserFlagResult =
          streamAuthUserFlagGraphqlResponse.data.getFlagByUser

        if (!streamResult) {
          routerHistory.push('/notfound')
          return
        }

        // Extract stream user info
        const profilePictureObjectUrl = streamResult.user?.profilePictureKey
          ? ((await Storage.get(streamResult.user.profilePictureKey, {
              level: 'protected',
              identityId: streamResult.user.cognitoIdentityId
            })) as string)
          : ''

        // Set states
        setAuthorProfilePictureObjectUrl(profilePictureObjectUrl)
        setStream(streamResult)
        setAuthUserBookmarkId(streamAuthUserBookmarkResult?.id ?? '')
        setAuthUserFlagId(streamAuthUserFlagResult?.id ?? '')

        // Subscribe to stream itself for live content changes
        const streamChangeSubscription = API.graphql(
          graphqlOperation(OnUpdateStreamById, {
            id: routeStreamId
          })
        )
        if (streamChangeSubscription instanceof Observable) {
          const sub = streamChangeSubscription.subscribe({
            next: (eventData: {
              value: {
                data: {
                  onUpdateStream: StreamDataType
                }
              }
            }) => {
              const updateStreamSubscriptionResult =
                eventData.value.data.onUpdateStream
              // TODO: Make use of this updated result i.e. update the stream body
              console.log(JSON.stringify(updateStreamSubscriptionResult))
            },
            error: (err: any) =>
              enqueueSnackbar(err.message ?? err, {
                variant: 'error'
              })
          })
          unsubscribe = () => {
            sub.unsubscribe()
          }
        }
        // Cleanup
        return unsubscribe
      } catch (err) {
        enqueueSnackbar(err.message ?? err, {
          variant: 'error'
        })
      } finally {
        setInfoLoaded(true)
      }
    })()
  }, [authUser.id, enqueueSnackbar, routeStreamId, routerHistory])

  // Functions
  const onSaveCommentClick = async () => {
    setCommentSaveInProgress(true)
    try {
      const createCommentGraphqlResponse = (await API.graphql(
        graphqlOperation(CreateStreamComment, {
          userId: authUser.id,
          contentId: stream?.id ?? '',
          body: newComment
        })
      )) as {
        data: CreateStreamCommentMutation
      }
      const commentResponse = createCommentGraphqlResponse.data.createComment
      const commentId = commentResponse?.id
      // TODO: Scroll to comment with Id so that the user can be sure his/her comment is added properly
    } catch (err) {
      enqueueSnackbar(JSON.stringify(err), {
        variant: 'error'
      })
    } finally {
      setCommentSaveInProgress(false)
    }
  }
  const onCreateBookmarkClick = async () => {
    try {
      if (!authUser.id) {
        // Guest User, ask if wants to login or register
        setLoginRequiredDialogOpen(true)
        return
      }
      // Create new bookmark
      const createBookmarkGraphqlResponse = (await API.graphql(
        graphqlOperation(CreateStreamBookmark, {
          userId: authUser.id,
          contentId: stream?.id
        })
      )) as {
        data: CreateStreamBookmarkMutation
      }
      const bookmarkResult =
        createBookmarkGraphqlResponse.data.createContentInteraction
      setAuthUserBookmarkId(bookmarkResult?.id ?? '')
    } catch (err) {
      enqueueSnackbar(JSON.stringify(err), {
        variant: 'error'
      })
    }
  }

  const onRemoveBookmarkClick = async () => {
    try {
      await API.graphql(
        graphqlOperation(DeleteBookmark, {
          id: authUserBookmarkId
        })
      )
      setAuthUserBookmarkId('')
    } catch (err) {
      enqueueSnackbar(JSON.stringify(err), {
        variant: 'error'
      })
    }
  }

  const onRetractFlagClick = async () => {
    try {
      await API.graphql(
        graphqlOperation(DeleteFlagById, {
          id: authUserFlagId
        })
      )
    } catch (err) {
      console.log(err)
      enqueueSnackbar(JSON.stringify(err), {
        variant: 'error'
      })
    } finally {
      setConfirmRetractFlagDialogOpen(false)
    }
    return
  }

  return (
    <React.Fragment>
      {/** HTML Document Header */}
      <Helmet>
        <title>{stream?.id ? `🚿 ${stream?.id}` : ''}</title>
      </Helmet>
      {/** Content */}
      {!infoLoaded ? (
        <Grid container>
          <Grid item xs={12}>
            <Skeleton height={theme.spacing(6)}></Skeleton>
            <Skeleton height={theme.spacing(24)}></Skeleton>
          </Grid>
        </Grid>
      ) : (
        <Grid container>
          {/** Top Bar (User Info & Action Buttons) */}
          <CardHeader
            className={classes.topAppBar}
            avatar={
              <IconButton
                disableRipple
                component={RouterLink}
                to={`/u/${stream?.user?.username ?? ''}`}
              >
                <Badge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  badgeContent={
                    stream?.isSealed ? (
                      <SmallAvatar
                        alt="content-status"
                        className={classes.smallAvatarSealed}
                      >
                        <StopIcon fontSize="small" />
                      </SmallAvatar>
                    ) : (
                      <SmallAvatar
                        alt="content-status"
                        className={classes.smallAvatarLive}
                      >
                        <AccessPointIcon fontSize="small" />
                      </SmallAvatar>
                    )
                  }
                >
                  <Avatar
                    alt={stream?.user?.username}
                    className={classes.avatar}
                    src={authorProfilePictureObjectUrl}
                  />
                </Badge>
              </IconButton>
            }
            title={
              <Link
                component={RouterLink}
                to={`/u/${stream?.user?.username ?? ''}`}
              >
                {stream?.user?.username}
              </Link>
            }
            subheader={
              <Grid container alignItems="flex-end">
                {/** Bookmarks */}
                {authUserBookmarkId ? (
                  <BookmarkIcon fontSize="small" />
                ) : (
                  <BookmarkOutlineIcon fontSize="small" />
                )}
                {` ${stream?.bookmarkCount?.count ?? 0}`}
                &emsp;
                <CommentOutlineIcon fontSize="small" />
                {` ${stream?.commentCount?.count ?? 0}`}
                &emsp;{'('}
                {/** Created */}
                <BalloonIcon fontSize="small" />
                {formatDistanceToNow(new Date(stream?.startTime ?? 0), {
                  locale: getUserLocale(authUser.language ?? Language.en),
                  addSuffix: true
                })}
                {stream?.isSealed && (
                  <React.Fragment>
                    {','}&ensp;
                    {/** Seal Time */}
                    <SleepIcon fontSize="small" />
                    {formatDistanceToNow(new Date(stream?.sealTime ?? 0), {
                      locale: getUserLocale(authUser.language ?? Language.en),
                      addSuffix: true
                    })}
                  </React.Fragment>
                )}
                {')'}
              </Grid>
            }
            action={
              <React.Fragment>
                {/** Bookmark/Unbookmark */}
                {!authUserBookmarkId ? (
                  <IconButton
                    color="default"
                    aria-label="bookmark"
                    onClick={onCreateBookmarkClick}
                  >
                    <BookmarkOutlineIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    color="secondary"
                    aria-label="unbookmark"
                    onClick={onRemoveBookmarkClick}
                  >
                    <BookmarkIcon />
                  </IconButton>
                )}

                {/** Share */}
                <IconButton
                  color="primary"
                  aria-label="share"
                  onClick={() => setShareContentDialogOpen(true)}
                >
                  <ShareVariantIcon />
                </IconButton>
                {/** More */}
                <IconButton
                  aria-label="display more actions"
                  aria-controls={topBarActionsMenuId}
                  aria-haspopup="true"
                  onClick={(event) => setAnchorEl(event.currentTarget)}
                >
                  <DotsVerticalIcon />
                </IconButton>
              </React.Fragment>
            }
          />
          <Menu
            id={topBarActionsMenuId}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            open={isTopBarActionsMenuOpen}
            onClose={() => {
              setAnchorEl(null)
            }}
          >
            {authUser.contextMeta.isReady &&
              authUser.id && [
                authUserFlagId ? (
                  [
                    // Retract Flag
                    <MenuItem
                      key="retract-flag-menu-item"
                      onClick={() => setConfirmRetractFlagDialogOpen(true)}
                    >
                      <ListItemIcon>
                        <FlagRemoveIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={t('canto.topBarActionsMenu.buttons.unflag')}
                      />
                    </MenuItem>,
                    // Edit Flag
                    <MenuItem
                      key="edit-flag-menu-item"
                      onClick={() => setFlagDialogOpen(true)}
                    >
                      <ListItemIcon>
                        <FlagCheckeredIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={t('canto.topBarActionsMenu.buttons.editFlag')}
                      />
                    </MenuItem>
                  ]
                ) : (
                  // Raise Flag
                  <MenuItem
                    key="raise-flag-menu-item"
                    onClick={() => setFlagDialogOpen(true)}
                  >
                    <ListItemIcon>
                      <FlagIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={t('canto.topBarActionsMenu.buttons.flag')}
                    />
                  </MenuItem>
                )
              ]}
          </Menu>

          {/** Body */}
          <Box fontFamily="Monospace">
            <span>{stream?.body}</span>
          </Box>
          {/** Stream | Comments horizontal separator */}
          <hr />
          {/** TODO: Add Comment */}
          {authUser.contextMeta.isReady &&
            (!authUser.id ? (
              // Login to comment
              <Alert
                icon={false}
                variant="outlined"
                severity="info"
                action={
                  <React.Fragment>
                    <Button color="inherit" size="small">
                      {t('stream.addComment.buttons.login')}
                    </Button>
                    <Button color="inherit" size="small">
                      {t('stream.addComment.buttons.register')}
                    </Button>
                  </React.Fragment>
                }
              >
                {t('stream.addComment.message.loginToComment')}
              </Alert>
            ) : (
              // Proudly allowed comment area
              <Card
                className={classes.addCommentCard}
                color="transparent"
                elevation={0}
              >
                <CardHeader
                  avatar={
                    <Avatar
                      alt="Woolfie"
                      aria-label="authenticated-user-avatar"
                      src={authUser?.profilePictureObjectUrl}
                      style={{
                        color: '#fff',
                        backgroundColor: authUser?.color
                      }}
                    />
                  }
                  title={authUser.username}
                />
                <CardContent>
                  <TextField
                    fullWidth
                    label={t('stream.addComment.label')}
                    placeholder={t('stream.addComment.placeholder')}
                    multiline
                    rowsMax={4}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  ></TextField>
                </CardContent>
                <CardActions>
                  <div className={classes.grow} />
                  <Button
                    onClick={onSaveCommentClick}
                    variant="contained"
                    color="primary"
                    startIcon={SendIcon}
                    disabled={commentSaveInProgress}
                  >
                    {!commentSaveInProgress ? (
                      t('common.send')
                    ) : (
                      <CircularProgress size={14} />
                    )}
                  </Button>
                </CardActions>
              </Card>
            ))}

          <div></div>
          {/** TODO: List existing comments */}
        </Grid>
      )}
      {/** Dialogs */}
      <TafalkShareContentDialog
        open={shareContentDialogOpen}
        onClose={() => setShareContentDialogOpen(false)}
        contentLink={`https://tafalk.com${getContentRoute({
          __typename: 'Stream',
          id: stream?.id
        })}`}
      />
      {/** Flag Dialog */}
      <TafalkFlagContentDialog
        open={flagDialogOpen}
        onClose={() => setFlagDialogOpen(false)}
        contentType={ContentType.stream}
        contentId={stream?.id ?? ''}
        flaggerUserId={authUser.id}
        flagId={authUserFlagId ? authUserFlagId : undefined}
      />
      {/** Remove Flag Confirmation Dialog */}
      <TafalkConfirmationDialog
        open={confirmRetractFlagDialogOpen}
        onConfirm={onRetractFlagClick}
        onClose={() => setConfirmRetractFlagDialogOpen(false)}
        title={t('canto.retractFlagConfirmationDialog.title')}
        body={t('canto.retractFlagConfirmationDialog.body')}
      />
      {/** Login required to bookmark */}
      <TafalkLoginRequiredDialog
        open={loginRequiredDialogOpen}
        onClose={() => setLoginRequiredDialogOpen(false)}
      ></TafalkLoginRequiredDialog>
    </React.Fragment>
  )
}

export default Stream
