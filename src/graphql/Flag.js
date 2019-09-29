import gql from 'graphql-tag'

// Get

// Mutate
export const CreateFlag = gql`mutation CreateFlag(
    $contentType: String!,
    $contentId: String,
    $flaggerUserId: String!,
    $category: String!,
    $type: String!,
    $detail: String,
    $createTime: String) {
    createFlag(input: {
      contentType: $contentType
      contentId: $contentId
      flaggerUserId: $flaggerUserId
      category: $category
      type: $type
      detail: $detail
      createTime: $createTime
    }){
      id
      contentType
      contentId
      flaggerUserId
      category
      type
      detail
      time
      createTime
    }
  }`

export const DeleteFlag = gql`mutation DeleteFlag($id: ID!) {
    deleteFlag(input: { id: $id }) {
      id
      contentId
      contentType
      flaggerUserId
      time
    }
  }`
