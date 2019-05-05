import Vue from 'vue'
import Vuex from 'vuex'
import shared from './shared'
import authenticatedUser from './authenticatedUser'
import visitedUser from './visitedUser'
import siteSearch from './siteSearch'
import stream from './stream'
import time from './time'
import flag from './flag'
import route from './route'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appName: 'Tafalk!'
  },
  mutations: {

  },
  actions: {

  },
  modules: {
    route,
    shared,
    authenticatedUser,
    visitedUser,
    siteSearch,
    stream,
    time,
    flag
  },
  strict: process.env.NODE_ENV !== 'production'
})
