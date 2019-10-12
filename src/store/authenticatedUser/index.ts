import { API, graphqlOperation } from 'aws-amplify'
import { UpdateUserTheme, UpdateUserLanguage } from '@/graphql/Profile'
import dialog from './dialog'
import { themeOptions } from '@/utils/constants'
import { User, UserProfilePicture, UserBasicInfo, UserProfilePrivacy } from '@/types'

const state = {
  user: null
}

const getters = {
  getUser (state: any) {
    return state.user
  }
}

const mutations = {
  clearUser (state: { user: null; }) {
    state.user = null
  },
  setUser (state: any, user: User) {
    state.user = user
  },
  setProfilePicture (state: any, payload: UserProfilePicture) {
    state.user.profilePictureKey = payload.profilePictureKey
    state.user.profilePictureObjectUrl = payload.profilePictureObjectUrl
  },
  setTheme (state: any, payload: string) {
    state.user.theme = payload
  },
  setLanguage (state: any, payload: string) {
    state.user.language = payload
  },
  setBasicInfo (state: any, payload: UserBasicInfo) {
    // state.user.preferredName = payload.preferredName
    state.user.bio = payload.bio
    state.user.location = payload.location
    state.user.site = payload.site
  },
  setProfilePrivacy (state: any, payload: UserProfilePrivacy) {
    // state.user.profilePrivacy = payload.profilePrivacy
    state.user.allowDirectMessages = payload.allowDirectMessages
  }
}

const actions = {
  async setTheme ({ commit }: any, payload: any) {
    const validatedTheme = (themeOptions.includes(payload.theme)) ? payload.theme : 'light'
    // Update User DB Table
    await API.graphql(graphqlOperation(UpdateUserTheme, {
      userId: payload.userId,
      theme: validatedTheme
    }))

    // commit to this module
    commit('setTheme', validatedTheme)
  },
  async setLanguage ({ commit }: any, payload: any) {
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
