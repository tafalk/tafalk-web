import API, { graphqlOperation } from '@aws-amplify/api'
import { minSiteSearchTextLength } from '@/utils/constants'
import { Search } from '@/graphql/SiteSearch'

const state = {
  searchText: '',
  searchResults: [],
  isSearchTextLongEnough: false
}

const getters = {
  getSearchText(state: any) {
    return state.searchText
  },
  getSearchResults(state: any) {
    return state.searchResults
  },
  getIsSearchTextLongEnough(state: any) {
    return state.isSearchTextLongEnough
  }
}

const mutations = {
  clearSearchText(state: any) {
    state.searchText = ''
  },
  clearSearchResults(state: any) {
    state.searchResults = []
  },
  setSearchText(state: any, payload: string) {
    state.searchText = payload
  },
  setSearchResults(state: any, payload: any) {
    state.searchResults = payload
  },
  setIsSearchTextLongEnough(state: any, payload: boolean) {
    state.isSearchTextLongEnough = payload
  }
}

const actions = {
  async search({ commit }: any, payload: any) {
    // Set the search text
    commit('setSearchText', payload)

    // Set the search result if the text is beyond the acceptable range
    if (payload && payload.length >= minSiteSearchTextLength) {
      commit('setIsSearchTextLongEnough', true)
      const siteSearchGraphqlResult: any = await API.graphql(
        graphqlOperation(Search, {
          query: payload
        })
      )
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
