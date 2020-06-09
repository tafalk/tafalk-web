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
  ListItemText
} from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import {
  GetCantoQuery,
  GetContentBookmarkByUserQuery,
  GetFlagByUserQuery
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

const selectApplicableClass = 'select-applicable'
const cantoPreBookmarkClass = 'canto-pre-bm-hl'
const cantoBookmarkId = 'canto-bookmark-1'
const cantoBookmarkClass = 'canto-bm-hl'
const cantoPostBookmarkClass = 'canto-post-bm-hl'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    topBar: {
      flexGrow: 1
    },
    avatar: {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main
    },
    authorUserName: {},
    menuButton: {
      marginLeft: theme.spacing(0)
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
  const { user: authUser, setUser: setAuthUser } = useContext(AuthUserContext)
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

  let isVisitorAuthUser
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
            userId: authUser.id
          })
        ) as PromiseLike<{ data: GetFlagByUserQuery }>

        // const cantoGraphqlResponse = (await cantoGraphqlQuery) as {
        //   data: GetCantoQuery
        // }

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
    const onSelectionChange = (_event: Event) => {
      // Get selection Range
      const range = document.getSelection()?.getRangeAt(0)
      if (!range || range.collapsed) {
        // if a single click (not a tafalkish selection indeed)
        setBodySelectionRange(null)
        return
      }
      const { startContainer, endContainer, startOffset, endOffset } = range

      if (
        startContainer !== endContainer &&
        (range.commonAncestorContainer as HTMLElement).classList.contains(
          selectApplicableClass
        )
      ) {
        //TODO: Add this class 'selectApplicableClass' to text box (i.e. Canto.vue line:118)
        // start and end are not in the body
        setBodySelectionRange(null)
        return
      }

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
    window.addEventListener('selectionchange', onSelectionChange)
    // Cleanup
    return () =>
      window.removeEventListener('selectionchange', onSelectionChange)
  }, [])

  // Functions
  const onRemoveBookmarkClick = () => {
    //TODO: Implement
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
            className={classes.topBar}
            color="transparent"
            elevation={0}
          >
            <Toolbar>
              <Avatar
                alt={canto?.user?.username}
                className={classes.avatar}
                src={authorProfilePictureObjectUrl}
              ></Avatar>
              <Typography variant="h6" className={classes.authorUserName}>
                {canto?.user?.username}
              </Typography>
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
            {authUser.contextMeta.isReady && authUser.id && (
              <React.Fragment>{/** Auth Users */}</React.Fragment>
            )}
            {/** TODO: Show if the auth user has already bookmarked this */}
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
          </Menu>
        </Grid>
      )}
    </React.Fragment>
  )
}

export default Canto
