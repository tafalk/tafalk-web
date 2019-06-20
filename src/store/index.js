import Vue from 'vue'
import Vuex from 'vuex'
import { API, graphqlOperation, Logger } from 'aws-amplify'
import { ListSealedBriefStreams, ListLiveBriefStreams } from '../graphql/Stream'

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
    streamList: [],
    nextStreamToken: null
  },
  getters: {
    getIsPageReady (state) {
      return state.isPageReady
    },
    getStreamList (state) {
      return state.streamList
    },
    getNextStreamToken (state) {
      return state.nextStreamToken
    }
  },
  mutations: {
    setIsPageReady (state, isPageReady) {
      state.isPageReady = isPageReady
    },
    setStreamList (state, streamList) {
      state.streamList = streamList
    },
    clearStreamList (state) {
      state.streamList = []
    },
    appendStreamList (state, appendStreamList) {
      state.streamList.push(...appendStreamList)
      // state.streamList = state.streamList.push(...appendStreamList)
    },
    setNextStreamToken (state, nextStreamToken) {
      state.nextStreamToken = nextStreamToken
    }
  },
  actions: {
    async fetchInitialSealedBriefStreams ({ commit }, payload) {
      try {
        commit('setIsPageReady', false)
        const rawFetch = await API.graphql(graphqlOperation(ListSealedBriefStreams, payload))

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
        // commit('setIsPageReady', false)
        const rawFetch = await API.graphql(graphqlOperation(ListSealedBriefStreams, payload))

        commit('appendStreamList', rawFetch.data.listSealedStreams.items)
        commit('setNextStreamToken', rawFetch.data.listSealedStreams.nextToken)
      } catch (err) {
        logger.error('error fetching sealed streams', JSON.stringify(err))
      } finally {
        // commit('setIsPageReady', true)
      }
    },
    async fetchInitialLiveBriefStreams ({ commit }, payload) {
      try {
        commit('setIsPageReady', false)
        const rawFetch = await API.graphql(graphqlOperation(ListLiveBriefStreams, payload))

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
        // commit('setIsPageReady', false)
        const rawFetch = await API.graphql(graphqlOperation(ListLiveBriefStreams, payload))

        commit('appendStreamList', rawFetch.data.listLiveStreams.items)
        commit('setNextStreamToken', rawFetch.data.listLiveStreams.nextToken)
      } catch (err) {
        logger.error('error fetching live streams', JSON.stringify(err))
      } finally {
        // commit('setIsPageReady', true)
      }
    },
    async fetchInitialSealedBriefStreamsByFaveUsers ({ getters, commit }, payload) {
      commit('setIsPageReady', false)
      try {
        const rawFetch = await API.graphql(graphqlOperation(ListSealedBriefStreams, payload))

        commit('setStreamList', rawFetch.data.listSealedStreams.items.filter(s => s.likes.some(i => i.userId === getters['authenticatedUser/getUser'].id)))
        commit('setNextStreamToken', rawFetch.data.listSealedStreams.nextToken)
      } catch (err) {
        logger.error('error fetching sealed streams by fave others', err)
      } finally {
        commit('setIsPageReady', true)
      }
    },
    async fetchFurtherSealedBriefStreamsByFaveUsers ({ getters, commit }, payload) {
      try {
        // commit('setIsPageReady', false)
        const scrollEndNewFetch = await API.graphql(graphqlOperation(ListSealedBriefStreams, payload))

        commit('setStreamList', scrollEndNewFetch.data.listSealedStreams.items.filter(s => s.likes.some(i => i.userId === getters['authenticatedUser/getUser'].id)))
        commit('setNextStreamToken', scrollEndNewFetch.data.listSealedStreams.nextToken)

        // If the filtered result is not enough fetch a new portion
        let countOfByFaveOthers = 0
        while (countOfByFaveOthers < payload.fetchLimit && payload.nextToken != null) {
          const rawNewFetch = await API.graphql(graphqlOperation(ListSealedBriefStreams, {
            limit: payload.fetchLimit,
            nextToken: getters['getNextStreamToken']
          }))
          let newFetch = rawNewFetch.data.listSealedStreams.items.filter(s => s.likes.some(i => i.userId === getters['authenticatedUser/getUser'].id))
          commit('appendStreamList', ...newFetch)
          commit('setNextStreamToken', rawNewFetch.data.listSealedStreams.nextToken)
          countOfByFaveOthers += newFetch.length
        }
      } catch (err) {
        logger.error('error fetching sealed streams by fave others', err)
      } finally {
        // commit('setIsPageReady', true)
      }
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
