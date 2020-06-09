import React, { useState, useEffect, useContext, useMemo } from 'react'
import {
  Route,
  Link as RouterLink,
  useHistory,
  useLocation,
  Switch,
  useRouteMatch
} from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroller'
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
import GhostOffIcon from 'mdi-material-ui/GhostOff'
import MusicIcon from 'mdi-material-ui/Music'
import MusicRestQuarterIcon from 'mdi-material-ui/MusicRestQuarter'
import PlayCircleOutlineIcon from 'mdi-material-ui/PlayCircleOutline'
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
import TafalkGridListTileCard from 'components/content/GridListTileCard'
import { itemsPerFetch } from 'utils/constants'
import {
  ListSealedStreamsForInfoCardQuery,
  ListLiveStreamsForInfoCardQuery,
  ListLiveCantosForInfoCardQuery,
  ListPausedCantosForInfoCardQuery
} from 'types/appsync/API'

type BottomNavigationType =
  | 'sealedStream'
  | 'liveStream'
  | 'pausedCanto'
  | 'liveCanto'

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
  const [fetchNextToken, setFetchNextToken] = useState<string | null>(null)
  const [bottomNavigationValue, setBottomNavigationValue] = useState<
    BottomNavigationType
  >('sealedStream')
  const isSmallPlus = useMediaQuery(theme.breakpoints.up('sm'))
  const { user: authUser } = useContext(AuthUserContext)
  let routerHistory = useHistory()
  const scrollTrigger = useScrollTrigger()
  const [addContentFabOpen, setAddContentFabOpen] = useState(false)

  // Side effects
  useEffect(() => {
    ;(async () => {
      // Whenever query params change load relevant content
      const pathname = routeLocation.pathname
      const type = routePathBottomNavigationMap.get(pathname) ?? 'sealedStream'
      setBottomNavigationValue(type)

      switch (type) {
        case 'sealedStream':
          // Initial sealed items
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
          setFetchNextToken(sealedStreamsResult?.nextToken ?? null)
          setItems(sealedStreamsResult?.items ?? [])
          return
        case 'liveStream':
          // Initial live items
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
          setFetchNextToken(liveStreamsResult?.nextToken ?? null)
          setItems(liveStreamsResult?.items ?? [])
          return
        case 'pausedCanto':
          // Initial paused canto items
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
          setFetchNextToken(pausedCantosResult?.nextToken ?? null)
          setItems(pausedCantosResult?.items ?? [])
          return
        case 'liveCanto':
          // Initial live canto items
          const liveCantosGraphqlResponse = (await API.graphql(
            graphqlOperation(ListLiveCantosForInfoCard, {
              limit: itemsPerFetch,
              nextToken: fetchNextToken
            })
          )) as {
            data: ListLiveCantosForInfoCardQuery
          }
          const liveCantosResult = liveCantosGraphqlResponse.data.listLiveCantos
          setFetchNextToken(liveCantosResult?.nextToken ?? null)
          setItems(liveCantosResult?.items ?? [])
          return
        default:
          return
      }
    })()
  }, [fetchNextToken, routeLocation.pathname])

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
        setFetchNextToken(sealedStreamsResult?.nextToken ?? null)
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
        setFetchNextToken(liveStreamsResult?.nextToken ?? null)
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
        setFetchNextToken(pausedCantosResult?.nextToken ?? null)
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
        setFetchNextToken(liveCantosResult?.nextToken ?? null)
        setItems([...(items ?? []), ...(liveCantosResult?.items ?? [])])
        return
      default:
        return
    }
  }

  // Subroutes
  const sealedStreamsGridList = () => (
    <GridList cellHeight="auto" cols={1} className={classes.gridList}>
      {items?.map((i) => (
        <GridListTile key={`${bottomNavigationValue}-${i.id}`} cols={1}>
          <TafalkGridListTileCard
            status="sealed"
            item={i}
          ></TafalkGridListTileCard>
        </GridListTile>
      ))}
    </GridList>
  )
  const liveStreamsGridList = () => (
    <GridList cellHeight="auto" cols={1} className={classes.gridList}>
      {items?.map((i) => (
        <GridListTile key={`${bottomNavigationValue}-${i.id}`} cols={1}>
          <TafalkGridListTileCard
            status="live"
            item={i}
          ></TafalkGridListTileCard>
        </GridListTile>
      ))}
    </GridList>
  )
  const pausedCantosGridList = () => (
    <GridList cellHeight="auto" cols={1} className={classes.gridList}>
      {items?.map((i) => (
        <GridListTile key={`${bottomNavigationValue}-${i.id}`} cols={1}>
          <TafalkGridListTileCard
            status="paused"
            item={i}
          ></TafalkGridListTileCard>
        </GridListTile>
      ))}
    </GridList>
  )
  const liveCantosGridList = () => (
    <GridList cellHeight="auto" cols={1} className={classes.gridList}>
      {items?.map((i) => (
        <GridListTile key={`${bottomNavigationValue}-${i.id}`} cols={1}>
          <TafalkGridListTileCard
            status="live"
            item={i}
          ></TafalkGridListTileCard>
        </GridListTile>
      ))}
    </GridList>
  )

  return (
    <React.Fragment>
      {/* Content */}
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={!!fetchNextToken}
        loader={<Skeleton variant="rect" width="100%" height={100} />}
      >
        <Switch>
          <Route exact path="/">
            {sealedStreamsGridList}
          </Route>
          <Route path="/content/streams">{sealedStreamsGridList}</Route>
          <Route path="/content/streams/sealed">{sealedStreamsGridList}</Route>
          <Route path="/content/streams/live">{liveStreamsGridList}</Route>
          <Route path="/content/cantos">{pausedCantosGridList}</Route>
          <Route path="/content/cantos/paused">{pausedCantosGridList}</Route>
          <Route path="/content/cantos/live">{liveCantosGridList}</Route>
        </Switch>
      </InfiniteScroll>

      {/* Speed Dial */}
      {authUser.id && (
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
            // FabProps={{ color: 'secondary' }}
            icon={<FeatherIcon />}
            tooltipTitle={t('home.tooltips.addContentFabAction.stream')}
            tooltipOpen
            onClick={() => routerHistory.push('/pour/stream')}
          />
          <SpeedDialAction
            // FabProps={{ color: 'secondary' }}
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
            icon={<GhostOffIcon />}
          />
          {authUser.id && (
            <BottomNavigationAction
              component={RouterLink}
              to={`/content/streams/live`}
              label={t('home.labels.bottomNav.streams.live')}
              value="liveStream"
              icon={<PlayCircleOutlineIcon />}
            />
          )}
          <BottomNavigationAction
            component={RouterLink}
            to={`/content/cantos/paused`}
            label={t('home.labels.bottomNav.cantos.paused')}
            value="pausedCanto"
            icon={<MusicRestQuarterIcon />}
          />
          {authUser.id && (
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