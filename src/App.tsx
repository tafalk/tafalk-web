import React, { useContext, useMemo } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import router from 'router'
import { SnackbarProvider } from 'notistack'
import TafalkHeader from 'components/common/TheHeader'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import MUICookieConsent from 'material-ui-cookie-consent'

import AuthUserContextProvider, { AuthUserContext } from 'context/Auth'
import { maxNotistackSnacks } from 'utils/constants'

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={maxNotistackSnacks}>
        <AuthUserContextProvider>
          <BrowserRouter>
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
