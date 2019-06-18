import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

import { Auth, API, graphqlOperation, Logger } from 'aws-amplify'
import { GetUserProfileData } from './graphql/Profile'
import { GetStoreUser } from './utils/storeUtils'

import Home from '@/components/home/Home.vue'
import NotFound from '@/components/nocontent/NotFound.vue'
import Profile from '@/components/user/Profile.vue'
import Pour from '@/components/stream/Pour.vue'
import Stream from '@/components/stream/Stream.vue'
import PourCanto from '@/components/canto/PourCanto.vue'
import Canto from '@/components/canto/Canto.vue'

Vue.use(Router)

const logger = new Logger('Router')

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './components/meta/About.vue')
    },
    {
      path: '/auth/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "auth" */ './components/auth/Register.vue')
    },
    {
      path: '/auth/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "auth" */ './components/auth/Login.vue')
    },
    {
      path: '/auth/confirmRegistration',
      name: 'confirmRegistration',
      component: () => import(/* webpackChunkName: "auth" */ './components/auth/ConfirmRegistration.vue')
    },
    {
      path: '/auth/forgotPassword',
      name: 'forgotPassword',
      component: () => import(/* webpackChunkName: "auth" */ './components/auth/ForgotPassword.vue')
    },
    {
      path: '/auth/farewell',
      name: 'farewell',
      component: () => import(/* webpackChunkName: "auth" */ './components/auth/Farewell.vue')
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
      component: PourCanto
    },
    {
      path: '/pour',
      name: 'pour',
      component: Pour
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

  try {
    const currentAuthenticatedUser = await Auth.currentAuthenticatedUser()

    const dbUsers = await API.graphql(graphqlOperation(GetUserProfileData, {
      username: currentAuthenticatedUser.username
    }))

    const dbUser = dbUsers.data.getUserByUsername[0]

    const authenticatedUserStoreObject = await GetStoreUser(dbUser)

    authenticatedUserStoreObject != null
      ? store.commit('authenticatedUser/setUser', authenticatedUserStoreObject)
      : store.commit('authenticatedUser/clearUser')

    next()
  } catch (err) {
    if (err.toString() === 'not authenticated') {
      logger.debug('No authenticated user found')
    } else {
      logger.error('Error getting autheticated user info before routing', err.toString())
    }
    store.commit('authenticatedUser/clearUser')
    next()
  }
})

router.afterEach(() => {
  // Hide progress line
  store.commit('route/setIsRouteChanging', false)
})

export default router
