import React, { useContext, useMemo, Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import router from 'router'
import { SnackbarProvider } from 'notistack'
import TafalkHeader from 'components/common/TheHeader'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { Skeleton } from '@material-ui/lab'
import MUICookieConsent from 'material-ui-cookie-consent'

import AuthUserContextProvider, { AuthUserContext } from 'context/Auth'
import { maxNotistackSnacks } from 'utils/constants'

import Amplify from '@aws-amplify/core'
import API from '@aws-amplify/api'
import PubSub from '@aws-amplify/pubsub'
import { AwsConfig } from 'config'

const App: React.FC = () => {
  const { t } = useTranslation()
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

  // Side Effects: Configure AWS
  useEffect(() => {
    // AWS Amplify configurations
    Amplify.configure(AwsConfig)
    API.configure(AwsConfig)
    PubSub.configure(AwsConfig)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={maxNotistackSnacks} preventDuplicate>
        <AuthUserContextProvider>
          <BrowserRouter>
            {/* Header */}
            <TafalkHeader />
            {/* Body */}
            <Container maxWidth="md">
              <Suspense
                fallback={[...Array(3).keys()].map((i) => (
                  <React.Fragment>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <br />
                  </React.Fragment>
                ))}
              >
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
              </Suspense>
            </Container>
            {/* EU Cookie Law Snackbar */}
            <MUICookieConsent
              cookieName="tafalkCookieConsent"
              message={t('cookieConsent.message')}
            />
          </BrowserRouter>
        </AuthUserContextProvider>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App
