import gql from 'graphql-tag'

// Get
export const GetUserIdByUserName = gql`
  query GetUserIdByUserName($username: String!) {
    getUserByUsername(username: $username) {
      id
    }
  }
`

export const GetUserProfileData = gql`
  query GetUserProfileData($username: String!) {
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
      allowDirectMessages
      site
      language
      createdAt
      lastAccess
      accountStatus
      userInteractions {
        items {
          id
          targetUserId
          interactionType
        }
      }
    }
  }
`

export const ListStreamsByUser = gql`
  query ListStreamsByUser($userId: ID!, $limit: Int, $nextToken: String) {
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
  }
`

export const ListLikesByUser = gql`
  query ListLikesByUser($userId: ID!, $limit: Int, $nextToken: String) {
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
            cognitoIdentityId
          }
        }
      }
      nextToken
    }
  }
`

export const ListUserInteractionsByActorUserIdIndex = gql`
  query ListUserInteractionsByActorUserIdIndex(
    $userId: String!
    $limit: Int
    $nextToken: String
  ) {
    listUserInteractionsByActorUserIdIndex(
      actorUserId: $userId
      first: $limit
      after: $nextToken
    ) {
      items {
        id
        actorUserId
        targetUserId
        interactionType
        targetUser {
          id
          username
          profilePictureKey
          allowDirectMessages
        }
      }
      nextToken
    }
  }
`

// Mutate
export const UpdateUserBasicProfileInfo = gql`
  mutation UpdateUserBasicProfileInfo(
    $userId: ID!
    $bio: String
    $location: String
    $site: String
  ) {
    updateUser(
      input: { id: $userId, bio: $bio, location: $location, site: $site }
    ) {
      id
    }
  }
`

export const UpdateUserProfilePrivacyInfo = gql`
  mutation UpdateUserProfilePrivacyInfo(
    $userId: ID!
    $allowDirectMessages: Boolean
  ) {
    updateUser(
      input: { id: $userId, allowDirectMessages: $allowDirectMessages }
    ) {
      id
    }
  }
`

export const UpdateUserProfilePictureKey = gql`
  mutation UpdateUserProfilePictureKey(
    $userId: ID!
    $profilePictureKey: String
  ) {
    updateUser(input: { id: $userId, profilePictureKey: $profilePictureKey }) {
      id
      profilePictureKey
    }
  }
`

export const UpdateUserCognitoIdentityId = gql`
  mutation UpdateUserCognitoIdentityId(
    $userId: ID!
    $cognitoIdentityId: String
  ) {
    updateUser(input: { id: $userId, cognitoIdentityId: $cognitoIdentityId }) {
      id
    }
  }
`

export const UpdateUserTheme = gql`
  mutation UpdateUserTheme($userId: ID!, $theme: String) {
    updateUser(input: { id: $userId, theme: $theme }) {
      id
      theme
    }
  }
`

export const UpdateUserLanguage = gql`
  mutation UpdateUserTheme($userId: ID!, $language: String) {
    updateUser(input: { id: $userId, language: $language }) {
      id
      language
    }
  }
`

export const UpdateUserAccountStatus = gql`
  mutation UpdateUserAccountStatus($userId: ID!, $accountStatus: String) {
    updateUser(input: { id: $userId, accountStatus: $accountStatus }) {
      id
      accountStatus
    }
  }
`

export const DeleteUser = gql`
  mutation DeleteUser($userId: ID!) {
    deleteUser(input: { id: $userId }) {
      id
    }
  }
`
