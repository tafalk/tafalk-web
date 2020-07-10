import React, { useState, useEffect, useContext, ReactNode } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Storage from '@aws-amplify/storage'
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Grid,
  Link,
  CardActionArea,
  IconButton,
  Box,
  Hidden,
  CardActions,
  Button
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { formatDistance, formatDistanceToNow } from 'date-fns'
import { getUserLocale } from 'utils/conversions'
import TimerIcon from 'mdi-material-ui/Timer'
import SeatFlatIcon from 'mdi-material-ui/SeatFlat'
import PlayIcon from 'mdi-material-ui/Play'
import BookmarkIcon from 'mdi-material-ui/Bookmark'
import CommentIcon from 'mdi-material-ui/Comment'
import { TFunction } from 'i18next'
import { AuthUserContext } from 'context/Auth'
import { GridListTileCardProps } from 'types/props'
import { getContentRoute } from 'utils/derivations'
import { useSnackbar } from 'notistack'

interface CardData {
  content?: ReactNode // or ReactElement?
  header: {
    avatar?: ReactNode
    title?: ReactNode
    subheader?: ReactNode
  }
  clickRoute: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      // width: theme.spacing(3),
      // height: theme.spacing(3)
    },
    card: {
      height: '100%'
    },
    cardHeader: {
      paddingBottom: theme.spacing(0.5)
    },
    title: {
      fontWeight: 'bold'
    }
  })
)

const getContent = (
  item: GridListTileCardProps['item'],
  classes: Record<any, string>
) => {
  if (['Stream', 'Canto'].includes(item.__typename)) {
    return (
      <span>
        {item.title && item.title.trim() ? (
          <span className={classes.title}>{item.title}&mdash;&nbsp;</span>
        ) : undefined}
        {item.body}
      </span>
    )
  }
  return undefined
}

const getHeaderAvatar = async (
  item: GridListTileCardProps['item'],
  classes: Record<any, string>
) => {
  if (!item.user?.profilePictureKey) return undefined
  const userProfilePictureObjectUrl = (await Storage.get(
    item.user.profilePictureKey,
    {
      level: 'protected',
      identityId: item.user.cognitoIdentityId
    }
  )) as string
  if (!userProfilePictureObjectUrl) return undefined
  return (
    <IconButton
      disableRipple
      component={RouterLink}
      to={`/u/${item.user.username}`}
    >
      <Avatar
        alt={item.user.username}
        className={classes.avatar}
        src={userProfilePictureObjectUrl}
      ></Avatar>
    </IconButton>
  )
}

const getHeaderTitle = (item: GridListTileCardProps['item']) => {
  return (
    <Link
      color="textSecondary"
      component={RouterLink}
      to={`/u/${item.user.username}`}
    >
      <Box fontWeight="fontWeightBold" fontSize="subtitle1.fontSize">
        {item.user.username}
      </Box>
    </Link>
  )
}

const getHeaderSubheader = (
  item: GridListTileCardProps['item'],
  type: GridListTileCardProps['type'],
  t: TFunction
) => {
  // Closures
  const getTimewiseDescription = () => {
    let results = []

    const startTime = new Date(item.startTime)

    if (type === 'sealedStream') {
      const sealTime = new Date(item.sealTime)
      results.push(
        // Time elapsed
        {
          expression: formatDistance(sealTime, startTime, {
            locale: getUserLocale(item.user.language)
          }),
          icon: <TimerIcon color="disabled" fontSize="small" />
        },
        // Time from seal
        {
          expression: formatDistanceToNow(sealTime, {
            locale: getUserLocale(item.user.language),
            addSuffix: true
          }),
          icon: <SeatFlatIcon color="disabled" fontSize="small" />
        }
      )
    } else {
      results.push(
        // Time elapsed
        {
          expression: formatDistanceToNow(startTime, {
            locale: getUserLocale(item.user.language),
            addSuffix: true
          }),
          icon: <TimerIcon color="disabled" fontSize="small" />
        }
      )

      if (['liveStream', 'liveCanto'].includes(type)) {
        results.push(
          // On fire!
          {
            expression: t('gridListTileCard.text.live'),
            icon: <PlayIcon htmlColor="red" fontSize="small" />
          }
        )
      }
    }
    return results.map((d) => {
      return (
        <Grid item key={`gli-${d.expression}`}>
          <Grid container direction="row" alignItems="center">
            <Grid item>{d.icon}&nbsp;</Grid>
            <Grid item>{d.expression}</Grid>
          </Grid>
        </Grid>
      )
    })
  }
  // Business logic
  if (item.__typename === 'Canto') {
    return (
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="space-between"
      >
        {/* Timewise Descriptions */}
        {getTimewiseDescription()}

        {/* Interactions */}
        <Grid item>
          {/* Bookmarks */}
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <BookmarkIcon color="disabled" fontSize="small" />
              &nbsp;
            </Grid>
            <Grid item>{item.bookmarkCount?.count ?? 0}</Grid>
          </Grid>
        </Grid>
        <Grid item>
          {/* Comments */}
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <CommentIcon color="disabled" fontSize="small" />
              &nbsp;
            </Grid>
            <Grid item>{item.commentCount?.count ?? 0}</Grid>
          </Grid>
        </Grid>
        <Grid item>
          {/* Watching Live */}
          {!item.isPaused && (
            <Grid container direction="row" alignItems="center">
              <Grid item>&nbsp;</Grid>
              <Grid item></Grid>
            </Grid>
          )}
        </Grid>
        <Grid item md={4} implementation="css" smDown component={Hidden} />
      </Grid>
    )
  }
  if (item.__typename === 'Stream') {
    return (
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="space-between"
      >
        {/* Timewise Descriptions */}
        {getTimewiseDescription()}

        {/* Interactions */}
        <Grid item>
          {/* Bookmarks */}
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <BookmarkIcon color="disabled" fontSize="small" />
              &nbsp;
            </Grid>
            <Grid item>{item.bookmarkCount?.count ?? 0}</Grid>
          </Grid>
        </Grid>
        <Grid item>
          {/* Comments */}
          {item.isSealed === 1 && (
            <Grid container direction="row" alignItems="center">
              <Grid item>
                <CommentIcon color="disabled" fontSize="small" />
                &nbsp;
              </Grid>
              <Grid item>{item.commentCount?.count ?? 0}</Grid>
            </Grid>
          )}
        </Grid>
        <Grid item>
          {/* Watching Live */}
          {!item.isSealed && (
            <Grid container direction="row" alignItems="center">
              <Grid item>&nbsp;</Grid>
              <Grid item></Grid>
            </Grid>
          )}
        </Grid>
        <Grid item md={4} implementation="css" smDown component={Hidden} />
      </Grid>
    )
  }
  return
}

const GridListTileCard: React.FC<GridListTileCardProps> = (props) => {
  const { item, type } = props
  const classes = useStyles()
  const { t } = useTranslation()
  const { user: authUser } = useContext(AuthUserContext)
  const [contentBlocked, setContentBlocked] = useState(false)
  const [showBlocked, setShowBlocked] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const [cardData, setCardData] = useState<CardData>()

  useEffect(() => {
    ;(async () => {
      try {
        const content = getContent(item, classes)
        const headerAvatar = await getHeaderAvatar(item, classes)
        const headerTitle = getHeaderTitle(item)
        const headerSubheader = getHeaderSubheader(item, type, t)
        // Blocked?
        const isContentBlocked =
          authUser?.userBlockInteractions?.some(
            (el: any) => el.targetUserId === item.user.id
          ) ?? false

        setContentBlocked(isContentBlocked)
        setCardData({
          content,
          header: {
            avatar: headerAvatar,
            title: headerTitle,
            subheader: headerSubheader
          },
          clickRoute: getContentRoute(item) ?? ''
        })
      } catch (err) {
        setCardData({
          content: undefined,
          header: {
            avatar: undefined,
            title: undefined,
            subheader: undefined
          },
          clickRoute: ''
        })
        enqueueSnackbar(err.message ?? err, {
          variant: 'error'
        })
      }
    })()
  }, [authUser, classes, enqueueSnackbar, item, t, type])

  return contentBlocked && !showBlocked ? (
    // Blocked Content
    <Card className={classes.card}>
      <CardContent component="p">
        <Box fontStyle="italic">{t('gridListTileCard.message.blocked')}</Box>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => setShowBlocked(true)}
          variant="contained"
          color="primary"
          disableElevation
        >
          {t('gridListTileCard.buttons.showAnyway')}
        </Button>
      </CardActions>
    </Card>
  ) : (
    // Regular Content
    <Card className={classes.card}>
      <CardActionArea component={RouterLink} to={cardData?.clickRoute ?? ''}>
        <CardHeader
          avatar={cardData?.header.avatar}
          title={cardData?.header.title}
          subheader={cardData?.header.subheader}
          className={classes.cardHeader}
        ></CardHeader>
        <CardContent component="p">{cardData?.content}</CardContent>
      </CardActionArea>
    </Card>
  )
}

export default GridListTileCard
