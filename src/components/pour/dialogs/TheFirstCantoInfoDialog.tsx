import React from 'react'
import { useTranslation } from 'react-i18next'
import { BasicDialogProps } from 'types/props'
import {
  makeStyles,
  Theme,
  createStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@material-ui/core'
import { siteImagesBaseUrl } from 'utils/constants'

interface FirstCantoInfoDialogProps extends BasicDialogProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1
    },
    image: {
      width: '100%'
    }
  })
)

const TheFirstCantoInfoDialog: React.FC<FirstCantoInfoDialogProps> = (
  props
) => {
  const { onClose, open } = props
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>{t('pour.dialogs.firstCanto.title')}</DialogTitle>
      <DialogContent>
        <img
          alt="Ezra Pound Doodle"
          src={`${siteImagesBaseUrl}/webp/ezra-pound-doodle.webp`}
          className={classes.image}
        ></img>
        <DialogContentText>
          {t('pour.dialogs.firstCanto.body')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          disableElevation
        >
          {t('common.ok')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TheFirstCantoInfoDialog
