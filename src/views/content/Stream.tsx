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
  CircularProgress,
  List,
  ListSubheader,
  ListItem,
  ListItemAvatar,
  Typography,
  ListItemSecondaryAction
} from '@material-ui/core'
import { Skeleton, Alert } from '@material-ui/lab'
import {
  GetContentBookmarkByUserQuery,
  GetFlagByUserQuery,
  Language,
  ContentType,
  CreateStreamBookmarkMutation,
  CreateStreamCommentMutation,
  GetStreamQuery,
  ListStreamCommentsQuery,
  GetChildContentFlagsByUserQuery
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
  CreateStreamComment,
  ListStreamComments,
  GetStreamCommentFlagsByUser
} from 'graphql/custom'
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
import InfiniteScroll from 'react-infinite-scroller'
import {
  itemsPerFetch,
  commentMaxLength,
  commentMinLength
} from 'utils/constants'

import TafalkShareContentDialog from 'components/content/dialogs/GenericShareContentDialog'
import TafalkConfirmationDialog from 'components/common/dialogs/GenericConfirmationDialog'
import TafalkLoginRequiredDialog from 'components/common/dialogs/TheLoginRequiredDialog'
import TafalkFlagContentDialog from 'components/content/dialogs/FlagContentDialog'

interface StreamRouteParams {
  id: string
}

interface StreamDataType
  extends Omit<Exclude<GetStreamQuery['getStream'], null>, '__typename'> {}

interface CommentDataType
  extends Omit<
    Exclude<
      GetChildContentFlagsByUserQuery['getChildContentFlagsByUser'],
      null
    >,
    '__typename'
  > {}

const topBarActionsMenuId = 'top-bar-actions-menu'

//
const getProtectedLevelProfilePictureObjectUrlByKey = (
  profilePictureKey: string,
  cognitoIdentityId: string
) => {
  if (!profilePictureKey) return ''
  let objUrl = ''
  Storage.get(profilePictureKey, {
    level: 'protected',
    identityId: cognitoIdentityId
  }).then((res) => {
    objUrl = res as string
  })

  return objUrl
}

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
      flexGrow: 1,
      backgroundColor: 'transparent'
    },
    loginToAddCommentAlert: {
      flexGrow: 1
    },
    commentList: {
      width: '100%',
      backgroundColor: 'transparent'
    },
    commentListItemAvatar: {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main
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
  const [authUserCommentFlags, setAuthUserCommentFlags] = useState<
    CommentDataType
  >([])
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [newComment, setNewComment] = useState('')
  const [comments, setComments] = useState<
    StreamDataType['comments'] | ListStreamCommentsQuery['listContentComments']
  >([])
  const [fetchNextOffset, setFetchNextOffset] = useState(0)
  const [commentSaveInProgress, setCommentSaveInProgress] = useState(false)
  const [shareContentDialogOpen, setShareContentDialogOpen] = useState(false)
  const [
    confirmRetractFlagDialogOpen,
    setConfirmRetractFlagDialogOpen
  ] = useState(false)
  const [flagDialogOpen, setFlagDialogOpen] = useState(false)
  const [flagDialogContentType, setFlagDialogContentType] = useState<
    ContentType
  >(ContentType.stream)
  const [flagDialogContentId, setFlagDialogContentId] = useState('')
  const [flagDialogParentContentId, setFlagDialogParentContentId] = useState('')
  const [flagDialogAuthUserFlagId, setFlagDialogAuthUserFlagId] = useState('')
  const [retractFlagDialogFlagId, setRetractFlagDialogFlagId] = useState('')
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
            userId: authUser?.id ?? ''
          })
        ) as PromiseLike<{
          data: GetContentBookmarkByUserQuery
        }>
        const streamAuthUserFlagGraphqlQuery = API.graphql(
          graphqlOperation(GetFlagIdByUser, {
            flaggerUserId: authUser?.id ?? ''
          })
        ) as PromiseLike<{
          data: GetFlagByUserQuery
        }>

        const streamChildFlagsByAuthUserGraphqlQuery = API.graphql(
          graphqlOperation(GetStreamCommentFlagsByUser, {
            flaggerUserId: authUser?.id ?? '',
            parentContentId: routeStreamId ?? ''
          })
        ) as PromiseLike<{
          data: GetChildContentFlagsByUserQuery
        }>

        const [
          streamGraphqlResponse,
          streamAuthUserBookmarkGraphqlResponse,
          streamAuthUserFlagGraphqlResponse,
          streamChildFlagsByAuthUserGraphqlResponse
        ] = (await Promise.all([
          streamGraphqlQuery,
          streamAuthUserBookmarkGraphqlQuery,
          streamAuthUserFlagGraphqlQuery,
          streamChildFlagsByAuthUserGraphqlQuery
        ])) as [
          { data: GetStreamQuery },
          {
            data: GetContentBookmarkByUserQuery
          },
          { data: GetFlagByUserQuery },
          { data: GetChildContentFlagsByUserQuery }
        ]

        const streamResult = streamGraphqlResponse.data.getStream
        const streamAuthUserBookmarkResult =
          streamAuthUserBookmarkGraphqlResponse.data.getContentBookmarkByUser
        const streamAuthUserFlagResult =
          streamAuthUserFlagGraphqlResponse.data.getFlagByUser
        const streamChildFlagsByAuthUserResult =
          streamChildFlagsByAuthUserGraphqlResponse.data
            .getChildContentFlagsByUser

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
        setComments(streamResult.comments ?? [])
        setAuthUserBookmarkId(streamAuthUserBookmarkResult?.id ?? '')
        setAuthUserFlagId(streamAuthUserFlagResult?.id ?? '')
        setAuthUserCommentFlags(streamChildFlagsByAuthUserResult ?? [])

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
        enqueueSnackbar(JSON.stringify(err), {
          variant: 'error'
        })
      } finally {
        setInfoLoaded(true)
      }
    })()
  }, [authUser, enqueueSnackbar, routeStreamId, routerHistory])

  // Functions
  const loadMoreComments = async () => {
    const streamCommentsGraphqlResponse = (await API.graphql(
      graphqlOperation(ListStreamComments, {
        contentId: stream?.id ?? '',
        limit: itemsPerFetch,
        offset: fetchNextOffset
      })
    )) as {
      data: ListStreamCommentsQuery
    }
    const moreComments = streamCommentsGraphqlResponse.data.listContentComments
    setFetchNextOffset(fetchNextOffset + itemsPerFetch)
    setComments([...(comments ?? []), ...(moreComments ?? [])])
    return
  }
  const onSaveCommentClick = async () => {
    setCommentSaveInProgress(true)
    try {
      const createCommentGraphqlResponse = (await API.graphql(
        graphqlOperation(CreateStreamComment, {
          userId: authUser?.id,
          contentId: stream?.id ?? '',
          body: newComment
        })
      )) as {
        data: CreateStreamCommentMutation
      }
      const commentResponse = createCommentGraphqlResponse.data.createComment
      const commentId = commentResponse?.id
      // Scroll to comment with Id so that the user can be sure his/her comment is added properly
      if (commentId) {
        const commentSection = document.getElementById(commentId)
        commentSection?.scrollIntoView()
      }
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
      if (!authUser?.id) {
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

  const onShowFlagDialog = (input: {
    contentType: ContentType
    contentId: string
    parentContentId: string
    authUserExistingFlagId: string
  }) => {
    setFlagDialogContentType(input.contentType)
    setFlagDialogContentId(input.contentId)
    setFlagDialogParentContentId(input.parentContentId)
    setFlagDialogAuthUserFlagId(input.authUserExistingFlagId)
    setFlagDialogOpen(true)
  }

  const onShowConfirmRetractFlagDialog = (flagId: string) => {
    setRetractFlagDialogFlagId(flagId)
    setConfirmRetractFlagDialogOpen(true)
  }

  const onRetractFlagClick = async () => {
    try {
      await API.graphql(
        graphqlOperation(DeleteFlagById, {
          id: retractFlagDialogFlagId
        })
      )
    } catch (err) {
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
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMoreComments}
        hasMore={fetchNextOffset < (stream?.commentCount ?? 0)}
        loader={<Skeleton width="100%" height={theme.spacing(36)} />}
      >
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
                  size="small"
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
                  {stream?.user?.username ?? ''}
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
                    locale: getUserLocale(authUser?.language ?? Language.en),
                    addSuffix: true
                  })}
                  {stream?.isSealed && (
                    <React.Fragment>
                      {','}&ensp;
                      {/** Seal Time */}
                      <SleepIcon fontSize="small" />
                      {formatDistanceToNow(new Date(stream?.sealTime ?? 0), {
                        locale: getUserLocale(
                          authUser?.language ?? Language.en
                        ),
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
              {authUser?.contextMeta.isReady &&
                authUser?.id && [
                  authUserFlagId ? (
                    [
                      // Retract Flag
                      <MenuItem
                        key="retract-flag-menu-item"
                        onClick={() =>
                          onShowConfirmRetractFlagDialog(authUserFlagId)
                        }
                      >
                        <ListItemIcon>
                          <FlagRemoveIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={t('stream.topBarActionsMenu.buttons.unflag')}
                        />
                      </MenuItem>,
                      // Edit Flag
                      <MenuItem
                        key="edit-flag-menu-item"
                        onClick={() =>
                          onShowFlagDialog({
                            contentType: ContentType.stream,
                            contentId: stream?.id ?? '',
                            parentContentId: '',
                            authUserExistingFlagId: authUserFlagId
                          })
                        }
                      >
                        <ListItemIcon>
                          <FlagCheckeredIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={t(
                            'stream.topBarActionsMenu.buttons.editFlag'
                          )}
                        />
                      </MenuItem>
                    ]
                  ) : (
                    // Raise Flag
                    <MenuItem
                      key="raise-flag-menu-item"
                      onClick={() =>
                        onShowFlagDialog({
                          contentType: ContentType.stream,
                          contentId: stream?.id ?? '',
                          parentContentId: '',
                          authUserExistingFlagId: ''
                        })
                      }
                    >
                      <ListItemIcon>
                        <FlagIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary={t('stream.topBarActionsMenu.buttons.flag')}
                      />
                    </MenuItem>
                  )
                ]}
            </Menu>

            {/** Body */}
            <Grid container className={classes.grow}>
              <Box fontFamily="Monospace" fontSize={16}>
                {stream?.title && (
                  <Typography variant="h6" gutterBottom>
                    {stream.title}
                  </Typography>
                )}
                <span style={{ whiteSpace: 'pre-line' }}>{stream?.body}</span>
              </Box>
            </Grid>

            {/** Add Comment */}
            <Grid container className={classes.grow}>
              {authUser?.contextMeta.isReady &&
                (!authUser?.id ? (
                  // Login to comment
                  <Alert
                    icon={false}
                    className={classes.loginToAddCommentAlert}
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
                  // Regular/allowed comment area
                  <Card
                    className={classes.addCommentCard}
                    color="transparent"
                    elevation={0}
                  >
                    <CardContent>
                      <Grid container>
                        <Grid item xs={1}>
                          <IconButton
                            disableRipple
                            component={RouterLink}
                            to={`/u/${authUser?.username ?? ''}`}
                          >
                            <Avatar
                              alt="Woolfie"
                              aria-label="authenticated-user-avatar"
                              src={authUser?.profilePictureObjectUrl}
                              style={{
                                color: '#fff',
                                backgroundColor: authUser?.color
                              }}
                            />
                          </IconButton>
                        </Grid>
                        <Grid item xs={11}>
                          <TextField
                            fullWidth
                            label={t('stream.addComment.label')}
                            placeholder={t('stream.addComment.placeholder')}
                            multiline
                            rowsMax={4}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            inputProps={{ maxLength: commentMaxLength }}
                            InputLabelProps={{
                              shrink: true
                            }}
                          ></TextField>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardActions>
                      <div className={classes.grow} />
                      <Button
                        onClick={onSaveCommentClick}
                        variant="contained"
                        color="primary"
                        startIcon={<SendIcon />}
                        disableElevation
                        disabled={
                          newComment.length < commentMinLength ||
                          commentSaveInProgress
                        }
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
            </Grid>

            {/** List existing comments */}
            <List
              className={classes.commentList}
              subheader={
                <ListSubheader>
                  {t('stream.comments.label', {
                    commentCount: stream?.commentCount?.count ?? 0
                  })}
                </ListSubheader>
              }
            >
              {stream?.comments?.map((c) => (
                <ListItem
                  id={c?.id ?? ''}
                  key={c?.id ?? ''}
                  alignItems="flex-start"
                >
                  {/** Avatar */}

                  <ListItemAvatar>
                    <IconButton
                      disableRipple
                      component={RouterLink}
                      to={`/u/${c?.user?.username ?? ''}`}
                      size="small"
                    >
                      <Avatar
                        alt={c?.user?.username}
                        src={getProtectedLevelProfilePictureObjectUrlByKey(
                          c?.user?.profilePictureKey ?? '',
                          c?.user?.cognitoIdentityId ?? ''
                        )}
                        className={classes.commentListItemAvatar}
                      ></Avatar>
                    </IconButton>
                  </ListItemAvatar>
                  {/** Content */}
                  <ListItemText
                    primary={
                      <React.Fragment>
                        {/** Commentor user name */}
                        <Link
                          component={RouterLink}
                          to={`/u/${c?.user?.username ?? ''}`}
                        >
                          <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                          >
                            {c?.user?.username ?? ''}
                          </Typography>
                        </Link>
                        {/** Comment time */}
                        <Typography
                          component="span"
                          variant="body2"
                          color="textSecondary"
                        >
                          {' — '}
                          {formatDistanceToNow(new Date(c?.time ?? 0), {
                            locale: getUserLocale(
                              authUser?.language ?? Language.en
                            ),
                            addSuffix: true
                          })}
                        </Typography>
                      </React.Fragment>
                    }
                    secondary={
                      <Typography
                        component="span"
                        variant="body1"
                        color="textPrimary"
                      >
                        <span style={{ whiteSpace: 'pre-line' }}>
                          {c?.body ?? ''}
                        </span>
                      </Typography>
                    }
                  />
                  {/** Action (Flag. Only if not the commentor xirself) */}
                  {c?.user?.id !== authUser?.id && (
                    <ListItemSecondaryAction>
                      {!authUserCommentFlags?.some(
                        (f) => f?.contentId === c?.id
                      ) ? (
                        // Auth user has NOT flagged this comment
                        <IconButton
                          edge="end"
                          aria-label="Raise Flag"
                          onClick={() =>
                            onShowFlagDialog({
                              contentType: ContentType.comment,
                              contentId: c?.id ?? '',
                              parentContentId: stream?.id ?? '',
                              authUserExistingFlagId: ''
                            })
                          }
                        >
                          <FlagIcon />
                        </IconButton>
                      ) : (
                        // Auth user has flagged this comment
                        <React.Fragment>
                          <IconButton
                            edge="end"
                            aria-label="Edit Flag"
                            onClick={() =>
                              onShowFlagDialog({
                                contentType: ContentType.comment,
                                contentId: c?.id ?? '',
                                parentContentId: stream?.id ?? '',
                                authUserExistingFlagId:
                                  authUserCommentFlags?.find(
                                    (f) => f?.id === c?.id
                                  )?.id ?? ''
                              })
                            }
                          >
                            <FlagCheckeredIcon />
                          </IconButton>
                          <IconButton
                            edge="end"
                            aria-label="Remove Flag"
                            onClick={() =>
                              onShowConfirmRetractFlagDialog(
                                authUserCommentFlags?.find(
                                  (f) => f?.contentId === c?.id
                                )?.id ?? ''
                              )
                            }
                          >
                            <FlagRemoveIcon />
                          </IconButton>
                        </React.Fragment>
                      )}
                    </ListItemSecondaryAction>
                  )}
                </ListItem>
              ))}
            </List>
          </Grid>
        )}
      </InfiniteScroll>

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
        contentType={flagDialogContentType}
        contentId={flagDialogContentId}
        parentContentId={flagDialogParentContentId}
        flaggerUserId={authUser?.id ?? ''}
        flagId={flagDialogAuthUserFlagId}
      />
      {/** Retract Flag Confirmation Dialog */}
      <TafalkConfirmationDialog
        open={confirmRetractFlagDialogOpen}
        onConfirm={onRetractFlagClick}
        onClose={() => setConfirmRetractFlagDialogOpen(false)}
        title={t('stream.retractFlagConfirmationDialog.title')}
        body={t('stream.retractFlagConfirmationDialog.body')}
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
