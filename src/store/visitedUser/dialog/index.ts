const state = {
  isStopWatchingConfirmationDialogVisible: false,
  isBlockConfirmationDialogVisible: false,
  isChangeProfilePictureDialogVisible: false,
  isUserInfoEditDialogVisible: false,
  isUserPrivacyEditDialogVisible: false,
  isDeleteAccountConfirmationDialogVisible: false
}

const getters = {
  getIsStopWatchingConfirmationDialogVisible (state: any) {
    return state.isStopWatchingConfirmationDialogVisible
  },
  getIsBlockConfirmationDialogVisible (state: any) {
    return state.isBlockConfirmationDialogVisible
  },
  getIsChangeProfilePictureDialogVisible (state: any) {
    return state.isChangeProfilePictureDialogVisible
  },
  getIsUserInfoEditDialogVisible (state: any) {
    return state.isUserInfoEditDialogVisible
  },
  getIsUserPrivacyEditDialogVisible (state: any) {
    return state.isUserPrivacyEditDialogVisible
  },
  getIsDeleteAccountConfirmationDialogVisible (state: any) {
    return state.isDeleteAccountConfirmationDialogVisible
  }
}

const mutations = {
  setIsStopWatchingConfirmationDialogVisible (state: any, isStopWatchingConfirmationDialogVisible: boolean) {
    state.isStopWatchingConfirmationDialogVisible = isStopWatchingConfirmationDialogVisible
  },
  setIsBlockConfirmationDialogVisible (state: any, isBlockConfirmationDialogVisible: boolean) {
    state.isBlockConfirmationDialogVisible = isBlockConfirmationDialogVisible
  },
  setIsChangeProfilePictureDialogVisible (state: any, isChangeProfilePictureDialogVisible: boolean) {
    state.isChangeProfilePictureDialogVisible = isChangeProfilePictureDialogVisible
  },
  setIsUserInfoEditDialogVisible (state: any, isUserInfoEditDialogVisible: boolean) {
    state.isUserInfoEditDialogVisible = isUserInfoEditDialogVisible
  },
  setIsUserPrivacyEditDialogVisible (state: any, isUserPrivacyEditDialogVisible: boolean) {
    state.isUserPrivacyEditDialogVisible = isUserPrivacyEditDialogVisible
  },
  setIsDeleteAccountConfirmationDialogVisible (state: any, isDeleteAccountConfirmationDialogVisible: boolean) {
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
