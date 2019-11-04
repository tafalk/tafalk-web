import dialog from './dialog'

const state = {
  shareCantoLink: null,
  canto: null,
  isRouteChangeSafe: false,
  bodyUserSelection: null
}

const getters = {
  getShareCantoLink(state: any) {
    return state.shareCantoLink
  },
  getCanto(state: any) {
    return state.canto
  },
  getIsRouteChangeSafe(state: any) {
    return state.isRouteChangeSafe
  },
  getBodyUserSelection(state: any) {
    return state.bodyUserSelection
  }
}

const mutations = {
  clearShareCantoLink(state: any) {
    state.shareCantoLink = null
  },
  setShareCantoLink(state: any, shareCantoLink: string) {
    state.shareCantoLink = shareCantoLink
  },
  setCanto(state: any, canto: any) {
    state.canto = canto
  },
  setCantoLikes(state: any, likeObjectArray: any) {
    state.canto.likes = likeObjectArray
  },
  setCantoFlags(state: any, flagObjectArray: any) {
    state.canto.flags = flagObjectArray
  },
  setIsRouteChangeSafe(state: any, isRouteChangeSafe: boolean) {
    state.isRouteChangeSafe = isRouteChangeSafe
  },
  setBodyUserSelection(state: any, indices: any) {
    state.bodyUserSelection = indices
  }
}

const actions = {}

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
