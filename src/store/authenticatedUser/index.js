import { API, graphqlOperation } from 'aws-amplify'
import { UpdateUserTheme, UpdateUserLanguage } from '../../graphql/Profile'
import dialog from './dialog'
import { themeOptions } from '../../utils/constants'

const state = {
  user: null
}

const getters = {
  getUser (state) {
    return state.user
  }
}

const mutations = {
  clearUser (state) {
    state.user = null
  },
  setUser (state, user) {
    state.user = user
  },
  setProfilePicture (state, payload) {
    state.user.profilePictureKey = payload.profilePictureKey
    state.user.profilePictureObjectUrl = payload.profilePictureObjectUrl
  },
  setTheme (state, payload) {
    state.user.theme = payload
  },
  setLanguage (state, payload) {
    state.user.language = payload
  },
  setBasicInfo (state, payload) {
    // state.user.preferredName = payload.preferredName
    state.user.bio = payload.bio
    state.user.location = payload.location
    state.user.site = payload.site
  },
  setProfilePrivacy (state, payload) {
    // state.user.profilePrivacy = payload.profilePrivacy
    state.user.allowDirectMesages = payload.allowDirectMesages
  }
}

const actions = {
  async setTheme ({ commit }, payload) {
    const validatedTheme = (themeOptions.includes(payload.theme)) ? payload.theme : 'light'
    // Update User DB Table
    await API.graphql(graphqlOperation(UpdateUserTheme, {
      userId: payload.userId,
      theme: validatedTheme
    }))

    // commit to this module
    commit('setTheme', validatedTheme)
  },
  async setLanguage ({ commit }, payload) {
    // Update User DB Table
    await API.graphql(graphqlOperation(UpdateUserLanguage, {
      userId: payload.userId,
      language: payload.language || null
    }))
    commit('setLanguage', payload.language)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    dialog
  }
}
