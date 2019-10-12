// initial local state
const state = {
  currentRoutePath: null,
  isRouteChanging: false
}

// getters
const getters = {
  getCurrentRoutePath (state: any) {
    return state.currentRoutePath
  },
  getIsRouteChanging (state: any) {
    return state.isRouteChanging
  }
}

// actions
const actions = {

}

// mutations
const mutations = {
  setCurrentRoutePath (state: any, currentRoutePath: string) {
    state.currentRoutePath = currentRoutePath
  },
  setIsRouteChanging (state: any, isRouteChanging: boolean) {
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
