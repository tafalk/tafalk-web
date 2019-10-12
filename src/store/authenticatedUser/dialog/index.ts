const state = {
  isLogoutConfirmationDialogVisible: false,
  isUserInfoEditDialogVisible: false,
  isUserPrivacyEditDialogVisible: false,
  isUserAccountDeleteConfirmationDialogVisible: false,
  isUserProfilePictureChangeDialogVisible: false,
  isLanguageChooseDialogVisible: false
}

const getters = {
  getIsLogoutConfirmationDialogVisible (state: any) {
    return state.isLogoutConfirmationDialogVisible
  },
  getIsUserInfoEditDialogVisible (state: any) {
    return state.isUserInfoEditDialogVisible
  },
  getIsUserPrivacyEditDialogVisible (state: any) {
    return state.isUserPrivacyEditDialogVisible
  },
  getIsUserAccountDeleteConfirmationDialogVisible (state: any) {
    return state.isUserAccountDeleteConfirmationDialogVisible
  },
  getIsUserProfilePictureChangeDialogVisible (state: any) {
    return state.isUserProfilePictureChangeDialogVisible
  },
  getIsLanguageChooseDialogVisible (state: any) {
    return state.isLanguageChooseDialogVisible
  }
}

const mutations = {
  setIsLogoutConfirmationDialogVisible (state: any, isLogoutConfirmationDialogVisible: any) {
    state.isLogoutConfirmationDialogVisible = isLogoutConfirmationDialogVisible
  },
  setIsUserInfoEditDialogVisible (state: any, isUserInfoEditDialogVisible: any) {
    state.isUserInfoEditDialogVisible = isUserInfoEditDialogVisible
  },
  setIsUserPrivacyEditDialogVisible (state: any, isUserPrivacyEditDialogVisible: any) {
    state.isUserPrivacyEditDialogVisible = isUserPrivacyEditDialogVisible
  },
  setIsUserAccountDeleteConfirmationDialogVisible (state: any, isUserAccountDeleteConfirmationDialogVisible: any) {
    state.isUserAccountDeleteConfirmationDialogVisible = isUserAccountDeleteConfirmationDialogVisible
  },
  setIsUserProfilePictureChangeDialogVisible (state: any, isUserProfilePictureChangeDialogVisible: any) {
    state.isUserProfilePictureChangeDialogVisible = isUserProfilePictureChangeDialogVisible
  },
  setIsLanguageChooseDialogVisible (state: any, isLanguageChooseDialogVisible: any) {
    state.isLanguageChooseDialogVisible = isLanguageChooseDialogVisible
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
