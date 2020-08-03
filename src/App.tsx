import React, { useContext, useMemo, Suspense } from 'react'
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
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Link } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    skipToMainContentButton: {
      position: 'absolute',
      top: '-40px',
      left: 0,
      backgroundColor: '#000000',
      color: '#FFFFFF',
      zIndex: 100
    }
  })
)

const App: React.FC = () => {
  const classes = useStyles()
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
      <SnackbarProvider maxSnack={maxNotistackSnacks} preventDuplicate>
        <AuthUserContextProvider>
          <Link
            href="#maincontent"
            className={classes.skipToMainContentButton}
            onClick={(e: React.MouseEvent<HTMLElement>) => e.preventDefault()}
          >
            Skip to main content
          </Link>
          <BrowserRouter>
            {/* Header */}
            <TafalkHeader />
            {/* Body */}
            <Container id="maincontent" role="main" maxWidth="lg">
              <Suspense
                fallback={[...Array(6).keys()].map((i) => (
                  <React.Fragment key={`loader-${i}`}>
                    <Skeleton height={theme.spacing(12)} />
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
