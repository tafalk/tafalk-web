const state = {
  isStopWatchingConfirmationDialogVisible: false,
  isBlockConfirmationDialogVisible: false,
  isChangeProfilePictureDialogVisible: false,
  isUserInfoEditDialogVisible: false,
  isUserPrivacyEditDialogVisible: false,
  isDeleteAccountConfirmationDialogVisible: false
}

const getters = {
  getIsStopWatchingConfirmationDialogVisible (state) {
    return state.isStopWatchingConfirmationDialogVisible
  },
  getIsBlockConfirmationDialogVisible (state) {
    return state.isBlockConfirmationDialogVisible
  },
  getIsChangeProfilePictureDialogVisible (state) {
    return state.isChangeProfilePictureDialogVisible
  },
  getIsUserInfoEditDialogVisible (state) {
    return state.isUserInfoEditDialogVisible
  },
  getIsUserPrivacyEditDialogVisible (state) {
    return state.isUserPrivacyEditDialogVisible
  },
  getIsDeleteAccountConfirmationDialogVisible (state) {
    return state.isDeleteAccountConfirmationDialogVisible
  }
}

const mutations = {
  setIsStopWatchingConfirmationDialogVisible (state, isStopWatchingConfirmationDialogVisible) {
    state.isStopWatchingConfirmationDialogVisible = isStopWatchingConfirmationDialogVisible
  },
  setIsBlockConfirmationDialogVisible (state, isBlockConfirmationDialogVisible) {
    state.isBlockConfirmationDialogVisible = isBlockConfirmationDialogVisible
  },
  setIsChangeProfilePictureDialogVisible (state, isChangeProfilePictureDialogVisible) {
    state.isChangeProfilePictureDialogVisible = isChangeProfilePictureDialogVisible
  },
  setIsUserInfoEditDialogVisible (state, isUserInfoEditDialogVisible) {
    state.isUserInfoEditDialogVisible = isUserInfoEditDialogVisible
  },
  setIsUserPrivacyEditDialogVisible (state, isUserPrivacyEditDialogVisible) {
    state.isUserPrivacyEditDialogVisible = isUserPrivacyEditDialogVisible
  },
  setIsDeleteAccountConfirmationDialogVisible (state, isDeleteAccountConfirmationDialogVisible) {
    state.isDeleteAccountConfirmationDialogVisible = isDeleteAccountConfirmationDialogVisible
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
