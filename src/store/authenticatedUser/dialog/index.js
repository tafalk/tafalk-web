const state = {
  isLogoutConfirmationDialogVisible: false,
  isUserInfoEditDialogVisible: false,
  isUserPrivacyEditDialogVisible: false,
  isUserAccountDeleteConfirmationDialogVisible: false,
  isUserProfilePictureChangeDialogVisible: false
}

const getters = {
  getIsLogoutConfirmationDialogVisible (state) {
    return state.isLogoutConfirmationDialogVisible
  },
  getIsUserInfoEditDialogVisible (state) {
    return state.isUserInfoEditDialogVisible
  },
  getIsUserPrivacyEditDialogVisible (state) {
    return state.isUserPrivacyEditDialogVisible
  },
  getIsUserAccountDeleteConfirmationDialogVisible (state) {
    return state.isUserAccountDeleteConfirmationDialogVisible
  },
  getIsUserProfilePictureChangeDialogVisible (state) {
    return state.isUserProfilePictureChangeDialogVisible
  }
}

const mutations = {
  setIsLogoutConfirmationDialogVisible (state, isLogoutConfirmationDialogVisible) {
    state.isLogoutConfirmationDialogVisible = isLogoutConfirmationDialogVisible
  },
  setIsUserInfoEditDialogVisible (state, isUserInfoEditDialogVisible) {
    state.isUserInfoEditDialogVisible = isUserInfoEditDialogVisible
  },
  setIsUserPrivacyEditDialogVisible (state, isUserPrivacyEditDialogVisible) {
    state.isUserPrivacyEditDialogVisible = isUserPrivacyEditDialogVisible
  },
  setIsUserAccountDeleteConfirmationDialogVisible (state, isUserAccountDeleteConfirmationDialogVisible) {
    state.isUserAccountDeleteConfirmationDialogVisible = isUserAccountDeleteConfirmationDialogVisible
  },
  setIsUserProfilePictureChangeDialogVisible (state, isUserProfilePictureChangeDialogVisible) {
    state.isUserProfilePictureChangeDialogVisible = isUserProfilePictureChangeDialogVisible
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
