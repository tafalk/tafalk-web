import React, { useState } from 'react'
import { BasicDialogProps } from 'types/props'
import {
  DialogContentText,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  TextField,
  InputAdornment,
  Tooltip,
  Zoom
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import ContentCopyIcon from 'mdi-material-ui/ContentCopy'

const tooltipShowDuration = 1000

interface ShareContentDialogProps extends BasicDialogProps {
  contentLink: string
}

const TheShareContentDialog: React.FC<ShareContentDialogProps> = (props) => {
  const { onClose, open, contentLink } = props
  const { t } = useTranslation()
  const [tooltipOpen, setTooltipOpen] = useState(false)

  // Functions
  const onCopyLink = () => {
    //TODO: Implement and show a small tooltip if successful
    document.execCommand('copy')
    setTooltipOpen(true)
    setTimeout(() => setTooltipOpen(false), tooltipShowDuration)
  }

  return (
    <Dialog open={open}>
      <DialogTitle>{t('shareContentDialog.title')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('shareContentDialog.body')}</DialogContentText>
        <Tooltip
          title={t('shareContentDialog.message.linkCopied') ?? ''}
          open={tooltipOpen}
          onOpen={(e) => e.preventDefault()}
          onClose={(e) => e.preventDefault()}
          TransitionComponent={Zoom}
        >
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
                  >
                    {t('shareContentDialog.buttons.copyLink')}
                  </Button>
                </InputAdornment>
              )
            }}
          />
        </Tooltip>
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
