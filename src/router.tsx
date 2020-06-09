import TafalkHomeView from 'views/Home'
import TafalkSearchView from 'views/Search'
import TafalkLoginView from 'views/auth/Login'
import TafalkRegisterView from 'views/auth/Register'
import TafalkConfirmRegistrationView from 'views/auth/ConfirmRegistration'
import TafalkForgotPasswordView from 'views/auth/ForgotPassword'
import TafalkFarewellView from 'views/auth/Farewell'
import TafalkUserProfileView from 'views/user/Profile'
import TafalkUserSettingsView from 'views/user/Settings'
import TafalkStreamView from 'views/content/Stream'
import TafalkCantoView from 'views/content/Canto'
import TafalkAboutView from 'views/meta/About'
import TafalkNotFoundView from 'views/meta/NotFound'

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
    component: TafalkRegisterView
  },
  {
    path: '/pour/canto',
    component: TafalkRegisterView
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
  // Other
  {
    path: '/about',
    component: TafalkAboutView
  },
  {
    component: TafalkNotFoundView
  }
]

export default router
