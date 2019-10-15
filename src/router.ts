import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import { Auth, API, graphqlOperation, Logger, Storage } from 'aws-amplify'
import { GetUserProfileData } from '@/graphql/Profile'
import { GetHexColorOfString } from '@/utils/generators'

import NotFound from '@/views/nocontent/NotFound.vue'
import Profile from '@/views/profile/Profile.vue'
import PourStream from '@/views/stream/PourStream.vue'
import Stream from '@/views/stream/Stream.vue'
import PourCanto from '@/views/canto/PourCanto.vue'
import Canto from '@/views/canto/Canto.vue'

Vue.use(Router)

const logger = new Logger('Router')

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/home/Content.vue')
    },
    {
      path: '/content',
      name: 'content',
      component: () => import(/* webpackChunkName: "home" */ './views/home/Content.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "meta" */ './views/meta/About.vue')
    },
    {
      path: '/privacyPolicy',
      name: 'privacyPolicy',
      component: () => import(/* webpackChunkName: "meta" */ './views/meta/PrivacyPolicy.vue')
    },
    {
      path: '/termsOfService',
      name: 'termsOfService',
      component: () => import(/* webpackChunkName: "meta" */ './views/meta/TermsOfService.vue')
    },
    {
      path: '/auth/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "auth" */ './views/auth/Register.vue')
    },
    {
      path: '/auth/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "auth" */ './views/auth/Login.vue')
    },
    {
      path: '/auth/confirmRegistration',
      name: 'confirmRegistration',
      component: () => import(/* webpackChunkName: "auth" */ './views/auth/ConfirmRegistration.vue')
    },
    {
      path: '/auth/forgotPassword',
      name: 'forgotPassword',
      component: () => import(/* webpackChunkName: "auth" */ './views/auth/ForgotPassword.vue')
    },
    {
      path: '/auth/farewell',
      name: 'farewell',
      component: () => import(/* webpackChunkName: "auth" */ './views/auth/Farewell.vue')
    },
    {
      path: '/user/:username',
      name: 'profile',
      component: Profile
    },
    {
      path: '/user/:username/canto',
      name: 'canto',
      component: Canto
    },
    {
      path: '/user/:username/canto/pour',
      name: 'pourCanto',
      component: PourCanto,
      meta: { requiresAuth: true }
    },
    {
      path: '/pour',
      name: 'pourStream',
      component: PourStream,
      meta: { requiresAuth: true }
    },
    {
      path: '/stream/:id',
      name: 'stream',
      component: Stream
    },
    {
      path: '*',
      name: 'notFound',
      component: NotFound
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  // Show general progress line
  store.commit('route/setIsRouteChanging', true)
  store.commit('route/setCurrentRoutePath', to.path)

  let currentAuthenticatedUser

  try {
    currentAuthenticatedUser = await Auth.currentAuthenticatedUser()
  } catch (err) {
    if (err.toString() === 'not authenticated') {
      // No Authenticated user
      if (to.matched.some(rec => rec.meta.requiresAuth)) {
        store.commit('authenticatedUser/clearUser')
        next({ path: '/auth/login', query: { redirect: to.fullPath } })
      }
    } else {
      logger.error('Unexpected error getting autheticated user info', err.message || err)
    }
  }

  try {
    // Set unready
    store.commit('setIsPageReady', false)
    // Check the store for the authenticated user data
    const storeAuthenticatedUser = store.getters['authenticatedUser/setUser']
    if (storeAuthenticatedUser && storeAuthenticatedUser.username) {
      next()
    } else {
      const userProfiles: any = await API.graphql(graphqlOperation(GetUserProfileData, {
        username: currentAuthenticatedUser.username
      }))
      const userProfile = userProfiles.data.getUserByUsername[0]

      const profilePictureObjectUrl = userProfile.profilePictureKey ? await Storage.get(userProfile.profilePictureKey, {
        level: 'protected',
        identityId: userProfile.cognitoIdentityId
      }) : null

      const authenticatedUserStoreObject = {
        ...userProfile,
        profilePictureObjectUrl,
        color: GetHexColorOfString(userProfile.username)
      }
      store.commit('authenticatedUser/setUser', authenticatedUserStoreObject)
      next()
    }
  } catch (err) {
    logger.error('Unexpected Error during before routing', err.message || err)
    next()
  }
})

router.afterEach(() => {
  // Hide progress line
  store.commit('route/setIsRouteChanging', false)
})

export default router
