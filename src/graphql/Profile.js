import gql from 'graphql-tag'

// Get
export const GetUserIdByUserName = gql`query GetUserIdByUserName($username: String!) {
  getUserByUsername(username: $username) {
    id
  }
}`

export const GetUserProfileData = gql`query GetUserProfileData($username: String!) {
  getUserByUsername(username: $username) {
    id
    cognitoIdentityId
    username
    email
    bio
    birthDate
    theme
    location
    profilePictureKey
    profilePrivacy
    allowDirectMesages
    site
    language
    createdAt
    lastAccess
    userInteractions {
      items {
        id
        targetUserId
        interactionType
      }
      nextToken
    }
  }
}`

export const ListStreamsByUser = gql`query ListStreamsByUser($userId: ID!, $limit: Int, $nextToken: String) {
  listStreamsByUser(first: $limit, after: $nextToken, userId: $userId) {
    items {
      id
      title
      body
      startTime
      isSealed
      sealTime
      likes {
        id
      }
      comments {
        id
      }
    }
    nextToken
  }
}`

export const ListLikesByUser = gql`query ListLikesByUser($userId: ID!, $limit: Int, $nextToken: String) {
  listLikesByUser(first: $limit, after: $nextToken, userId: $userId) {
    items {
      stream {
        id
        title
        body
        startTime
        isSealed
        sealTime
        likes {
          id
          streamId
          userId
        }
        comments {
          id
        }
        user {
          username
          profilePictureKey
        }
      }
    }
    nextToken
  }
}`

export const ListUserInteractionsByActorUserIdIndex = gql`query ListUserInteractionsByActorUserIdIndex($userId: String!, $limit: Int, $nextToken: String) {
  listUserInteractionsByActorUserIdIndex(actorUserId: $userId, first: $limit, after: $nextToken) {
    items {
      id
      actorUserId
      targetUserId
      interactionType
      targetUser {
        id
        username
        profilePictureKey
        profilePrivacy
        allowDirectMesages
      }
    }
    nextToken
  }
}`

// Mutate
export const UpdateUserBasicProfileInfo = gql`mutation UpdateUserBasicProfileInfo($userId: ID!, $bio: String, $location: String, $site: String) {
  updateUser(input: {
    id: $userId
    bio: $bio
    location: $location
    site: $site
  }){
    id
  }
}`

export const UpdateUserProfilePrivacyInfo = gql`mutation UpdateUserProfilePrivacyInfo($userId: ID!, $profilePrivacy: ProfilePrivacy, $allowDirectMesages: Boolean) {
  updateUser(input: {
    id: $userId
    profilePrivacy: $profilePrivacy
    allowDirectMesages: $allowDirectMesages
  }){
    id,
    profilePrivacy
  }
}`

export const UpdateUserProfilePictureKey = gql`mutation UpdateUserProfilePictureKey($userId: ID!, $profilePictureKey: String) {
  updateUser(input: {
    id: $userId
    profilePictureKey: $profilePictureKey
  }){
    id
    profilePictureKey
  }
}`

export const UpdateUserCognitoIdentityId = gql`mutation UpdateUserCognitoIdentityId($userId: ID!, $cognitoIdentityId: String) {
  updateUser(input: {
    id: $userId
    cognitoIdentityId: $cognitoIdentityId
  }){
    id
  }
}`

export const UpdateUserTheme = gql`mutation UpdateUserTheme($userId: ID!, $theme: String) {
  updateUser(input: {
    id: $userId
    theme: $theme
  }){
    id
    theme
  }
}`

export const UpdateUserLanguage = gql`mutation UpdateUserTheme($userId: ID!, $language: String) {
  updateUser(input: {
    id: $userId
    language: $language
  }){
    id
    language
  }
}`

export const DeleteUser = gql`mutation DeleteUser($userId: ID!) {
  deleteUser(input: {
    id: $userId
  }){
    id
  }
}`
