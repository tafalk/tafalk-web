import { GetHexColorOfString } from './generators'
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
    // profilePrivacy: dbUser.profilePrivacy,
    allowDirectMesages: dbUser.allowDirectMesages,
    site: dbUser.site,
    canto: dbUser.canto,
    theme: dbUser.theme,
    language: dbUser.language,
    createdAt: dbUser.createdAt,
    lastAccess: dbUser.lastAccess,
    color: GetHexColorOfString(dbUser.username)
  })
}

const GetStoreUser = async dbUser => {
  const dbUserProfilePictureObjectUrl = dbUser.profilePictureKey ? await Storage.get(dbUser.profilePictureKey, {
    level: 'protected',
    identityId: dbUser.cognitoIdentityId
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
    // profilePrivacy: dbUser.profilePrivacy,
    allowDirectMesages: dbUser.allowDirectMesages,
    site: dbUser.site,
    canto: dbUser.canto,
    theme: dbUser.theme,
    language: dbUser.language,
    createdAt: dbUser.createdAt,
    lastAccess: dbUser.lastAccess,
    color: GetHexColorOfString(dbUser.username)
  }
}

const GetStoreUserForProfilePictureChange = async profilePictureKey => {
  const dbUserProfilePictureObjectUrl = profilePictureKey ? await Storage.get(profilePictureKey, {
    level: 'protected'
  }) : null

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
    // profilePrivacy: payload.profilePrivacy,
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
