import React from 'react'
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

interface ConfirmationDialogProps extends BasicDialogProps {
  title: string
  body?: string
  confirmButtonText?: string
  cancelButtonText?: string
  onConfirm: () => Promise<void>
}

const GenericConfirmationDialog: React.FC<ConfirmationDialogProps> = (
  props
) => {
  const {
    onClose,
    open,
    title,
    body,
    confirmButtonText,
    cancelButtonText,
    onConfirm
  } = props
  const { t } = useTranslation()

  return (
    <Dialog open={open} maxWidth="md" fullWidth={true}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {body ?? t('confirmationDialog.defaultBody')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disableElevation>
          {cancelButtonText ?? t('common.no')}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onConfirm}
          disableElevation
        >
          {confirmButtonText ?? t('common.yes')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default GenericConfirmationDialog
