import gql from 'graphql-tag'

// Get
export const ListCantoLikes = gql`query ListCantoLikes($cantoId: ID!) {
  listCantoLikes(cantoId: $cantoId) {
    id
    cantoId
    userId
    time
  }
}`

// Mutations
export const CreateLike = gql`mutation CreateLike(
  $cantoId: String,
  $userId: String!,
  $time: String) {
    createLike(input: {
      cantoId: $cantoId
      userId: $userId
      time: $time
    }) {
      id
      cantoId
      userId
      time
  }
}`

export const DeleteLike = gql`mutation DeleteLike($id: ID!) {
  deleteLike(input: { id: $id }) {
    id
    cantoId
    userId
    time
  }
}`

// Subscribe
export const OnCreateOrDeleteCantoLike = gql`subscription OnCreateOrDeleteCantoLike($cantoId: String!) {
  onCreateOrDeleteLike(cantoId: $cantoId) {
    id
    cantoId
    userId
    time
  }
}`
