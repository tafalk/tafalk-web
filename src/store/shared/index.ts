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
  userInteractionResultNotificationTimeout: 5000,
  menuDrawer: false
}

const getters = {
  getIsTermsOfServiceDialogVisible (state: any) {
    return state.isTermsOfServiceDialogVisible
  },
  getIsPrivacyPolicyDialogVisible (state: any) {
    return state.isPrivacyPolicyDialogVisible
  },
  getIsSiteNotificationVisible (state: any) {
    return state.isSiteNotificationVisible
  },
  getSiteNotificationText (state: any) {
    return state.siteNotificationText
  },
  getSiteNotificationType (state: any) {
    return state.siteNotificationType
  },
  getSiteNotificationTimeout (state: any) {
    return state.siteNotificationTimeout
  },
  getIsUserInteractionResultNotificationVisible (state: any) {
    return state.isUserInteractionResultNotificationVisible
  },
  getUserInteractionResultNotificationText (state: any) {
    return state.userInteractionResultNotificationText
  },
  getUserInteractionResultNotificationType (state: any) {
    return state.userInteractionResultNotificationType
  },
  getUserInteractionResultNotificationTimeout (state: any) {
    return state.userInteractionResultNotificationTimeout
  },
  getSiteNotification (state: any) {
    return {
      isSiteNotificationVisible: state.isSiteNotificationVisible,
      siteNotificationText: state.siteNotificationText,
      siteNotificationType: state.siteNotificationType,
      siteNotificationTimeout: state.siteNotificationTimeout
    }
  },
  getUserInteractionResultNotification (state: any) {
    return {
      isUserInteractionResultNotificationVisible: state.isUserInteractionResultNotificationVisible,
      userInteractionResultNotificationText: state.userInteractionResultNotificationText,
      userInteractionResultNotificationNotificationType: state.userInteractionResultNotificationType,
      userInteractionResultNotificationTimeout: state.userInteractionResultNotificationTimeout
    }
  },
  getMenuDrawer (state: any) {
    return state.menuDrawer
  }
}

// mutations
const mutations = {
  clearSiteNotification (state: any) {
    state.isSiteNotificationVisible = false
    state.siteNotificationText = null
    state.siteNotificationType = null
    state.siteNotificationTimeout = 0
  },
  clearUserInteractionResultNotification (state: any) {
    state.isUserInteractionResultNotificationVisible = false
    state.userInteractionResultNotificationText = null
    state.userInteractionResultNotificationType = null
    state.userInteractionResultNotificationTimeout = 0
  },
  setSiteNotification (state: any, payload: any) {
    state.isSiteNotificationVisible = payload.isSiteNotificationVisible
    state.siteNotificationText = payload.siteNotificationText
    state.siteNotificationType = payload.siteNotificationType
    state.siteNotificationTimeout = payload.siteNotificationTimeout ? payload.siteNotificationTimeout : 3000
  },
  setUserInteractionResultNotification (state: any, payload: any) {
    state.isUserInteractionResultNotificationVisible = payload.isUserInteractionResultNotificationVisible
    state.userInteractionResultNotificationText = payload.userInteractionResultNotificationText
    state.userInteractionResultNotificationType = payload.userInteractionResultNotificationType
    state.userInteractionResultNotificationTimeout = payload.userInteractionResultNotificationTimeout ? payload.userInteractionResultNotificationTimeout : 5000
  },
  setIsSiteNotificationVisible (state: any, isSiteNotificationVisible: any) {
    state.isSiteNotificationVisible = isSiteNotificationVisible
  },
  setIsUserInteractionResultNotificationVisible (state: any, isUserInteractionResultNotificationVisible: any) {
    state.isUserInteractionResultNotificationVisible = isUserInteractionResultNotificationVisible
  },
  setIsTermsOfServiceDialogVisible (state: any, isTermsOfServiceDialogVisible: boolean) {
    state.isTermsOfServiceDialogVisible = isTermsOfServiceDialogVisible
  },
  setIsPrivacyPolicyDialogVisible (state: any, isPrivacyPolicyDialogVisible: boolean) {
    state.isPrivacyPolicyDialogVisible = isPrivacyPolicyDialogVisible
  },
  setSiteNotificationText (state: any, siteNotificationText: string) {
    state.siteNotificationText = siteNotificationText
  },
  setSiteNotificationType (state: any, siteNotificationType: string) {
    state.siteNotificationType = siteNotificationType
  },
  setSiteNotificationTimeout (state: any, siteNotificationTimeout: number) {
    state.siteNotificationTimeout = siteNotificationTimeout
  },
  setUserInteractionResultNotificationText (state: any, userInteractionResultNotificationText: string) {
    state.userInteractionResultNotificationText = userInteractionResultNotificationText
  },
  setUserInteractionResultNotificationType (state: any, userInteractionResultNotificationType: string) {
    state.userInteractionResultNotificationType = userInteractionResultNotificationType
  },
  setUserInteractionResultNotificationTimeout (state: any, userInteractionResultNotificationTimeout: number) {
    state.userInteractionResultNotificationTimeout = userInteractionResultNotificationTimeout
  },
  setMenuDrawer (state: any, menuDrawer: any) {
    state.menuDrawer = menuDrawer
  },
  toggleMenuDrawer (state: any) {
    state.menuDrawer = !(state.menuDrawer)
  }
}

const actions = {
  setNewSiteNotification ({ commit }: any, payload: any) {
    // first, clear if a notification exists (one notification at a time)
    commit('clearSiteNotification')
    commit('setSiteNotification', {
      isSiteNotificationVisible: true,
      siteNotificationText: payload.siteNotificationText,
      siteNotificationType: payload.siteNotificationType,
      siteNotificationTimeout: payload.siteNotificationTimeout
    })
  },
  setNewSiteError ({ commit }: any, payload: any) {
    // first, clear if a notification exists (one notification at a time)
    commit('clearSiteNotification')
    commit('setSiteNotification', {
      isSiteNotificationVisible: true,
      siteNotificationText: payload,
      siteNotificationType: 'error',
      siteNotificationTimeout: 3000
    })
  },
  setNewNoTimeoutSiteSuccess ({ commit, dispatch }: any, payload: any) {
    // first, clear if a notification exists (one notification at a time)
    commit('clearSiteNotification')
    commit('setSiteNotification', {
      isSiteNotificationVisible: true,
      siteNotificationText: payload,
      siteNotificationType: 'success',
      siteNotificationTimeout: 0
    })
  },
  setNewUserInteractionResultNotification ({ commit }: any, payload: any) {
    // first, clear if a notification exists (one notification at a time)
    commit('clearUserInteractionResultNotification')
    commit('setUserInteractionResultNotification', {
      isUserInteractionResultNotificationVisible: true,
      userInteractionResultNotificationText: payload.userInteractionResultNotificationText,
      userInteractionResultNotificationType: payload.userInteractionResultNotificationType,
      userInteractionResultNotificationTimeout: payload.userInteractionResultNotificationTimeout
    })
  },
  setNewUserInteractionResultError ({ commit }: any, payload: any) {
    // first, clear if a notification exists (one notification at a time)
    commit('clearUserInteractionResultNotification')
    commit('setUserInteractionResultNotification', {
      isUserInteractionResultNotificationVisible: true,
      userInteractionResultNotificationText: payload,
      userInteractionResultNotificationType: 'error',
      userInteractionResultNotificationTimeout: 5000
    })
  },
  setNewUserInteractionResultSuccess ({ commit }: any, payload: any) {
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
