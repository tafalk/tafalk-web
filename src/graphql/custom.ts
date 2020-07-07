import gql from 'graphql-tag'

// Get
export const GetUser = gql`
  query GetUser($username: String!) {
    getUserByUsername(username: $username) {
      id
      cognitoIdentityId
      username
      email
      bio
      birthDate
      theme
      location
      profilePictureKey
      allowDirectMessages
      site
      language
      createdAt
      lastAccess
      accountStatus
      userWatchInteractions {
        id
        targetUserId
      }
      userBlockInteractions {
        id
        targetUserId
      }
    }
  }
`

export const GetUserProfileContent = gql`
  query GetUserProfileContent($username: String!) {
    getUserByUsername(username: $username) {
      id
      cognitoIdentityId
      username
      email
      bio
      birthDate
      theme
      location
      profilePictureKey
      allowDirectMessages
      site
      language
      createdAt
      lastAccess
      accountStatus
      streams {
        items {
          __typename
          id
          title
          body
          startTime
          sealTime
          isSealed
          user {
            id
            username
            profilePictureKey
            language
          }
          bookmarkCount {
            count
          }
          commentCount {
            count
          }
        }
        nextToken
      }
      canto {
        __typename
        id
        body
        startTime
        lastUpdateTime
        isPaused
        user {
          id
          username
          profilePictureKey
          language
        }
        bookmarkCount {
          count
        }
      }
      userWatchInteractions {
        __typename
        id
        targetUserId
      }
      userBlockInteractions {
        __typename
        id
        targetUserId
      }
      committedStreamComments {
        __typename
        id
        contentId
        contentType
        body
      }
      bookmarkedStreams {
        __typename
        id
      }
      bookmarkedCantos {
        __typename
        id
      }
    }
  }
`

export const GetStreamById = gql`
  query GetStreamById($id: ID!) {
    getStream(id: $id) {
      id
      user {
        id
        username
        profilePictureKey
        accountStatus
        cognitoIdentityId
      }
      title
      body
      mood
      position
      uncloggerPromptId
      trackId
      startTime
      isSealed
      sealTime
      bookmarkCount {
        count
      }
      comments {
        id
        contentId
        contentType
        userId
        user {
          id
          username
          profilePictureKey
          accountStatus
          cognitoIdentityId
        }
        time
        flags {
          id
          contentType
          contentId
          flaggerUserId
          category
          type
          detail
          createTime
        }
      }
      flags {
        id
        contentType
        contentId
        flaggerUserId
        category
        type
        detail
        createTime
      }
    }
  }
`

export const GetCantoById = gql`
  query GetCantoById($id: ID!) {
    getCanto(id: $id) {
      id
      user {
        id
        username
        profilePictureKey
        accountStatus
        cognitoIdentityId
      }
      body
      startTime
      lastUpdateTime
      isPaused
      bookmarkCount {
        count
      }
    }
  }
`

export const ListUserStreamsForProfile = gql`
  query ListUserStreamsForProfile(
    $userId: ID!
    $limit: Int
    $nextToken: String
  ) {
    listStreamsByUser(userId: $userId, first: $limit, after: $nextToken) {
      items {
        __typename
        id
        title
        body
        startTime
        sealTime
        isSealed
        user {
          id
          username
          profilePictureKey
          language
        }
        bookmarkCount {
          count
        }
        commentCount {
          count
        }
      }
      nextToken
    }
  }
`

export const ListContentBookmarksByUserForProfile = gql`
  query ListContentBookmarksByUserForProfile(
    $userId: ID!
    $contentType: ContentType
    $limit: Int
    $offset: Int
  ) {
    listContentBookmarksByUser(
      userId: $userId
      contentType: $contentType
      limit: $limit
      offset: $offset
    ) {
      __typename
      id
    }
  }
`

export const ListUserInteractionsByUserForProfile = gql`
  query ListUserInteractionsByUserForProfile(
    $actorUserId: ID!
    $type: UserInteractionType
    $limit: Int
    $offset: Int
  ) {
    listUserInteractionsByActorUserId(
      actorUserId: $actorUserId
      interactionType: $type
      limit: $limit
      offset: $offset
    ) {
      __typename
      id
      targetUserId
    }
  }
`

export const ListCommentsByUserForProfile = gql`
  query ListCommentsByUserForProfile(
    $userId: ID!
    $contentType: ContentType
    $limit: Int
    $offset: Int
  ) {
    listContentCommentsByUser(
      userId: $userId
      contentType: $contentType
      limit: $limit
      offset: $offset
    ) {
      __typename
      id
      contentId
      contentType
      body
    }
  }
`

export const ListSealedStreamsForInfoCard = gql`
  query ListSealedStreamsForInfoCard($limit: Int, $nextToken: String) {
    listSealedStreams(first: $limit, after: $nextToken) {
      items {
        __typename
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
          accountStatus
          cognitoIdentityId
        }
        bookmarkCount {
          count
        }
        commentCount {
          count
        }
      }
      nextToken
    }
  }
`

export const ListLiveStreamsForInfoCard = gql`
  query ListLiveStreamsForInfoCard($limit: Int, $nextToken: String) {
    listLiveStreams(first: $limit, after: $nextToken) {
      items {
        __typename
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
          accountStatus
          cognitoIdentityId
        }
        bookmarkCount {
          count
        }
        commentCount {
          count
        }
      }
      nextToken
    }
  }
`

export const ListPausedCantosForInfoCard = gql`
  query ListPausedCantosForInfoCard($limit: Int, $nextToken: String) {
    listPausedCantos(first: $limit, after: $nextToken) {
      items {
        __typename
        id
        body
        startTime
        lastUpdateTime
        user {
          id
          username
          profilePictureKey
          accountStatus
          cognitoIdentityId
        }
      }
      nextToken
    }
  }
`

export const ListLiveCantosForInfoCard = gql`
  query ListLiveCantosForInfoCard($limit: Int, $nextToken: String) {
    listLiveCantos(first: $limit, after: $nextToken) {
      items {
        __typename
        id
        body
        startTime
        lastUpdateTime
        user {
          id
          username
          profilePictureKey
          accountStatus
          cognitoIdentityId
        }
      }
      nextToken
    }
  }
`

export const SearchSiteContent = gql`
  query SearchSiteContent($query: String!) {
    search(query: $query) {
      ... on User {
        __typename
        id
        username
        profilePictureKey
        cognitoIdentityId
      }
      ... on Stream {
        __typename
        id
        title
        body
        isSealed
        user {
          username
          profilePictureKey
          cognitoIdentityId
        }
      }
      ... on Canto {
        __typename
        id
        body
        user {
          username
          profilePictureKey
          cognitoIdentityId
        }
      }
    }
  }
`

export const GetContentBookmarkIdByUser = gql`
  query GetContentBookmarkIdByUser($userId: ID!, $contentType: ContentType) {
    getContentBookmarkByUser(userId: $userId, contentType: $contentType) {
      id
      indices
    }
  }
`

export const GetFlagIdByUser = gql`
  query GetFlagIdByUser($flaggerUserId: ID!, $contentType: ContentType) {
    getFlagByUser(flaggerUserId: $flaggerUserId, contentType: $contentType) {
      id
    }
  }
`

export const GetFlagById = gql`
  query GetFlagById($id: ID!) {
    getFlag(id: $id) {
      id
      contentType
      contentId
      flaggerUserId
      category
      type
      detail
      status
    }
  }
`

export const ListStreamComments = gql`
  query ListStreamComments($contentId: ID!, $limit: Int, $offset: Int) {
    listContentComments(
      contentId: $contentId
      contentType: stream
      limit: $limit
      offset: $offset
    ) {
      id
      contentId
      contentType
      userId
      user {
        id
        username
        profilePictureKey
        accountStatus
        cognitoIdentityId
      }
      time
      flags {
        id
        contentType
        contentId
        flaggerUserId
        category
        type
        detail
        createTime
      }
    }
  }
`

export const GetRandomUncloggerPromptForStream = gql`
  query GetRandomUncloggerPromptForStream(
    $category: UncloggerPromptCategory
    $language: Language
  ) {
    getRandomUncloggerPrompt(category: $category, language: $language) {
      id
      category
      body
      language
      creatorUser {
        username
      }
      createTime
    }
  }
`
// Mutate
export const UpdateUserTheme = gql`
  mutation UpdateUserTheme($userId: ID!, $theme: String) {
    updateUser(input: { id: $userId, theme: $theme }) {
      id
      theme
    }
  }
`

export const UpdateUserCognitoIdentityId = gql`
  mutation UpdateUserCognitoIdentityId(
    $userId: ID!
    $cognitoIdentityId: String
  ) {
    updateUser(input: { id: $userId, cognitoIdentityId: $cognitoIdentityId }) {
      id
    }
  }
`

export const UpdateUserProfilePictureKey = gql`
  mutation UpdateUserProfilePictureKey(
    $userId: ID!
    $profilePictureKey: String
  ) {
    updateUser(input: { id: $userId, profilePictureKey: $profilePictureKey }) {
      id
      profilePictureKey
    }
  }
`

export const UpdateUserBio = gql`
  mutation UpdateUserBio($userId: ID!, $bio: String) {
    updateUser(input: { id: $userId, bio: $bio }) {
      id
    }
  }
`

export const DeleteUserById = gql`
  mutation DeleteUserById($userId: ID!) {
    deleteUser(input: { id: $userId }) {
      id
    }
  }
`

export const CreateStreamBookmark = gql`
  mutation CreateStreamBookmark($userId: String!, $contentId: String!) {
    createContentInteraction(
      input: {
        userId: $userId
        interactionType: Bookmark
        contentType: stream
        contentId: $contentId
      }
    ) {
      id
    }
  }
`

export const CreateCantoBookmark = gql`
  mutation CreateCantoBookmark(
    $userId: String!
    $contentId: String!
    $indices: String
  ) {
    createContentInteraction(
      input: {
        userId: $userId
        interactionType: Bookmark
        contentType: canto
        contentId: $contentId
        indices: $indices
      }
    ) {
      id
    }
  }
`

export const UpdateCantoBookmark = gql`
  mutation UpdateCantoBookmark($id: ID!, $indices: String!) {
    updateContentInteraction(input: { id: $id, indices: $indices }) {
      id
    }
  }
`

export const DeleteBookmark = gql`
  mutation DeleteBookmark($id: ID!) {
    deleteContentInteraction(input: { id: $id }) {
      id
    }
  }
`

export const CreateStreamFlag = gql`
  mutation CreateStreamFlag(
    $contentId: String
    $flaggerUserId: String!
    $category: String!
    $type: String!
    $detail: String
  ) {
    createFlag(
      input: {
        contentId: $contentId
        contentType: stream
        flaggerUserId: $flaggerUserId
        category: $category
        type: $type
        detail: $detail
      }
    ) {
      id
    }
  }
`

export const CreateCantoFlag = gql`
  mutation CreateCantoFlag(
    $contentId: String
    $flaggerUserId: String!
    $category: String!
    $type: String!
    $detail: String
  ) {
    createFlag(
      input: {
        contentId: $contentId
        contentType: canto
        flaggerUserId: $flaggerUserId
        category: $category
        type: $type
        detail: $detail
      }
    ) {
      id
    }
  }
`

export const UpdateContentFlag = gql`
  mutation UpdateContentFlag(
    $id: ID!
    $category: String
    $type: String
    $detail: String
  ) {
    updateFlagContent(
      input: { id: $id, category: $category, type: $type, detail: $detail }
    ) {
      id
    }
  }
`

export const DeleteFlagById = gql`
  mutation DeleteFlagById($id: ID!) {
    deleteFlag(input: { id: $id }) {
      id
    }
  }
`

export const CreateStreamComment = gql`
  mutation CreateStreamComment(
    $contentId: String!
    $userId: String!
    $body: String!
  ) {
    createComment(
      input: {
        contentType: stream
        contentId: $contentId
        userId: $userId
        body: $body
      }
    ) {
      id
    }
  }
`
export const CreateNewStream = gql`
  mutation CreateNewStream(
    $id: ID!
    $body: String!
    $startTime: String!
    $sealTime: String
    $userId: String!
  ) {
    createStream(
      input: {
        id: $id
        body: $body
        isSealed: 0
        startTime: $startTime
        sealTime: $sealTime
        userId: $userId
      }
    ) {
      id
    }
  }
`

export const UpdateStreamTitle = gql`
  mutation UpdateStreamTitle($id: ID!, $title: String) {
    updateStream(input: { id: $id, title: $title }) {
      id
    }
  }
`

export const UpdateStreamBody = gql`
  mutation UpdateStreamBody($id: ID!, $body: String) {
    updateStream(input: { id: $id, body: $body }) {
      id
    }
  }
`

export const UpdateStreamUncloggerPromptId = gql`
  mutation UpdateStreamUncloggerPromptId($id: ID!, $uncloggerPromptId: String) {
    updateStream(input: { id: $id, uncloggerPromptId: $uncloggerPromptId }) {
      id
    }
  }
`

export const UpdateStreamTrackId = gql`
  mutation UpdateStreamTrackId($id: ID!, $trackId: String) {
    updateStream(input: { id: $id, trackId: $trackId }) {
      id
    }
  }
`

export const UpdateStreamMood = gql`
  mutation UpdateStreamMood($id: ID!, $mood: Mood) {
    updateStream(input: { id: $id, mood: $mood }) {
      id
    }
  }
`

export const UpdateStreamPosition = gql`
  mutation UpdateStreamPosition($id: ID!, $position: Position) {
    updateStream(input: { id: $id, position: $position }) {
      id
    }
  }
`

export const UpdateStreamAllFields = gql`
  mutation UpdateStreamAllFields(
    $id: ID!
    $title: String
    $body: String
    $uncloggerPromptId: String
    $trackId: String
    $mood: Mood
    $position: Position
  ) {
    updateStream(
      input: {
        id: $id
        title: $title
        body: $body
        uncloggerPromptId: $uncloggerPromptId
        trackId: $trackId
        mood: $mood
        position: $position
      }
    ) {
      id
    }
  }
`

export const SealAndUpdateStreamAllFields = gql`
  mutation SealAndUpdateStreamAllFields(
    $id: ID!
    $title: String
    $body: String
    $uncloggerPromptId: String
    $trackId: String
    $mood: Mood
    $position: Position
    $sealTime: String
  ) {
    updateStream(
      input: {
        id: $id
        isSealed: 1
        title: $title
        body: $body
        uncloggerPromptId: $uncloggerPromptId
        trackId: $trackId
        mood: $mood
        position: $position
        sealTime: $sealTime
      }
    ) {
      id
    }
  }
`

export const CreateNewCanto = gql`
  mutation CreateNewCanto(
    $id: ID!
    $body: String
    $startTime: String!
    $lastUpdateTime: String
  ) {
    createCanto(
      input: {
        id: $id
        body: $body
        isPaused: 0
        startTime: $startTime
        lastUpdateTime: $lastUpdateTime
      }
    ) {
      id
    }
  }
`

export const UpdateCantoAllFields = gql`
  mutation UpdateCantoAllFields(
    $id: ID!
    $body: String
    $lastUpdateTime: String!
  ) {
    updateCanto(
      input: { id: $id, body: $body, lastUpdateTime: $lastUpdateTime }
    ) {
      id
    }
  }
`

export const UpdateCantoBody = gql`
  mutation UpdateCantoBody($id: ID!, $body: String, $lastUpdateTime: String!) {
    updateCanto(
      input: { id: $id, body: $body, lastUpdateTime: $lastUpdateTime }
    ) {
      id
    }
  }
`

export const PauseAndUpdateCantoAllFields = gql`
  mutation PauseAndUpdateCantoAllFields(
    $id: ID!
    $body: String
    $lastUpdateTime: String!
  ) {
    updateCanto(
      input: {
        id: $id
        body: $body
        isPaused: 0
        lastUpdateTime: $lastUpdateTime
      }
    ) {
      id
    }
  }
`

// Subscribe
export const OnUpdateCantoById = gql`
  subscription OnUpdateCantoById($id: ID!) {
    onUpdateCanto(id: $id) {
      id
      body
      startTime
      lastUpdateTime
      isPaused
      bookmarks {
        id
        contentType
        contentId
        userId
        indices
        time
      }
    }
  }
`

export const OnUpdateStreamById = gql`
  subscription OnUpdateStreamById($id: ID!) {
    onUpdateStream(id: $id) {
      id
      title
      body
      startTime
      sealTime
      isSealed
      bookmarks {
        id
        contentType
        contentId
        userId
        indices
        time
      }
    }
  }
`
