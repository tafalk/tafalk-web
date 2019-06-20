import gql from 'graphql-tag'

// Get
export const GetCantoBody = gql`query GetCantoBody($id: ID!) {
  getCanto(id: $id) {
    body
  }
}`

export const GetCanto = gql`query GetCanto($id: ID!) {
  getCanto(id: $id) {
    user {
      id
      username
      profilePictureKey
    }
    body
    startTime
    lastUpdateTime
    likes {
      id
      cantoId
      userId
      time
    }
  }
}`

// Subscribe
export const OnUpdateCanto = gql`subscription OnUpdateCanto($id: ID!) {
  onUpdateCanto(id: $id) {
    id
    userId
    body
    startTime
    lastUpdateTime
    visits
    likes {
      id
      cantoId
      userId
      time
    }
  }
}`
