import { API, graphqlOperation, Storage } from 'aws-amplify'
import { UpdateUserBasicProfileInfo, UpdateUserProfilePictureKey, UpdateUserProfilePrivacyInfo } from '../../graphql/Profile'
import { GetStoreUserForProfilePictureChange, GetStoreUserForBasicInfoChange, GetStoreUserForPrivacyChange } from '../../utils/storeUtils'
import dialog from './dialog'

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
  clearInboundWatchIdFromAuthenticatedUser (state) {
    state.user.connectionsWithAuthenticatedUser.inbound.watchId = ''
  },
  clearInboundBlockIdFromAuthenticatedUser (state) {
    state.user.connectionsWithAuthenticatedUser.inbound.blockId = ''
  },
  setInboundBlockIdFromAuthenticatedUser (state, blockId) {
    state.user.connectionsWithAuthenticatedUser.inbound.blockId = blockId
  },
  setInboundWatchIdFromAuthenticatedUser (state, watchId) {
    state.user.connectionsWithAuthenticatedUser.inbound.watchId = watchId
  },
  setProfilePicture (state, payload) {
    state.user.profilePictureKey = payload.profilePictureKey
    state.user.profilePictureObjectUrl = payload.profilePictureObjectUrl
  },
  setBasicInfo (state, payload) {
    // state.user.preferredName = payload.preferredName
    state.user.bio = payload.bio
    state.user.location = payload.location
    state.user.site = payload.site
  },
  setProfilePrivacy (state, payload) {
    state.user.profilePrivacy = payload.profilePrivacy
    state.user.allowDirectMesages = payload.allowDirectMesages
  }
}

const actions = {
  async setProfilePicture ({ commit }, payload) {
    // Upload to S3 storage
    await Storage.put(payload.profilePicture.key, payload.profilePicture.fileObject, {
      level: payload.profilePicture.level,
      contentType: payload.profilePicture.type
    })

    // Update User DB Table
    await API.graphql(graphqlOperation(UpdateUserProfilePictureKey, {
      userId: payload.userId,
      profilePictureKey: payload.profilePicture.key
    }))

    const storeObj = await GetStoreUserForProfilePictureChange(payload.profilePicture.key)

    // commit to this module
    commit('setProfilePicture', storeObj)

    // commit to 'authenticatedUser' module
    commit('authenticatedUser/setProfilePicture', storeObj, { root: true })
  },
  async setBasicInfo ({ commit }, payload) {
    // Aws Appsync mutation
    await API.graphql(graphqlOperation(UpdateUserBasicProfileInfo, {
      userId: payload.userId,
      // Setting the optional value to null, because DynamoDB rejects empty strings -but accepts null anyway
      // preferredName: (payload.preferredName) ? payload.preferredName : null,
      bio: (payload.bio) ? payload.bio : null,
      location: (payload.location) ? payload.location : null,
      site: (payload.site) ? payload.site : null
    }))

    const storeObj = await GetStoreUserForBasicInfoChange(payload)

    // commit to this module
    commit('setBasicInfo', storeObj)

    // commit to 'authenticatedUser' module
    commit('authenticatedUser/setBasicInfo', storeObj, { root: true })
  },
  async setProfilePrivacy ({ commit }, payload) {
    await API.graphql(graphqlOperation(UpdateUserProfilePrivacyInfo, {
      userId: payload.userId,
      profilePrivacy: payload.profilePrivacy,
      allowDirectMesages: payload.allowDirectMesages
    }))

    const storeObj = await GetStoreUserForPrivacyChange(payload)

    // commit to this module
    commit('setProfilePrivacy', storeObj)

    // commit to 'authenticatedUser' module
    commit('authenticatedUser/setProfilePrivacy', storeObj, { root: true })
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
