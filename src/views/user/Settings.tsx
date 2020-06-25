import React, { useState, useEffect, useContext } from 'react'
import {
  Link as RouterLink,
  useHistory,
  useRouteMatch,
  useLocation
} from 'react-router-dom'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import {
  Box,
  Typography,
  Grid,
  AppBar,
  Tab,
  TextField,
  GridList,
  GridListTile,
  Card,
  CardHeader,
  Button
} from '@material-ui/core'
import { useTranslation, Trans } from 'react-i18next'
import { Helmet } from 'react-helmet'
import { AuthUserContext } from 'context/Auth'
import { useSiteMessage } from 'hooks'
import { TabContext, TabList, TabPanel } from '@material-ui/lab'
import API, { graphqlOperation } from '@aws-amplify/api'
import { UpdateUserBio } from 'graphql/custom'
import DeleteForeverIcon from 'mdi-material-ui/DeleteForever'
import TafalkChangeEmailDialog from 'components/user/settings/TheChangeEmailDialog'
import TafalkChangePasswordDialog from 'components/user/settings/TheChangePasswordDialog'
import TafalkDeleteAccountConfirmationDialog from 'components/user/settings/TheDeleteAccountConfirmationDialog'

const subPathTabValueMap = new Map([
  ['/profile', 'profile'],
  ['/account', 'account'],
  ['/privacy', 'privacy'],
  ['/notifications', 'notifications'],
  ['/messaging', 'messaging']
])

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    appBar: {
      flexGrow: 1
    },
    tabContext: {
      '& .MuiTabPanel-root': {
        flexGrow: 1
      }
    },
    gridList: {},
    gridListCard: {
      height: '100%'
    },
    gridListCardDanger: {
      borderColor: theme.palette.secondary.main,
      height: '100%'
    },
    form: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '100%',
        justify: 'center'
      }
    }
  })
)

const Settings: React.FC = () => {
  const { t } = useTranslation()
  const classes = useStyles()
  let routerHistory = useHistory()
  const { user: authUser } = useContext(AuthUserContext)
  const [, setSiteMessageData] = useSiteMessage()
  const routeLocation = useLocation()
  let { url } = useRouteMatch()

  const [tabValue, setTabValue] = useState('profile')

  const [instantBio, setInstantBio] = useState('')
  const [lastSavedBio, setLastSavedBio] = useState('')

  const [changeEmailDialogOpen, setChangeEmailDialogOpen] = useState(false)
  const [changePasswordDialogOpen, setChangePasswordDialogOpen] = useState(
    false
  )
  const [deleteAccountDialogOpen, setDeleteAccountDialogOpen] = useState(false)

  // Side effects: Load initial profile data
  useEffect(() => {
    ;(async () => {
      // Check if auth user info ready
      if (!authUser.contextMeta.isReady) return
      try {
        // Redirect to login if not logged in
        if (!authUser.username) {
          routerHistory.push('/auth/login')
          return
        }
        const pathname = routeLocation.pathname
        const subPath = pathname.replace(url, '').replace(/\/$/, '')
        const matchingTabValue = subPathTabValueMap.get(subPath) ?? 'profile'
        setTabValue(matchingTabValue)
        setInstantBio(authUser.bio ?? '')
        setLastSavedBio(authUser.bio ?? '')
      } catch (err) {
        setSiteMessageData({
          show: true,
          type: 'error',
          timeout: null,
          text: err.message ?? err
        })
      }
    })()
  }, [
    authUser.bio,
    authUser.contextMeta.isReady,
    authUser.username,
    routeLocation.pathname,
    routerHistory,
    setSiteMessageData,
    url
  ])

  // Functions
  const onBioBlur = async () => {
    if ((!instantBio && !lastSavedBio) || instantBio === lastSavedBio) return
    try {
      await API.graphql(
        graphqlOperation(UpdateUserBio, {
          userId: authUser.id,
          bio: instantBio
        })
      )
      setLastSavedBio(instantBio)

      // Success message
      setSiteMessageData({
        show: true,
        type: 'success',
        timeout: 3000,
        text: t('settings.tabs.profile.message.bioUpdated')
      })
    } catch (err) {
      setSiteMessageData({
        show: true,
        type: 'error',
        timeout: null,
        text: err.message ?? err
      })
    }
  }

  // DOM
  const profileTabPanelContext = tabValue === 'profile' && (
    <React.Fragment>
      {/** Title */}
      <Box mb={2} pl={1}>
        <Typography variant="h5" color="textSecondary">
          {t('settings.tabs.profile.title')}
        </Typography>
      </Box>
      {/** Content */}
      <TextField
        label={t('settings.tabs.profile.labels.bio')}
        onChange={(event) => {
          setInstantBio(event.target.value)
        }}
        value={instantBio}
        placeholder={t('settings.tabs.profile.placeholders.bio')}
        fullWidth
        multiline
        rows={2}
        variant="outlined"
        onBlur={onBioBlur}
      />
    </React.Fragment>
  )
  const accountTabPanelContext = tabValue === 'account' && (
    <React.Fragment>
      {/** Basic */}
      <Box mb={2} pl={1}>
        <Typography variant="h5" color="textSecondary">
          {t('settings.tabs.account.basicInfo.title')}
        </Typography>
      </Box>
      <GridList cellHeight="auto" cols={1} className={classes.gridList}>
        <GridListTile cols={1}>
          {/** Change Email */}
          <Card className={classes.gridListCard}>
            <CardHeader
              title={t('settings.tabs.account.basicInfo.changeEmail.title')}
              subheader={
                <Trans i18nKey="settings.tabs.account.basicInfo.changeEmail.subheader">
                  Current: {{ authUserEmail: authUser.email }}
                </Trans>
              }
              action={
                <Button
                  size="small"
                  color="primary"
                  variant="outlined"
                  disableElevation
                  onClick={() => setChangeEmailDialogOpen(false)}
                >
                  {t('common.change')}
                </Button>
              }
            ></CardHeader>
          </Card>
          {/** Change Password */}
          <Card className={classes.gridListCard}>
            <CardHeader
              title={t('settings.tabs.account.basicInfo.changePassword.title')}
              action={
                <Button
                  size="small"
                  color="primary"
                  variant="outlined"
                  disableElevation
                  onClick={() => setChangePasswordDialogOpen(false)}
                >
                  {t('common.change')}
                </Button>
              }
            ></CardHeader>
          </Card>
        </GridListTile>
      </GridList>
      {/** Departure */}
      <Box mb={2} pl={1}>
        <Typography variant="h5" color="textSecondary">
          {t('settings.tabs.account.departure.title')}
        </Typography>
        {/** Delete Account */}
        <Card className={classes.gridListCardDanger} variant="outlined">
          <CardHeader
            title={t('settings.tabs.account.departure.deleteAccount.title')}
            action={
              <Button
                startIcon={<DeleteForeverIcon />}
                size="small"
                color="secondary"
                variant="outlined"
                disableElevation
                onClick={() => setDeleteAccountDialogOpen(true)}
              >
                {t('common.delete')}
              </Button>
            }
          ></CardHeader>
        </Card>
      </Box>
    </React.Fragment>
  )

  const privacyTabPanelContext = tabValue === 'privacy' && (
    <React.Fragment>
      {/** Title */}
      <Box mb={2} pl={1}>
        <Typography variant="h5" color="textSecondary">
          {t('settings.tabs.privacy.title')}
        </Typography>
      </Box>
    </React.Fragment>
  )
  const notificationsTabPanelContext = tabValue === 'notifications' && (
    <React.Fragment>
      {/** Title */}
      <Box mb={2} pl={1}>
        <Typography variant="h5" color="textSecondary">
          {t('settings.tabs.notifications.title')}
        </Typography>
      </Box>
    </React.Fragment>
  )
  const messagingTabPanelContext = tabValue === 'messaging' && (
    <React.Fragment>
      {/** Title */}
      <Box mb={2} pl={1}>
        <Typography variant="h5" color="textSecondary">
          {t('settings.tabs.messaging.title')}
        </Typography>
      </Box>
    </React.Fragment>
  )

  return (
    <React.Fragment>
      {/** HTML Document Header */}
      <Helmet>
        <title>
          <span role="img" aria-label="settings">
            ⚙️
          </span>{' '}
          {t('settings.text.title')} - {authUser?.username}
        </title>
      </Helmet>
      {/** Title */}
      <Box mb={2} pl={1}>
        <Typography variant="h4" color="textSecondary">
          {t('settings.text.title')}
        </Typography>
      </Box>
      {/** Content */}
      <Grid container justify="center" className={classes.tabContext}>
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
              aria-label="settings page tabs"
            >
              <Tab
                value="profile"
                component={RouterLink}
                to={`${url}/profile`}
                label={t('settings.tabs.profile.title')}
              />
            </TabList>
          </AppBar>
          {/* Tab Contents */}
          <TabPanel value="profile">{profileTabPanelContext}</TabPanel>
          <TabPanel value="account">
            <React.Fragment>
              {accountTabPanelContext}
              {/** Dialogs */}
              <TafalkChangeEmailDialog
                open={changeEmailDialogOpen}
                onClose={() => setChangeEmailDialogOpen(false)}
              ></TafalkChangeEmailDialog>
              <TafalkChangePasswordDialog
                open={changePasswordDialogOpen}
                onClose={() => setChangePasswordDialogOpen(false)}
              ></TafalkChangePasswordDialog>
              <TafalkDeleteAccountConfirmationDialog
                open={deleteAccountDialogOpen}
                onClose={() => setDeleteAccountDialogOpen(false)}
              ></TafalkDeleteAccountConfirmationDialog>
            </React.Fragment>
          </TabPanel>
          <TabPanel value="privacy">{privacyTabPanelContext}</TabPanel>
          <TabPanel value="privacy">{notificationsTabPanelContext}</TabPanel>
          <TabPanel value="privacy">{messagingTabPanelContext}</TabPanel>
        </TabContext>
      </Grid>
    </React.Fragment>
  )
}

export default Settings
