import { Theme, withStyles, createStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'

export const SmallAvatar = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 22,
      height: 22,
      border: `2px solid ${theme.palette.background.paper}`
    }
  })
)(Avatar)
