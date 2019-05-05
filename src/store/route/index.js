// initial local state
const state = {
  currentRoutePath: null,
  isRouteChanging: false
}

// getters
const getters = {
  getCurrentRoutePath: state => {
    return state.currentRoutePath
  },
  getIsRouteChanging: state => {
    return state.isRouteChanging
  }
}

// actions
const actions = {

}

// mutations
const mutations = {
  setCurrentRoutePath (state, currentRoutePath) {
    state.currentRoutePath = currentRoutePath
  },
  setIsRouteChanging (state, isRouteChanging) {
    state.isRouteChanging = isRouteChanging
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
