import gql from 'graphql-tag'

// Get
export const GetInteractionsBetweenUsers = gql`query queryUserInteractionsBetweenUsersByUserIdIndices($actorUserId: String!, $targetUserId: String!) {
  queryUserInteractionsBetweenUsersByUserIdIndices(actorUserId: $actorUserId, targetUserId: $targetUserId) {
    id
    actorUserId
    targetUserId
    interactionType
  }
}`

// Mutate
export const WatchUser = gql`mutation WatchUser($currentAuthenticatedUserId: String!, $toBeWatchedUserId: String!) {
  createUserInteraction(input:{
    actorUserId: $currentAuthenticatedUserId
    targetUserId: $toBeWatchedUserId
    interactionType: Watch
  }){
    id
    actorUserId
    targetUserId
    interactionType
  }
}`

export const BlockUser = gql`mutation BlockUser($currentAuthenticatedUserId: String!, $toBeBlockedUserId: String!) {
    createUserInteraction(input:{
      actorUserId: $currentAuthenticatedUserId
      targetUserId: $toBeBlockedUserId
      interactionType: Block
    }){
      id
      actorUserId
      targetUserId
      interactionType
    }
  }`

export const StopWatchingUser = gql`mutation StopWatchingUser($watchId: ID!) {
  deleteUserInteraction(input:{ id: $watchId } ) {
    id
  }
}`

export const UnblockUser = gql`mutation UnblockUser($blockId: ID!) {
  deleteUserInteraction(input:{ id: $blockId} ) {
    id
  }
}`
