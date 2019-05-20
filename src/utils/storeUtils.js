import { GetUserHue } from './generators'
import { Storage } from 'aws-amplify'

const GetStoreUserWithCognitoIdentityId = async (dbUser, cognitoIdentityId) => {
  return GetStoreUser({
    id: dbUser.id,
    cognitoIdentityId: cognitoIdentityId,
    username: dbUser.username,
    email: dbUser.email,
    // preferredName: dbUser.preferredName,
    bio: dbUser.bio,
    birthDate: dbUser.birthDate,
    location: dbUser.location,
    profilePictureKey: dbUser.profilePictureKey,
    profilePrivacy: dbUser.profilePrivacy,
    allowDirectMesages: dbUser.allowDirectMesages,
    site: dbUser.site,
    theme: dbUser.theme,
    createdAt: dbUser.createdAt,
    lastAccess: dbUser.lastAccess,
    hue: GetUserHue(dbUser.username)
  })
}

const GetStoreUser = async dbUser => {
  const dbUserProfilePictureObjectUrl = dbUser.profilePictureKey ? await Storage.get(dbUser.profilePictureKey, {
    level: 'protected'
  }) : null

  return {
    id: dbUser.id,
    cognitoIdentityId: dbUser.cognitoIdentityId,
    username: dbUser.username,
    email: dbUser.email,
    // preferredName: dbUser.preferredName,
    bio: dbUser.bio,
    birthDate: dbUser.birthDate,
    profilePictureKey: dbUser.profilePictureKey,
    location: dbUser.location,
    profilePictureObjectUrl: dbUserProfilePictureObjectUrl,
    profilePrivacy: dbUser.profilePrivacy,
    allowDirectMesages: dbUser.allowDirectMesages,
    site: dbUser.site,
    theme: dbUser.theme,
    createdAt: dbUser.createdAt,
    lastAccess: dbUser.lastAccess,
    hue: GetUserHue(dbUser.username)
  }
}

const GetStoreUserForProfilePictureChange = async profilePictureKey => {
  const dbUserProfilePictureObjectUrl = profilePictureKey ? await Storage.get(profilePictureKey, {
    level: 'protected'
  }) : null

  // const dbUserLocation = dbUser.locationId ? await GetPlaceById(dbUser.locationId) : null

  return {
    profilePictureKey: profilePictureKey,
    profilePictureObjectUrl: dbUserProfilePictureObjectUrl
  }
}

const GetStoreUserForBasicInfoChange = async payload => {
  return {
    // preferredName: payload.preferredName,
    bio: payload.bio,
    location: payload.location,
    site: payload.site
  }
}

const GetStoreUserForPrivacyChange = payload => {
  return {
    profilePrivacy: payload.profilePrivacy,
    allowDirectMesages: payload.allowDirectMesages
  }
}

export {
  GetStoreUserWithCognitoIdentityId,
  GetStoreUser,
  GetStoreUserForProfilePictureChange,
  GetStoreUserForBasicInfoChange,
  GetStoreUserForPrivacyChange
}
