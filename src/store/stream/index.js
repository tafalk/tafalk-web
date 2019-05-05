import dialog from './dialog'

const state = {
  shareStreamLink: null,
  stream: null,
  paginatedComments: null,
  isRouteChangeSafe: false
}

const getters = {
  getShareStreamLink (state) {
    return state.shareStreamLink
  },
  getStream (state) {
    return state.stream
  },
  getPaginatedStreamComments (state) {
    return state.paginatedComments
  },
  getIsRouteChangeSafe (state) {
    return state.isRouteChangeSafe
  }
}

const mutations = {
  clearShareStreamLink (state) {
    state.shareStreamLink = null
  },
  setShareStreamLink (state, shareStreamLink) {
    state.shareStreamLink = shareStreamLink
  },
  setStream (state, stream) {
    state.stream = stream
  },
  setStreamLikes (state, likeObjectArray) {
    state.stream.likes = likeObjectArray
  },
  setPaginatedStreamComments (state, paginatedComments) {
    state.paginatedComments = paginatedComments
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
