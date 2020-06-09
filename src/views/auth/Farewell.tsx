import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { deepOrange } from '@material-ui/core/colors'

import { Grid, Button, Typography, Hidden } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      '& .MuiTypography-colorTextPrimary': deepOrange
    }
  })
)

const Farewell: React.FC = () => {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <Grid
      container
      spacing={1}
      alignItems="center"
      justify="center"
      className={classes.root}
    >
      <Typography variant="h1" color="textPrimary">
        {t('farewell.text.title')}&nbsp;
      </Typography>
      <br />
      <Typography variant="h5" color="textSecondary">
        {t('farewell.text.body')}
      </Typography>
      <br />
      <Grid item md={6} implementation="css" smDown component={Hidden} />
      <Grid item xs={6}>
        <Button
          fullWidth
          disableElevation
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/"
        >
          {t('farewell.buttons.returnHome')}
        </Button>
      </Grid>
    </Grid>
  )
}

export default Farewell
