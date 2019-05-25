import gql from 'graphql-tag'

export const Search = gql`query Search($query: String!) {
  search(query: $query) {
    ... on User {
      __typename
      id
      username
      profilePictureKey
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
      }
    }
  }
}`
