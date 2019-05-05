import gql from 'graphql-tag'

// Get

// Mutate
export const CreateStreamFlag = gql`mutation CreateFlag(
    $streamId: String,
    $userId: String,
    $category: String!,
    $detail: String!,
    $note: String,
    $time: String,
    $reviewStatus: String,
    $reviewNote: String) {
    createFlag(input: {
      streamId: $streamId
      userId: $userId
      category: $category
      detail: $detail
      note: $note
      time: $time
      reviewStatus: $reviewStatus
      reviewNote: $reviewNote
    }){
      id
      streamId
      userId
      category
      detail
      note
      time
      reviewStatus
      reviewNote
    }
  }`

export const CreateCommentFlag = gql`mutation CreateFlag(
  $commentId: String,
  $userId: String,
  $category: String!,
  $detail: String!,
  $note: String,
  $time: String,
  $reviewStatus: String,
  $reviewNote: String) {
  createFlag(input: {
    commentId: $commentId
    userId: $userId
    category: $category
    detail: $detail
    note: $note
    time: $time
    reviewStatus: $reviewStatus
    reviewNote: $reviewNote
  }){
    id
    commentId
    userId
    category
    detail
    note
    time
    reviewStatus
    reviewNote
  }
}`

export const DeleteFlag = gql`mutation DeleteFlag($id: ID!) {
    deleteFlag(input: { id: $id }) {
      id
      streamId
      userId
      time
    }
  }`
