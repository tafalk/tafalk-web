import gql from 'graphql-tag'

export const Search = gql`
  query Search($query: String!) {
    search(query: $query) {
      ... on User {
        __typename
        id
        username
        profilePictureKey
        cognitoIdentityId
      }
      ... on Stream {
        __typename
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
        user {
          username
          profilePictureKey
          cognitoIdentityId
        }
      }
      ... on Canto {
        __typename
        id
        body
        startTime
        lastUpdateTime
        user {
          username
          profilePictureKey
          cognitoIdentityId
        }
      }
    }
  }
`
