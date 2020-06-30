import React, { useEffect, useContext, useState } from 'react'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import { AuthUserContext } from 'context/Auth'
import { useSnackbar } from 'notistack'
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Theme,
  IconButton
} from '@material-ui/core'
import API, { graphqlOperation } from '@aws-amplify/api'
import { ListUserStreamsForProfile } from 'graphql/custom'
import { ListUserStreamsForProfileQuery } from 'types/appsync/API'
import TafalkFirstStreamInfoDialog from 'components/pour/dialogs/TheFirstStreamInfoDialog'
import MicrophoneIcon from 'mdi-material-ui/Microphone'
import CheckCircleOutlineIcon from 'mdi-material-ui/CheckCircleOutline'
import CachedIcon from 'mdi-material-ui/Cached'
import CloseCircleOutlineIcon from 'mdi-material-ui/CloseCircleOutline'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    card: {
      flexGrow: 1
    },
    avatar: {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main
    },
    secretaryModeButton: {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main
    }
  })
)

const Stream: React.FC = () => {
  const { t } = useTranslation()
  const classes = useStyles()
  let routerHistory = useHistory()
  const [firstStreamDialogOpen, setFirstStreamDialogOpen] = useState(true)
  const [pourState, setPourState] = useState<
    'saved' | 'saving' | 'error' | undefined
  >(undefined)
  const { user: authUser } = useContext(AuthUserContext)
  const { enqueueSnackbar } = useSnackbar()

  // Side effects: Load initial profile data
  useEffect(() => {
    ;(async () => {
      // Check if auth user info ready
      if (!authUser?.contextMeta.isReady) return
      try {
        // Redirect to login if not logged in
        if (!authUser?.username) {
          routerHistory.push('/auth/login')
          return
        }
        // Check if first time streaming of user (if so, show dialog)
        const authUserStreamsGraphqlResponse = (await API.graphql(
          graphqlOperation(ListUserStreamsForProfile, {
            userId: authUser?.id,
            limit: 1,
            nextToken: null
          })
        )) as {
          data: ListUserStreamsForProfileQuery
        }
        const authUserStreamsResult =
          authUserStreamsGraphqlResponse.data.listStreamsByUser

        setFirstStreamDialogOpen(
          !authUserStreamsResult?.items ||
            authUserStreamsResult.items.length === 0
        )
      } catch (err) {
        enqueueSnackbar(err.message ?? err, {
          variant: 'error'
        })
      }
    })()
  }, [authUser, enqueueSnackbar, routerHistory])

  return (
    <React.Fragment>
      {/** HTML Document Header */}
      <Helmet>
        <title>{`🌊 ${t('pour.stream.windowTitle')}`}</title>
      </Helmet>
      {/** main card */}
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <IconButton
              disableRipple
              component={RouterLink}
              to={`/u/${authUser?.username ?? ''}`}
            >
              <Avatar
                alt={authUser?.username}
                className={classes.avatar}
                src={authUser?.profilePictureObjectUrl}
              />
            </IconButton>
          }
          title={authUser?.username}
          subheader={
            pourState ? (
              pourState === 'saved' ? (
                <span>
                  <CheckCircleOutlineIcon color="inherit" />{' '}
                  {t('pour.messages.processState.saved')}
                </span>
              ) : pourState === 'saving' ? (
                <span>
                  <CachedIcon color="inherit" />{' '}
                  {t('pour.messages.processState.saving')}
                </span>
              ) : (
                <span>
                  <CloseCircleOutlineIcon color="inherit" />{' '}
                  {t('pour.messages.processState.error')}
                </span>
              )
            ) : undefined
          }
          action={
            <IconButton color="primary">
              <MicrophoneIcon />
            </IconButton>
          }
        ></CardHeader>
        <CardContent></CardContent>
      </Card>
      {/** Dialogs */}
      <TafalkFirstStreamInfoDialog
        open={firstStreamDialogOpen}
        onClose={() => setFirstStreamDialogOpen(false)}
      ></TafalkFirstStreamInfoDialog>
    </React.Fragment>
  )
}

export default Stream
