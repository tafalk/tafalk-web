import React, { useState, useContext } from 'react'
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
  TextField,
  CircularProgress
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { useSiteMessage } from 'hooks'
import { AuthUserContext } from 'context/Auth'

interface ChangeEmailDialogProps extends BasicDialogProps {}

const redirectMilliseconds = 500

const TheChangeEmailDialog: React.FC<ChangeEmailDialogProps> = (props) => {
  const { onClose, open } = props
  const { t } = useTranslation()
  let routerHistory = useHistory()
  const { user: authUser } = useContext(AuthUserContext)
  const [newEmail, setNewEmail] = useState('')
  const [emailChangeInProgress, setEmailChangeInProgress] = useState(false)
  const [, setSiteMessageData] = useSiteMessage()

  // Functions
  const onClickChangeEmail = async () => {
    if (!newEmail || !/\S+@\S+\.\S+/.test(newEmail)) {
      setSiteMessageData({
        show: true,
        type: 'error',
        timeout: null,
        text: t('common.validation.invalidEntry')
      })
      return
    }
    try {
      setEmailChangeInProgress(true)
      await Auth.updateUserAttributes(await Auth.currentAuthenticatedUser(), {
        email: newEmail
      })
      setSiteMessageData({
        show: true,
        text: t(
          'settings.tabs.account.basicInfo.changeEmail.dialog.message.success'
        ),
        type: 'success',
        timeout: redirectMilliseconds
      })
      setTimeout(() => {
        routerHistory.push({
          pathname: '/auth/confirmRegistration',
          search: `?${new URLSearchParams({ u: authUser.username })}`
        })
      }, redirectMilliseconds)
    } catch (err) {
      setSiteMessageData({
        show: true,
        type: 'error',
        timeout: null,
        text: err.message ?? err
      })
    } finally {
      setEmailChangeInProgress(false)
    }
  }

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>
        {t('settings.tabs.account.basicInfo.changeEmail.dialog.title')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('settings.tabs.account.basicInfo.changeEmail.dialog.body')}
        </DialogContentText>
        {/** New Email Text Field */}
        <TextField
          type="email"
          label={t(
            'settings.tabs.account.basicInfo.changeEmail.dialog.labels.newEmail'
          )}
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('common.cancel')}</Button>
        <Button
          onClick={onClickChangeEmail}
          variant="contained"
          color="primary"
          autoFocus
          disabled={emailChangeInProgress}
        >
          {!emailChangeInProgress ? (
            t('common.submit')
          ) : (
            <CircularProgress size={14} />
          )}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TheChangeEmailDialog
