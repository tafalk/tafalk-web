import React, { useState, useEffect, useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useTheme } from '@material-ui/core/styles'
import { GetStreamQuery } from 'types/appsync/API'
import { AuthUserContext } from 'context/Auth'
import API, { graphqlOperation } from '@aws-amplify/api'
import { GetStreamById } from 'graphql/custom'
import { Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { useSnackbar } from 'notistack'

interface StreamRouteParams {
  id: string
}

interface StreamDataType
  extends Omit<Exclude<GetStreamQuery['getStream'], null>, '__typename'> {}

const Stream: React.FC = () => {
  let routerHistory = useHistory()
  const theme = useTheme()
  const { user: authUser } = useContext(AuthUserContext)
  const { enqueueSnackbar } = useSnackbar()
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
        enqueueSnackbar(err.message ?? err, {
          variant: 'error'
        })
      } finally {
        setInfoLoaded(true)
      }
    })()
  }, [enqueueSnackbar, routeStreamId, routerHistory])

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
