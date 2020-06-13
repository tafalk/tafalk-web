import React, { useState, useRef } from 'react'
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
  const copyLinkTextFieldRef = useRef<HTMLInputElement>()
  const { t } = useTranslation()
  const [tooltipOpen, setTooltipOpen] = useState(false)

  // Functions
  const onCopyLink = () => {
    console.log(copyLinkTextFieldRef.current?.value)
    copyLinkTextFieldRef.current?.select()
    document.execCommand('copy')
    setTooltipOpen(true)
    setTimeout(() => setTooltipOpen(false), tooltipShowDuration)
  }

  return (
    <Dialog open={open} maxWidth="lg">
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
            inputRef={copyLinkTextFieldRef}
            InputProps={{
              readOnly: true,
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

export default TheShareContentDialog
