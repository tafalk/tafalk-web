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
import API, { graphqlOperation, GraphQLResult } from '@aws-amplify/api'
import { AuthUserContext } from 'context/Auth'
import { Helmet } from 'react-helmet'
import { useSnackbar } from 'notistack'
import { cognitoAdminUserGroup } from 'utils/constants'
import { Box, Typography, Grid, AppBar, Tab } from '@material-ui/core'
import { TabContext, TabList, TabPanel } from '@material-ui/lab'
import MaterialTable, { Column, Query, QueryResult } from 'material-table'
import { ListFlagsForAdmin, ListUncloggerPromptsForAdmin } from 'graphql/custom'

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

interface FlagRow {
  id: string
  status: string
  category: string
  type: string
  detail: string
  contentType: string
  contentId: string
  flaggerUserId: string
}

interface UncloggerPromptRow {
  id: string
  status: string
  category: string
  body: string
  language: string
  reviewNote: string
}

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
  const { user: authUser } = useContext(AuthUserContext)
  const [tabValue, setTabValue] = useState<TabValueType>('flags')
  const [flagTableColumns] = useState<Array<Column<FlagRow>>>([])
  const [uncloggerPromptTableColumns] = useState<
    Array<Column<UncloggerPromptRow>>
  >([])
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
      } catch (err) {
        enqueueSnackbar(JSON.stringify(err), {
          variant: 'error'
        })
      }
    })()
  }, [authUser, enqueueSnackbar, routerHistory, url])

  // Side Effects: Tabs, routes and initial data
  useEffect(() => {
    ;(async () => {
      try {
        const pathname = routeLocation.pathname
        const subPath = pathname.replace(url, '').replace(/\/$/, '')
        const matchingTabValue = subPathTabValueMap.get(subPath) ?? 'flags'
        setTabValue(matchingTabValue)

        switch (matchingTabValue) {
          case 'flags':
            return
          case 'uncloggerPrompts':
            return
          default:
            return
        }
      } catch (err) {
        enqueueSnackbar(JSON.stringify(err), {
          variant: 'error'
        })
      }
    })()
  }, [enqueueSnackbar, routeLocation.pathname, url])

  // Functions
  const fetchFlagTableData = (query: Query<FlagRow>) => {
    return new Promise<QueryResult<FlagRow>>((resolve, reject) => {
      ;(API.graphql(
        graphqlOperation(ListFlagsForAdmin, {
          limit: query.pageSize,
          offset: query.page - 1,
          searchText: query.search,
          status: '' // TODO: Take it from state
        })
      ) as Promise<GraphQLResult<object>>).then((res) => {
        // TODO: Promise<GraphQLResult<object>>: object -> Codegen Result type
        resolve({
          data: res.data
        } as QueryResult<FlagRow>)
      })
    })
  }

  const fetchUncloggerPromptTableData = (query: Query<UncloggerPromptRow>) => {
    return new Promise<QueryResult<UncloggerPromptRow>>((resolve, reject) => {
      ;(API.graphql(
        graphqlOperation(ListUncloggerPromptsForAdmin, {
          limit: query.pageSize,
          offset: query.page - 1,
          searchText: query.search,
          status: '' // TODO: Take it from state
        })
      ) as Promise<GraphQLResult<object>>).then((res) => {
        // TODO: Promise<GraphQLResult<object>>: object -> Codegen Result type
        resolve({
          data: res.data
        } as QueryResult<UncloggerPromptRow>)
      })
    })
  }

  // DOM
  const flagsTabPanelContext = tabValue === 'flags' && (
    <React.Fragment>
      {/** TODO: Implement */}
      <MaterialTable
        title={t('admin.tabs.flags.title')}
        columns={flagTableColumns}
        data={fetchFlagTableData}
      ></MaterialTable>
    </React.Fragment>
  )

  const uncloggerPromptsTabPanelContext = tabValue === 'uncloggerPrompts' && (
    <React.Fragment>
      {/** TODO: Implement */}
      <MaterialTable
        title={t('admin.tabs.uncloggerPrompts.title')}
        columns={uncloggerPromptTableColumns}
        data={fetchUncloggerPromptTableData}
      ></MaterialTable>
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
              <Tab
                value="uncloggerPrompts"
                component={RouterLink}
                to={`${url}/uncloggerPrompts`}
                label={t('admin.tabs.uncloggerPrompts.title')}
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
