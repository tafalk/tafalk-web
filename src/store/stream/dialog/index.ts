const state = {
  isShareStreamLinkDialogVisible: false
}

const getters = {
  getIsShareStreamLinkDialogVisible(state: any) {
    return state.isShareStreamLinkDialogVisible
  }
}

const mutations = {
  setIsShareStreamLinkDialogVisible(
    state: any,
    isShareStreamLinkDialogVisible: boolean
  ) {
    state.isShareStreamLinkDialogVisible = isShareStreamLinkDialogVisible
  },
  showShareStreamLinkDialog(state: any) {
    state.isShareStreamLinkDialogVisible = true
  },
  hideShareStreamLinkDialog(state: any) {
    state.isShareStreamLinkDialogVisible = false
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
