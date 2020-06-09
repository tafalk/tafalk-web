import React, { useState, useEffect, useContext } from 'react'
import { Link as RouterLink, useHistory, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme
} from '@material-ui/core/styles'
import { GetStreamQuery } from 'types/appsync/API'
import { AuthUserContext } from 'context/Auth'
import { useSiteMessage } from 'hooks'
import API, { graphqlOperation } from '@aws-amplify/api'
import { GetStreamById } from 'graphql/custom'
import { Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    }
  })
)

interface StreamRouteParams {
  id: string
}

interface StreamDataType
  extends Omit<Exclude<GetStreamQuery['getStream'], null>, '__typename'> {}

const Stream: React.FC = () => {
  let routerHistory = useHistory()
  const theme = useTheme()
  const classes = useStyles()
  const { user: authUser, setUser: setAuthUser } = useContext(AuthUserContext)
  const [, setSiteMessageData] = useSiteMessage()
  const routeParams = useParams<StreamRouteParams>()

  const [infoLoaded, setInfoLoaded] = useState(false)
  const [stream, setStream] = useState<StreamDataType | null>(null)

  const routeStreamId = routeParams.id

  let isVisitorAuthUser
  if (authUser.contextMeta.isReady) {
    isVisitorAuthUser = !!authUser.username
  }

  // Side effects: Load initial canto data
  useEffect(() => {
    ;(async () => {
      try {
        // DB data
        const streamGraphqlResponse = (await API.graphql(
          graphqlOperation(GetStreamById, {
            id: routeStreamId
          })
        )) as {
          data: GetStreamQuery
        }
        const streamResult = streamGraphqlResponse.data.getStream

        if (!streamResult) {
          routerHistory.push('/notfound')
          return
        }

        setStream(streamResult)
      } catch (err) {
        console.log(err.message ?? err)
        setSiteMessageData({
          show: true,
          type: 'error',
          timeout: null,
          text: err.message ?? err
        })
      } finally {
        setInfoLoaded(true)
      }
    })()
  }, [routeStreamId, routerHistory, setSiteMessageData])

  return (
    <React.Fragment>
      {/** HTML Document Header */}
      <Helmet>
        <title>{stream?.id ? `🚿 ${stream?.id}` : ''}</title>
      </Helmet>
      {/** Content */}
      <Grid container>
        {!infoLoaded ? (
          <Grid item xs={12}>
            <Skeleton height={theme.spacing(6)}></Skeleton>
            <Skeleton height={theme.spacing(24)}></Skeleton>
          </Grid>
        ) : (
          <React.Fragment></React.Fragment>
        )}
      </Grid>
    </React.Fragment>
  )
}

export default Stream
