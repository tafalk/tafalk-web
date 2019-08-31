import dialog from './dialog'

const state = {
  shareCantoLink: null,
  canto: null,
  isRouteChangeSafe: false,
  bodyUserSelection: null
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
  },
  getBodyUserSelection (state) {
    return state.bodyUserSelection
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
  },
  setBodyUserSelection (state, indices) {
    state.bodyUserSelection = indices
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
