import React, { useState, useContext, useEffect, useRef } from 'react'
import { Link as RouterLink, useLocation, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Auth from '@aws-amplify/auth'
import API, { graphqlOperation } from '@aws-amplify/api'
import {
  fade,
  createStyles,
  makeStyles,
  Theme,
  useTheme
} from '@material-ui/core/styles'

import { grey } from '@material-ui/core/colors'
import {
  useMediaQuery,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  MenuItem,
  Menu,
  Avatar,
  Tooltip,
  ListItemIcon,
  ListItemText,
  Divider,
  Switch,
  TextField,
  Typography,
  Grid
} from '@material-ui/core'
import { Skeleton, Autocomplete } from '@material-ui/lab'
import AccountIcon from 'mdi-material-ui/Account'
import MagnifyIcon from 'mdi-material-ui/Magnify'
import DotsVerticalIcon from 'mdi-material-ui/DotsVertical'
import AllInclusiveIcon from 'mdi-material-ui/AllInclusive'
import FeatherIcon from 'mdi-material-ui/Feather'
import FaceOutlineIcon from 'mdi-material-ui/FaceOutline'
import CogIcon from 'mdi-material-ui/Cog'
import TranslateIcon from 'mdi-material-ui/Translate'
import ThemeLightDarkIcon from 'mdi-material-ui/ThemeLightDark'
import InformationIcon from 'mdi-material-ui/Information'
import RegisterIcon from 'mdi-material-ui/AccountPlus'
import LoginIcon from 'mdi-material-ui/Login'
import LogoutIcon from 'mdi-material-ui/Logout'
import ViewDashboardIcon from 'mdi-material-ui/ViewDashboard'

import logo from 'assets/logo.svg'
import smlogo from 'assets/smlogo.svg'

import { AuthUserContext } from 'context/Auth'
import { maxNumOfSearchResults, cognitoAdminUserGroup } from 'utils/constants'
import { UpdateUserTheme, SearchSiteContent } from 'graphql/custom'
import { SearchQuery } from 'types/appsync/API'
import { useSnackbar } from 'notistack'
import { v4 as uuidv4 } from 'uuid'

import TafalkLanguageSelectionDialog from 'components/common/dialogs/TheLanguageSelectionDialog'
import TafalkConfirmationDialog from 'components/common/dialogs/GenericConfirmationDialog'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      flexGrow: 1
    },
    grow: {
      flexGrow: 1
    },
    logo: {
      marginLeft: 0,
      marginTop: '5px'
    },
    search: {
      position: 'relative',
      backgroundColor: fade(grey[500], 0.15),
      '&:hover': {
        backgroundColor: fade(grey[500], 0.25)
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(5),
        width: '35%'
      }
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch'
      }
    },
    menuButton: {
      marginLeft: theme.spacing(0)
    },
    searchOption: {
      color: theme.palette.primary.contrastText,
      marginRight: theme.spacing(2),
      backgroundColor: theme.palette.primary.main
    }
  })
)

// Constants
const searchBarPaths = [
  '/',
  '/content',
  '/content/streams',
  '/content/streams/sealed',
  '/content/streams/live',
  '/content/cantos',
  '/content/cantos/paused',
  '/content/cantos/live',
  '/search'
]
const searchDelayMillis = 1000

const TheHeader: React.FC = () => {
  // Hooks
  let routerHistory = useHistory()
  let routeLocation = useLocation()
  const { t } = useTranslation()
  const theme = useTheme()
  const classes = useStyles()
  const isSmallPlus = useMediaQuery(theme.breakpoints.up('sm'))
  const {
    user: authUser,
    setUser: setAuthUser,
    setTrigger: setAuthTrigger
  } = useContext(AuthUserContext)
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<
    boolean | undefined
  >(undefined)
  const [isUserAdmin, setIsUserAdmin] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [darkModeSwitchChecked, setDarkModeSwitchChecked] = useState(false)
  const [languageDialogOpen, setLanguageDialogOpen] = useState(false)
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>()
  const [searchInput, setSearchInput] = useState('')
  const [searchOptionsOpen, setSearchOptionsOpen] = useState(false)
  const [searchAutocompleteOptions, setSearchAutocompleteOptions] = useState<
    Array<any>
  >([])
  const { enqueueSnackbar } = useSnackbar()

  // Constants
  const isMenuOpen = Boolean(anchorEl)
  const topBarMenuId = isSmallPlus ? 'top-bar-menu-large' : 'top-bar-menu-small'

  // Side Effects: Is admin
  useEffect(() => {
    try {
      if (!authUser || !authUser.contextMeta.isReady) {
        setIsUserAuthenticated(undefined)
      } else {
        setIsUserAuthenticated(!!authUser?.id)
      }

      setIsUserAdmin((authUser?.groups ?? []).includes(cognitoAdminUserGroup))
    } catch (err) {
      enqueueSnackbar(JSON.stringify(err), {
        variant: 'error'
      })
    }
  }, [authUser, enqueueSnackbar])

  // Side Effects: search input change
  useEffect(() => {
    const timer = setTimeout(() => {
      const currSearchInput = searchInputRef.current?.value ?? ''

      if (!currSearchInput) {
        setSearchAutocompleteOptions([])
        return undefined
      }
      ;(async () => {
        const searchGraphqlResponse = (await API.graphql(
          graphqlOperation(SearchSiteContent, {
            query: currSearchInput
          })
        )) as {
          data: SearchQuery
        }

        const res = searchGraphqlResponse.data.search ?? []
        setSearchAutocompleteOptions(res)
      })()
    }, searchDelayMillis)

    return () => {
      clearTimeout(timer)
    }
  }, [searchInput])

  // Functions
  const onMenuClose = () => {
    setAnchorEl(null)
  }

  const onAuthUserProfileClick = () => {
    routerHistory.push(`/u/${authUser?.username}`)
    setAnchorEl(null)
  }
  const onSettingsClick = () => {
    routerHistory.push('/settings')
    setAnchorEl(null)
  }
  const onAboutClick = () => {
    routerHistory.push('/about')
    setAnchorEl(null)
  }

  const onConfirmLogout = async (): Promise<void> => {
    await Auth.signOut()
    setAuthTrigger('logout')
    setLogoutDialogOpen(false)
    // Push to home route (Used 'key' since it may require force push )
    routerHistory.push({
      pathname: '/',
      key: uuidv4(),
      state: {}
    })
  }

  const onThemeToggle = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    // TODO: Test Theme Change
    const isDarkModeEnabled = event.target.checked
    await API.graphql(
      graphqlOperation(UpdateUserTheme, {
        userId: authUser?.id,
        theme: !isDarkModeEnabled ? 'light' : 'dark'
      })
    )
    setAuthUser({ ...authUser, theme: isDarkModeEnabled })
    setDarkModeSwitchChecked(isDarkModeEnabled)
  }

  const onSearchClick = () => {
    setSearchOptionsOpen(false)
    routerHistory.push({
      pathname: '/search',
      search: `?${new URLSearchParams({
        q: searchInputRef.current?.value ?? ''
      })}`
    })
  }

  // DOM elements
  const renderAuthButtons = (
    <React.Fragment>
      {isSmallPlus && (
        <React.Fragment>
          {isUserAdmin && (
            // Admin Panel Button
            <Tooltip title={t('topMenu.tooltips.adminDashboard') ?? ''}>
              <IconButton
                color="primary"
                aria-label={t('topMenu.tooltips.adminDashboard') ?? ''}
                component={RouterLink}
                to="/admin"
              >
                <ViewDashboardIcon />
              </IconButton>
            </Tooltip>
          )}
          {/* Pour Stream Button */}
          <Tooltip title={t('topMenu.tooltips.newStream') ?? ''}>
            <IconButton
              color="primary"
              aria-label={t('topMenu.tooltips.newStream') ?? ''}
              component={RouterLink}
              to="/pour/stream"
            >
              <FeatherIcon />
            </IconButton>
          </Tooltip>

          {/* Pour Canto Button */}
          <Tooltip title={t('topMenu.tooltips.continueCanto') ?? ''}>
            <IconButton
              color="primary"
              aria-label={t('topMenu.tooltips.continueCanto') ?? ''}
              component={RouterLink}
              to="/pour/canto"
            >
              <AllInclusiveIcon />
            </IconButton>
          </Tooltip>
          <div>{/* Notifications */}</div>
          <div>{/* Messages */}</div>
        </React.Fragment>
      )}
      {/* Screen-Size-Agnostic Field */}
      {/* Profile-Menu */}
      <IconButton
        className={classes.menuButton}
        color="inherit"
        aria-label="show more"
        aria-controls={topBarMenuId}
        aria-haspopup="true"
        onClick={(event) => {
          setAnchorEl(event.currentTarget)
        }}
      >
        <Avatar
          alt="Woolfie"
          src={authUser?.profilePictureObjectUrl}
          style={{ color: '#fff', backgroundColor: authUser?.color }}
        />
      </IconButton>
    </React.Fragment>
  )

  const renderUnauthButtons = (
    <React.Fragment>
      {isSmallPlus ? (
        <React.Fragment>
          {/* Large Screen Fields */}
          <Button color="inherit" component={RouterLink} to="/auth/login">
            {t('topMenu.buttons.login')}
          </Button>
          <Button color="inherit" component={RouterLink} to="/auth/register">
            {t('topMenu.buttons.register')}
          </Button>
        </React.Fragment>
      ) : undefined}
      {/* Screen-Size-Agnostic Field */}
      {/* Show-More-Menu */}
      <IconButton
        className={classes.menuButton}
        color="inherit"
        aria-label="show more"
        aria-controls={topBarMenuId}
        aria-haspopup="true"
        onClick={(event) => {
          setAnchorEl(event.currentTarget)
        }}
      >
        <DotsVerticalIcon />
      </IconButton>
    </React.Fragment>
  )

  const renderAuthMenuContent = [
    !isSmallPlus ? (
      <div key="notifications">{/* Notifications */}</div>
    ) : undefined,
    !isSmallPlus ? <div key="messages">{/* Messages */}</div> : undefined,
    <MenuItem key="profile-menu-item" onClick={onAuthUserProfileClick}>
      <ListItemIcon>
        <FaceOutlineIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary={t('topMenu.buttons.profile')} />
    </MenuItem>,
    <MenuItem key="settings-menu-item" onClick={onSettingsClick}>
      <ListItemIcon>
        <CogIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary={t('topMenu.buttons.settings')} />
    </MenuItem>,
    <Divider key="divider-1-menu-item" />,
    <MenuItem key="language-menu-item" onClick={onMenuClose}>
      <ListItemIcon>
        <TranslateIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary={t('topMenu.buttons.language')} />
    </MenuItem>,
    <MenuItem key="theme-menu-item">
      <ListItemIcon>
        <ThemeLightDarkIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary={t('topMenu.buttons.darkMode')} />
      <Switch
        checked={darkModeSwitchChecked}
        onChange={onThemeToggle}
        color="primary"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
    </MenuItem>,
    <Divider key="divider-2-menu-item" />,
    <MenuItem key="about-menu-item" onClick={onAboutClick}>
      <ListItemIcon>
        <InformationIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary={t('topMenu.buttons.about')} />
    </MenuItem>,
    <Divider key="divider-3-menu-item" />,
    <MenuItem
      key="logout-menu-item"
      onClick={() => {
        onMenuClose()
        setLogoutDialogOpen(true)
      }}
    >
      <ListItemIcon>
        <LogoutIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary={t('topMenu.buttons.logout')} />
    </MenuItem>
  ]

  const renderUnauthMenuContent = [
    !isSmallPlus ? (
      <MenuItem key="login-menu-item" onClick={onMenuClose}>
        <ListItemIcon>
          <LoginIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={t('topMenu.buttons.login')} />
      </MenuItem>
    ) : undefined,
    !isSmallPlus ? (
      <MenuItem key="register-menu-item" onClick={onMenuClose}>
        <ListItemIcon>
          <RegisterIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary={t('topMenu.buttons.register')} />
      </MenuItem>
    ) : undefined,
    <Divider key="divider-1-menu-item" />,
    <MenuItem key="about-menu-item" onClick={onMenuClose}>
      <ListItemIcon>
        <InformationIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary={t('topMenu.buttons.about')} />
    </MenuItem>
  ]

  return (
    <header className={classes.grow}>
      <AppBar
        position="static"
        className={classes.appBar}
        color="transparent"
        elevation={0}
      >
        <Toolbar>
          {/* Logo */}
          <RouterLink to="/">
            <img
              src={isSmallPlus ? logo : smlogo}
              alt="logo"
              className={classes.logo}
            />
          </RouterLink>
          <div className={classes.grow} />
          {/* Search Bar */}
          {searchBarPaths.includes(routeLocation.pathname) ? (
            <Autocomplete
              aria-label="Search Input"
              open={searchOptionsOpen}
              onOpen={() => {
                setSearchOptionsOpen(true)
              }}
              onClose={() => {
                setSearchOptionsOpen(false)
              }}
              options={searchAutocompleteOptions.slice(
                0,
                maxNumOfSearchResults
              )}
              groupBy={(opt) => opt.__typename}
              filterOptions={(x) => x}
              className={classes.search}
              fullWidth
              getOptionLabel={(opt) => opt.id}
              renderInput={(params) => (
                <Grid container alignItems="center">
                  <Grid item xs={10}>
                    <TextField
                      {...params}
                      inputRef={searchInputRef}
                      placeholder={t('topBar.placeholders.search')}
                      onChange={(e) => setSearchInput(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      disableElevation
                      fullWidth
                      aria-label="search"
                      color="primary"
                      disabled={!searchInputRef.current?.value}
                      onClick={onSearchClick}
                    >
                      <MagnifyIcon />
                    </Button>
                  </Grid>
                </Grid>
              )}
              renderOption={(opt) => {
                const optType = opt.__typename
                const urlPath =
                  optType === 'User'
                    ? `/u/${opt.username}`
                    : optType === 'Stream'
                    ? `/s/${opt.id}`
                    : `/c/${opt.id}`
                return (
                  <Grid
                    container
                    alignItems="center"
                    onClick={() => {
                      routerHistory.push(urlPath)
                    }}
                  >
                    <Grid item>
                      {optType === 'User' ? (
                        <Avatar className={classes.searchOption}>
                          <AccountIcon />
                        </Avatar>
                      ) : optType === 'Stream' ? (
                        <Avatar className={classes.searchOption}>
                          <FeatherIcon />
                        </Avatar>
                      ) : (
                        <Avatar className={classes.searchOption}>
                          <AllInclusiveIcon />
                        </Avatar>
                      )}
                    </Grid>
                    <Grid item xs>
                      <Typography variant="body2" color="textSecondary">
                        {optType === 'Stream'
                          ? `${opt.title ? `${opt.title}-` : ''}${opt.body}`
                          : optType === 'Canto'
                          ? opt.body
                          : opt.username}
                      </Typography>
                    </Grid>
                  </Grid>
                )
              }}
            ></Autocomplete>
          ) : undefined}

          <div className={classes.grow} />
          {/* Top Bar Buttons */}
          {isUserAuthenticated !== undefined ? (
            isUserAuthenticated ? (
              renderAuthButtons
            ) : (
              renderUnauthButtons
            )
          ) : (
            <Skeleton variant="circle">
              <Avatar />
            </Skeleton>
          )}
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={topBarMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={onMenuClose}
      >
        {isUserAuthenticated ? renderAuthMenuContent : renderUnauthMenuContent}
      </Menu>

      {/* Language Selection Dialog */}
      <TafalkLanguageSelectionDialog
        open={languageDialogOpen}
        onClose={() => setLanguageDialogOpen(false)}
      />

      {/* Logout Confirmation Dialog */}
      <TafalkConfirmationDialog
        open={logoutDialogOpen}
        onConfirm={onConfirmLogout}
        onClose={() => setLogoutDialogOpen(false)}
        title={t('logoutConfirmationDialog.title')}
        body={t('logoutConfirmationDialog.body')}
      />
    </header>
  )
}

export default TheHeader
