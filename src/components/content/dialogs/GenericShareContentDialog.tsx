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
  Tooltip,
  Zoom,
  Grid
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import ContentCopyIcon from 'mdi-material-ui/ContentCopy'

const tooltipShowDuration = 1000

interface ShareContentDialogProps extends BasicDialogProps {
  contentLink: string
}

const GenericShareContentDialog: React.FC<ShareContentDialogProps> = (
  props
) => {
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
    <Dialog open={open} maxWidth="md" fullWidth={true}>
      <DialogTitle>{t('shareContentDialog.title')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('shareContentDialog.body')}</DialogContentText>
        <Grid container alignItems="center" justify="space-between" spacing={1}>
          <Grid item xs={10}>
            <Tooltip
              title={t('shareContentDialog.message.linkCopied') ?? ''}
              open={tooltipOpen}
              onOpen={(e) => e.preventDefault()}
              onClose={(e) => e.preventDefault()}
              TransitionComponent={Zoom}
            >
              <TextField
                defaultValue={contentLink}
                fullWidth
                inputRef={copyLinkTextFieldRef}
                InputProps={{
                  readOnly: true
                }}
              />
            </Tooltip>
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="outlined"
              color="primary"
              disableElevation
              fullWidth
              startIcon={<ContentCopyIcon />}
              onClick={onCopyLink}
            >
              {t('shareContentDialog.buttons.copyLink')}
            </Button>
          </Grid>
        </Grid>
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

export default GenericShareContentDialog
