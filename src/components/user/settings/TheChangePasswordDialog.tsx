import React from 'react'
import { useHistory } from 'react-router-dom'
import Auth from '@aws-amplify/auth'
import { BasicDialogProps } from 'types/props'
import {
  DialogContentText,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  CircularProgress,
  makeStyles,
  createStyles,
  Theme
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { Formik, Form, Field } from 'formik'
import FormikTextField from 'components/common/wrappers/TheHelpedFormikTextField'
import * as Yup from 'yup'
import {
  passwordMinLength,
  passwordMaxLength,
  passwordRegex
} from 'utils/constants'
import { useSnackbar } from 'notistack'

interface ChangePasswordDialogProps extends BasicDialogProps {}

const redirectMilliseconds = 500

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '100%',
        justify: 'center'
      }
    }
  })
)

const TheChangePasswordDialog: React.FC<ChangePasswordDialogProps> = (
  props
) => {
  const { onClose, open } = props
  const classes = useStyles()
  const { t } = useTranslation()
  let routerHistory = useHistory()
  const { enqueueSnackbar } = useSnackbar()

  // validation schema
  const changePasswordFormValidationSchema = () =>
    Yup.object().shape({
      oldPassword: Yup.string().required(t('common.validation.required')),
      newPassword: Yup.string()
        .min(passwordMinLength, t('common.validation.tooShort'))
        .max(passwordMaxLength, t('common.validation.tooLong'))
        .matches(
          passwordRegex,
          t(
            'settings.tabs.account.basicInfo.changePassword.dialog.validation.weakPassword'
          )
        )
        .required(t('common.validation.required')),
      retypeNewPassword: Yup.string()
        .oneOf(
          [Yup.ref('password'), null],
          'settings.tabs.account.basicInfo.changePassword.dialog.validation.passwordsNotMatch'
        )
        .required(t('common.validation.required'))
    })

  // Functions
  const onClickChangePassword = async (values: any, { setSubmitting }: any) => {
    try {
      setSubmitting(true)
      await Auth.changePassword(
        await Auth.currentAuthenticatedUser(),
        values.oldPassword,
        values.newPassword
      )
      await Auth.signOut()
      enqueueSnackbar(
        t(
          'settings.tabs.account.basicInfo.changePassword.dialog.message.success'
        ),
        {
          variant: 'success',
          autoHideDuration: redirectMilliseconds
        }
      )
      setTimeout(() => {
        routerHistory.push('/auth/login')
      }, redirectMilliseconds)
    } catch (err) {
      enqueueSnackbar(err.message ?? err, {
        variant: 'error'
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Formik
      initialValues={{
        oldPassword: '',
        newPassword: '',
        retypeNewPassword: ''
      }}
      validationSchema={changePasswordFormValidationSchema}
      onSubmit={onClickChangePassword}
    >
      {({ submitForm, isSubmitting }) => (
        <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
          <DialogTitle>
            {t('settings.tabs.account.basicInfo.changePassword.dialog.title')}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {t('settings.tabs.account.basicInfo.changePassword.dialog.body')}
            </DialogContentText>
            <Form className={classes.form}>
              <Field
                component={FormikTextField}
                type="password"
                name="oldPassword"
                label={t(
                  'settings.tabs.account.basicInfo.changePassword.dialog.labels.oldPassword'
                )}
              />
              <Field
                component={FormikTextField}
                type="password"
                name="newPassword"
                label={t(
                  'settings.tabs.account.basicInfo.changePassword.dialog.labels.newPassword'
                )}
              />
              <Field
                component={FormikTextField}
                type="password"
                name="retypeNewPassword"
                label={t(
                  'settings.tabs.account.basicInfo.changePassword.dialog.labels.retypeNewPassword'
                )}
              />
            </Form>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>{t('common.cancel')}</Button>
            <Button
              type="submit"
              onClick={submitForm}
              variant="contained"
              color="secondary"
              autoFocus
              disabled={isSubmitting}
            >
              {!isSubmitting ? (
                t('common.delete')
              ) : (
                <CircularProgress size={14} />
              )}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Formik>
  )
}

export default TheChangePasswordDialog
