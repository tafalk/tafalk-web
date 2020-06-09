import React, { useState, useEffect, useContext } from 'react'
import {
  Link as RouterLink,
  useParams,
  useLocation,
  useRouteMatch,
  useHistory
} from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroller'
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
  Box,
  GridListTile,
  Button,
  Tab,
  AppBar,
  GridList,
  InputLabel,
  NativeSelect,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  RootRef,
  CircularProgress
} from '@material-ui/core'
import { TabContext, TabList, TabPanel } from '@material-ui/lab'
import API, { graphqlOperation } from '@aws-amplify/api'
import Storage from '@aws-amplify/storage'
import {
  GetUserProfileContent,
  UpdateUserProfilePictureKey,
  ListUserStreamsForProfile,
  ListContentBookmarksByUserForProfile,
  ListUserInteractionsByUserForProfile,
  ListCommentsByUserForProfile
} from 'graphql/custom'
import { GetColor } from '@tafalk/material-color-generator'
import { Skeleton } from '@material-ui/lab'
import { AuthUserContext } from 'context/Auth'
import { useTranslation } from 'react-i18next'
import { useDropzone } from 'react-dropzone'

import CameraIcon from 'mdi-material-ui/Camera'
import CogIcon from 'mdi-material-ui/Cog'
import UploadIcon from 'mdi-material-ui/Upload'
import StarIcon from 'mdi-material-ui/Star'
import CancelIcon from 'mdi-material-ui/Cancel'
import StarOffIcon from 'mdi-material-ui/StarOff'
import AdjustIcon from 'mdi-material-ui/Adjust'
import HomeLockIcon from 'mdi-material-ui/HomeLock'
import {
  watchUserValue,
  blockUserValue,
  bookmarkContentValue,
  avatarPictureSizeMinSize,
  avatarPictureSizeMaxSize
} from 'utils/constants'

import TafalkProfileContentTileCard from 'components/profile/ContentTileCard'
import { itemsPerFetch } from 'utils/constants'
import {
  ContentType,
  ListUserInteractionsByUserForProfileQuery,
  ListCommentsByUserForProfileQuery,
  ListContentBookmarksByUserForProfileQuery,
  ListUserStreamsForProfileQuery,
  GetUserProfileContentQuery
} from 'types/appsync/API'
import { generateProfilePictureFileName } from 'utils/derivations'
import { useSiteMessage } from 'hooks'

const avatarThemeSpacing = 28

const subPathTabValueMap = new Map([
  ['/streams', 'streams'],
  ['/canto', 'canto'],
  ['/bookmarks', 'bookmarks'],
  ['/others/fave', 'faveothers'],
  ['/others/blocked', 'blockedothers'],
  ['/comments', 'comments']
])

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      flexGrow: 1
    },
    avatar: {
      width: theme.spacing(avatarThemeSpacing),
      height: theme.spacing(avatarThemeSpacing),
      fontSize: 72
    },
    avatarOverlay: {
      position: 'relative',
      top: 'auto',
      bottom: theme.spacing(4),
      width: theme.spacing(avatarThemeSpacing),
      opacity: 0.6,
      backgroundColor: '#000',
      color: '#FFF',
      '&:hover': {
        opacity: 1,
        backgroundColor: '#000'
      }
    },
    gridList: {},
    grow: {
      flexGrow: 1
    },
    tabContext: {
      '& .MuiTabPanel-root': {
        flexGrow: 1
      }
    },
    dropzone: {
      height: theme.spacing(avatarThemeSpacing * 2),
      border: 'dashed',
      borderWidth: '2px',
      borderRadius: '5px',
      borderColor: '#757575'
    }
  })
)
// types
interface ProfileRouteParams {
  username: string
}

interface ImageFile extends File {
  objecturl: string
}
interface UserDataType
  extends Omit<
    Exclude<GetUserProfileContentQuery['getUserByUsername'], null>,
    '__typename'
  > {
  color: string
  profilePictureObjectUrl: string
}

const Profile: React.FC = () => {
  let routerHistory = useHistory()
  const theme = useTheme()
  const classes = useStyles()
  const { t } = useTranslation()
  const { user: authUser, setUser: setAuthUser } = useContext(AuthUserContext)
  const [, setSiteMessageData] = useSiteMessage()
  const routeLocation = useLocation()
  const routeParams = useParams<ProfileRouteParams>()
  const [selfProfileVisit, setSelfProfileVisit] = useState<boolean | undefined>(
    undefined
  )
  const [user, setUser] = useState<UserDataType | null>(null)
  const [infoLoaded, setInfoLoaded] = useState(false)
  const [userWatched, setUserWatched] = useState<boolean | null>(null)
  const [userBlocked, setUserBlocked] = useState<boolean | null>(null)
  const [authUserBlocked, setAuthUserBlocked] = useState<boolean | null>(null)
  const [fetchNextToken, setFetchNextToken] = useState<string | null>(null)
  const [fetchNextOffset, setFetchNextOffset] = useState(0)
  const [avatarDialogOpen, setAvatarDialogOpen] = useState(false)
  const [items, setItems] = useState<Array<any> | null>(null)
  const [bookmarkContentType, setBookmarkContentType] = useState<ContentType>(
    ContentType.stream
  )

  const [tabValue, setTabValue] = useState('streams')
  let { url } = useRouteMatch()
  const routeUsername = routeParams.username

  // Dialog
  const [uploadedFile, setUploadedFile] = useState<ImageFile | null>(null)
  const [uploadInProgress, setUploadInProgress] = useState(false)
  const [uploadEnabled, setUploadEnabled] = useState(false)
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    minSize: avatarPictureSizeMinSize,
    maxSize: avatarPictureSizeMaxSize,
    multiple: false,
    onDrop: (acceptedFiles, fileRejections) => {
      // TODO: Do something with the files
      console.log(JSON.stringify(acceptedFiles))
      const acceptedFile = acceptedFiles[0]
      setUploadedFile({
        ...acceptedFile,
        objecturl: URL.createObjectURL(acceptedFile)
      })
      setUploadEnabled(true)
    }
  })
  const { ref: avatarDialogRef, ...rootProps } = getRootProps()

  // Side effects: Load initial profile data
  useEffect(() => {
    ;(async () => {
      // Check if auth user info ready
      if (!authUser.contextMeta.isReady) return
      try {
        // Is self profile page visit?
        setSelfProfileVisit(routeUsername === authUser.username)

        // DB data
        const userGraphqlResponse = (await API.graphql(
          graphqlOperation(GetUserProfileContent, {
            username: routeUsername
          })
        )) as {
          data: GetUserProfileContentQuery
        }
        const userResult = userGraphqlResponse.data.getUserByUsername

        if (!userResult) {
          routerHistory.push('/notfound')
          return
        }

        setUserWatched(
          authUser.userWatchInteractions?.some(
            (i) => i?.targetUser?.username === routeUsername
          ) === true
        )
        setUserBlocked(
          authUser.userBlockInteractions?.some(
            (i) => i?.targetUser?.username === routeUsername
          ) === true
        )
        setAuthUserBlocked(
          userResult.userBlockInteractions?.some(
            (i) => i?.targetUserId === authUser.id
          ) === true
        )

        const profilePictureObjectUrl = userResult.profilePictureKey
          ? ((await Storage.get(userResult.profilePictureKey, {
              level: 'protected',
              identityId: userResult.cognitoIdentityId
            })) as string)
          : ''

        setUser({
          ...userResult,
          color: GetColor(userResult.username, 'dark'),
          profilePictureObjectUrl: profilePictureObjectUrl
        })
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
  }, [
    authUser.contextMeta.isReady,
    authUser.id,
    authUser.userBlockInteractions,
    authUser.userWatchInteractions,
    authUser.username,
    routeUsername,
    routerHistory,
    setSiteMessageData
  ])

  // Side effects: Load initial contents
  useEffect(() => {
    ;(async () => {
      try {
        // load first chunk of relevant content
        const pathname = routeLocation.pathname
        const subPath = pathname.replace(url, '').replace(/\/$/, '')
        const matchingTabValue = subPathTabValueMap.get(subPath) ?? 'streams'
        setTabValue(matchingTabValue)
        switch (matchingTabValue) {
          case 'streams':
            // Initial stream items
            // TODO: Categorize by 'live' and 'sealed'
            setFetchNextToken(user?.streams?.nextToken ?? null)
            setItems(user?.streams?.items ?? [])
            return
          case 'canto':
            setFetchNextToken(null)
            setItems([user?.canto])
            return
          case 'bookmarks':
            if (bookmarkContentType === 'stream') {
              setFetchNextOffset(0)
              setItems(user?.bookmarkedStreams ?? [])
            } else if (bookmarkContentType === 'canto') {
              setFetchNextOffset(0)
              setItems(user?.bookmarkedCantos ?? [])
            } else {
              return
            }
            return
          case 'faveothers':
            setFetchNextOffset(0)
            setItems(user?.userWatchInteractions ?? [])
            return
          case 'blockedothers':
            setFetchNextOffset(0)
            setItems(user?.userBlockInteractions ?? [])
            return
          case 'comments':
            setFetchNextOffset(0)
            setItems(user?.committedStreamComments ?? [])
            return
          default:
            // Initial stream items
            // TODO: Categorize by 'live' and 'sealed'
            setFetchNextToken(user?.streams?.nextToken ?? null)
            setItems(user?.streams?.items ?? [])
            return
        }
      } catch (err) {
        console.log(err.message ?? err)
        setSiteMessageData({
          show: true,
          type: 'error',
          timeout: null,
          text: err.message ?? err
        })
      }
    })()
  }, [
    bookmarkContentType,
    routeLocation.pathname,
    setSiteMessageData,
    url,
    user
  ])

  // Side effects: Clean up the data URI to avoid memory leaks
  useEffect(() => {
    return uploadedFile
      ? () => URL.revokeObjectURL(uploadedFile.objecturl ?? '')
      : undefined
  }, [uploadedFile])

  // Functions
  const loadMoreItems = async () => {
    switch (tabValue) {
      case 'streams':
        // TODO: Categorize by 'live' and 'sealed'
        const sealedStreamsGraphqlResponse = (await API.graphql(
          graphqlOperation(ListUserStreamsForProfile, {
            limit: itemsPerFetch,
            nextToken: fetchNextToken
          })
        )) as {
          data: ListUserStreamsForProfileQuery
        }
        const sealedStreamsResult =
          sealedStreamsGraphqlResponse.data.listStreamsByUser
        setFetchNextToken(sealedStreamsResult?.nextToken ?? null)
        setItems([...(items ?? []), ...(sealedStreamsResult?.items ?? [])])
        return
      case 'canto':
        return // No list for canto
      case 'bookmarks':
        let contentType = ''
        if (bookmarkContentType === 'stream') {
          contentType = 'stream'
        } else if (bookmarkContentType === 'canto') {
          contentType = 'canto'
        } else {
          return
        }
        const contentBookmarksByUserGraphqlResponse = (await API.graphql(
          graphqlOperation(ListContentBookmarksByUserForProfile, {
            userId: user?.id,
            contentType: contentType,
            limit: itemsPerFetch,
            offset: fetchNextOffset
          })
        )) as {
          data: ListContentBookmarksByUserForProfileQuery
        }
        const contents =
          contentBookmarksByUserGraphqlResponse.data.listContentBookmarksByUser
        setFetchNextOffset(fetchNextOffset + itemsPerFetch)
        setItems([...(items ?? []), ...(contents ?? [])])
        return
      case 'faveothers':
        const userWatchesByUserGraphqlResponse = (await API.graphql(
          graphqlOperation(ListUserInteractionsByUserForProfile, {
            actorUserId: user?.id,
            type: watchUserValue,
            limit: itemsPerFetch,
            offset: fetchNextOffset
          })
        )) as {
          data: ListUserInteractionsByUserForProfileQuery
        }
        const watches =
          userWatchesByUserGraphqlResponse.data
            .listUserInteractionsByActorUserId
        setFetchNextOffset(fetchNextOffset + itemsPerFetch)
        setItems([...(items ?? []), ...(watches ?? [])])
        return
      case 'blockedothers':
        const userBlocksByUserGraphqlResponse = (await API.graphql(
          graphqlOperation(ListUserInteractionsByUserForProfile, {
            actorUserId: user?.id,
            type: blockUserValue,
            limit: itemsPerFetch,
            offset: fetchNextOffset
          })
        )) as {
          data: ListUserInteractionsByUserForProfileQuery
        }
        const blocks =
          userBlocksByUserGraphqlResponse.data.listUserInteractionsByActorUserId
        setFetchNextOffset(fetchNextOffset + itemsPerFetch)
        setItems([...(items ?? []), ...(blocks ?? [])])
        return
      case 'comments':
        const committedCommentsByUserGraphqlResponse = (await API.graphql(
          graphqlOperation(ListCommentsByUserForProfile, {
            userId: user?.id,
            contentType: 'stream',
            limit: itemsPerFetch,
            offset: fetchNextOffset
          })
        )) as {
          data: ListCommentsByUserForProfileQuery
        }
        const committedComments =
          committedCommentsByUserGraphqlResponse.data.listContentCommentsByUser
        setFetchNextOffset(fetchNextOffset + itemsPerFetch)
        setItems([...(items ?? []), ...(committedComments ?? [])])
        return
      default:
        return
    }
  }

  // Functions
  const onConfirmAvatar = async (): Promise<void> => {
    if (!uploadedFile) return
    try {
      setUploadInProgress(true)
      // TODO: Compress image on the fly
      const profilePictureKey = generateProfilePictureFileName(
        uploadedFile,
        authUser.id
      )
      await Promise.all([
        // Upload to S3 storage
        Storage.put(profilePictureKey, uploadedFile, {
          level: 'protected',
          contentType: uploadedFile?.type
        }),
        // Update User DB Table
        API.graphql(
          graphqlOperation(UpdateUserProfilePictureKey, {
            userId: authUser.id,
            profilePictureKey
          })
        )
      ])

      // Set the avatar picture of profile and auth user contextuntil it is reloaded some time
      if (user) {
        user.profilePictureObjectUrl = uploadedFile.objecturl
        setAuthUser({
          ...user,
          profilePictureObjectUrl: uploadedFile.objecturl
        })
      }

      setAvatarDialogOpen(false)
    } catch (err) {
      setSiteMessageData({
        show: true,
        type: 'error',
        timeout: null,
        text: err.message ?? err
      })
    } finally {
      setUploadInProgress(false)
    }
  }

  // DOM
  const streamsTabPanelContext = tabValue === 'streams' && (
    <GridList cellHeight="auto" cols={1} className={classes.gridList}>
      {items?.map((s) => (
        <GridListTile key={s?.id} cols={1}>
          <TafalkProfileContentTileCard
            type="stream"
            item={s}
            showUserInfo={false}
          ></TafalkProfileContentTileCard>
        </GridListTile>
      ))}
    </GridList>
  )

  const cantoTabPanelContext = tabValue === 'canto' && (
    <GridList cellHeight="auto" cols={1} className={classes.gridList}>
      {items?.map((c) => (
        <GridListTile key={c?.id} cols={1}>
          <TafalkProfileContentTileCard
            type="canto"
            item={c}
            showUserInfo={false}
          ></TafalkProfileContentTileCard>
        </GridListTile>
      ))}
    </GridList>
  )

  const bookmarksTabPanelContext = tabValue === 'bookmarks' && (
    <React.Fragment>
      <Grid
        container
        justify="flex-end"
        alignItems="center"
        className={classes.grow}
      >
        <InputLabel htmlFor="bookmark-content-type-select">
          {t('profile.tabs.bookmarks.contentTypeSelect.label')}
        </InputLabel>
        &nbsp;
        <NativeSelect
          value={bookmarkContentType}
          onChange={(e) =>
            setBookmarkContentType(
              ContentType[e.target.value === 'stream' ? 'stream' : 'canto']
            )
          }
          inputProps={{
            name: 'bookmarkContentType',
            id: 'bookmark-content-type-select'
          }}
        >
          <option value={ContentType.stream}>
            {t('profile.tabs.bookmarks.contentTypeSelect.options.stream')}
          </option>
          <option value={ContentType.canto}>
            {t('profile.tabs.bookmarks.contentTypeSelect.options.canto')}
          </option>
        </NativeSelect>
      </Grid>
      <GridList cellHeight="auto" cols={1} className={classes.gridList}>
        {items?.map((x) => (
          <GridListTile key={x?.id} cols={1}>
            <TafalkProfileContentTileCard
              type={bookmarkContentType}
              contentInteractionType={bookmarkContentValue}
              item={x}
              showUserInfo={true}
            ></TafalkProfileContentTileCard>
          </GridListTile>
        ))}
      </GridList>
    </React.Fragment>
  )

  const faveOthersTabPanelContext = tabValue === 'faveothers' && (
    <GridList cellHeight="auto" cols={1} className={classes.gridList}>
      {items?.map((u) => (
        <GridListTile key={u?.id} cols={1}>
          <TafalkProfileContentTileCard
            type="user"
            userInteractionType={watchUserValue}
            item={u}
            showUserInfo={true}
          ></TafalkProfileContentTileCard>
        </GridListTile>
      ))}
    </GridList>
  )

  const blockedOthersTabPanelContext = tabValue === 'blockedothers' && (
    <GridList cellHeight="auto" cols={1} className={classes.gridList}>
      {items?.map((u) => (
        <GridListTile key={u?.id} cols={1}>
          <TafalkProfileContentTileCard
            type="user"
            userInteractionType={blockUserValue}
            item={u}
            showUserInfo={true}
          ></TafalkProfileContentTileCard>
        </GridListTile>
      ))}
    </GridList>
  )

  const commentsTabPanelContext = tabValue === 'comments' && (
    <GridList cellHeight="auto" cols={1} className={classes.gridList}>
      {items?.map((c) => (
        <GridListTile key={c?.id} cols={1}>
          <TafalkProfileContentTileCard
            type="comment"
            item={c}
            showUserInfo={false}
          ></TafalkProfileContentTileCard>
        </GridListTile>
      ))}
    </GridList>
  )

  return (
    <React.Fragment>
      {/** HTML Document Header */}
      <Helmet>
        <title>{user?.username ? `@${user.username}` : ''}</title>
      </Helmet>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMoreItems}
        hasMore={!!fetchNextToken}
        loader={<Skeleton variant="rect" width="100%" height={100} />}
      >
        {/** Content */}
        <Grid container>
          {/* Avatar Section */}
          <Grid item xs={12} md={3}>
            <Grid container justify="flex-start" direction="column" spacing={2}>
              {/* Avatar itself */}
              {!infoLoaded ? (
                <Grid item xs={12}>
                  <Skeleton
                    variant="rect"
                    width={theme.spacing(avatarThemeSpacing)}
                    height={theme.spacing(avatarThemeSpacing)}
                  ></Skeleton>
                  <Skeleton height={theme.spacing(6)}></Skeleton>
                  <Skeleton height={theme.spacing(6)}></Skeleton>
                  <Skeleton height={theme.spacing(6)}></Skeleton>
                </Grid>
              ) : (
                <React.Fragment>
                  {/* Avatar itself */}
                  <Grid item xs={12}>
                    <Avatar
                      src={user?.profilePictureObjectUrl}
                      variant="square"
                      className={classes.avatar}
                      style={{ color: '#fff', backgroundColor: user?.color }}
                    ></Avatar>
                    {/* Overlay text for changing avatar (if own page) */}
                    {selfProfileVisit === true && (
                      <Button
                        size="small"
                        className={classes.avatarOverlay}
                        disableElevation
                        startIcon={<CameraIcon />}
                        onClick={() => setAvatarDialogOpen(true)}
                      >
                        {t('profile.buttons.changeProfilePictureOverlay')}
                      </Button>
                    )}
                  </Grid>

                  {/* Username */}
                  <Box color="text.primary" fontSize="h5.fontSize" mb={2}>
                    @{user?.username}
                  </Box>

                  {/* Bio */}
                  <Box color="text.secondary" fontSize="h6.fontSize" mb={2}>
                    {t('profile.labels.bio')}: {user?.bio}
                  </Box>

                  {/* Self Profile Visit buttons */}
                  {selfProfileVisit === true && (
                    <Button
                      color="primary"
                      variant="contained"
                      disableElevation
                      startIcon={<CogIcon />}
                      component={RouterLink}
                      to="/settings"
                    >
                      {t('profile.buttons.settings')}
                    </Button>
                  )}

                  {/* Other Profile Visit buttons */}
                  {selfProfileVisit === false && (
                    <React.Fragment>
                      {userWatched ? (
                        <Button
                          color="primary"
                          variant="outlined"
                          disableElevation
                          startIcon={<StarOffIcon />}
                        >
                          {t('profile.buttons.unwatch')}
                        </Button>
                      ) : (
                        <Button
                          color="primary"
                          variant="contained"
                          disableElevation
                          startIcon={<StarIcon />}
                        >
                          {t('profile.buttons.watch')}
                        </Button>
                      )}

                      {userBlocked ? (
                        <Button
                          color="primary"
                          variant="contained"
                          disableElevation
                          startIcon={<AdjustIcon />}
                        >
                          {t('profile.buttons.unblock')}
                        </Button>
                      ) : (
                        <Button
                          color="primary"
                          variant="outlined"
                          disableElevation
                          startIcon={<CancelIcon />}
                        >
                          {t('profile.buttons.block')}
                        </Button>
                      )}
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
            </Grid>
          </Grid>
          {/* User Content Section */}
          <Grid item xs={12} md={9}>
            {authUserBlocked ? (
              <React.Fragment>
                <Box
                  color="text.secondary"
                  fontSize="h5.fontSize"
                  textAlign="center"
                >
                  <HomeLockIcon />
                  <p>{t('profile.buttons.block')}</p>
                </Box>
              </React.Fragment>
            ) : (
              <Grid container justify="center" className={classes.tabContext}>
                {/* Tab headers */}
                {selfProfileVisit !== undefined && (
                  <TabContext value={tabValue}>
                    <AppBar
                      position="static"
                      className={classes.appBar}
                      color="transparent"
                      elevation={0}
                    >
                      <TabList
                        onChange={(_event, newVal) => {
                          setTabValue(newVal)
                        }}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="profile page content type tabs"
                      >
                        <Tab
                          value="streams"
                          component={RouterLink}
                          to={`${url}/streams`}
                          label={t('profile.tabs.streams.title')}
                        />
                        <Tab
                          value="canto"
                          component={RouterLink}
                          to={`${url}/canto`}
                          label={t('profile.tabs.canto.title')}
                        />
                        {selfProfileVisit
                          ? [
                              <Tab
                                value="bookmarks"
                                component={RouterLink}
                                to={`${url}/bookmarks`}
                                label={t('profile.tabs.bookmarks.title')}
                                key="tab-bookmarks"
                              />,
                              <Tab
                                value="faveothers"
                                component={RouterLink}
                                to={`${url}/others/fave`}
                                label={t('profile.tabs.faveOthers.title')}
                                key="tab-faveothers"
                              />,
                              <Tab
                                value="blockedothers"
                                component={RouterLink}
                                to={`${url}/others/blocked`}
                                label={t('profile.tabs.blockedOthers.title')}
                                key="tab-blockedothers"
                              />,
                              <Tab
                                value="comments"
                                component={RouterLink}
                                to={`${url}/comments`}
                                label={t('profile.tabs.comments.title')}
                                key="tab-comments"
                              />
                            ]
                          : []}
                      </TabList>
                    </AppBar>
                    {/* Tab Contents */}
                    <TabPanel value="streams">
                      {streamsTabPanelContext}
                    </TabPanel>
                    <TabPanel value="canto">{cantoTabPanelContext}</TabPanel>
                    <TabPanel value="bookmarks">
                      {bookmarksTabPanelContext}
                    </TabPanel>
                    <TabPanel value="faveothers">
                      {faveOthersTabPanelContext}
                    </TabPanel>
                    <TabPanel value="blockedothers">
                      {blockedOthersTabPanelContext}
                    </TabPanel>
                    <TabPanel value="comments">
                      {commentsTabPanelContext}
                    </TabPanel>
                  </TabContext>
                )}
              </Grid>
            )}
          </Grid>
        </Grid>
      </InfiniteScroll>

      {/* Avatar Upload Dialog */}
      <Dialog
        fullWidth
        maxWidth="md"
        open={avatarDialogOpen}
        onClose={() => setAvatarDialogOpen(false)}
        aria-labelledby="avatar-dialog-title"
        aria-describedby="avatar-dialog-body"
      >
        <DialogTitle id="avatar-dialog-title">
          {t('profile.dialogs.avatar.title')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="avatar-dialog-body">
            {t('profile.dialogs.avatar.body')}
          </DialogContentText>
          <RootRef rootRef={avatarDialogRef}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={1}
              bgcolor="grey.300"
              {...rootProps}
              className={classes.dropzone}
            >
              <Grid container direction="column" alignItems="center">
                <Avatar
                  src={
                    uploadedFile
                      ? uploadedFile.objecturl
                      : user?.profilePictureObjectUrl
                  }
                  variant="square"
                  className={classes.avatar}
                  style={{ color: '#fff', backgroundColor: user?.color }}
                ></Avatar>
                <p>{t('profile.dialogs.avatar.dropzone')}</p>
              </Grid>
              <input {...getInputProps()} />
            </Box>
          </RootRef>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAvatarDialogOpen(false)} color="default">
            {t('common.cancel')}
          </Button>
          <Button
            onClick={onConfirmAvatar}
            variant="contained"
            color="primary"
            autoFocus
            disabled={!uploadEnabled || uploadInProgress}
            startIcon={<UploadIcon />}
          >
            {!uploadInProgress ? (
              t('common.upload')
            ) : (
              <CircularProgress size={14} />
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default Profile
