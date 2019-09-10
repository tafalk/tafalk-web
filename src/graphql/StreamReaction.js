import gql from 'graphql-tag'

// Get
export const ListStreamLikes = gql`query ListStreamLikes($streamId: ID!) {
  listStreamLikes(streamId: $streamId) {
    id
    streamId
    userId
    time
  }
}`

export const ListStreamComments = gql`query ListStreamComments($streamId: ID!) {
  listStreamComments(streamId: $streamId) {
    id
    streamId
    userId
    content
    time
  }
}`

export const ListPaginatedStreamComments = gql`query ListPaginatedStreamComments($streamId: ID!, $limit: Int, $nextToken: String) {
  listPaginatedStreamComments(streamId: $streamId, first: $limit, after: $nextToken) {
    items {
      id
      streamId
      userId
      user {
        username
        profilePictureKey
        cognitoIdentityId
      }
      content
      time
      flags {
        id
        commentId
        userId
        category
        detail
        note
        time
      }
    }
    nextToken
  }
}`

// Mutations
export const CreateLike = gql`mutation CreateLike(
  $streamId: String,
  $userId: String!,
  $time: String) {
    createLike(input: {
      streamId: $streamId
      userId: $userId
      time: $time
    }) {
      id
      streamId
      userId
      time
  }
}`

export const CreateComment = gql`mutation CreateComment(
  $streamId: String!,
  $userId: String!,
  $time: String,
  $content: String) {
    createComment(input: {
      streamId: $streamId
      userId: $userId
      time: $time,
      content: $content
    }) {
      id
      streamId
      userId
      time
      content
  }
}`

export const DeleteLike = gql`mutation DeleteLike($id: ID!) {
  deleteLike(input: { id: $id }) {
    id
    streamId
    userId
    time
  }
}`

// Subscribe
export const OnCreateOrDeleteStreamLike = gql`subscription OnCreateOrDeleteStreamLike($streamId: String!) {
  onCreateOrDeleteLike(streamId: $streamId) {
    id
    streamId
    userId
    time
  }
}`
