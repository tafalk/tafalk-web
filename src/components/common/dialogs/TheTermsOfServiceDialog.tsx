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

const TheTermsOfServiceDialog: React.FC<BasicDialogProps> = (props) => {
  const { onClose, open } = props
  const [body, setBody] = useState('')
  const { t } = useTranslation()
  const [, setSiteMessageData] = useSiteMessage()
  const s3TermsOfUseFolder = 'terms-of-use'

  useEffect(() => {
    httpSitePoliciesStorage
      .get(`${s3TermsOfUseFolder}/${i18n.language || 'en'}.html`)
      .then((resp) => {
        setBody(resp.data)
      })
      .catch((err) => {
        setSiteMessageData({
          show: true,
          type: 'error',
          timeout: null,
          text: err.message ?? err
        })
      })
  }, [setSiteMessageData])
  return (
    <Dialog open={open}>
      <DialogTitle>{t('agreements.termsOfService.title')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{body}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={onClose}>
          {t('common.ok')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TheTermsOfServiceDialog
