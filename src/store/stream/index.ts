import dialog from './dialog'

const state = {
  shareStreamLink: null,
  stream: null,
  paginatedComments: null,
  isRouteChangeSafe: false
}

const getters = {
  getShareStreamLink(state: any) {
    return state.shareStreamLink
  },
  getStream(state: any) {
    return state.stream
  },
  getPaginatedStreamComments(state: any) {
    return state.paginatedComments
  },
  getIsRouteChangeSafe(state: any) {
    return state.isRouteChangeSafe
  }
}

const mutations = {
  clearShareStreamLink(state: any) {
    state.shareStreamLink = null
  },
  setShareStreamLink(state: any, shareStreamLink: any) {
    state.shareStreamLink = shareStreamLink
  },
  setStream(state: any, stream: any) {
    state.stream = stream
  },
  setStreamLikes(state: any, likeObjectArray: any) {
    state.stream.likes = likeObjectArray
  },
  setStreamFlags(state: any, flagObjectArray: any) {
    state.stream.flags = flagObjectArray
  },
  setPaginatedStreamComments(state: any, paginatedComments: any) {
    state.paginatedComments = paginatedComments
  },
  setIsRouteChangeSafe(state: any, isRouteChangeSafe: boolean) {
    state.isRouteChangeSafe = isRouteChangeSafe
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
