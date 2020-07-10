import React, { useState, useEffect, ReactNode } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Storage from '@aws-amplify/storage'
import {
  watchUserValue,
  blockUserValue,
  bookmarkContentValue
} from 'utils/constants'
import {
  Card,
  CardActionArea,
  CardHeader,
  CardContent,
  IconButton,
  Avatar,
  Button,
  Link,
  Box,
  Grid,
  Hidden
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { TileCardProps } from 'types/props'
import { Skeleton } from '@material-ui/lab'
import { getContentRoute } from 'utils/derivations'
import TimerIcon from 'mdi-material-ui/Timer'
import SeatFlatIcon from 'mdi-material-ui/SeatFlat'
import PlayIcon from 'mdi-material-ui/Play'
import BookmarkIcon from 'mdi-material-ui/Bookmark'
import BookmarkOffIcon from 'mdi-material-ui/BookmarkOff'
import CommentIcon from 'mdi-material-ui/Comment'
import StarOffIcon from 'mdi-material-ui/StarOff'
import AdjustIcon from 'mdi-material-ui/Adjust'
import { TFunction } from 'i18next'
import { formatDistance, formatDistanceToNow } from 'date-fns'
import { getUserLocale } from 'utils/conversions'
import { useSnackbar } from 'notistack'

interface CardData {
  content?: ReactNode
  header: {
    avatar?: ReactNode
    title?: ReactNode
    subheader?: ReactNode
    action?: ReactNode
  }
  clickRoute: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    avatar: {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main
    },
    card: {
      height: '100%'
    },
    title: {
      fontWeight: 'bold'
    }
  })
)

// Functions
const getContent = (
  item: TileCardProps['item'],
  classes: Record<any, string>
) => {
  if (item.__typename === 'Canto') {
    return <div>{item.body}</div>
  }
  if (item.__typename === 'Stream') {
    return (
      <div>
        {item.title && item.title.trim() ? (
          <span className={classes.title}>{item.title}&mdash;&nbsp;</span>
        ) : undefined}
        {item.body}
      </div>
    )
  }
  if (item.__typename === 'Comment') {
    return <div>{item.body}</div>
  }
  return undefined
}

const getHeaderAvatar = async (
  item: TileCardProps['item'],
  classes: Record<any, string>,
  showUserInfo: boolean
) => {
  if (!showUserInfo) return undefined
  const userProfilePictureObjectUrl = item.user.profilePictureKey
    ? ((await Storage.get(item.user.profilePictureKey, {
        level: 'protected',
        identityId: item.user.cognitoIdentityId
      })) as string)
    : ''
  return showUserInfo ? (
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
  ) : undefined
}

const getHeaderTitle = (item: TileCardProps['item'], showUserInfo: boolean) => {
  if (!showUserInfo) return undefined
  if (['Canto', 'Stream'].includes(item.__typename)) {
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
  return undefined
}

const getHeaderSubheader = (item: TileCardProps['item'], t: TFunction) => {
  // Closures
  const getTimewiseDescription = () => {
    let results = []

    const startTime = new Date(item.startTime)

    if (item.isSealed === 1) {
      const sealTime = new Date(item.sealTime)
      results.push(
        // Time elapsed
        {
          expression: formatDistance(sealTime, startTime, {
            locale: getUserLocale(item.user.language)
          }),
          icon: <TimerIcon color="disabled" />
        },
        // Time from seal
        {
          expression: formatDistanceToNow(sealTime, {
            locale: getUserLocale(item.user.language),
            addSuffix: true
          }),
          icon: <SeatFlatIcon color="disabled" />
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
          icon: <TimerIcon color="disabled" />
        }
      )

      if (item.__typename === 'Stream' && !item.isSealed) {
        results.push(
          // On fire!
          {
            expression: t('contentTileCard.text.live'),
            icon: <PlayIcon htmlColor="red" />
          }
        )
      }
    }
    return results.map((d) => {
      return (
        <Grid item key={`td-${d.expression}`}>
          <Grid container direction="row" alignItems="center">
            <Grid item>{d.icon}&nbsp;</Grid>
            <Grid item>{d.expression}</Grid>
          </Grid>
        </Grid>
      )
    })
  }
  // Business logic
  if (item.__typename === 'User') {
    return undefined // <Box>&nbsp;</Box>
  }
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
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <BookmarkIcon color="disabled" />
              &nbsp;
            </Grid>
            <Grid item>{item.bookmarkCount?.count ?? 0}</Grid>
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
              <BookmarkIcon color="disabled" />
              &nbsp;
            </Grid>
            <Grid item>{item.bookmarkCount?.count ?? 0}</Grid>
          </Grid>
        </Grid>

        {/* Comments */}
        {item.isSealed === 1 && (
          <Grid item>
            <Grid container direction="row" alignItems="center">
              <Grid item>
                <CommentIcon color="disabled" />
                &nbsp;
              </Grid>
              <Grid item>{item.commentCount?.count ?? 0}</Grid>
            </Grid>
          </Grid>
        )}

        {/* Watching Live */}
        {!item.isSealed && (
          <Grid item>
            <Grid container direction="row" alignItems="center">
              <Grid item>&nbsp;</Grid>
              <Grid item></Grid>
            </Grid>
          </Grid>
        )}

        <Grid item md={4} implementation="css" smDown component={Hidden} />
      </Grid>
    )
  }
  return
}

const getHeaderAction = (
  item: TileCardProps['item'],
  interaction:
    | TileCardProps['userInteractionType']
    | TileCardProps['contentInteractionType'],
  t: TFunction
) => {
  if (
    ['Canto', 'Stream'].includes(item.__typename) &&
    interaction === bookmarkContentValue
  ) {
    // Unbookmark button
    return (
      <Button
        startIcon={<BookmarkOffIcon />}
        size="small"
        color="primary"
        variant="outlined"
        disableElevation
      >
        {t('contentTileCard.buttons.unbookmark')}
      </Button>
    )
  }
  if (item.__typename === 'User') {
    if (interaction === watchUserValue) {
      // Unwatch button
      return (
        <Button
          startIcon={<StarOffIcon />}
          size="small"
          color="primary"
          variant="outlined"
          disableElevation
        >
          {t('contentTileCard.buttons.unwatch')}
        </Button>
      )
    }
    if (interaction === blockUserValue) {
      // Unblock button
      return (
        <Button
          startIcon={<AdjustIcon />}
          size="small"
          color="primary"
          variant="contained"
          disableElevation
        >
          {t('contentTileCard.buttons.unblock')}
        </Button>
      )
    }
  }
  return undefined
}

const ContentTileCard: React.FC<TileCardProps> = React.memo((props) => {
  const {
    // type: itemType,
    userInteractionType: itemUserInteractionType,
    contentInteractionType: itemContentInteractionType,
    item,
    showUserInfo
  } = props
  const classes = useStyles()
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const [cardData, setCardData] = useState<CardData>()

  useEffect(() => {
    ;(async () => {
      try {
        const interaction = ['Stream', 'Canto', 'Comment'].includes(
          item.__typename
        )
          ? itemContentInteractionType
          : itemUserInteractionType
        const headerAvatar = await getHeaderAvatar(item, classes, showUserInfo)
        const content = getContent(item, classes)
        const headerTitle = getHeaderTitle(item, showUserInfo)
        const headerSubheader = getHeaderSubheader(item, t)
        const headerAction = getHeaderAction(item, interaction, t)

        setCardData({
          content,
          header: {
            avatar: headerAvatar,
            title: headerTitle,
            subheader: headerSubheader,
            action: headerAction
          },
          clickRoute: getContentRoute(item) ?? ''
        })
      } catch (err) {
        console.log(err)
        setCardData({
          content: undefined,
          header: {
            avatar: undefined,
            title: undefined,
            subheader: undefined,
            action: undefined
          },
          clickRoute: ''
        })
        enqueueSnackbar(err.message ?? err, {
          variant: 'error'
        })
      }
    })()
  }, [
    classes,
    enqueueSnackbar,
    item,
    itemContentInteractionType,
    itemUserInteractionType,
    showUserInfo,
    t
  ])

  return (
    <Card className={classes.card}>
      <CardActionArea component={RouterLink} to={cardData?.clickRoute ?? ''}>
        {cardData?.content ? (
          <CardContent component="p">{cardData.content}</CardContent>
        ) : undefined}
        <CardHeader
          avatar={cardData?.header.avatar}
          title={cardData?.header.title}
          subheader={cardData?.header.subheader}
          action={cardData?.header.action}
        ></CardHeader>
      </CardActionArea>
    </Card>
  )
})

export default ContentTileCard
