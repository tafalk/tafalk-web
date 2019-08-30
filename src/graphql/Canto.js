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
      accountStatus
    }
    body
    startTime
    lastUpdateTime
    likes {
      id
      cantoId
      userId
      time
      indices
    }
  }
}`

export const ListBriefCantos = gql`query ListBriefCantos($limit: Int, $nextToken: String) {
  listCantos(first: $limit, after: $nextToken) {
    items {
      id
      body
      startTime
      lastUpdateTime
      user {
        id
        username
        profilePictureKey
        accountStatus
      }
    }
    nextToken
  }
}`

// Mutate
export const CreateCanto = gql`mutation CreateCanto(
  $id: ID!,
  $body: String,
  $startTime: String!,
  $lastUpdateTime: String,
  $status: String!) {
    createCanto(input: {
      id: $id
      body: $body
      startTime: $startTime
      lastUpdateTime: $lastUpdateTime
      status: $status
      }){
        id
        body
        startTime
        lastUpdateTime
        status
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
