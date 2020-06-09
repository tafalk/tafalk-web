import React, { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme
} from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    }
  })
)

const NotFound: React.FC = () => {
  const theme = useTheme()
  const classes = useStyles()

  return <div className={classes.root}>404</div>
}

export default NotFound
