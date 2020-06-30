import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1
    }
  })
)

const Canto: React.FC = () => {
  const classes = useStyles()

  return <div className={classes.root}>Pour canto here</div>
}

export default Canto
