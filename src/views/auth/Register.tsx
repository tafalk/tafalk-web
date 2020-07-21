import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation, Trans } from 'react-i18next'
import Auth from '@aws-amplify/auth'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import {
  Grid,
  Button,
  CircularProgress,
  Typography,
  Box,
  FormControlLabel,
  Link
} from '@material-ui/core'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns'
import TextField from 'components/common/wrappers/TheHelpedFormikTextField'
import KeyboardDatePicker from 'components/common/wrappers/TheHelpedFormikKeyboardDatePicker'
import Checkbox from 'components/common/wrappers/TheFormikCheckBox'
import {
  nameMinLength,
  nameMaxLength,
  usernameMinLength,
  usernameMaxLength,
  emailMinLength,
  emailMaxLength,
  passwordMinLength,
  passwordMaxLength,
  passwordRegex,
  emailRegex
} from 'utils/constants'
import { getMaxDateFor18OrMoreYearsOld } from 'utils/validations'
import { useSnackbar } from 'notistack'

const TafalkTermsOfServiceDialog = React.lazy(() =>
  import('components/common/dialogs/TheTermsOfServiceDialog')
)
const TafalkPrivacyPolicyDialog = React.lazy(() =>
  import('components/common/dialogs/ThePrivacyPolicyDialog')
)

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

const Register: React.FC = () => {
  const { t } = useTranslation()
  const classes = useStyles()
  let routerHistory = useHistory()
  const [termsOfServiceDialogOpen, setTermsOfServiceDialogOpen] = useState(
    false
  )
  const [privacyPolicyDialogOpen, setPrivacyPolicyDialogOpen] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const maxBirthDate = getMaxDateFor18OrMoreYearsOld()

  const formValidationSchema = () =>
    Yup.object().shape({
      firstName: Yup.string()
        .min(nameMinLength, t('common.validation.tooShort'))
        .max(nameMaxLength, t('common.validation.tooLong'))
        .required(t('common.validation.required')),
      lastName: Yup.string()
        .min(nameMinLength, t('common.validation.tooShort'))
        .max(nameMaxLength, t('common.validation.tooLong'))
        .required(t('common.validation.required')),
      username: Yup.string()
        .min(usernameMinLength, t('common.validation.tooShort'))
        .max(usernameMaxLength, t('common.validation.tooLong'))
        .matches(/^[A-Z0-9]+$/i, t('registerForm.validation.invalidUsername'))
        .required(t('common.validation.required')),
      email: Yup.string()
        .min(emailMinLength, t('common.validation.tooShort'))
        .max(emailMaxLength, t('common.validation.tooLong'))
        .matches(emailRegex, t('registerForm.validation.invalidEmail'))
        .required(t('common.validation.required')),
      password: Yup.string()
        .min(passwordMinLength, t('common.validation.tooShort'))
        .max(passwordMaxLength, t('common.validation.tooLong'))
        .matches(passwordRegex, t('registerForm.validation.weakPassword'))
        .required(t('common.validation.required')),
      retypePassword: Yup.string()
        .oneOf(
          [Yup.ref('password'), null],
          'registerForm.validation.passwordsNotMatch'
        )
        .required(t('common.validation.required')),
      birthDate: Yup.date().required(t('common.validation.required')),
      termsAgreed: Yup.boolean().oneOf(
        [true],
        t('common.validation.mustAccept')
      )
    })

  const onSubmitClick = async (values: any, { setSubmitting }: any) => {
    try {
      await Auth.signUp({
        username: values.username,
        password: values.password,
        attributes: {
          email: values.email,
          birthdate: values.birthDate,
          name: values.firstName,
          family_name: values.lastName
        }
      })

      // Push to home route
      routerHistory.push({
        pathname: '/auth/confirmRegistration',
        search: `?${new URLSearchParams({ u: values.username })}`
      })
    } catch (err) {
      enqueueSnackbar(err.message ?? err, {
        variant: 'error'
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <React.Fragment>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Box mb={2} pl={1}>
          <Typography variant="h4" color="textSecondary">
            {t('registerForm.text.title')}
          </Typography>
        </Box>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            retypePassword: '',
            birthDate: null,
            termsAgreed: false
          }}
          validationSchema={formValidationSchema}
          onSubmit={onSubmitClick}
        >
          {({ submitForm, isSubmitting }) => (
            <Form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Field
                    component={TextField}
                    autoFocus
                    name="firstName"
                    label={t('registerForm.labels.firstName')}
                    inputProps={{
                      maxLength: nameMaxLength
                    }}
                  ></Field>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Field
                    component={TextField}
                    name="lastName"
                    label={t('registerForm.labels.lastName')}
                    inputProps={{
                      maxLength: nameMaxLength
                    }}
                  ></Field>
                </Grid>
              </Grid>
              <Field
                component={TextField}
                name="username"
                label={t('registerForm.labels.username')}
                inputProps={{
                  maxLength: usernameMaxLength
                }}
              ></Field>
              <Field
                component={TextField}
                name="email"
                label={t('registerForm.labels.email')}
                inputProps={{
                  maxLength: emailMaxLength
                }}
              ></Field>
              <Field
                component={TextField}
                type="password"
                name="password"
                label={t('registerForm.labels.password')}
              />
              <Field
                component={TextField}
                type="password"
                name="retypePassword"
                label={t('registerForm.labels.retypePassword')}
              />
              <Field
                component={KeyboardDatePicker}
                name="birthDate"
                label={t('registerForm.labels.birthDate')}
                format="MM/dd/yyyy"
                disableFuture
                invalidDateMessage={t(
                  'registerForm.validation.invalidDateFormat'
                )}
                maxDate={maxBirthDate}
                maxDateMessage={t('registerForm.validation.invalidBirthDate')}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              ></Field>
              <FormControlLabel
                control={<Checkbox name="termsAgreed" value={false} />}
                label={
                  <Trans i18nKey="registerForm.labels.terms">
                    Do you agree the{' '}
                    <Link onClick={() => setTermsOfServiceDialogOpen(true)}>
                      {' '}
                      terms of service
                    </Link>{' '}
                    and{' '}
                    <Link onClick={() => setPrivacyPolicyDialogOpen(true)}>
                      {' '}
                      privacy policy
                    </Link>
                    ?
                  </Trans>
                }
              />

              <Grid container spacing={1}>
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
                      t('registerForm.buttons.submit')
                    ) : (
                      <CircularProgress size={14} />
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </MuiPickersUtilsProvider>
      {/* Dialogs */}
      <TafalkTermsOfServiceDialog
        open={termsOfServiceDialogOpen}
        onClose={() => setTermsOfServiceDialogOpen(false)}
      />
      <TafalkPrivacyPolicyDialog
        open={privacyPolicyDialogOpen}
        onClose={() => setPrivacyPolicyDialogOpen(false)}
      />
    </React.Fragment>
  )
}

export default Register
