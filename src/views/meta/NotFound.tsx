import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1
    }
  })
)

const NotFound: React.FC = () => {
  const classes = useStyles()

  return <div className={classes.root}>404</div>
}

export default NotFound
