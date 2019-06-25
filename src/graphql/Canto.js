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

// Mutate
export const CreateCanto = gql`mutation CreateCanto(
  $id: ID!,
  $body: String,
  $startTime: String!,
  $lastUpdateTime: String,
  $visits: Int) {
    createCanto(input: {
      id: $id
      body: $body
      startTime: $startTime
      lastUpdateTime: $lastUpdateTime
      visits: $visits
      }){
        id
        body
        startTime
        lastUpdateTime
        visits
  }
}`

export const UpdateCantoBody = gql`mutation UpdateCantoBody(
  $id: ID!,
  $body: String!,
  $lastUpdateTime: String!) {
    updateCanto(input: {
      id: $id
      body: $body
      lastUpdateTime: $lastUpdateTime
    }){
      id
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
