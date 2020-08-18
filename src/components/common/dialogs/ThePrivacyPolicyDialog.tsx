import React, { useEffect, useState } from 'react'
import { BasicDialogProps } from 'types/props'
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  IconButton
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { httpSitePoliciesStorage } from 'httpCall'
import i18n from 'i18n'
import { useSnackbar } from 'notistack'
import CloseIcon from 'mdi-material-ui/Close'

const ThePrivacyPolicyDialog: React.FC<BasicDialogProps> = (props) => {
  const { onClose, open } = props
  const [body, setBody] = useState('')
  const { t } = useTranslation()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const s3PrivacyPolicyFolder = 'privacy-policy'

  useEffect(() => {
    httpSitePoliciesStorage
      .get(
        `${s3PrivacyPolicyFolder}/${
          i18n.language?.substring(0, 2) ?? 'en'
        }.html`
      )
      .then((resp) => {
        setBody(resp.data)
      })
      .catch((err) => {
        enqueueSnackbar(err.message ?? err, {
          variant: 'error',
          persist: true,
          action: (key) => (
            <React.Fragment>
              <IconButton
                aria-label="dismiss"
                onClick={() => {
                  closeSnackbar(key)
                }}
              >
                <CloseIcon />
              </IconButton>
            </React.Fragment>
          )
        })
      })
  }, [closeSnackbar, enqueueSnackbar])
  return (
    <Dialog open={open}>
      <DialogTitle>{t('agreements.privacyPolicy.title')}</DialogTitle>
      <DialogContent dangerouslySetInnerHTML={{ __html: body }}></DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={onClose}
          disableElevation
        >
          {t('common.ok')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ThePrivacyPolicyDialog
