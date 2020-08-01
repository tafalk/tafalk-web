import { lazy } from 'react'

const TafalkWelcomeView = lazy(() => import('views/Welcome'))
const TafalkHomeView = lazy(() => import('views/Home'))
const TafalkSearchView = lazy(() => import('views/Search'))
const TafalkLoginView = lazy(() => import('views/auth/Login'))
const TafalkRegisterView = lazy(() => import('views/auth/Register'))
const TafalkConfirmRegistrationView = lazy(() =>
  import('views/auth/ConfirmRegistration')
)
const TafalkForgotPasswordView = lazy(() => import('views/auth/ForgotPassword'))
const TafalkFarewellView = lazy(() => import('views/auth/Farewell'))
const TafalkUserProfileView = lazy(() => import('views/user/Profile'))
const TafalkUserSettingsView = lazy(() => import('views/user/Settings'))
const TafalkStreamView = lazy(() => import('views/content/Stream'))
const TafalkCantoView = lazy(() => import('views/content/Canto'))
const TafalkPourStreamView = lazy(() => import('views/pour/Stream'))
const TafalkPourCantoView = lazy(() => import('views/pour/Canto'))
const TafalkAdminPanelView = lazy(() => import('views/restricted/AdminPanel'))
const TafalkAboutView = lazy(() => import('views/meta/About'))
const TafalkNotFoundView = lazy(() => import('views/meta/NotFound'))

const router = [
  // Content
  {
    path: '/',
    exact: true,
    component: TafalkHomeView
  },
  {
    path: '/content',
    component: TafalkHomeView
  },
  {
    path: '/search',
    component: TafalkSearchView
  },
  // Auth
  {
    path: '/auth/login',
    component: TafalkLoginView
  },
  {
    path: '/auth/register',
    component: TafalkRegisterView
  },
  {
    path: '/auth/forgotPassword',
    component: TafalkForgotPasswordView
  },
  {
    path: '/auth/confirmRegistration',
    component: TafalkConfirmRegistrationView
  },
  {
    path: '/auth/farewell',
    component: TafalkFarewellView
  },
  // Profile
  {
    path: '/u/:username',
    component: TafalkUserProfileView
  },
  {
    path: '/settings',
    component: TafalkUserSettingsView
  },
  // Pours
  {
    path: '/pour/stream',
    component: TafalkPourStreamView
  },
  {
    path: '/pour/canto',
    component: TafalkPourCantoView
  },
  // Singular Content
  {
    path: '/s/:id',
    component: TafalkStreamView
  },
  {
    path: '/c/:id',
    component: TafalkCantoView
  },
  // Admin
  {
    path: '/admin',
    component: TafalkAdminPanelView
  },
  // Other
  {
    path: '/about',
    component: TafalkAboutView
  },
  {
    path: '/welcome',
    component: TafalkWelcomeView
  },
  {
    component: TafalkNotFoundView
  }
]

export default router
