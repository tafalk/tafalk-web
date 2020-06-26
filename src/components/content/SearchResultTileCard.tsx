import React, { useState, useEffect, useContext, ReactNode } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Storage from '@aws-amplify/storage'
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Link,
  CardActionArea,
  Box,
  CardActions,
  Button
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import AllInclusiveIcon from 'mdi-material-ui/AllInclusive'
import FeatherIcon from 'mdi-material-ui/Feather'
import { Skeleton } from '@material-ui/lab'
import { AuthUserContext } from 'context/Auth'
import { getContentRoute } from 'utils/derivations'
import { SearchResultTileCardProps } from 'types/props'
import { useSnackbar } from 'notistack'

interface CardData {
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
const getAvatar = (
  userProfilePictureObjectUrl: string,
  item: SearchResultTileCardProps['item'],
  classes: Record<any, string>
) => {
  if (item.__typename === 'User') {
    return userProfilePictureObjectUrl ? (
      <Avatar
        alt={item.username}
        className={classes.avatar}
        src={userProfilePictureObjectUrl}
      ></Avatar>
    ) : (
      <Skeleton variant="circle" width={40} height={40}></Skeleton>
    )
  }
  if (item.__typename === 'Canto') {
    return (
      <Avatar className={classes.avatar}>
        <AllInclusiveIcon />
      </Avatar>
    )
  }
  if (item.__typename === 'Stream') {
    return (
      <Avatar className={classes.avatar}>
        <FeatherIcon />
      </Avatar>
    )
  }
  return
}

const getTitle = (item: SearchResultTileCardProps['item']) => {
  if (item.__typename === 'User') {
    return <Box>@{item.username}</Box>
  }
  if (item.__typename === 'Canto') {
    return <Box>{item.body}</Box>
  }
  if (item.__typename === 'Stream') {
    return (
      <Box>
        {item.title ? `${item.title}- ` : ''}
        {item.body}
      </Box>
    )
  }
  return
}

const getSubheader = (item: SearchResultTileCardProps['item']) => {
  if (item.__typename === 'User') {
    return <Box>&nbsp;</Box>
  }
  if (item.__typename === 'Canto') {
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
  if (item.__typename === 'Stream') {
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
  return
}

const SearchResultTileCard: React.FC<SearchResultTileCardProps> = (props) => {
  const { item } = props
  const classes = useStyles()
  const { t } = useTranslation()
  const { user: authUser } = useContext(AuthUserContext)
  const { enqueueSnackbar } = useSnackbar()
  const [contentBlocked, setContentBlocked] = useState(false)
  const [showBlocked, setShowBlocked] = useState(false)
  const [cardData, setCardData] = useState<CardData>()

  // Side Effects
  useEffect(() => {
    ;(async () => {
      try {
        // Profile Pic (for User)
        const userProfilePictureObjectUrl =
          item.__typename === 'User' && item.profilePictureKey
            ? ((await Storage.get(item.user.profilePictureKey, {
                level: 'protected',
                identityId: item.user.cognitoIdentityId
              })) as string)
            : ''

        const headerAvatar = getAvatar(
          userProfilePictureObjectUrl,
          item,
          classes
        )
        const headerTitle = getTitle(item)
        const headerSubheader = getSubheader(item)
        // Blocked?
        const cardUserId = item.__typename === 'User' ? item.id : item.user.id
        const isContentBlocked =
          authUser?.userBlockInteractions?.some(
            (el: any) => el.targetUserId === cardUserId
          ) ?? false
        setContentBlocked(isContentBlocked)
        setCardData({
          header: {
            avatar: headerAvatar,
            title: headerTitle,
            subheader: headerSubheader
          },
          clickRoute: getContentRoute(item) ?? ''
        })
      } catch (err) {
        setCardData({
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
  }, [authUser, classes, enqueueSnackbar, item])

  return contentBlocked && !showBlocked ? (
    // Blocked Content
    <Card className={classes.card}>
      <CardContent>
        <Box fontStyle="italic">
          {t('searchResultTileCard.message.blocked')}
        </Box>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => setShowBlocked(true)}
          variant="contained"
          color="primary"
          disableElevation
        >
          {t('searchResultTileCard.buttons.showAnyway')}
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
        ></CardHeader>
      </CardActionArea>
    </Card>
  )
}

export default SearchResultTileCard
