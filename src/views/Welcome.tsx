import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { hasVisitedBeforeCookieName, siteImagesBaseUrl } from 'utils/constants'
import {
  createStyles,
  Container,
  makeStyles,
  Theme,
  Box,
  Typography,
  Fab
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import HomeIcon from 'mdi-material-ui/Home'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    textContainer: {
      paddingTop: theme.spacing(3),
      height: '250px'
    },
    imageContainer: {
      height: '70vh',
      // Parallax effect
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      // breakpoint
      [theme.breakpoints.up('md')]: {
        backgroundSize: '50% 50%'
      }
    },
    generalImageContainer: {
      backgroundImage: `url(${siteImagesBaseUrl}/webp/intro_doodle_1.webp)`
    },
    streamsImageContainer: {
      backgroundImage: `url(${siteImagesBaseUrl}/webp/intro_doodle_2.webp)`
    },
    cantosImageContainer: {
      backgroundImage: `url(${siteImagesBaseUrl}/webp/intro_doodle_3.webp)`
    },
    homeFab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    }
  })
)

const Welcome: React.FC = () => {
  const { t } = useTranslation()
  let routerHistory = useHistory()
  const classes = useStyles()
  const [, setCookie] = useCookies([hasVisitedBeforeCookieName])

  // Side Effects
  useEffect(() => {
    ;(async () => {
      setCookie(hasVisitedBeforeCookieName, true, { path: '/' })
    })()
  }, [setCookie])

  // TODO: Parallax for new visitor, instead of a dialog.
  return (
    <React.Fragment>
      {/** General */}
      <Typography component="div">
        <Box
          className={classes.textContainer}
          alignItems="center"
          fontSize="h4.fontSize"
        >
          {t('intro.paragraph.basic')}
        </Box>
      </Typography>
      <Container
        component="div"
        disableGutters
        className={`${classes.imageContainer} ${classes.generalImageContainer}`}
      >
        <div></div>
      </Container>
      {/** Streams */}
      <Typography component="div">
        <Box
          className={classes.textContainer}
          alignItems="center"
          fontSize="h4.fontSize"
        >
          {t('intro.paragraph.streams')}
        </Box>
      </Typography>
      <Container
        component="div"
        disableGutters
        className={`${classes.imageContainer} ${classes.streamsImageContainer}`}
      >
        <div></div>
      </Container>
      {/** Streams */}
      <Typography component="div">
        <Box
          className={classes.textContainer}
          alignContent="center"
          fontSize="h4.fontSize"
        >
          {t('intro.paragraph.cantos')}
        </Box>
      </Typography>
      <Container
        component="div"
        disableGutters
        className={`${classes.imageContainer} ${classes.cantosImageContainer}`}
      >
        <div></div>
      </Container>

      {/** Home Button */}
      <Fab
        color="primary"
        size="large"
        aria-label="home"
        className={classes.homeFab}
        onClick={() => routerHistory.push('/')}
      >
        <HomeIcon />
      </Fab>
    </React.Fragment>
  )
}
export default Welcome
