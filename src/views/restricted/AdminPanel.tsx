import React, { useContext, useState, useEffect } from 'react'
import {
  Link as RouterLink,
  useHistory,
  useRouteMatch,
  useLocation
} from 'react-router-dom'
import {
  useTheme,
  Theme,
  makeStyles,
  createStyles
} from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import { AuthUserContext } from 'context/Auth'
import { Helmet } from 'react-helmet'
import { useSnackbar } from 'notistack'
import { cognitoAdminUserGroup } from 'utils/constants'
import { Box, Typography, Grid, AppBar, Tab } from '@material-ui/core'
import { TabContext, TabList, TabPanel } from '@material-ui/lab'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      flexGrow: 1
    },
    tabContext: {
      '& .MuiTabPanel-root': {
        flexGrow: 1
      }
    }
  })
)

type TabValueType = 'flags' | 'uncloggerPrompts'

const subPathTabValueMap = new Map<string, TabValueType>([
  ['/flags', 'flags'],
  ['/uncloggerPrompts', 'uncloggerPrompts']
])

const AdminPanel: React.FC = () => {
  const theme = useTheme()
  const classes = useStyles()
  const { t } = useTranslation()
  let routerHistory = useHistory()
  let { url } = useRouteMatch()
  const routeLocation = useLocation()
  const { user: authUser, setUser: setAuthUser } = useContext(AuthUserContext)
  const [tabValue, setTabValue] = useState<TabValueType>('flags')
  const { enqueueSnackbar } = useSnackbar()

  // Side effects: Redirect if not admin
  useEffect(() => {
    ;(async () => {
      // Check if auth user info ready
      if (!authUser?.contextMeta.isReady || !authUser?.id) return
      try {
        // Redirect to login if not logged in
        if (!authUser?.username) {
          routerHistory.push('/auth/login')
          return
        }
        // Redirect to not found if not admin
        if (!(authUser?.groups ?? []).includes(cognitoAdminUserGroup)) {
          routerHistory.push('/notfound')
          return
        }
        const pathname = routeLocation.pathname
        const subPath = pathname.replace(url, '').replace(/\/$/, '')
        const matchingTabValue = subPathTabValueMap.get(subPath) ?? 'flags'
        setTabValue(matchingTabValue)
      } catch (err) {
        enqueueSnackbar(JSON.stringify(err), {
          variant: 'error'
        })
      }
    })()
  }, [authUser, enqueueSnackbar, routerHistory])

  // DOM
  const flagsTabPanelContext = tabValue === 'flags' && (
    <React.Fragment>
      {/** Title */}
      <Box mb={2} pl={1}>
        <Typography variant="h5" color="textSecondary">
          {t('admin.tabs.flags.title')}
        </Typography>
      </Box>
      {/** TODO: Implement */}
    </React.Fragment>
  )

  const uncloggerPromptsTabPanelContext = tabValue === 'uncloggerPrompts' && (
    <React.Fragment>
      {/** Title */}
      <Box mb={2} pl={1}>
        <Typography variant="h5" color="textSecondary">
          {t('admin.tabs.uncloggerPrompts.title')}
        </Typography>
      </Box>
      {/** TODO: Implement */}
    </React.Fragment>
  )

  return (
    <React.Fragment>
      {/** HTML Document Header */}
      <Helmet>
        <title>{`🖥️ ${t('admin.windowTitle')}`}</title>
      </Helmet>
      {/** Title */}
      <Box mb={2} pl={1}>
        <Typography variant="h4" color="textSecondary">
          {t('admin.text.title')}
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
              aria-label="admin page tabs"
            >
              <Tab
                value="flags"
                component={RouterLink}
                to={`${url}/flags`}
                label={t('admin.tabs.flags.title')}
              />
            </TabList>
          </AppBar>
          {/* Tab Contents */}
          <TabPanel value="flags">{flagsTabPanelContext}</TabPanel>
          <TabPanel value="uncloggerPrompts">
            {uncloggerPromptsTabPanelContext}
          </TabPanel>
        </TabContext>
      </Grid>
    </React.Fragment>
  )
}

export default AdminPanel
