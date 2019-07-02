import gql from 'graphql-tag'

// Get
export const GetStream = gql`query GetStream($streamId: ID!) {
  getStream(id: $streamId) {
    id
    user {
      id
      username
      profilePictureKey
    }
    title
    body
    privacy
    mood
    position
    uncloggerHintId
    track
    startTime
    isSealed
    sealTime
    likes {
      id
      streamId
      userId
      time
    }
    comments {
      id
      streamId
      userId
      user {
        username
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
    flags {
      id
      streamId
      userId
      category
      detail
      note
      time
    }
  }
}`

export const ListSealedBriefStreams = gql`query ListSealedBriefStreams($limit: Int, $nextToken: String) {
  listSealedStreams(first: $limit, after: $nextToken) {
    items {
      id
      title
      body
      startTime
      isSealed
      sealTime
      user {
        id
        username
        profilePictureKey
      }
      likes {
        id
      }
      comments {
        id
      }
    }
    nextToken
  }
}`

export const ListLiveBriefStreams = gql`query ListLiveBriefStreams($limit: Int, $nextToken: String) {
  listLiveStreams(first: $limit, after: $nextToken) {
    items {
      id
      title
      body
      startTime
      isSealed
      sealTime
      user {
        id
        username
        profilePictureKey
      }
      likes {
        id
      }
      comments {
        id
      }
    }
    nextToken
  }
}`

// Mutate
export const CreateStream = gql`mutation CreateStream(
  $id: ID!,
  $userId: String!,
  $title: String,
  $body: String!,
  $privacy: StreamPrivacy!,
  $mood: [Mood],
  $position: [Position],
  $location: String,
  $track: String,
  $startTime: String!,
  $sealTime: String!) {
  createStream(input: {
    id: $id
    userId: $userId
    title: $title
    privacy: $privacy
    mood: $mood
    position: $position
    body: $body
    location: $location
    track: $track
    isSealed: 0
    startTime: $startTime
    sealTime: $sealTime
  }){
    id
    userId
    title
    privacy
    mood
    position
    body
    location
    track
    startTime
    isSealed
    sealTime
  }
}`

export const UpdateStreamTitle = gql`mutation UpdateStreamTitle($id: ID!, $title: String) {
  updateStream(input: {
    id: $id
    title: $title
  }){
    id
    userId
    title
    privacy
    mood
    position
    body
    location
    track
    startTime
    isSealed
    sealTime
  }
}`

export const UpdateStreamBody = gql`mutation UpdateStreamBody($id: ID!, $body: String!) {
  updateStream(input: {
    id: $id
    body: $body
  }){
    id
    userId
    title
    privacy
    mood
    position
    body
    location
    track
    startTime
    isSealed
    sealTime
  }
}`

export const SealStreamForEver = gql`mutation SealStreamForEver(
  $id: ID!,
  $title: String,
  $body: String!,
  $privacy: StreamPrivacy,
  $mood: [Mood],
  $position: [Position],
  $location: String,
  $track: String,
  $sealTime: String) {
  updateStream(input: {
    id: $id
    title: $title
    body: $body
    privacy: $privacy
    mood: $mood
    position: $position
    location: $location
    track: $track
    isSealed: 1
    sealTime: $sealTime
  }){
    id
    userId
    title
    privacy
    mood
    position
    body
    location
    track
    startTime
    isSealed
    sealTime
  }
}`

export const UpdateMood = gql`mutation UpdateMood($id: ID!, $mood: [Mood]) {
  updateStream(input: {
    id: $id
    mood: $mood
  }){
    id
    userId
    title
    privacy
    mood
    position
    body
    location
    track
    startTime
    isSealed
    sealTime
  }
}`

export const UpdatePosition = gql`mutation UpdatePosition($id: ID!, $position: [Position]) {
  updateStream(input: {
    id: $id
    position: $position
  }){
    id
    userId
    title
    privacy
    mood
    position
    body
    location
    track
    startTime
    isSealed
    sealTime
  }
}`

// Subscribe
export const OnUpdateStream = gql`subscription OnUpdateStream($id: ID!) {
  onUpdateStream(id: $id) {
    id
    userId
    title
    privacy
    mood
    position
    body
    location
    track
    startTime
    isSealed
    sealTime
    likes {
      id
      streamId
      userId
      time
    }
    comments {
      id
    }
  }
}`
