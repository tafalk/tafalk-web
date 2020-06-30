import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import { AuthUserContext } from 'context/Auth'
import { useSnackbar } from 'notistack'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1
    }
  })
)

const Canto: React.FC = () => {
  const { t } = useTranslation()
  const classes = useStyles()
  let routerHistory = useHistory()
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
        <title>{`🎤 ${t('pour.stream.windowTitle')}`}</title>
      </Helmet>
    </React.Fragment>
  )
}

export default Canto
