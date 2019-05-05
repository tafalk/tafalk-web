import { API, graphqlOperation } from 'aws-amplify'
import { minSiteSearchTextLength } from '../../utils/Constants'
import { Search } from '../../graphql/SiteSearch'

const state = {
  searchText: '',
  searchResults: [],
  isSearchTextLongEnough: false
}

const getters = {
  getSearchText (state) {
    return state.searchText
  },
  getSearchResults (state) {
    return state.searchResults
  },
  getIsSearchTextLongEnough (state) {
    return state.isSearchTextLongEnough
  }
}

const mutations = {
  clearSearchText (state) {
    state.searchText = ''
  },
  clearSearchResults (state) {
    state.searchResults = []
  },
  setSearchText (state, payload) {
    state.searchText = payload
  },
  setSearchResults (state, payload) {
    state.searchResults = payload
  },
  setIsSearchTextLongEnough (state, payload) {
    state.isSearchTextLongEnough = payload
  }
}

const actions = {
  async search ({ commit }, payload) {
    // Set the search text
    commit('setSearchText', payload)

    // Set the search result if the text is beyond the acceptable range
    if (payload && payload.length >= minSiteSearchTextLength) {
      commit('setIsSearchTextLongEnough', true)
      const siteSearchGraphqlResult = await API.graphql(graphqlOperation(Search, {
        query: payload
      }))
      const siteSearchResult = siteSearchGraphqlResult.data.search
      commit('setSearchResults', siteSearchResult)
    } else {
      commit('setIsSearchTextLongEnough', false)
      commit('clearSearchResults')
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
