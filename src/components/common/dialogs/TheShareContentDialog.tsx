import React, { useEffect, useState } from 'react'
import { BasicDialogProps } from 'types/props'
import {
  DialogContentText,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  TextField,
  InputAdornment
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import ContentCopyIcon from 'mdi-material-ui/ContentCopy'

interface ShareContentDialogProps extends BasicDialogProps {
  contentLink: string
}

const TheShareContentDialog: React.FC<ShareContentDialogProps> = (props) => {
  const { onClose, open, contentLink } = props
  const { t } = useTranslation()

  // Functions
  const onCopyLink = () => {
    //TODO: Implement and show a small tooltip if successful
    return
  }

  return (
    <Dialog open={open}>
      <DialogTitle>{t('shareContentDialog.title')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('shareContentDialog.body')}</DialogContentText>
        <TextField
          defaultValue={contentLink}
          disabled
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  startIcon={<ContentCopyIcon />}
                  onClick={onCopyLink}
                ></Button>
              </InputAdornment>
            )
          }}
        />
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
