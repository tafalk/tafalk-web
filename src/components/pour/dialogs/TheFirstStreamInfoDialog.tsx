import React from 'react'
import {
  DialogContent,
  makeStyles,
  Theme,
  createStyles,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
  Container
} from '@material-ui/core'
import { BasicDialogProps } from 'types/props'
import { useTranslation } from 'react-i18next'
import { siteImagesBaseUrl } from 'utils/constants'

interface FirstStreamInfoDialogProps extends BasicDialogProps {}

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

const TheFirstStreamInfoDialog: React.FC<FirstStreamInfoDialogProps> = (
  props
) => {
  const { onClose, open } = props
  const classes = useStyles()
  const { t } = useTranslation()

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>{t('pour.dialogs.firstStream.title')}</DialogTitle>
      <DialogContent>
        <Container component="div" disableGutters className={classes.image}>
          <div></div>
        </Container>
        <img
          alt="Virginia Woolf Doodle"
          src={`${siteImagesBaseUrl}/webp/virginia-woolf-doodle.webp`}
          className={classes.image}
        ></img>
        <DialogContentText>
          {t('pour.dialogs.firstStream.body')}
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

export default TheFirstStreamInfoDialog
