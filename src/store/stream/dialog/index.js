const state = {
  isShareStreamLinkDialogVisible: false
}

const getters = {
  getIsShareStreamLinkDialogVisible (state) {
    return state.isShareStreamLinkDialogVisible
  }
}

const mutations = {
  setIsShareStreamLinkDialogVisible (state, isShareStreamLinkDialogVisible) {
    state.isShareStreamLinkDialogVisible = isShareStreamLinkDialogVisible
  },
  showShareStreamLinkDialog (state) {
    state.isShareStreamLinkDialogVisible = true
  },
  hideShareStreamLinkDialog (state) {
    state.isShareStreamLinkDialogVisible = false
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
