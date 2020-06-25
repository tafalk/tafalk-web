import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Auth from '@aws-amplify/auth'
import API, { graphqlOperation } from '@aws-amplify/api'
import { BasicDialogProps } from 'types/props'
import {
  DialogContentText,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  CircularProgress
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { AuthUserContext } from 'context/Auth'
import { DeleteUserById } from 'graphql/custom'
import { useSnackbar } from 'notistack'

interface DeleteAccountConfirmationDialogProps extends BasicDialogProps {}

const TheDeleteAccountConfirmationDialog: React.FC<DeleteAccountConfirmationDialogProps> = (
  props
) => {
  const { onClose, open } = props
  const { t } = useTranslation()
  let routerHistory = useHistory()
  const { user: authUser } = useContext(AuthUserContext)
  const [deleteAccountInProgress, setDeleteAccountInProgress] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  // Functions
  const onClickDeleteAccount = async () => {
    try {
      setDeleteAccountInProgress(true)
      let currAuthUser = await Auth.currentAuthenticatedUser()

      await new Promise((res, rej) =>
        currAuthUser.deleteUser((err: any) => {
          if (err) {
            enqueueSnackbar(err.message ?? err, {
              variant: 'error'
            })
            return
          }
        })
      )
      await API.graphql(
        graphqlOperation(DeleteUserById, {
          userId: authUser.id
        })
      )
      await Auth.signOut()
      routerHistory.push('/auth/farewell')
    } catch (err) {
      enqueueSnackbar(err.message ?? err, {
        variant: 'error'
      })
    } finally {
      setDeleteAccountInProgress(false)
    }
  }

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>
        {t('settings.tabs.account.basicInfo.deleteAccount.dialog.title')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('settings.tabs.account.basicInfo.deleteAccount.dialog.body')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('common.cancel')}</Button>
        <Button
          onClick={onClickDeleteAccount}
          variant="contained"
          color="secondary"
          autoFocus
          disabled={deleteAccountInProgress}
        >
          {!deleteAccountInProgress ? (
            t('common.delete')
          ) : (
            <CircularProgress size={14} />
          )}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TheDeleteAccountConfirmationDialog
