import React, { useState, useEffect, useContext } from 'react'
import {
  Route,
  Link as RouterLink,
  useHistory,
  useLocation,
  Switch,
  Redirect
} from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroller'
import { useCookies } from 'react-cookie'
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme
} from '@material-ui/core/styles'
import {
  useMediaQuery,
  BottomNavigation,
  BottomNavigationAction,
  Slide,
  useScrollTrigger,
  GridList,
  GridListTile
} from '@material-ui/core'
import API, { graphqlOperation } from '@aws-amplify/api'
import StopIcon from 'mdi-material-ui/Stop'
import MusicIcon from 'mdi-material-ui/Music'
import MusicRestQuarterIcon from 'mdi-material-ui/MusicRestQuarter'
import AccessPointIcon from 'mdi-material-ui/AccessPoint'
import AllInclusiveIcon from 'mdi-material-ui/AllInclusive'
import FeatherIcon from 'mdi-material-ui/Feather'
import { AuthUserContext } from 'context/Auth'
import { useTranslation } from 'react-i18next'
import {
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  Skeleton
} from '@material-ui/lab'
import {
  ListSealedStreamsForInfoCard,
  ListLiveStreamsForInfoCard,
  ListPausedCantosForInfoCard,
  ListLiveCantosForInfoCard
} from 'graphql/custom'
import TafalkGridListTileCard from 'components/home/GridListTileCard'
import { itemsPerFetch, hasVisitedBeforeCookieName } from 'utils/constants'
import {
  ListSealedStreamsForInfoCardQuery,
  ListLiveStreamsForInfoCardQuery,
  ListLiveCantosForInfoCardQuery,
  ListPausedCantosForInfoCardQuery
} from 'types/appsync/API'
import { BottomNavigationType } from 'types/props'
import { useSnackbar } from 'notistack'

const routePathBottomNavigationMap = new Map<string, BottomNavigationType>([
  ['/', 'sealedStream'],
  ['/content', 'sealedStream'],
  ['/content/streams', 'sealedStream'],
  ['/content/streams/sealed', 'sealedStream'],
  ['/content/streams/live', 'liveStream'],
  ['/content/cantos', 'pausedCanto'],
  ['/content/cantos/paused', 'pausedCanto'],
  ['/content/cantos/live', 'liveCanto']
])

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridList: {},
    bottomNav: {
      width: '100%',
      position: 'fixed',
      left: 0,
      bottom: 0
    },
    speedDial: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    }
  })
)

const Home: React.FC = () => {
  const theme = useTheme()
  const classes = useStyles()
  const { t } = useTranslation()
  const routeLocation = useLocation()
  const [items, setItems] = useState<Array<any> | null>(null)
  const [fetchNextToken, setFetchNextToken] = useState<string | undefined>(
    undefined
  )
  const [
    bottomNavigationValue,
    setBottomNavigationValue
  ] = useState<BottomNavigationType>('sealedStream')
  const isSmallPlus = useMediaQuery(theme.breakpoints.up('sm'))
  const { user: authUser } = useContext(AuthUserContext)
  let routerHistory = useHistory()
  const scrollTrigger = useScrollTrigger()
  const [addContentFabOpen, setAddContentFabOpen] = useState(false)
  const [contentLoading, setContentLoading] = useState(false)
  const [cookies] = useCookies([hasVisitedBeforeCookieName])
  const { enqueueSnackbar } = useSnackbar()

  // Side effects
  useEffect(() => {
    ;(async () => {
      if (!cookies) return
      // if first visit, redirect to welcome page
      if (!cookies.hasOwnProperty(hasVisitedBeforeCookieName)) {
        routerHistory.push('/welcome')
      }
      // Whenever subpath changes, set navigation
      const pathname = routeLocation.pathname
      const type = routePathBottomNavigationMap.get(pathname) ?? 'sealedStream'
      setBottomNavigationValue(type)
      // Set loading true
      setContentLoading(true)
      // Scroll to top-left
      window.scrollTo(0, 0)
      // Reset nextToken
      setFetchNextToken(undefined)

      // Set initial items depending on the subpath
      try {
        switch (type) {
          case 'sealedStream':
            // Initial sealed items
            const sealedStreamsGraphqlResponse = (await API.graphql(
              graphqlOperation(ListSealedStreamsForInfoCard, {
                limit: itemsPerFetch
              })
            )) as {
              data: ListSealedStreamsForInfoCardQuery
            }
            const sealedStreamsResult =
              sealedStreamsGraphqlResponse.data.listSealedStreams
            setFetchNextToken(sealedStreamsResult?.nextToken ?? undefined)
            setItems(sealedStreamsResult?.items ?? [])
            return
          case 'liveStream':
            // Initial live items
            const liveStreamsGraphqlResponse = (await API.graphql(
              graphqlOperation(ListLiveStreamsForInfoCard, {
                limit: itemsPerFetch
              })
            )) as {
              data: ListLiveStreamsForInfoCardQuery
            }
            const liveStreamsResult =
              liveStreamsGraphqlResponse.data.listLiveStreams
            setFetchNextToken(liveStreamsResult?.nextToken ?? undefined)
            setItems(liveStreamsResult?.items ?? [])
            return
          case 'pausedCanto':
            // Initial paused canto items
            const pausedCantosGraphqlResponse = (await API.graphql(
              graphqlOperation(ListPausedCantosForInfoCard, {
                limit: itemsPerFetch
              })
            )) as {
              data: ListPausedCantosForInfoCardQuery
            }
            const pausedCantosResult =
              pausedCantosGraphqlResponse.data.listPausedCantos
            setFetchNextToken(pausedCantosResult?.nextToken ?? undefined)
            setItems(pausedCantosResult?.items ?? [])
            return
          case 'liveCanto':
            // Initial live canto items
            const liveCantosGraphqlResponse = (await API.graphql(
              graphqlOperation(ListLiveCantosForInfoCard, {
                limit: itemsPerFetch
              })
            )) as {
              data: ListLiveCantosForInfoCardQuery
            }
            const liveCantosResult =
              liveCantosGraphqlResponse.data.listLiveCantos
            setFetchNextToken(liveCantosResult?.nextToken ?? undefined)
            setItems(liveCantosResult?.items ?? [])
            return
          default:
            return
        }
      } catch (err) {
        //TODO: When not authenticated await `API.graphql(...)` fails here with "No current user"
        enqueueSnackbar(JSON.stringify(err), {
          variant: 'error'
        })
      } finally {
        setContentLoading(false)
      }
    })()
  }, [cookies, enqueueSnackbar, routeLocation.pathname, routerHistory])

  // Functions
  const loadMore = async () => {
    switch (bottomNavigationValue) {
      case 'sealedStream':
        // More sealed items
        const sealedStreamsGraphqlResponse = (await API.graphql(
          graphqlOperation(ListSealedStreamsForInfoCard, {
            limit: itemsPerFetch,
            nextToken: fetchNextToken
          })
        )) as {
          data: ListSealedStreamsForInfoCardQuery
        }
        const sealedStreamsResult =
          sealedStreamsGraphqlResponse.data.listSealedStreams
        setFetchNextToken(sealedStreamsResult?.nextToken ?? undefined)
        setItems([...(items ?? []), ...(sealedStreamsResult?.items ?? [])])
        return
      case 'liveStream':
        // More live items
        const liveStreamsGraphqlResponse = (await API.graphql(
          graphqlOperation(ListLiveStreamsForInfoCard, {
            limit: itemsPerFetch,
            nextToken: fetchNextToken
          })
        )) as {
          data: ListLiveStreamsForInfoCardQuery
        }
        const liveStreamsResult =
          liveStreamsGraphqlResponse.data.listLiveStreams
        setFetchNextToken(liveStreamsResult?.nextToken ?? undefined)
        setItems([...(items ?? []), ...(liveStreamsResult?.items ?? [])])
        return
      case 'pausedCanto':
        // More paused canto items
        const pausedCantosGraphqlResponse = (await API.graphql(
          graphqlOperation(ListPausedCantosForInfoCard, {
            limit: itemsPerFetch,
            nextToken: fetchNextToken
          })
        )) as {
          data: ListPausedCantosForInfoCardQuery
        }
        const pausedCantosResult =
          pausedCantosGraphqlResponse.data.listPausedCantos
        setFetchNextToken(pausedCantosResult?.nextToken ?? undefined)
        setItems([...(items ?? []), ...(pausedCantosResult?.items ?? [])])
        return
      case 'liveCanto':
        // More live canto items
        const liveCantosGraphqlResponse = (await API.graphql(
          graphqlOperation(ListLiveCantosForInfoCard, {
            limit: itemsPerFetch,
            nextToken: fetchNextToken
          })
        )) as {
          data: ListLiveCantosForInfoCardQuery
        }
        const liveCantosResult = liveCantosGraphqlResponse.data.listLiveCantos
        setFetchNextToken(liveCantosResult?.nextToken ?? undefined)
        setItems([...(items ?? []), ...(liveCantosResult?.items ?? [])])
        return
      default:
        return
    }
  }

  // Subroutes
  const itemsGridList = items ? (
    <GridList cellHeight="auto" cols={1} className={classes.gridList}>
      {items.map((i) => (
        <GridListTile key={`${bottomNavigationValue}-${i.id}`} cols={1}>
          <TafalkGridListTileCard
            type={bottomNavigationValue}
            item={i}
          ></TafalkGridListTileCard>
        </GridListTile>
      ))}
    </GridList>
  ) : (
    <div></div>
  )

  return (
    <React.Fragment>
      {/* Content */}
      {contentLoading ? (
        [...Array(6).keys()].map((i) => (
          <React.Fragment key={`home-loader-${i}`}>
            <Skeleton height={theme.spacing(12)} />
          </React.Fragment>
        ))
      ) : (
        <InfiniteScroll
          loadMore={loadMore}
          hasMore={!!fetchNextToken}
          loader={<Skeleton width="100%" height={theme.spacing(12)} />}
        >
          <Switch>
            <Route exact path="/">
              {itemsGridList}
            </Route>
            <Route exact path="/content/streams">
              <Redirect to="/content/streams/sealed" />
            </Route>
            <Route exact path="/content/cantos">
              <Redirect to="/content/cantos/paused" />
            </Route>
            <Route path="/content/streams/sealed">{itemsGridList}</Route>
            <Route path="/content/streams/live">{itemsGridList}</Route>
            <Route path="/content/cantos/paused">{itemsGridList}</Route>
            <Route path="/content/cantos/live">{itemsGridList}</Route>
          </Switch>
        </InfiniteScroll>
      )}

      {/* Speed Dial */}
      {authUser?.id && (
        <SpeedDial
          ariaLabel="Add content"
          className={classes.speedDial}
          hidden={!isSmallPlus}
          icon={<SpeedDialIcon />}
          onOpen={() => setAddContentFabOpen(true)}
          onClose={() => setAddContentFabOpen(false)}
          open={addContentFabOpen}
          direction="up"
        >
          <SpeedDialAction
            icon={<FeatherIcon />}
            tooltipTitle={t('home.tooltips.addContentFabAction.stream')}
            tooltipOpen
            onClick={() => routerHistory.push('/pour/stream')}
          />
          <SpeedDialAction
            icon={<AllInclusiveIcon />}
            tooltipTitle={t('home.tooltips.addContentFabAction.canto')}
            tooltipOpen
            onClick={() => routerHistory.push('/pour/canto')}
          />
        </SpeedDial>
      )}

      {/* Bottom Nav */}
      <Slide in={!scrollTrigger} direction="up">
        <BottomNavigation
          role="navigation"
          aria-label="Bottom navigation"
          value={bottomNavigationValue}
          onChange={(_event, newVal) => {
            setBottomNavigationValue(newVal)
          }}
          showLabels
          className={classes.bottomNav}
        >
          <BottomNavigationAction
            component={RouterLink}
            to={`/content/streams/sealed`}
            label={t('home.labels.bottomNav.streams.sealed')}
            value="sealedStream"
            icon={<StopIcon />}
          />
          {authUser?.id && (
            <BottomNavigationAction
              component={RouterLink}
              to={`/content/streams/live`}
              label={t('home.labels.bottomNav.streams.live')}
              value="liveStream"
              icon={<AccessPointIcon />}
            />
          )}
          <BottomNavigationAction
            component={RouterLink}
            to={`/content/cantos/paused`}
            label={t('home.labels.bottomNav.cantos.paused')}
            value="pausedCanto"
            icon={<MusicRestQuarterIcon />}
          />
          {authUser?.id && (
            <BottomNavigationAction
              component={RouterLink}
              to={`/content/cantos/live`}
              label={t('home.labels.bottomNav.cantos.live')}
              value="liveCanto"
              icon={<MusicIcon />}
            />
          )}
        </BottomNavigation>
      </Slide>
    </React.Fragment>
  )
}

export default Home
