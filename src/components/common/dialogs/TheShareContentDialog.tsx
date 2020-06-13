import React, { useEffect, useState } from 'react'
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
import { httpSitePoliciesStorage } from 'httpCall'
import i18n from 'i18n'
import { useSiteMessage } from 'hooks'

interface ShareContentDialogProps extends BasicDialogProps {
  contentLink: string
}

const TheShareContentDialog: React.FC<ShareContentDialogProps> = (props) => {
  const { onClose, open, contentLink } = props
  const { t } = useTranslation()

  return (
    <Dialog open={open}>
      <DialogTitle>{t('shareContentDialog.title')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('shareContentDialog.body')}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={onClose}>
          {t('common.ok')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TheShareContentDialog
