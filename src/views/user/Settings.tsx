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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress
} from '@material-ui/core'
import { useTranslation, Trans } from 'react-i18next'
import { Helmet } from 'react-helmet'
import { AuthUserContext } from 'context/Auth'
import { useSiteMessage } from 'hooks'
import { TabContext, TabList, TabPanel } from '@material-ui/lab'
import API, { graphqlOperation } from '@aws-amplify/api'
import { UpdateUserBio, DeleteUser } from 'graphql/custom'
import DeleteForeverIcon from 'mdi-material-ui/DeleteForever'
import Auth from '@aws-amplify/auth'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import {
  passwordMinLength,
  passwordMaxLength,
  passwordRegex
} from 'utils/constants'
import FormikTextField from 'components/common/wrappers/TheHelpedFormikTextField'

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
  const redirectMilliseconds = 500
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
  const [newEmail, setNewEmail] = useState('')
  // const [newPassword, setNewPassword] = useState('')
  // const [oldPassword, setOldPassword] = useState('')

  const [changeEmailDialogOpen, setChangeEmailDialogOpen] = useState(false)
  const [changePasswordDialogOpen, setChangePasswordDialogOpen] = useState(
    false
  )
  const [deleteAccountDialogOpen, setDeleteAccountDialogOpen] = useState(false)

  const [emailChangeInProgress, setEmailChangeInProgress] = useState(false)
  const [deleteAccountInProgress, setDeleteAccountInProgress] = useState(false)

  const newPasswordFormValidationSchema = () =>
    Yup.object().shape({
      oldPassword: Yup.string().required(t('common.validation.required')),
      newPassword: Yup.string()
        .min(passwordMinLength, t('common.validation.tooShort'))
        .max(passwordMaxLength, t('common.validation.tooLong'))
        .matches(
          passwordRegex,
          t(
            'settings.tabs.account.basicInfo.changePassword.dialog.validation.weakPassword'
          )
        )
        .required(t('common.validation.required')),
      retypeNewPassword: Yup.string()
        .oneOf(
          [Yup.ref('password'), null],
          'settings.tabs.account.basicInfo.changePassword.dialog.validation.passwordsNotMatch'
        )
        .required(t('common.validation.required'))
    })

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

  const onClickChangeEmail = async () => {
    if (!newEmail || !/\S+@\S+\.\S+/.test(newEmail)) {
      setSiteMessageData({
        show: true,
        type: 'error',
        timeout: null,
        text: t('common.validation.invalidEntry')
      })
      return
    }
    try {
      setEmailChangeInProgress(true)
      await Auth.updateUserAttributes(await Auth.currentAuthenticatedUser(), {
        email: newEmail
      })
      setSiteMessageData({
        show: true,
        text: t(
          'settings.tabs.account.basicInfo.changeEmail.dialog.message.success'
        ),
        type: 'success',
        timeout: redirectMilliseconds
      })
      setTimeout(() => {
        routerHistory.push({
          pathname: '/auth/confirmRegistration',
          search: `?${new URLSearchParams({ u: authUser.username })}`
        })
      }, redirectMilliseconds)
    } catch (err) {
      setSiteMessageData({
        show: true,
        type: 'error',
        timeout: null,
        text: err.message ?? err
      })
    } finally {
      setEmailChangeInProgress(false)
    }
  }

  const onClickChangePassword = async (values: any, { setSubmitting }: any) => {
    try {
      setSubmitting(true)
      await Auth.changePassword(
        await Auth.currentAuthenticatedUser(),
        values.oldPassword,
        values.newPassword
      )
      await Auth.signOut()
      setSiteMessageData({
        show: true,
        text: t(
          'settings.tabs.account.basicInfo.changePassword.dialog.message.success'
        ),
        type: 'success',
        timeout: redirectMilliseconds
      })
      setTimeout(() => {
        routerHistory.push('/auth/login')
      }, redirectMilliseconds)
    } catch (err) {
      setSiteMessageData({
        show: true,
        type: 'error',
        timeout: null,
        text: err.message ?? err
      })
    } finally {
      setSubmitting(false)
    }
  }

  const onClickDeleteAccount = async () => {
    try {
      setDeleteAccountInProgress(true)
      let currAuthUser = await Auth.currentAuthenticatedUser()

      await new Promise((res, rej) =>
        currAuthUser.deleteUser((err: any) => {
          if (err) {
            setSiteMessageData({
              show: true,
              type: 'error',
              timeout: null,
              text: err.message ?? err
            })
            return
          }
        })
      )
      await API.graphql(
        graphqlOperation(DeleteUser, {
          userId: authUser.id
        })
      )
      await Auth.signOut()
      routerHistory.push('/auth/farewell')
    } catch (err) {
      setSiteMessageData({
        show: true,
        type: 'error',
        timeout: null,
        text: err.message ?? err
      })
    } finally {
      setDeleteAccountInProgress(false)
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
                onClick={() => setDeleteAccountDialogOpen(false)}
              >
                {t('common.delete')}
              </Button>
            }
          ></CardHeader>
        </Card>
      </Box>
    </React.Fragment>
  )

  const newEmailDialog = (
    <Dialog
      fullWidth
      maxWidth="md"
      open={changeEmailDialogOpen}
      onClose={() => setChangeEmailDialogOpen(false)}
      aria-labelledby="change-email-dialog-title"
      aria-describedby="change-email-dialog-body"
    >
      <DialogTitle id="change-email-dialog-title">
        {t('settings.tabs.account.basicInfo.changeEmail.dialog.title')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="change-email-dialog-body">
          {t('settings.tabs.account.basicInfo.changeEmail.dialog.body')}
        </DialogContentText>
        {/** New Email Text Field */}
        <TextField
          type="email"
          label={t(
            'settings.tabs.account.basicInfo.changeEmail.dialog.labels.newEmail'
          )}
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setChangeEmailDialogOpen(false)} color="default">
          {t('common.cancel')}
        </Button>
        <Button
          onClick={onClickChangeEmail}
          variant="contained"
          color="primary"
          autoFocus
          disabled={emailChangeInProgress}
        >
          {!emailChangeInProgress ? (
            t('common.submit')
          ) : (
            <CircularProgress size={14} />
          )}
        </Button>
      </DialogActions>
    </Dialog>
  )

  const newPasswordDialog = () => (
    <Formik
      initialValues={{
        oldPassword: '',
        newPassword: '',
        retypeNewPassword: ''
      }}
      validationSchema={newPasswordFormValidationSchema}
      onSubmit={onClickChangePassword}
    >
      {({ submitForm, isSubmitting }) => (
        <Dialog
          fullWidth
          maxWidth="md"
          open={changePasswordDialogOpen}
          onClose={() => setChangePasswordDialogOpen(false)}
          aria-labelledby="change-password-dialog-title"
          aria-describedby="change-password-dialog-body"
        >
          <DialogTitle id="change-password-dialog-title">
            {t('settings.tabs.account.basicInfo.changePassword.dialog.title')}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="change-password-dialog-body">
              {t('settings.tabs.account.basicInfo.changePassword.dialog.body')}
            </DialogContentText>
            <Form className={classes.form}>
              <Field
                component={FormikTextField}
                type="password"
                name="oldPassword"
                label={t(
                  'settings.tabs.account.basicInfo.changePassword.dialog.labels.oldPassword'
                )}
              />
              <Field
                component={FormikTextField}
                type="password"
                name="newPassword"
                label={t(
                  'settings.tabs.account.basicInfo.changePassword.dialog.labels.newPassword'
                )}
              />
              <Field
                component={FormikTextField}
                type="password"
                name="retypeNewPassword"
                label={t(
                  'settings.tabs.account.basicInfo.changePassword.dialog.labels.retypeNewPassword'
                )}
              />
            </Form>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setChangePasswordDialogOpen(false)}
              color="default"
            >
              {t('common.cancel')}
            </Button>
            <Button
              type="submit"
              onClick={submitForm}
              variant="contained"
              color="secondary"
              autoFocus
              disabled={isSubmitting}
            >
              {!isSubmitting ? (
                t('common.delete')
              ) : (
                <CircularProgress size={14} />
              )}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Formik>
  )

  const deleteAccountDialog = (
    <Dialog
      fullWidth
      maxWidth="md"
      open={deleteAccountDialogOpen}
      onClose={() => setDeleteAccountDialogOpen(false)}
      aria-labelledby="delete-account-dialog-title"
      aria-describedby="delete-account-dialog-body"
    >
      <DialogTitle id="delete-account-dialog-title">
        {t('settings.tabs.account.basicInfo.deleteAccount.dialog.title')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-account-dialog-body">
          {t('settings.tabs.account.basicInfo.deleteAccount.dialog.body')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setDeleteAccountDialogOpen(false)}
          color="default"
        >
          {t('common.cancel')}
        </Button>
        <Button
          onClick={onClickDeleteAccount}
          variant="contained"
          color="secondary"
          autoFocus
          disabled={deleteAccountInProgress}
        >
          {!deleteAccountInProgress ? (
            t('common.delete')
          ) : (
            <CircularProgress size={14} />
          )}
        </Button>
      </DialogActions>
    </Dialog>
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
              {newEmailDialog}
              {newPasswordDialog}
              {deleteAccountDialog}
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
