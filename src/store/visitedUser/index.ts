import API, { graphqlOperation } from '@aws-amplify/api'
import Storage from '@aws-amplify/storage'
import { Logger } from '@aws-amplify/core'
import {
  UpdateUserBasicProfileInfo,
  UpdateUserProfilePictureKey,
  UpdateUserProfilePrivacyInfo
} from '@/graphql/Profile'
import dialog from './dialog'

const logger = new Logger('VisitedUserStore')

const state = {
  user: null
}

const getters = {
  getUser(state: any) {
    return state.user
  }
}

const mutations = {
  clearUser(state: any) {
    state.user = null
  },
  setUser(state: any, user: any) {
    state.user = user
  },
  clearInboundWatchIdFromAuthenticatedUser(state: any) {
    state.user.connectionsWithAuthenticatedUser.inbound.watchId = ''
  },
  clearInboundBlockIdFromAuthenticatedUser(state: any) {
    state.user.connectionsWithAuthenticatedUser.inbound.blockId = ''
  },
  setInboundBlockIdFromAuthenticatedUser(state: any, blockId: string) {
    state.user.connectionsWithAuthenticatedUser.inbound.blockId = blockId
  },
  setInboundWatchIdFromAuthenticatedUser(state: any, watchId: string) {
    state.user.connectionsWithAuthenticatedUser.inbound.watchId = watchId
  },
  setProfilePicture(state: any, payload: any) {
    state.user.profilePictureKey = payload.profilePictureKey
    state.user.profilePictureObjectUrl = payload.profilePictureObjectUrl
  },
  setBasicInfo(state: any, payload: any) {
    // state.user.preferredName = payload.preferredName
    state.user.bio = payload.bio
    state.user.location = payload.location
    state.user.site = payload.site
  },
  setProfilePrivacy(state: any, payload: any) {
    // state.user.profilePrivacy = payload.profilePrivacy
    state.user.allowDirectMessages = payload.allowDirectMessages
  }
}

const actions = {
  async setProfilePicture({ commit }: any, payload: any) {
    try {
      // Upload to S3 storage
      await Storage.put(
        payload.profilePicture.key,
        payload.profilePicture.fileObject,
        {
          level: payload.profilePicture.level,
          contentType: payload.profilePicture.type
        }
      )

      // Update User DB Table
      await API.graphql(
        graphqlOperation(UpdateUserProfilePictureKey, {
          userId: payload.userId,
          profilePictureKey: payload.profilePicture.key
        })
      )
    } catch (err) {
      logger.error('confirm registration error', JSON.stringify(err))
    }

    const profilePictureKey = payload.profilePicture.key
    const profilePictureObjectUrl = profilePictureKey
      ? await Storage.get(profilePictureKey, { level: 'protected' })
      : null

    const storeObj = {
      profilePictureKey,
      profilePictureObjectUrl
    }

    // commit to this module
    commit('setProfilePicture', storeObj)

    // commit to 'authenticatedUser' module
    commit('authenticatedUser/setProfilePicture', storeObj, { root: true })
  },
  async setBasicInfo({ commit }: any, payload: any) {
    // Aws Appsync mutation
    await API.graphql(
      graphqlOperation(UpdateUserBasicProfileInfo, {
        userId: payload.userId,
        // Setting the optional value to null, because DynamoDB rejects empty strings -but accepts null anyway
        // preferredName: (payload.preferredName) ? payload.preferredName : null,
        bio: payload.bio ? payload.bio : null,
        location: payload.location ? payload.location : null,
        site: payload.site ? payload.site : null
      })
    )

    const storeObj = {
      bio: payload.bio,
      location: payload.location,
      site: payload.site
    }

    // commit to this module
    commit('setBasicInfo', storeObj)

    // commit to 'authenticatedUser' module
    commit('authenticatedUser/setBasicInfo', storeObj, { root: true })
  },
  async setProfilePrivacy({ commit }: any, payload: any) {
    await API.graphql(
      graphqlOperation(UpdateUserProfilePrivacyInfo, {
        userId: payload.userId,
        // profilePrivacy: payload.profilePrivacy,
        allowDirectMessages: payload.allowDirectMessages
      })
    )

    const storeObj = {
      // profilePrivacy: payload.profilePrivacy,
      allowDirectMessages: payload.allowDirectMessages
    }

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
