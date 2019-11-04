const state = {
  isFlagDialogVisible: false,
  isRetractFlagDialogVisible: false
}

const getters = {
  getIsFlagDialogVisible(state: any) {
    return state.isFlagDialogVisible
  },
  getIsRetractFlagDialogVisible(state: any) {
    return state.isRetractFlagDialogVisible
  }
}

const mutations = {
  setIsFlagDialogVisible(state: any, isFlagDialogVisible: boolean) {
    state.isFlagDialogVisible = isFlagDialogVisible
  },
  showFlagDialog(state: any) {
    state.isFlagDialogVisible = true
  },
  hideFlagDialog(state: any) {
    state.isFlagDialogVisible = false
  },
  setIsRetractFlagDialogVisible(
    state: any,
    isRetractFlagDialogVisible: boolean
  ) {
    state.isRetractFlagDialogVisible = isRetractFlagDialogVisible
  },
  showRetractFlagDialog(state: any) {
    state.isRetractFlagDialogVisible = true
  },
  hideRetractFlagDialog(state: any) {
    state.isRetractFlagDialogVisible = false
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
