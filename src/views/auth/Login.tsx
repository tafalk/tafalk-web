import React, { useContext } from 'react'
import { Link as RouterLink, useHistory } from 'react-router-dom'
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
import { AuthUserContext } from 'context/Auth'
import {
  emailMinLength,
  usernameMinLength,
  emailMaxLength,
  usernameMaxLength
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

const Login: React.FC = () => {
  const { executeRecaptcha } = useGoogleReCaptcha()
  if (executeRecaptcha) {
    executeRecaptcha('login_page')
  }
  const { t } = useTranslation()
  const classes = useStyles()
  let routerHistory = useHistory()
  const { setUser: setAuthUser } = useContext(AuthUserContext)
  const { enqueueSnackbar } = useSnackbar()

  const redirectMilliseconds = 500

  const formValidationSchema = () =>
    Yup.object().shape({
      usernameOrEmail: Yup.string()
        .min(
          Math.min(emailMinLength, usernameMinLength),
          t('common.validation.tooShort')
        )
        .max(
          Math.max(emailMaxLength, usernameMaxLength),
          t('common.validation.tooLong')
        )
        .matches(
          /^[A-Z0-9]+$/i,
          t('loginForm.validation.invalidUserNameOrEmail')
        )
        .required(t('common.validation.required')),
      password: Yup.string().required(t('common.validation.required'))
    })

  const onSubmitClick = async (values: any, { setSubmitting }: any) => {
    try {
      await Auth.signIn(values.usernameOrEmail, values.password)
      setAuthUser()

      // Push to home route
      routerHistory.push('/')
    } catch (err) {
      enqueueSnackbar(err.message ?? err, {
        variant: 'error',
        autoHideDuration: redirectMilliseconds
      })
      // Distinct sign in error types
      // For other types: https://aws-amplify.github.io/docs/js/authentication#sign-in
      if (err.code === 'UserNotFoundException') {
        // The error happens when the supplied username/email does not exist in the Cognito user pool
        setTimeout(() => {
          routerHistory.push('/auth/register')
        }, redirectMilliseconds)
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={GoogleRecaptchaV3Config.siteKey}>
      <Box mb={2} pl={1}>
        <Typography variant="h4" color="textSecondary">
          {t('loginForm.text.title')}
        </Typography>
      </Box>

      <Formik
        initialValues={{
          usernameOrEmail: '',
          password: ''
        }}
        validationSchema={formValidationSchema}
        onSubmit={onSubmitClick}
      >
        {({ submitForm, isSubmitting }) => (
          <Form className={classes.form}>
            <Field
              component={TextField}
              autoFocus
              name="usernameOrEmail"
              label={t('loginForm.labels.usernameOrEmail')}
              inputProps={{
                maxLength: Math.max(emailMaxLength, usernameMaxLength)
              }}
            ></Field>
            <Field
              component={TextField}
              type="password"
              name="password"
              label={t('loginForm.labels.password')}
            />

            <br />
            <br />
            <Grid container spacing={10} justify="space-between">
              <Grid item xs={12} md={6}>
                <Button
                  type="submit"
                  fullWidth
                  disableElevation
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  {!isSubmitting ? (
                    t('loginForm.buttons.submit')
                  ) : (
                    <CircularProgress size={14} />
                  )}
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container justify="flex-end" alignItems="center">
                  <RouterLink to="/auth/forgotPassword">
                    <Typography variant="subtitle1">
                      {t('loginForm.buttons.forgotPassword')}
                    </Typography>
                  </RouterLink>
                </Grid>
              </Grid>
            </Grid>
            <br />
            <br />
            <Divider />
            <br />
            <Grid container spacing={1}>
              {t('loginForm.text.noAccount')}&nbsp;
              <RouterLink to="/auth/register">
                {t('loginForm.buttons.register')}
              </RouterLink>
            </Grid>
          </Form>
        )}
      </Formik>
    </GoogleReCaptchaProvider>
  )
}

export default Login
