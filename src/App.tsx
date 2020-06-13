import React, { useContext, useMemo } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import router from 'router'
import { SnackbarProvider } from 'notistack'
import TafalkHeader from 'components/common/TheHeader'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
// import Button from '@material-ui/core/Button'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from 'mdi-material-ui/Close'
import MUICookieConsent from 'material-ui-cookie-consent'

import AuthUserContextProvider, { AuthUserContext } from 'context/Auth'
import SiteMessageContextProvider, {
  SiteMessageContext
} from 'context/SiteMessage'

const App: React.FC = () => {
  // Hooks & Effects
  const { t } = useTranslation()

  const { data: siteMessageData, setData: setSiteMessageData } = useContext(
    SiteMessageContext
  )
  const { user: authUser } = useContext(AuthUserContext)
  const isMediaDarkModePreferred = useMediaQuery('(prefers-color-scheme: dark)')
  const isDarkMode = authUser
    ? authUser.theme === 'dark'
    : isMediaDarkModePreferred
  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: isDarkMode ? 'dark' : 'light'
        }
      }),
    [isDarkMode]
  )

  // Functions
  const onClose = (
    _event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === 'clickaway') return
    // Hide on close
    setSiteMessageData({
      show: false,
      timeout: null,
      type: 'error',
      text: ''
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SiteMessageContextProvider>
        <AuthUserContextProvider>
          <BrowserRouter>
            <SnackbarProvider maxSnack={3}>
              {/* Header */}
              <TafalkHeader />
              {/* Body */}
              <Container maxWidth="md">
                <Switch>
                  {router.map((route, index) => (
                    <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      component={route.component}
                    />
                  ))}
                </Switch>
              </Container>
              {/* Global Message Snackbar */}
              <Snackbar
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                open={siteMessageData.show}
                autoHideDuration={siteMessageData.timeout}
                onClose={onClose}
                message={siteMessageData.text}
              >
                <Alert
                  onClose={onClose}
                  severity={siteMessageData.type}
                  action={
                    <React.Fragment>
                      {/* TODO: Maybe add some 'Report Bug' functionality
                    <Button color="secondary" size="small" onClick={onClose}>
                      Report Bug
                    </Button>
                    */}
                      <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={onClose}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </React.Fragment>
                  }
                >
                  {siteMessageData.text}
                </Alert>
              </Snackbar>
              {/* EU Cookie Law Snackbar */}
              <MUICookieConsent
                cookieName="tafalkCookieConsent"
                message={t('cookieConsent.message')}
              />
            </SnackbarProvider>
          </BrowserRouter>
        </AuthUserContextProvider>
      </SiteMessageContextProvider>
    </ThemeProvider>
  )
}

export default App
