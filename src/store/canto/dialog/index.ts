const state = {
  isShareCantoLinkDialogVisible: false
}

const getters = {
  getIsShareCantoLinkDialogVisible (state: any) {
    return state.isShareCantoLinkDialogVisible
  }
}

const mutations = {
  setIsShareCantoLinkDialogVisible (state: any, isShareCantoLinkDialogVisible: boolean) {
    state.isShareCantoLinkDialogVisible = isShareCantoLinkDialogVisible
  },
  showShareCantoLinkDialog (state: any) {
    state.isShareCantoLinkDialogVisible = true
  },
  hideShareCantoLinkDialog (state: any) {
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
