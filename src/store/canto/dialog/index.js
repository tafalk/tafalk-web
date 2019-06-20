const state = {
  isShareCantoLinkDialogVisible: false
}

const getters = {
  getIsShareCantoLinkDialogVisible (state) {
    return state.isShareCantoLinkDialogVisible
  }
}

const mutations = {
  setIsShareCantoLinkDialogVisible (state, isShareCantoLinkDialogVisible) {
    state.isShareCantoLinkDialogVisible = isShareCantoLinkDialogVisible
  },
  showShareCantoLinkDialog (state) {
    state.isShareCantoLinkDialogVisible = true
  },
  hideShareCantoLinkDialog (state) {
    state.isShareCantoLinkDialogVisible = false
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
