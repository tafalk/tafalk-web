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
import { ContentType } from 'types/appsync/API'

interface FlagContentDialogProps extends BasicDialogProps {
  contentType: ContentType
  contentId: string
  flaggerUserId: string
  // For edit
  flagId?: string
}

const FlagContentDialog: React.FC<FlagContentDialogProps> = (props) => {
  const { onClose, open, contentType, contentId, flaggerUserId, flagId } = props
  const { t } = useTranslation()

  // TODO: useEffect if flagId exists to load existing flag i.e. category, type, detail

  return (
    <Dialog open={open} maxWidth="md" fullWidth={true}>
      <DialogTitle>{t('flagContentDialog.title')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('flagContentDialog.body')}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disableElevation>
          {t('common.no')}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            return
          }}
          disableElevation
        >
          {t('common.yes')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default FlagContentDialog
