import dialog from './dialog'

const state = {
  type: null,
  streamId: null,
  commentId: null,
  retractFlagId: null
}

const getters = {
  getType (state) {
    return state.type
  },
  getStreamId (state) {
    return state.streamId
  },
  getCommentId (state) {
    return state.commentId
  },
  getRetractFlagId (state) {
    return state.retractFlagId
  },
  getFlag (state) {
    return {
      streamId: state.streamId,
      commentId: state.commentId,
      type: state.type
    }
  },
  getRetractFlag (state) {
    return {
      retractFlagId: state.retractFlagId,
      type: state.type
    }
  }
}

const mutations = {
  setType (state, type) {
    state.type = type
  },
  setStreamId (state, streamId) {
    state.streamId = streamId
  },
  setCommentId (state, commentId) {
    state.commentId = commentId
  },
  setRetractFlagId (state, retractFlagId) {
    state.retractFlagId = retractFlagId
  },
  setFlag (state, payload) {
    state.type = payload.type
    state.streamId = payload.streamId
    state.commentId = payload.commentId
  },
  setRetractFlag (state, payload) {
    state.type = payload.type
    state.retractFlagId = payload.retractFlagId
  },
  clearFlag (state) {
    state.type = null
    state.id = null
  },
  clearRetractFlag (state) {
    state.type = null
    state.retractFlagId = null
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
