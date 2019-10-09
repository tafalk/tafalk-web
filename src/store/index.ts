import Vue from 'vue'
import Vuex from 'vuex'
import { API, graphqlOperation, Logger } from 'aws-amplify'
import { ListSealedBriefStreams, ListLiveBriefStreams } from '@/graphql/Stream'
import { ListBriefCantos } from '@/graphql/Canto'
import { introDismissedKey, cookiesAcceptedKey } from '@/utils/constants'

import shared from './shared'
import authenticatedUser from './authenticatedUser'
import visitedUser from './visitedUser'
import siteSearch from './siteSearch'
import stream from './stream'
import canto from './canto'
import time from './time'
import flag from './flag'
import route from './route'

Vue.use(Vuex)

const logger = new Logger('Store')

export default new Vuex.Store({
  state: {
    appName: 'Tafalk!',
    isPageReady: false,
    hasVisitedBefore: true,
    hasAcceptedCookies: true,
    streamList: [] as any,
    cantoList: [] as any,
    nextStreamToken: null,
    nextCantoToken: null
  },
  getters: {
    getIsPageReady (state) {
      return state.isPageReady
    },
    getHasVisitedBefore (state) {
      return state.hasVisitedBefore
    },
    getHasAcceptedCookies (state) {
      return state.hasAcceptedCookies
    },
    getStreamList (state) {
      return state.streamList
    },
    getCantoList (state) {
      return state.cantoList
    },
    getNextStreamToken (state) {
      return state.nextStreamToken
    },
    getNextCantoToken (state) {
      return state.nextCantoToken
    }
  },
  mutations: {
    setIsPageReady (state, isPageReady) {
      state.isPageReady = isPageReady
    },
    setHasVisitedBefore (state, hasVisitedBefore) {
      state.hasVisitedBefore = hasVisitedBefore
    },
    setHasAcceptedCookies (state, hasAcceptedCookies) {
      state.hasAcceptedCookies = hasAcceptedCookies
    },
    setStreamList (state, streamList) {
      state.streamList = streamList
    },
    setCantoList (state, cantoList) {
      state.cantoList = cantoList
    },
    clearStreamList (state) {
      state.streamList = []
    },
    clearCantoList (state) {
      state.cantoList = []
    },
    appendStreamList (state, appendStreamList) {
      state.streamList.push(...appendStreamList)
    },
    appendCantoList (state, appendCantoList) {
      state.cantoList.push(...appendCantoList)
    },
    setNextStreamToken (state, nextStreamToken) {
      state.nextStreamToken = nextStreamToken
    },
    setNextCantoToken (state, nextCantoToken) {
      state.nextCantoToken = nextCantoToken
    }
  },
  actions: {
    setHasVisitedBefore ({ commit }, hasVisitedBeforeStr) {
      localStorage.setItem(introDismissedKey, (hasVisitedBeforeStr === 'true').toString())
      commit('setHasVisitedBefore', hasVisitedBeforeStr)
    },
    setHasAcceptedCookies ({ commit }, hasAcceptedCookies) {
      localStorage.setItem(cookiesAcceptedKey, (hasAcceptedCookies === 'true').toString())
      commit('setHasAcceptedCookies', hasAcceptedCookies)
    },
    async fetchInitialSealedBriefStreams ({ commit }, payload) {
      try {
        commit('setIsPageReady', false)
        const rawFetch: any = await API.graphql(graphqlOperation(ListSealedBriefStreams, payload))

        commit('setStreamList', rawFetch.data.listSealedStreams.items)
        commit('setNextStreamToken', rawFetch.data.listSealedStreams.nextToken)
      } catch (err) {
        logger.error('error fetching sealed streams', JSON.stringify(err))
      } finally {
        commit('setIsPageReady', true)
      }
    },
    async fetchFurtherSealedBriefStreams ({ commit }, payload) {
      try {
        const rawFetch: any = await API.graphql(graphqlOperation(ListSealedBriefStreams, payload))

        commit('appendStreamList', rawFetch.data.listSealedStreams.items)
        commit('setNextStreamToken', rawFetch.data.listSealedStreams.nextToken)
      } catch (err) {
        logger.error('error fetching sealed streams', JSON.stringify(err))
      }
    },
    async fetchInitialLiveBriefStreams ({ commit }, payload) {
      try {
        commit('setIsPageReady', false)
        const rawFetch: any = await API.graphql(graphqlOperation(ListLiveBriefStreams, payload))

        commit('setStreamList', rawFetch.data.listLiveStreams.items)
        commit('setNextStreamToken', rawFetch.data.listLiveStreams.nextToken)
      } catch (err) {
        logger.error('error fetching live streams', JSON.stringify(err))
      } finally {
        commit('setIsPageReady', true)
      }
    },
    async fetchFurtherLiveBriefStreams ({ commit }, payload) {
      try {
        const rawFetch: any = await API.graphql(graphqlOperation(ListLiveBriefStreams, payload))

        commit('appendStreamList', rawFetch.data.listLiveStreams.items)
        commit('setNextStreamToken', rawFetch.data.listLiveStreams.nextToken)
      } catch (err) {
        logger.error('error fetching live streams', JSON.stringify(err))
      }
    },
    async fetchInitialSealedBriefStreamsByFaveUsers ({ getters, commit }, payload) {
      commit('setIsPageReady', false)
      try {
        const rawFetch: any = await API.graphql(graphqlOperation(ListSealedBriefStreams, payload))

        commit('setStreamList', rawFetch.data.listSealedStreams.items.filter((s: any) => s.likes.some((i: any) => i.userId === getters['authenticatedUser/getUser'].id)))
        commit('setNextStreamToken', rawFetch.data.listSealedStreams.nextToken)
      } catch (err) {
        logger.error('error fetching sealed streams by fave others', err)
      } finally {
        commit('setIsPageReady', true)
      }
    },
    async fetchFurtherSealedBriefStreamsByFaveUsers ({ getters, commit }, payload) {
      try {
        const scrollEndNewFetch: any = await API.graphql(graphqlOperation(ListSealedBriefStreams, payload))

        commit('setStreamList', scrollEndNewFetch.data.listSealedStreams.items.filter((s: any) => s.likes.some((i: any) => i.userId === getters['authenticatedUser/getUser'].id)))
        commit('setNextStreamToken', scrollEndNewFetch.data.listSealedStreams.nextToken)

        // If the filtered result is not enough fetch a new portion
        let countOfByFaveOthers = 0
        while (countOfByFaveOthers < payload.fetchLimit && payload.nextToken != null) {
          const rawNewFetch: any = await API.graphql(graphqlOperation(ListSealedBriefStreams, {
            limit: payload.fetchLimit,
            nextToken: getters['getNextStreamToken']
          }))
          let newFetch = rawNewFetch.data.listSealedStreams.items.filter((s: any) => s.likes.some((i: any) => i.userId === getters['authenticatedUser/getUser'].id))
          commit('appendStreamList', ...newFetch)
          commit('setNextStreamToken', rawNewFetch.data.listSealedStreams.nextToken)
          countOfByFaveOthers += newFetch.length
        }
      } catch (err) {
        logger.error('error fetching sealed streams by fave others', err)
      }
    },
    async fetchInitialBriefCantos ({ commit }, payload) {
      try {
        commit('setIsPageReady', false)
        const rawFetch: any = await API.graphql(graphqlOperation(ListBriefCantos, payload))

        commit('setCantoList', rawFetch.data.listCantos.items)
        commit('setNextCantoToken', rawFetch.data.listCantos.nextToken)
      } catch (err) {
        logger.error('error fetching initial cantos', JSON.stringify(err))
      } finally {
        commit('setIsPageReady', true)
      }
    },
    async fetchFurtherBriefCantos ({ commit }, payload) {
      try {
        const rawFetch: any = await API.graphql(graphqlOperation(ListBriefCantos, payload))

        commit('appendCantoList', rawFetch.data.listCantos.items)
        commit('setNextCantoToken', rawFetch.data.listCantos.nextToken)
      } catch (err) {
        logger.error('error fetching further cantos', JSON.stringify(err))
      }
    },
    clearAll ({ commit }) {
      commit('clearStreamList')
      commit('clearCantoList')
    }
  },
  modules: {
    route,
    shared,
    authenticatedUser,
    visitedUser,
    siteSearch,
    stream,
    canto,
    time,
    flag
  },
  strict: process.env.NODE_ENV !== 'production'
})
