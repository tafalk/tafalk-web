import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1
    }
  })
)

const NotFound: React.FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography variant="h1" color="textPrimary">
        404
      </Typography>
    </div>
  )
}

export default NotFound
