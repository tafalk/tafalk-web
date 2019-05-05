const state = {
  isSiteNotificationVisible: false,
  isUserInteractionResultNotificationVisible: false,
  isTermsOfServiceDialogVisible: false,
  isPrivacyPolicyDialogVisible: false,
  siteNotificationText: null,
  siteNotificationType: null,
  siteNotificationTimeout: 3000,
  userInteractionResultNotificationText: null,
  userInteractionResultNotificationType: null,
  userInteractionResultNotificationTimeout: 5000
}

const getters = {
  getIsTermsOfServiceDialogVisible (state) {
    return state.isTermsOfServiceDialogVisible
  },
  getIsPrivacyPolicyDialogVisible (state) {
    return state.isPrivacyPolicyDialogVisible
  },
  getIsSiteNotificationVisible (state) {
    return state.isSiteNotificationVisible
  },
  getSiteNotificationText (state) {
    return state.siteNotificationText
  },
  getSiteNotificationType (state) {
    return state.siteNotificationType
  },
  getSiteNotificationTimeout (state) {
    return state.siteNotificationTimeout
  },
  getIsUserInteractionResultNotificationVisible (state) {
    return state.isUserInteractionResultNotificationVisible
  },
  getUserInteractionResultNotificationText (state) {
    return state.userInteractionResultNotificationText
  },
  getUserInteractionResultNotificationType (state) {
    return state.userInteractionResultNotificationType
  },
  getUserInteractionResultNotificationTimeout (state) {
    return state.userInteractionResultNotificationTimeout
  },
  getSiteNotification (state) {
    return {
      isSiteNotificationVisible: state.isSiteNotificationVisible,
      siteNotificationText: state.siteNotificationText,
      siteNotificationType: state.siteNotificationType,
      siteNotificationTimeout: state.siteNotificationTimeout
    }
  },
  getUserInteractionResultNotification (state) {
    return {
      isUserInteractionResultNotificationVisible: state.isUserInteractionResultNotificationVisible,
      userInteractionResultNotificationText: state.userInteractionResultNotificationText,
      userInteractionResultNotificationNotificationType: state.userInteractionResultNotificationType,
      userInteractionResultNotificationTimeout: state.userInteractionResultNotificationTimeout
    }
  }
}

// mutations
const mutations = {
  clearSiteNotification (state) {
    state.isSiteNotificationVisible = false
    state.siteNotificationText = null
    state.siteNotificationType = null
    state.siteNotificationTimeout = 0
  },
  clearUserInteractionResultNotification (state) {
    state.isUserInteractionResultNotificationVisible = false
    state.userInteractionResultNotificationText = null
    state.userInteractionResultNotificationType = null
    state.userInteractionResultNotificationTimeout = 0
  },
  setSiteNotification (state, payload) {
    state.isSiteNotificationVisible = payload.isSiteNotificationVisible
    state.siteNotificationText = payload.siteNotificationText
    state.siteNotificationType = payload.siteNotificationType
    state.siteNotificationTimeout = payload.siteNotificationTimeout ? payload.siteNotificationTimeout : 3000
  },
  setUserInteractionResultNotification (state, payload) {
    state.isUserInteractionResultNotificationVisible = payload.isUserInteractionResultNotificationVisible
    state.userInteractionResultNotificationText = payload.userInteractionResultNotificationText
    state.userInteractionResultNotificationType = payload.userInteractionResultNotificationType
    state.userInteractionResultNotificationTimeout = payload.userInteractionResultNotificationTimeout ? payload.userInteractionResultNotificationTimeout : 5000
  },
  setIsSiteNotificationVisible (state, isSiteNotificationVisible) {
    state.isSiteNotificationVisible = isSiteNotificationVisible
  },
  setIsUserInteractionResultNotificationVisible (state, isUserInteractionResultNotificationVisible) {
    state.isUserInteractionResultNotificationVisible = isUserInteractionResultNotificationVisible
  },
  setIsTermsOfServiceDialogVisible (state, isTermsOfServiceDialogVisible) {
    state.isTermsOfServiceDialogVisible = isTermsOfServiceDialogVisible
  },
  setIsPrivacyPolicyDialogVisible (state, isPrivacyPolicyDialogVisible) {
    state.isPrivacyPolicyDialogVisible = isPrivacyPolicyDialogVisible
  },
  setSiteNotificationText (state, siteNotificationText) {
    state.siteNotificationText = siteNotificationText
  },
  setSiteNotificationType (state, siteNotificationType) {
    state.siteNotificationType = siteNotificationType
  },
  setSiteNotificationTimeout (state, siteNotificationTimeout) {
    state.siteNotificationTimeout = siteNotificationTimeout
  },
  setUserInteractionResultNotificationText (state, userInteractionResultNotificationText) {
    state.userInteractionResultNotificationText = userInteractionResultNotificationText
  },
  setUserInteractionResultNotificationType (state, userInteractionResultNotificationType) {
    state.userInteractionResultNotificationType = userInteractionResultNotificationType
  },
  setUserInteractionResultNotificationTimeout (state, userInteractionResultNotificationTimeout) {
    state.userInteractionResultNotificationTimeout = userInteractionResultNotificationTimeout
  }
}

const actions = {
  setNewSiteNotification ({ commit }, payload) {
    // first, clear if a notification exists (one notification at a time)
    commit('clearSiteNotification')
    commit('setSiteNotification', {
      isSiteNotificationVisible: true,
      siteNotificationText: payload.siteNotificationText,
      siteNotificationType: payload.siteNotificationType,
      siteNotificationTimeout: payload.siteNotificationTimeout
    })
  },
  setNewSiteError ({ commit }, payload) {
    // first, clear if a notification exists (one notification at a time)
    commit('clearSiteNotification')
    commit('setSiteNotification', {
      isSiteNotificationVisible: true,
      siteNotificationText: payload,
      siteNotificationType: 'error',
      siteNotificationTimeout: 3000
    })
  },
  setNewNoTimeoutSiteSuccess ({ commit, dispatch }, payload) {
    // first, clear if a notification exists (one notification at a time)
    commit('clearSiteNotification')
    commit('setSiteNotification', {
      isSiteNotificationVisible: true,
      siteNotificationText: payload,
      siteNotificationType: 'success',
      siteNotificationTimeout: 0
    })
  },
  setNewUserInteractionResultNotification ({ commit }, payload) {
    // first, clear if a notification exists (one notification at a time)
    commit('clearUserInteractionResultNotification')
    commit('setUserInteractionResultNotification', {
      isUserInteractionResultNotificationVisible: true,
      userInteractionResultNotificationText: payload.userInteractionResultNotificationText,
      userInteractionResultNotificationType: payload.userInteractionResultNotificationType,
      userInteractionResultNotificationTimeout: payload.userInteractionResultNotificationTimeout
    })
  },
  setNewUserInteractionResultError ({ commit }, payload) {
    // first, clear if a notification exists (one notification at a time)
    commit('clearUserInteractionResultNotification')
    commit('setUserInteractionResultNotification', {
      isUserInteractionResultNotificationVisible: true,
      userInteractionResultNotificationText: payload,
      userInteractionResultNotificationType: 'error',
      userInteractionResultNotificationTimeout: 5000
    })
  },
  setNewUserInteractionResultSuccess ({ commit }, payload) {
    // first, clear if a notification exists (one notification at a time)
    commit('clearUserInteractionResultNotification')
    commit('setUserInteractionResultNotification', {
      isUserInteractionResultNotificationVisible: true,
      userInteractionResultNotificationText: payload,
      userInteractionResultNotificationType: 'success',
      userInteractionResultNotificationTimeout: 5000
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
