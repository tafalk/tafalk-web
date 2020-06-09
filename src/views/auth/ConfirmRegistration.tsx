import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Auth from '@aws-amplify/auth'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import {
  Grid,
  Button,
  CircularProgress,
  Typography,
  Box
} from '@material-ui/core'
import TextField from 'components/common/wrappers/TheHelpedFormikTextField'
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha
} from 'react-google-recaptcha-v3'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import { GoogleRecaptchaV3Config } from 'config'
import { useSiteMessage } from 'hooks'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    form: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '100%',
        justify: 'center'
      }
    }
  })
)

const ConfirmRegistration: React.FC = () => {
  const { executeRecaptcha } = useGoogleReCaptcha()
  if (executeRecaptcha) {
    executeRecaptcha('confirm_registration_page')
  }

  const { t } = useTranslation()
  const classes = useStyles()
  let routerHistory = useHistory()
  const routeLocation = useLocation()
  //let queryParams = new URLSearchParams(useLocation().search)
  const [resendLoading, setResendLoading] = useState(false)

  const [, setSiteMessageData] = useSiteMessage()

  const redirectMilliseconds = 500
  const formValidationSchema = () =>
    Yup.object().shape({
      code: Yup.string().required(t('common.validation.required'))
    })

  const onSubmitClick = async (values: any, { setSubmitting }: any) => {
    try {
      let queryParams = new URLSearchParams(routeLocation.search)
      await Auth.confirmSignUp(queryParams.get('u') ?? '', values.code)
      setSiteMessageData({
        show: true,
        text: t('confirmRegistrationForm.message.success'),
        type: 'success',
        timeout: redirectMilliseconds
      })
      setTimeout(() => {
        routerHistory.push('/auth/login')
      }, redirectMilliseconds)
    } catch (err) {
      setSiteMessageData({
        show: true,
        type: 'error',
        timeout: null,
        text: err.message ?? err
      })
    } finally {
      setSubmitting(false)
    }
  }

  const onResendCodeClick = async () => {
    setResendLoading(true)
    try {
      let queryParams = new URLSearchParams(routeLocation.search)
      const username = queryParams.get('u') ?? ''
      if (!username) {
        setSiteMessageData({
          show: true,
          type: 'error',
          timeout: null,
          text: t('confirmRegistrationForm.message.requiredUsername')
        })
        return
      }
      await Auth.resendSignUp(username)
    } catch (err) {
      setSiteMessageData({
        show: true,
        type: 'error',
        timeout: null,
        text: err.message ?? err
      })
    } finally {
      setResendLoading(true)
    }
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={GoogleRecaptchaV3Config.siteKey}>
      <Box mb={2} pl={1}>
        <Typography variant="h4" color="textSecondary">
          {t('confirmRegistrationForm.text.title')}
        </Typography>
        <br />
        <Typography color="textSecondary">
          {t('confirmRegistrationForm.text.description')}
        </Typography>
      </Box>
      <Formik
        initialValues={{
          code: ''
        }}
        validationSchema={formValidationSchema}
        onSubmit={onSubmitClick}
      >
        {({ submitForm, isSubmitting }) => (
          <Form className={classes.form}>
            <Field
              component={TextField}
              name="code"
              label={t('confirmRegistrationForm.labels.code')}
            />
            <br />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Button
                  fullWidth
                  disableElevation
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  {!isSubmitting ? (
                    t('confirmRegistrationForm.buttons.submit')
                  ) : (
                    <CircularProgress size={14} />
                  )}
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  fullWidth
                  disableElevation
                  variant="outlined"
                  color="primary"
                  disabled={resendLoading}
                  onClick={onResendCodeClick}
                >
                  {!resendLoading ? (
                    t('confirmRegistrationForm.buttons.resend')
                  ) : (
                    <CircularProgress size={14} />
                  )}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </GoogleReCaptchaProvider>
  )
}

export default ConfirmRegistration
