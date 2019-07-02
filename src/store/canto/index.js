import dialog from './dialog'

const state = {
  shareCantoLink: null,
  canto: null,
  isRouteChangeSafe: false
}

const getters = {
  getShareCantoLink (state) {
    return state.shareCantoLink
  },
  getCanto (state) {
    return state.canto
  },
  getIsRouteChangeSafe (state) {
    return state.isRouteChangeSafe
  }
}

const mutations = {
  clearShareCantoLink (state) {
    state.shareCantoLink = null
  },
  setShareCantoLink (state, shareCantoLink) {
    state.shareCantoLink = shareCantoLink
  },
  setCanto (state, canto) {
    state.canto = canto
  },
  setCantoLikes (state, likeObjectArray) {
    state.canto.likes = likeObjectArray
  },
  setIsRouteChangeSafe (state, isRouteChangeSafe) {
    state.isRouteChangeSafe = isRouteChangeSafe
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    dialog
  }
}
