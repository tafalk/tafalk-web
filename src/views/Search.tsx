import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import API, { graphqlOperation } from '@aws-amplify/api'
import { SearchSiteContent } from 'graphql/custom'
import { SearchQuery } from 'types/appsync/API'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { GridList, GridListTile, Typography, Grid } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import TafalkSearchResultTileCard from 'components/content/SearchResultTileCard'
import { Skeleton } from '@material-ui/lab'
import { useSnackbar } from 'notistack'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridList: {}
  })
)

const Search: React.FC = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  const routeLocation = useLocation()
  const [itemsLoaded, setItemsLoaded] = useState<boolean>(false)
  const [userItems, setUserItems] = useState<Array<any> | null>(null)
  const [streamItems, setStreamItems] = useState<Array<any> | null>(null)
  const [cantoItems, setCantoItems] = useState<Array<any> | null>(null)

  const { enqueueSnackbar } = useSnackbar()

  // Side Effects
  useEffect(() => {
    ;(async () => {
      let queryParams = new URLSearchParams(routeLocation.search)
      // Whenever query params change load relevant content
      const searchStr = queryParams.get('q')
      try {
        const searchGraphqlResponse = (await API.graphql(
          graphqlOperation(SearchSiteContent, {
            query: searchStr
          })
        )) as {
          data: SearchQuery
        }
        const result = searchGraphqlResponse.data.search
        if (result) {
          setUserItems(result.filter((i) => i?.__typename === 'User'))
          setStreamItems(result.filter((i) => i?.__typename === 'Stream'))
          setCantoItems(result.filter((i) => i?.__typename === 'Canto'))
        }
      } catch (err) {
        enqueueSnackbar(err.message ?? err, {
          variant: 'error'
        })
      } finally {
        setItemsLoaded(true)
      }
    })()
  }, [enqueueSnackbar, routeLocation])

  // DOM elements
  const renderStreamItemGrid = (
    <GridList cellHeight="auto" cols={1} className={classes.gridList}>
      {streamItems?.map((i) => (
        <GridListTile key={i.id} cols={1}>
          <TafalkSearchResultTileCard item={i}></TafalkSearchResultTileCard>
        </GridListTile>
      ))}
    </GridList>
  )
  const renderCantoItemGrid = (
    <GridList cellHeight="auto" cols={1} className={classes.gridList}>
      {cantoItems?.map((i) => (
        <GridListTile key={i.id} cols={1}>
          <TafalkSearchResultTileCard item={i}></TafalkSearchResultTileCard>
        </GridListTile>
      ))}
    </GridList>
  )

  const renderUserItemGrid = (
    <GridList cellHeight="auto" cols={1} className={classes.gridList}>
      {userItems?.map((i) => (
        <GridListTile key={i.id} cols={1}>
          <TafalkSearchResultTileCard item={i}></TafalkSearchResultTileCard>
        </GridListTile>
      ))}
    </GridList>
  )

  return (
    <React.Fragment>
      {!itemsLoaded ? (
        <React.Fragment>
          {/* Skeleton Loader */}
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <br />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <br />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <br />
        </React.Fragment>
      ) : !userItems && !streamItems && !cantoItems ? (
        <React.Fragment>
          {/* Nothing Found */}
          <Grid container justify="center">
            <Typography variant="h4" color="textSecondary">
              {t('search.message.noResult')}
            </Typography>
          </Grid>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/* Regular Content */}
          {/* Users */}
          {userItems?.length ? (
            <React.Fragment>
              <Typography variant="h6" color="textSecondary">
                {t('search.labels.users')}&nbsp;({userItems?.length ?? 0})
              </Typography>
              {renderUserItemGrid}
            </React.Fragment>
          ) : undefined}

          {/* Streams */}
          {streamItems?.length ? (
            <React.Fragment>
              <Typography variant="h6" color="textSecondary">
                {t('search.labels.streams')}&nbsp;({streamItems?.length ?? 0})
              </Typography>
              {renderStreamItemGrid}
            </React.Fragment>
          ) : undefined}
          {/* Cantos */}
          {cantoItems?.length ? (
            <React.Fragment>
              <Typography variant="h6" color="textSecondary">
                {t('search.labels.cantos')}&nbsp;({cantoItems?.length ?? 0})
              </Typography>
              {renderCantoItemGrid}
            </React.Fragment>
          ) : undefined}
        </React.Fragment>
      )}
      {/* no content */}
    </React.Fragment>
  )
}

export default Search
