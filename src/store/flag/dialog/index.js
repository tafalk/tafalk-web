const state = {
  isFlagDialogVisible: false,
  isRetractFlagDialogVisible: false
}

const getters = {
  getIsFlagDialogVisible (state) {
    return state.isFlagDialogVisible
  },
  getIsRetractFlagDialogVisible (state) {
    return state.isRetractFlagDialogVisible
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
  },
  setIsFlagDialogVisible (state, isFlagDialogVisible) {
    state.isFlagDialogVisible = isFlagDialogVisible
  },
  showFlagDialog (state) {
    state.isFlagDialogVisible = true
  },
  hideFlagDialog (state) {
    state.isFlagDialogVisible = false
  },
  setIsRetractFlagDialogVisible (state, isRetractFlagDialogVisible) {
    state.isRetractFlagDialogVisible = isRetractFlagDialogVisible
  },
  showRetractFlagDialog (state) {
    state.isRetractFlagDialogVisible = true
  },
  hideRetractFlagDialog (state) {
    state.isRetractFlagDialogVisible = false
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
