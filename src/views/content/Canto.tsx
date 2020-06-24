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
  Collapse,
  Link
} from '@material-ui/core'
import { Skeleton, Alert, AlertTitle } from '@material-ui/lab'
import {
  GetCantoQuery,
  GetContentBookmarkByUserQuery,
  GetFlagByUserQuery,
  Language,
  ContentType,
  CreateCantoBookmarkMutation
} from 'types/appsync/API'
import { AuthUserContext } from 'context/Auth'
import API, { graphqlOperation } from '@aws-amplify/api'
import Storage from '@aws-amplify/storage'
import debounce from 'debounce'
import {
  GetCantoById,
  OnUpdateCantoById,
  GetContentBookmarkIdByUser,
  GetFlagIdByUser,
  CreateCantoBookmark,
  UpdateCantoBookmark,
  DeleteBookmark,
  DeleteFlagById
} from 'graphql/custom'
import { useSiteMessage } from 'hooks'
import TafalkShareContentDialog from 'components/common/dialogs/TheShareContentDialog'
import TafalkConfirmationDialog from 'components/common/dialogs/TheConfirmationDialog'
import TafalkLoginRequiredDialog from 'components/common/dialogs/TheLoginRequiredDialog'
import TafalkFlagContentDialog from 'components/content/dialogs/FlagContentDialog'
import { getSiblings, getContentRoute } from 'utils/derivations'
import Observable from 'zen-observable'
import DotsVerticalIcon from 'mdi-material-ui/DotsVertical'
import AccessPointIcon from 'mdi-material-ui/AccessPoint'
import PauseIcon from 'mdi-material-ui/Pause'
import BalloonIcon from 'mdi-material-ui/Balloon'
import SleepIcon from 'mdi-material-ui/Sleep'
import BookmarkIcon from 'mdi-material-ui/Bookmark'
import BookmarkOutlineIcon from 'mdi-material-ui/BookmarkOutline'
import ShareVariantIcon from 'mdi-material-ui/ShareVariant'
import FlagIcon from 'mdi-material-ui/Flag'
import FlagRemoveIcon from 'mdi-material-ui/FlagRemove'
import FlagCheckeredIcon from 'mdi-material-ui/FlagCheckered'
import CloseIcon from 'mdi-material-ui/Close'
import { red } from '@material-ui/core/colors'

import { formatDistanceToNow } from 'date-fns'
import { getUserLocale } from 'utils/conversions'
import { useSnackbar } from 'notistack'
import { SmallAvatar } from 'components/common/avatars/SmallAvatar'

const bookmarkStartEndIndexSeparator = '-'
const selectApplicableClass = 'select-applicable'
const cantoPreBookmarkClass = 'canto-pre-bm-hl'
const cantoPostBookmarkClass = 'canto-post-bm-hl'
const cantoBodyBoxId = 'canto-body-box'
const bookmarkedSectionId = 'canto-bookmark-1'
const selectionChangeDebounceDuration = 500

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1
    },
    topAppBar: {
      width: '100%',
      paddingInline: theme.spacing(2, 0, 2, 0)
    },
    cantoStatusIcon: {
      marginRight: theme.spacing(2)
    },
    avatar: {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main
    },
    smallAvatarPaused: {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main
    },
    smallAvatarLive: {
      color: theme.palette.primary.contrastText,
      backgroundColor: red.A700
    },
    authorUserName: {},
    menuButton: {
      marginLeft: theme.spacing(0)
    },
    highlight: {
      backgroundColor: 'yellow',
      borderRadius: theme.spacing(1)
    },
    shareFab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    }
  })
)

interface CantoRouteParams {
  id: string
}

type CantoBodySelectionType = {
  startOffset: number
  endOffset: number
}

interface CantoDataType
  extends Omit<Exclude<GetCantoQuery['getCanto'], null>, '__typename'> {}

const Canto: React.FC = () => {
  let routerHistory = useHistory()
  const theme = useTheme()
  const { t } = useTranslation()
  const classes = useStyles()
  const { user: authUser } = useContext(AuthUserContext)
  const [, setSiteMessageData] = useSiteMessage()
  const routeParams = useParams<CantoRouteParams>()
  const { enqueueSnackbar } = useSnackbar()

  const [infoLoaded, setInfoLoaded] = useState(false)
  const [canto, setCanto] = useState<CantoDataType | null>(null)
  const [
    authorProfilePictureObjectUrl,
    setAuthorProfilePictureObjectUrl
  ] = useState('')
  const [authUserBookmarkId, setAuthUserBookmarkId] = useState('')
  const [authUserFlagId, setAuthUserFlagId] = useState('')
  const [bodySelectionRange, setBodySelectionRange] = useState<
    CantoBodySelectionType
  >({ startOffset: 0, endOffset: 0 })
  const [bodyHighlightRange, setBodyHighlightRange] = useState<
    CantoBodySelectionType
  >({ startOffset: 0, endOffset: 0 })
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [
    updateBookmarkIndicesInfoOpen,
    setUpdateBookmarkIndicesInfoOpen
  ] = useState(false)
  const [shareContentDialogVisible, setShareContentDialogVisible] = useState(
    false
  )
  const [
    confirmRetractFlagDialogVisible,
    setConfirmRetractFlagDialogVisible
  ] = useState(false)
  const [flagDialogVisible, setFlagDialogVisible] = useState(false)
  const [loginRequiredDialogVisible, setLoginRequiredDialogVisible] = useState(
    false
  )

  const routeCantoId = routeParams.id

  // Constants
  const isTopBarActionsMenuOpen = Boolean(anchorEl)
  const topBarActionsMenuId = 'top-bar-actions-menu'

  // Side effects: Load initial canto data
  useEffect(() => {
    ;(async () => {
      try {
        let unsubscribe
        // DB data
        const cantoGraphqlQuery = API.graphql(
          graphqlOperation(GetCantoById, {
            id: routeCantoId
          })
        ) as PromiseLike<{ data: GetCantoQuery }>
        const cantoAuthUserBookmarkGraphqlQuery = API.graphql(
          graphqlOperation(GetContentBookmarkIdByUser, {
            userId: authUser.id
          })
        ) as PromiseLike<{ data: GetContentBookmarkByUserQuery }>
        const cantoAuthUserFlagGraphqlQuery = API.graphql(
          graphqlOperation(GetFlagIdByUser, {
            flaggerUserId: authUser.id
          })
        ) as PromiseLike<{ data: GetFlagByUserQuery }>

        const [
          cantoGraphqlResponse,
          cantoAuthUserBookmarkGraphqlResponse,
          cantoAuthUserFlagGraphqlResponse
        ] = (await Promise.all([
          cantoGraphqlQuery,
          cantoAuthUserBookmarkGraphqlQuery,
          cantoAuthUserFlagGraphqlQuery
        ])) as [
          { data: GetCantoQuery },
          { data: GetContentBookmarkByUserQuery },
          { data: GetFlagByUserQuery }
        ]

        const cantoResult = cantoGraphqlResponse.data.getCanto
        const cantoAuthUserBookmarkResult =
          cantoAuthUserBookmarkGraphqlResponse.data.getContentBookmarkByUser
        const cantoAuthUserFlagResult =
          cantoAuthUserFlagGraphqlResponse.data.getFlagByUser

        if (!cantoResult) {
          routerHistory.push('/notfound')
          return
        }

        // Extract canto user info
        const profilePictureObjectUrl = cantoResult.user?.profilePictureKey
          ? ((await Storage.get(cantoResult.user.profilePictureKey, {
              level: 'protected',
              identityId: cantoResult.user.cognitoIdentityId
            })) as string)
          : ''

        // Set states
        setAuthorProfilePictureObjectUrl(profilePictureObjectUrl)
        setCanto(cantoResult)
        setAuthUserBookmarkId(cantoAuthUserBookmarkResult?.id ?? '')
        setAuthUserFlagId(cantoAuthUserFlagResult?.id ?? '')
        if (cantoAuthUserBookmarkResult?.id) {
          const [
            bookmarkStartOffset,
            bookmarkEndOffset
          ] = cantoAuthUserBookmarkResult?.indices
            ?.split(bookmarkStartEndIndexSeparator, 2)
            .map((str) => parseInt(str)) ?? [0, 0]
          setBodyHighlightRange({
            startOffset: bookmarkStartOffset,
            endOffset: bookmarkEndOffset
          })
        }

        // Subscribe to canto itself for live content changes
        const cantoChangeSubscription = API.graphql(
          graphqlOperation(OnUpdateCantoById, { id: routeCantoId })
        )
        if (cantoChangeSubscription instanceof Observable) {
          const sub = cantoChangeSubscription.subscribe({
            next: (eventData: {
              value: { data: { onUpdateCanto: CantoDataType } }
            }) => {
              const updateCantoSubscriptionResult =
                eventData.value.data.onUpdateCanto
              // TODO: Make use of this updated result i.e. update the canto body
              console.log(JSON.stringify(updateCantoSubscriptionResult))
            },
            error: (err: any) =>
              setSiteMessageData({
                show: true,
                type: 'error',
                timeout: null,
                text: err.message ?? err
              })
          })
          unsubscribe = () => {
            sub.unsubscribe()
          }
        }

        // Scroll to bookmarked section, if exists
        const bookmarkedSection = document.getElementById(bookmarkedSectionId)
        bookmarkedSection?.scrollIntoView()

        // Cleanup
        return unsubscribe
      } catch (err) {
        setSiteMessageData({
          show: true,
          type: 'error',
          timeout: null,
          text: err.message ?? err
        })
      } finally {
        setInfoLoaded(true)
      }
    })()
  }, [authUser.id, routeCantoId, routerHistory, setSiteMessageData])

  // Side effects: Event listener for text selection (or highlight)
  useEffect(() => {
    // Event handler function as a closure
    const onSelectionChange = (_e: Event) => {
      // Only updates for creation
      if (!authUserBookmarkId) {
        return
      }
      const selection = document.getSelection()
      if (!selection || selection.type !== 'Range') {
        setBodySelectionRange({ startOffset: 0, endOffset: 0 })
        return
      }

      const range = selection.getRangeAt(0)
      if (!range || range.collapsed) {
        setBodySelectionRange({ startOffset: 0, endOffset: 0 })
        return
      }

      const commonNonTextNode =
        range.commonAncestorContainer.nodeType === Node.TEXT_NODE
          ? range.commonAncestorContainer.parentNode
          : range.commonAncestorContainer

      if (!(commonNonTextNode as Element)?.closest(`#${cantoBodyBoxId}`)) {
        setBodySelectionRange({ startOffset: 0, endOffset: 0 })
        return
      }

      const { startContainer, endContainer, startOffset, endOffset } = range

      const startContainerParentNodeClassList = (startContainer.parentNode as HTMLElement)
        .classList
      const endContainerParentNodeClassList = (endContainer.parentNode as HTMLElement)
        .classList

      if (
        startContainerParentNodeClassList.contains(cantoPostBookmarkClass) &&
        endContainerParentNodeClassList.contains(cantoPostBookmarkClass)
      ) {
        // Range starts and ends after the existing bookmark
        const siblingSpans = getSiblings(startContainer.parentNode)
        const indexOffset = siblingSpans.reduce(
          (prev, next) => prev + ((next as HTMLElement).innerText ?? '').length,
          0
        )
        setBodySelectionRange({
          startOffset: startOffset + indexOffset,
          endOffset: endOffset + indexOffset
        })
      } else {
        setBodySelectionRange({
          startOffset,
          endOffset
        })
      }
    }
    if (authUser.contextMeta.isReady && !authUser.id) {
      return
    }
    // Debounce the event handler function
    const debOnSelectionChange = debounce(
      onSelectionChange,
      selectionChangeDebounceDuration
    )
    document?.addEventListener('selectionchange', debOnSelectionChange)

    // Cleanup
    return () => {
      document?.removeEventListener('selectionchange', debOnSelectionChange)
    }
  }, [authUser.contextMeta.isReady, authUser.id, authUserBookmarkId])

  // Side effects: Add/change bookmark when selection changes
  useEffect(() => {
    ;(async () => {
      try {
        if (!authUserBookmarkId) {
          return
        }
        if (!bodySelectionRange.startOffset || !bodySelectionRange.endOffset) {
          return
        }

        // Update existing bookmark
        await API.graphql(
          graphqlOperation(UpdateCantoBookmark, {
            id: authUserBookmarkId,
            indices: `${bodySelectionRange.startOffset}${bookmarkStartEndIndexSeparator}${bodySelectionRange.endOffset}`
          })
        )
        enqueueSnackbar(t('canto.message.updateBookmarkSuccess'))

        setBodyHighlightRange({
          startOffset: bodySelectionRange.startOffset,
          endOffset: bodySelectionRange.endOffset
        })
      } catch (err) {
        enqueueSnackbar(
          `${t('canto.message.bookmarkError')}: ${JSON.stringify(err)}`,
          {
            variant: 'error'
          }
        )
      }
    })()
  }, [
    authUser.id,
    authUserBookmarkId,
    bodySelectionRange.endOffset,
    bodySelectionRange.startOffset,
    canto,
    enqueueSnackbar,
    t
  ])

  // Functions
  const onCreateBookmarkClick = async () => {
    try {
      if (!authUser.id) {
        // Guest User, ask if wants to login or register
        setLoginRequiredDialogVisible(true)
        return
      }
      const firstWordLength = (canto?.body || '').split(' ')[0].length
      // Create new bookmark
      const createBookmarkGraphqlResponse = (await API.graphql(
        graphqlOperation(CreateCantoBookmark, {
          userId: authUser.id,
          contentId: canto?.id,
          indices: `${0}${bookmarkStartEndIndexSeparator}${firstWordLength}`
        })
      )) as {
        data: CreateCantoBookmarkMutation
      }
      const bookmarkResult =
        createBookmarkGraphqlResponse.data.createContentInteraction
      setAuthUserBookmarkId(bookmarkResult?.id ?? '')
      setBodyHighlightRange({
        startOffset: 0,
        endOffset: firstWordLength
      })
      setUpdateBookmarkIndicesInfoOpen(true)
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
      setBodyHighlightRange({
        startOffset: 0,
        endOffset: 0
      })
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
      setConfirmRetractFlagDialogVisible(false)
    }
    return
  }

  return (
    <React.Fragment>
      {/** HTML Document Header */}
      <Helmet>
        <title>{canto?.id ? `♾️ ${canto?.id}` : ''}</title>
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
                to={`/u/${canto?.user?.username ?? ''}`}
              >
                <Badge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  badgeContent={
                    canto?.isPaused ? (
                      <SmallAvatar
                        alt="content-status"
                        className={classes.smallAvatarPaused}
                      >
                        <PauseIcon fontSize="small" />
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
                    alt={canto?.user?.username}
                    className={classes.avatar}
                    src={authorProfilePictureObjectUrl}
                  />
                </Badge>
              </IconButton>
            }
            title={
              <Link
                component={RouterLink}
                to={`/u/${canto?.user?.username ?? ''}`}
              >
                {canto?.user?.username}
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
                {` ${canto?.bookmarkCount?.count ?? 0}`}
                &emsp;{'('}
                {/** Created */}
                <BalloonIcon fontSize="small" />
                {formatDistanceToNow(new Date(canto?.startTime ?? 0), {
                  locale: getUserLocale(authUser.language ?? Language.en),
                  addSuffix: true
                })}
                {','}&ensp;
                {/** Last Update */}
                <SleepIcon fontSize="small" />
                {formatDistanceToNow(new Date(canto?.lastUpdateTime ?? 0), {
                  locale: getUserLocale(authUser.language ?? Language.en),
                  addSuffix: true
                })}
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
                  onClick={() => setShareContentDialogVisible(true)}
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
                      onClick={() => setConfirmRetractFlagDialogVisible(true)}
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
                      onClick={() => setFlagDialogVisible(true)}
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
                    onClick={() => setFlagDialogVisible(true)}
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

          {/** Update Bookmark Method Info */}
          {authUserBookmarkId && (
            <Collapse in={updateBookmarkIndicesInfoOpen}>
              <Alert
                severity="info"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setUpdateBookmarkIndicesInfoOpen(false)
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                <AlertTitle>
                  <span role="img" aria-label="dynamic-bookmark-emoji">
                    🧶
                  </span>{' '}
                  {t('canto.updateBookmarkIndicesInfo.title')}
                </AlertTitle>
                {t('canto.updateBookmarkIndicesInfo.body')}
              </Alert>
            </Collapse>
          )}

          {/** Body */}
          <Box
            fontFamily="Monospace"
            className={selectApplicableClass}
            id={cantoBodyBoxId}
          >
            {!bodyHighlightRange.startOffset &&
            !bodyHighlightRange.endOffset ? (
              <span>{canto?.body}</span>
            ) : (
              <React.Fragment>
                <span className={cantoPreBookmarkClass}>
                  {canto?.body.substring(0, bodyHighlightRange.startOffset)}
                </span>
                <span id={bookmarkedSectionId} className={classes.highlight}>
                  {canto?.body.substring(
                    bodyHighlightRange.startOffset,
                    bodyHighlightRange.endOffset
                  )}
                </span>
                <span className={cantoPostBookmarkClass}>
                  {canto?.body.substring(bodyHighlightRange.endOffset)}
                </span>
              </React.Fragment>
            )}
          </Box>
        </Grid>
      )}
      {/** Dialogs */}
      <TafalkShareContentDialog
        open={shareContentDialogVisible}
        onClose={() => setShareContentDialogVisible(false)}
        contentLink={`https://tafalk.com${getContentRoute({
          __typename: 'Canto',
          id: canto?.id
        })}`}
      />
      {/** Flag Dialog */}
      <TafalkFlagContentDialog
        open={flagDialogVisible}
        onClose={() => setFlagDialogVisible(false)}
        contentType={ContentType.canto}
        contentId={canto?.id ?? ''}
        flaggerUserId={authUser.id}
        flagId={authUserFlagId ? authUserFlagId : undefined}
      />
      {/** Remove Flag Confirmation Dialog */}
      <TafalkConfirmationDialog
        open={confirmRetractFlagDialogVisible}
        onConfirm={onRetractFlagClick}
        onClose={() => setConfirmRetractFlagDialogVisible(false)}
        title={t('canto.retractFlagConfirmationDialog.title')}
        body={t('canto.retractFlagConfirmationDialog.body')}
      />
      {/** Login required to bookmark */}
      <TafalkLoginRequiredDialog
        open={loginRequiredDialogVisible}
        onClose={() => setLoginRequiredDialogVisible(false)}
      ></TafalkLoginRequiredDialog>
    </React.Fragment>
  )
}

export default Canto
