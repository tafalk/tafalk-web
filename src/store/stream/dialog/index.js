const state = {
  isShareStreamLinkDialogVisible: false,
  isAddTitleDialogVisible: false
}

const getters = {
  getIsShareStreamLinkDialogVisible (state) {
    return state.isShareStreamLinkDialogVisible
  },
  getIsAddTitleDialogVisible (state) {
    return state.isAddTitleDialogVisible
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
  },
  setIsAddTitleDialogVisible (state, isAddTitleDialogVisible) {
    state.isAddTitleDialogVisible = isAddTitleDialogVisible
  },
  showAddTitleDialog (state) {
    state.isAddTitleDialogVisible = true
  },
  hideAddTitleDialog (state) {
    state.isAddTitleDialogVisible = false
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
