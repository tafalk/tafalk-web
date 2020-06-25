import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Auth from '@aws-amplify/auth'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

import {
  Grid,
  Button,
  CircularProgress,
  Divider,
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
import {
  usernameMinLength,
  usernameMaxLength,
  passwordMinLength,
  passwordMaxLength
} from 'utils/constants'
import { useSnackbar } from 'notistack'

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

const ForgotPassword: React.FC = () => {
  const { executeRecaptcha } = useGoogleReCaptcha()
  if (executeRecaptcha) {
    executeRecaptcha('forgot_password_page')
  }
  const { t } = useTranslation()
  const classes = useStyles()
  let routerHistory = useHistory()
  const [codeHasSent, setCodeHasSent] = useState(false)
  const usernameRef = useRef<HTMLInputElement>(null)
  const { enqueueSnackbar } = useSnackbar()

  const redirectMilliseconds = 500

  const usernameFormValidationSchema = () =>
    Yup.object().shape({
      username: Yup.string()
        .min(usernameMinLength, t('common.validation.tooShort'))
        .max(usernameMaxLength, t('common.validation.tooLong'))
        .matches(
          /^[A-Z0-9]+$/i,
          t('forgotPasswordForm.validation.invalidUsername')
        )
        .required(t('common.validation.required'))
    })
  const newPasswordFormValidationSchema = () =>
    Yup.object().shape({
      password: Yup.string()
        .min(passwordMinLength, t('common.validation.tooShort'))
        .max(passwordMaxLength, t('common.validation.tooLong'))
        .matches(
          /^(?=.*\d)(?=.*[.!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/i,
          t('forgotPasswordForm.validation.weakPassword')
        )
        .required(t('common.validation.required')),
      retypePassword: Yup.string()
        .oneOf(
          [Yup.ref('password'), null],
          'forgotPasswordForm.validation.passwordsNotMatch'
        )
        .required(t('common.validation.required'))
    })
  const onUsernameSubmitClick = async (values: any, { setSubmitting }: any) => {
    try {
      await Auth.forgotPassword(values.username)
      setCodeHasSent(true)
    } catch (err) {
      // Set site message
      enqueueSnackbar(err.message ?? err, {
        variant: 'error',
        autoHideDuration: redirectMilliseconds
      })
    } finally {
      setSubmitting(false)
    }
  }
  const onNewPasswordSubmitClick = async (
    values: any,
    { setSubmitting }: any
  ) => {
    try {
      await Auth.forgotPasswordSubmit(
        usernameRef.current?.value ?? '',
        values.code,
        values.password
      )
      enqueueSnackbar(t('forgotPasswordForm.message.success'), {
        variant: 'success',
        autoHideDuration: redirectMilliseconds
      })
      setTimeout(() => {
        routerHistory.push('/auth/login')
      }, redirectMilliseconds)
    } catch (err) {
      enqueueSnackbar(err.message ?? err, {
        variant: 'error',
        autoHideDuration: redirectMilliseconds
      })
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <GoogleReCaptchaProvider reCaptchaKey={GoogleRecaptchaV3Config.siteKey}>
      <Box mb={2} pl={1}>
        <Typography variant="h4" color="textSecondary">
          {t('forgotPasswordForm.text.title')}
        </Typography>
        <br />
        <Typography color="textSecondary">
          {t('forgotPasswordForm.text.description')}
        </Typography>
      </Box>
      {/* User Name */}
      <Formik
        initialValues={{
          username: ''
        }}
        validationSchema={usernameFormValidationSchema}
        onSubmit={onUsernameSubmitClick}
      >
        {({ submitForm, isSubmitting }) => (
          <Form className={classes.form}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  autoFocus
                  name="username"
                  label={t('forgotPasswordForm.labels.username')}
                  inputProps={{
                    maxLength: usernameMaxLength
                  }}
                  ref={usernameRef}
                ></Field>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  disableElevation
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  {!isSubmitting ? (
                    !codeHasSent ? (
                      t('forgotPasswordForm.buttons.usernameSubmit')
                    ) : (
                      t('forgotPasswordForm.buttons.usernameResubmit')
                    )
                  ) : (
                    <CircularProgress size={14} />
                  )}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <br />
      <Typography color="textSecondary">
        {codeHasSent ? t('forgotPasswordForm.text.checkYourEmail') : ' '}
      </Typography>
      <Divider />
      {/* New Password Name */}
      <Formik
        initialValues={{
          code: '',
          password: '',
          retypepassword: ''
        }}
        validationSchema={newPasswordFormValidationSchema}
        onSubmit={onNewPasswordSubmitClick}
      >
        {({ submitForm, isSubmitting }) => (
          <Form className={classes.form}>
            <Field
              component={TextField}
              name="code"
              label={t('forgotPasswordForm.labels.code')}
              disabled={!codeHasSent}
            />
            <Field
              component={TextField}
              type="password"
              name="password"
              label={t('forgotPasswordForm.labels.password')}
            />
            <Field
              component={TextField}
              type="password"
              name="retypePassword"
              label={t('forgotPasswordForm.labels.retypePassword')}
            />
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <Button
                  fullWidth
                  disableElevation
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting || !codeHasSent}
                  onClick={submitForm}
                >
                  {!isSubmitting ? (
                    t('forgotPasswordForm.buttons.changePassword')
                  ) : (
                    <CircularProgress size={14} />
                  )}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <Divider />
    </GoogleReCaptchaProvider>
  )
}

export default ForgotPassword
