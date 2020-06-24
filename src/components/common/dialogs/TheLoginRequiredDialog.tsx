import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { BasicDialogProps } from 'types/props'
import {
  DialogContentText,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import LoginIcon from 'mdi-material-ui/Login'

interface ShareContentDialogProps extends BasicDialogProps {
  customTitle?: string
  customBody?: string
}

const TheLoginRequiredDialog: React.FC<ShareContentDialogProps> = (props) => {
  const { onClose, open, customTitle, customBody } = props
  const { t } = useTranslation()

  return (
    <Dialog open={open} maxWidth="md" fullWidth={true}>
      <DialogTitle>{customTitle ?? t('loginRequiredDialog.title')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {customBody ?? t('loginRequiredDialog.body')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disableElevation>
          {t('common.cancel')}
        </Button>
        <Button
          variant="contained"
          color="primary"
          disableElevation
          startIcon={<LoginIcon />}
          component={RouterLink}
          to="/auth/login"
        >
          {t('loginRequiredDialog.buttons.redirectToLogin')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TheLoginRequiredDialog
