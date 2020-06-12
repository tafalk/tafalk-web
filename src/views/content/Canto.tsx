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
  AppBar,
  Toolbar,
  Avatar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box
} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import {
  GetCantoQuery,
  GetContentBookmarkByUserQuery,
  GetFlagByUserQuery,
  Language
} from 'types/appsync/API'
import { AuthUserContext } from 'context/Auth'
import API, { graphqlOperation, GraphQLResult } from '@aws-amplify/api'
import Storage from '@aws-amplify/storage'
import {
  GetCantoById,
  OnUpdateCantoById,
  GetContentBookmarkIdByUser,
  GetFlagIdByUser
} from 'graphql/custom'
import { useSiteMessage } from 'hooks'
import { getSiblings } from 'utils/derivations'
import Observable from 'zen-observable'
import DotsVerticalIcon from 'mdi-material-ui/DotsVertical'
import BookmarkOffIcon from 'mdi-material-ui/BookmarkOff'
import AccessPointIcon from 'mdi-material-ui/AccessPoint'
import PauseIcon from 'mdi-material-ui/Pause'
import BalloonIcon from 'mdi-material-ui/Balloon'
import SleepIcon from 'mdi-material-ui/Sleep'
import BookmarkIcon from 'mdi-material-ui/Bookmark'
import BookmarkOutlineIcon from 'mdi-material-ui/BookmarkOutline'
import { formatDistanceToNow } from 'date-fns'
import { getUserLocale } from 'utils/conversions'

const selectApplicableClass = 'select-applicable'
const cantoPreBookmarkClass = 'canto-pre-bm-hl'
const cantoPostBookmarkClass = 'canto-post-bm-hl'
// const cantoBookmarkId = 'canto-bookmark-1'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1
    },
    topAppBar: {
      flexGrow: 1
    },
    cantoStatusIcon: {
      marginRight: theme.spacing(2)
    },
    avatar: {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main
    },
    authorUserName: {},
    menuButton: {
      marginLeft: theme.spacing(0)
    },
    highlight: {
      backgroundColor: 'yellow',
      borderRadius: theme.spacing(1)
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

  const [infoLoaded, setInfoLoaded] = useState(false)
  const [canto, setCanto] = useState<CantoDataType | null>(null)
  const [
    authorProfilePictureObjectUrl,
    setAuthorProfilePictureObjectUrl
  ] = useState('')
  const [authUserBookmarkId, setAuthUserBookmarkId] = useState('')
  const [authUserFlagId, setAuthUserFlagId] = useState('')
  const [
    bodySelectionRange,
    setBodySelectionRange
  ] = useState<CantoBodySelectionType | null>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const routeCantoId = routeParams.id

  let isVisitorAuthUser: boolean | undefined = undefined
  if (authUser.contextMeta.isReady) {
    isVisitorAuthUser = !!authUser.username
  }

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

        console.log('Sent requests')
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

        console.log('Got results')

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

        // Cleanup
        return unsubscribe
      } catch (err) {
        console.log(err.message ?? err)
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
    const onMouseUp = (e: Event) => {
      e.preventDefault()
      if (!isVisitorAuthUser) return
      // TODO: Show a dialog, snackbar, buttoned tooltip etc. for 'Change bookmark? Remember decision (cookie)'
      // Get selection Range
      const range = document.getSelection()?.getRangeAt(0)
      if (
        !range ||
        range.collapsed ||
        (range.commonAncestorContainer as HTMLElement).classList.contains(
          selectApplicableClass
        )
      ) {
        // if a single click (not a tafalkish selection indeed)
        setBodySelectionRange(null)
        return
      }

      const { startContainer, endContainer, startOffset, endOffset } = range

      // TODO: It should not be needed, but must be tested later
      // if (startContainer !== endContainer) {
      //   // start and end are not in the body
      //   setBodySelectionRange(null)
      //   return
      // }

      const startContainerParentNodeClassList = (startContainer.parentNode as HTMLElement)
        .classList
      const endContainerParentNodeClassList = (endContainer.parentNode as HTMLElement)
        .classList

      if (
        startContainerParentNodeClassList.contains(cantoPreBookmarkClass) &&
        endContainerParentNodeClassList.contains(cantoPreBookmarkClass)
      ) {
        // Range starts and ends before the existing bookmark
        setBodySelectionRange({
          startOffset,
          endOffset
        })
        return
      }
      if (
        startContainerParentNodeClassList.contains(cantoPostBookmarkClass) &&
        endContainerParentNodeClassList.contains(cantoPostBookmarkClass)
      ) {
        const siblingSpans = getSiblings(startContainer.parentNode)
        const indexOffset = siblingSpans.reduce(
          (prev, next) => prev + ((next as HTMLElement).innerText ?? '').length,
          0
        )
        // Range starts after the existing bookmark
        setBodySelectionRange({
          startOffset: startOffset + indexOffset,
          endOffset: endOffset + indexOffset
        })
      }
    }
    //window.addEventListener('selectionchange', onSelectionChange)
    window.addEventListener('mouseup', onMouseUp)
    // Cleanup
    return () =>
      //window.removeEventListener('selectionchange', onSelectionChange)
      window.removeEventListener('mouseup', onMouseUp)
  }, [isVisitorAuthUser])

  // Functions
  const onBookmarkClick = () => {
    //TODO: Implement
    return
  }

  const onRemoveBookmarkClick = () => {
    //TODO: Implement
    return
  }

  const onRaiseFlagClick = () => {
    //TODO: Implement
    return
  }

  const onRetractFlagClick = () => {
    //TODO: Implement
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
          <AppBar
            position="static"
            className={classes.topAppBar}
            color="transparent"
            elevation={0}
          >
            <Toolbar>
              {canto?.isPaused ? <PauseIcon /> : <AccessPointIcon />}
              <Avatar
                alt={canto?.user?.username}
                className={classes.avatar}
                src={authorProfilePictureObjectUrl}
              ></Avatar>
              <Typography variant="h6" className={classes.authorUserName}>
                {canto?.user?.username}
              </Typography>
              <div className={classes.grow} />
              {/** Created */}
              <BalloonIcon />
              {formatDistanceToNow(new Date(canto?.startTime ?? 0), {
                locale: getUserLocale(authUser.language ?? Language.en),
                addSuffix: true
              })}
              {/** Last Update */}
              <SleepIcon />
              {formatDistanceToNow(new Date(canto?.lastUpdateTime ?? 0), {
                locale: getUserLocale(authUser.language ?? Language.en),
                addSuffix: true
              })}
              {/** Bookmarks */}
              {authUserBookmarkId ? <BookmarkIcon /> : <BookmarkOutlineIcon />}
              {` ${canto?.bookmarkCount?.count}`}
              {/** More... button */}
              <IconButton
                className={classes.menuButton}
                edge="end"
                color="inherit"
                aria-label="display more actions"
                aria-controls={topBarActionsMenuId}
                aria-haspopup="true"
                onClick={(event) => setAnchorEl(event.currentTarget)}
              >
                <DotsVerticalIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          {/** Top Bar - Actions Button Menu */}

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
                authUserBookmarkId ? (
                  <MenuItem
                    key="remove-bookmark-menu-item"
                    onClick={onRemoveBookmarkClick}
                  >
                    <ListItemIcon>
                      <BookmarkOffIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={t('canto.topBarActionsMenu.buttons.unbookmark')}
                    />
                  </MenuItem>
                ) : undefined,
                authUserFlagId ? (
                  // Retract Flag
                  <MenuItem
                    key="retract-flag-menu-item"
                    onClick={onRetractFlagClick}
                  >
                    <ListItemIcon>
                      <BookmarkOffIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={t('canto.topBarActionsMenu.buttons.unflag')}
                    />
                  </MenuItem>
                ) : (
                  // Raise Flag
                  <MenuItem
                    key="raise-flag-menu-item"
                    onClick={onRaiseFlagClick}
                  >
                    <ListItemIcon>
                      <BookmarkOffIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={t('canto.topBarActionsMenu.buttons.flag')}
                    />
                  </MenuItem>
                )
              ]}
          </Menu>

          {/** Body */}
          <Box fontFamily="Monospace" className={selectApplicableClass}>
            {isVisitorAuthUser || !bodySelectionRange ? (
              <span>{canto?.body}</span>
            ) : (
              <React.Fragment>
                <span className={cantoPreBookmarkClass}>
                  {canto?.body.substring(0, bodySelectionRange.startOffset)}
                </span>
                <span className={classes.highlight}>
                  {canto?.body.substring(
                    bodySelectionRange.startOffset,
                    bodySelectionRange.endOffset
                  )}
                </span>
                <span className={cantoPostBookmarkClass}>
                  {canto?.body.substring(bodySelectionRange.endOffset)}
                </span>
              </React.Fragment>
            )}
          </Box>
        </Grid>
      )}
    </React.Fragment>
  )
}

export default Canto
