/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserByUsername = /* GraphQL */ `
  query GetUserByUsername($username: String!) {
    getUserByUsername(username: $username) {
      id
      username
      email
      preferredName
      accountStatus
      allowDirectMessages
      theme
      bio
      birthDate
      cognitoIdentityId
      createdAt
      lastAccess
      location
      language
      profilePictureKey
      site
      canto {
        id
        body
        user {
          id
          username
          email
          preferredName
          accountStatus
          allowDirectMessages
          theme
          bio
          birthDate
          cognitoIdentityId
          createdAt
          lastAccess
          location
          language
          profilePictureKey
          site
        }
        isPaused
        startTime
        lastUpdateTime
        bookmarkCount {
          count
        }
        bookmarks {
          id
          userId
          interactionType
          contentType
          contentId
          indices
          time
        }
        flagCount {
          count
        }
        flags {
          id
          contentType
          contentId
          flaggerUserId
          category
          type
          detail
          reviewerUserId
          status
          reviewNote
          createTime
          reviewTime
          lastUpdateTime
        }
      }
      streams {
        items {
          id
          title
          body
          userId
          isSealed
          location
          mood
          position
          startTime
          sealTime
          track
          uncloggerPromptId
        }
        nextToken
      }
      userWatchInteractions {
        id
        actorUserId
        actorUser {
          id
          username
          email
          preferredName
          accountStatus
          allowDirectMessages
          theme
          bio
          birthDate
          cognitoIdentityId
          createdAt
          lastAccess
          location
          language
          profilePictureKey
          site
        }
        targetUserId
        targetUser {
          id
          username
          email
          preferredName
          accountStatus
          allowDirectMessages
          theme
          bio
          birthDate
          cognitoIdentityId
          createdAt
          lastAccess
          location
          language
          profilePictureKey
          site
        }
        interactionType
        lastChangeTime
      }
      userBlockInteractions {
        id
        actorUserId
        actorUser {
          id
          username
          email
          preferredName
          accountStatus
          allowDirectMessages
          theme
          bio
          birthDate
          cognitoIdentityId
          createdAt
          lastAccess
          location
          language
          profilePictureKey
          site
        }
        targetUserId
        targetUser {
          id
          username
          email
          preferredName
          accountStatus
          allowDirectMessages
          theme
          bio
          birthDate
          cognitoIdentityId
          createdAt
          lastAccess
          location
          language
          profilePictureKey
          site
        }
        interactionType
        lastChangeTime
      }
      committedStreamCommentCount {
        count
      }
      committedStreamComments {
        id
        userId
        user {
          id
          username
          email
          preferredName
          accountStatus
          allowDirectMessages
          theme
          bio
          birthDate
          cognitoIdentityId
          createdAt
          lastAccess
          location
          language
          profilePictureKey
          site
        }
        body
        contentType
        contentId
        flagCount {
          count
        }
        flags {
          id
          contentType
          contentId
          flaggerUserId
          category
          type
          detail
          reviewerUserId
          status
          reviewNote
          createTime
          reviewTime
          lastUpdateTime
        }
        time
      }
      bookmarkedStreamCount {
        count
      }
      bookmarkedStreams {
        id
        title
        body
        userId
        user {
          id
          username
          email
          preferredName
          accountStatus
          allowDirectMessages
          theme
          bio
          birthDate
          cognitoIdentityId
          createdAt
          lastAccess
          location
          language
          profilePictureKey
          site
        }
        isSealed
        location
        mood
        position
        startTime
        sealTime
        track
        uncloggerPromptId
        uncloggerPrompt {
          id
          category
          body
          language
          status
          creatorUserId
          createTime
          reviewerUserId
          reviewNote
          reviewTime
        }
        bookmarkCount {
          count
        }
        bookmarks {
          id
          userId
          interactionType
          contentType
          contentId
          indices
          time
        }
        commentCount {
          count
        }
        comments {
          id
          userId
          body
          contentType
          contentId
          time
        }
        flagCount {
          count
        }
        flags {
          id
          contentType
          contentId
          flaggerUserId
          category
          type
          detail
          reviewerUserId
          status
          reviewNote
          createTime
          reviewTime
          lastUpdateTime
        }
      }
      bookmarkedCantoCount {
        count
      }
      bookmarkedCantos {
        id
        body
        user {
          id
          username
          email
          preferredName
          accountStatus
          allowDirectMessages
          theme
          bio
          birthDate
          cognitoIdentityId
          createdAt
          lastAccess
          location
          language
          profilePictureKey
          site
        }
        isPaused
        startTime
        lastUpdateTime
        bookmarkCount {
          count
        }
        bookmarks {
          id
          userId
          interactionType
          contentType
          contentId
          indices
          time
        }
        flagCount {
          count
        }
        flags {
          id
          contentType
          contentId
          flaggerUserId
          category
          type
          detail
          reviewerUserId
          status
          reviewNote
          createTime
          reviewTime
          lastUpdateTime
        }
      }
    }
  }
`;
export const getStream = /* GraphQL */ `
  query GetStream($id: ID!) {
    getStream(id: $id) {
      id
      title
      body
      userId
      user {
        id
        username
        email
        preferredName
        accountStatus
        allowDirectMessages
        theme
        bio
        birthDate
        cognitoIdentityId
        createdAt
        lastAccess
        location
        language
        profilePictureKey
        site
        canto {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
        streams {
          nextToken
        }
        userWatchInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        userBlockInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        committedStreamCommentCount {
          count
        }
        committedStreamComments {
          id
          userId
          body
          contentType
          contentId
          time
        }
        bookmarkedStreamCount {
          count
        }
        bookmarkedStreams {
          id
          title
          body
          userId
          isSealed
          location
          mood
          position
          startTime
          sealTime
          track
          uncloggerPromptId
        }
        bookmarkedCantoCount {
          count
        }
        bookmarkedCantos {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
      }
      isSealed
      location
      mood
      position
      startTime
      sealTime
      track
      uncloggerPromptId
      uncloggerPrompt {
        id
        category
        body
        language
        status
        creatorUserId
        creatorUser {
          id
          username
          email
          preferredName
          accountStatus
          allowDirectMessages
          theme
          bio
          birthDate
          cognitoIdentityId
          createdAt
          lastAccess
          location
          language
          profilePictureKey
          site
        }
        createTime
        reviewerUserId
        reviewerUser {
          id
          username
          email
          preferredName
          accountStatus
          allowDirectMessages
          theme
          bio
          birthDate
          cognitoIdentityId
          createdAt
          lastAccess
          location
          language
          profilePictureKey
          site
        }
        reviewNote
        reviewTime
      }
      bookmarkCount {
        count
      }
      bookmarks {
        id
        userId
        user {
          id
          username
          email
          preferredName
          accountStatus
          allowDirectMessages
          theme
          bio
          birthDate
          cognitoIdentityId
          createdAt
          lastAccess
          location
          language
          profilePictureKey
          site
        }
        interactionType
        contentType
        contentId
        indices
        time
      }
      commentCount {
        count
      }
      comments {
        id
        userId
        user {
          id
          username
          email
          preferredName
          accountStatus
          allowDirectMessages
          theme
          bio
          birthDate
          cognitoIdentityId
          createdAt
          lastAccess
          location
          language
          profilePictureKey
          site
        }
        body
        contentType
        contentId
        flagCount {
          count
        }
        flags {
          id
          contentType
          contentId
          flaggerUserId
          category
          type
          detail
          reviewerUserId
          status
          reviewNote
          createTime
          reviewTime
          lastUpdateTime
        }
        time
      }
      flagCount {
        count
      }
      flags {
        id
        contentType
        contentId
        flaggerUserId
        flaggerUser {
          id
          username
          email
          preferredName
          accountStatus
          allowDirectMessages
          theme
          bio
          birthDate
          cognitoIdentityId
          createdAt
          lastAccess
          location
          language
          profilePictureKey
          site
        }
        category
        type
        detail
        reviewerUserId
        reviewerUser {
          id
          username
          email
          preferredName
          accountStatus
          allowDirectMessages
          theme
          bio
          birthDate
          cognitoIdentityId
          createdAt
          lastAccess
          location
          language
          profilePictureKey
          site
        }
        status
        reviewNote
        createTime
        reviewTime
        lastUpdateTime
      }
    }
  }
`;
export const listStreamsByUser = /* GraphQL */ `
  query ListStreamsByUser($first: Int, $after: String, $userId: ID!) {
    listStreamsByUser(first: $first, after: $after, userId: $userId) {
      items {
        id
        title
        body
        userId
        user {
          id
          username
          email
          preferredName
          accountStatus
          allowDirectMessages
          theme
          bio
          birthDate
          cognitoIdentityId
          createdAt
          lastAccess
          location
          language
          profilePictureKey
          site
        }
        isSealed
        location
        mood
        position
        startTime
        sealTime
        track
        uncloggerPromptId
        uncloggerPrompt {
          id
          category
          body
          language
          status
          creatorUserId
          createTime
          reviewerUserId
          reviewNote
          reviewTime
        }
        bookmarkCount {
          count
        }
        bookmarks {
          id
          userId
          interactionType
          contentType
          contentId
          indices
          time
        }
        commentCount {
          count
        }
        comments {
          id
          userId
          body
          contentType
          contentId
          time
        }
        flagCount {
          count
        }
        flags {
          id
          contentType
          contentId
          flaggerUserId
          category
          type
          detail
          reviewerUserId
          status
          reviewNote
          createTime
          reviewTime
          lastUpdateTime
        }
      }
      nextToken
    }
  }
`;
export const listSealedStreams = /* GraphQL */ `
  query ListSealedStreams($first: Int, $after: String) {
    listSealedStreams(first: $first, after: $after) {
      items {
        id
        title
        body
        userId
        user {
          id
          username
          email
          preferredName
          accountStatus
          allowDirectMessages
          theme
          bio
          birthDate
          cognitoIdentityId
          createdAt
          lastAccess
          location
          language
          profilePictureKey
          site
        }
        isSealed
        location
        mood
        position
        startTime
        sealTime
        track
        uncloggerPromptId
        uncloggerPrompt {
          id
          category
          body
          language
          status
          creatorUserId
          createTime
          reviewerUserId
          reviewNote
          reviewTime
        }
        bookmarkCount {
          count
        }
        bookmarks {
          id
          userId
          interactionType
          contentType
          contentId
          indices
          time
        }
        commentCount {
          count
        }
        comments {
          id
          userId
          body
          contentType
          contentId
          time
        }
        flagCount {
          count
        }
        flags {
          id
          contentType
          contentId
          flaggerUserId
          category
          type
          detail
          reviewerUserId
          status
          reviewNote
          createTime
          reviewTime
          lastUpdateTime
        }
      }
      nextToken
    }
  }
`;
export const listLiveStreams = /* GraphQL */ `
  query ListLiveStreams($first: Int, $after: String) {
    listLiveStreams(first: $first, after: $after) {
      items {
        id
        title
        body
        userId
        user {
          id
          username
          email
          preferredName
          accountStatus
          allowDirectMessages
          theme
          bio
          birthDate
          cognitoIdentityId
          createdAt
          lastAccess
          location
          language
          profilePictureKey
          site
        }
        isSealed
        location
        mood
        position
        startTime
        sealTime
        track
        uncloggerPromptId
        uncloggerPrompt {
          id
          category
          body
          language
          status
          creatorUserId
          createTime
          reviewerUserId
          reviewNote
          reviewTime
        }
        bookmarkCount {
          count
        }
        bookmarks {
          id
          userId
          interactionType
          contentType
          contentId
          indices
          time
        }
        commentCount {
          count
        }
        comments {
          id
          userId
          body
          contentType
          contentId
          time
        }
        flagCount {
          count
        }
        flags {
          id
          contentType
          contentId
          flaggerUserId
          category
          type
          detail
          reviewerUserId
          status
          reviewNote
          createTime
          reviewTime
          lastUpdateTime
        }
      }
      nextToken
    }
  }
`;
export const getCanto = /* GraphQL */ `
  query GetCanto($id: ID!) {
    getCanto(id: $id) {
      id
      body
      user {
        id
        username
        email
        preferredName
        accountStatus
        allowDirectMessages
        theme
        bio
        birthDate
        cognitoIdentityId
        createdAt
        lastAccess
        location
        language
        profilePictureKey
        site
        canto {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
        streams {
          nextToken
        }
        userWatchInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        userBlockInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        committedStreamCommentCount {
          count
        }
        committedStreamComments {
          id
          userId
          body
          contentType
          contentId
          time
        }
        bookmarkedStreamCount {
          count
        }
        bookmarkedStreams {
          id
          title
          body
          userId
          isSealed
          location
          mood
          position
          startTime
          sealTime
          track
          uncloggerPromptId
        }
        bookmarkedCantoCount {
          count
        }
        bookmarkedCantos {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
      }
      isPaused
      startTime
      lastUpdateTime
      bookmarkCount {
        count
      }
      bookmarks {
        id
        userId
        user {
          id
          username
          email
          preferredName
          accountStatus
          allowDirectMessages
          theme
          bio
          birthDate
          cognitoIdentityId
          createdAt
          lastAccess
          location
          language
          profilePictureKey
          site
        }
        interactionType
        contentType
        contentId
        indices
        time
      }
      flagCount {
        count
      }
      flags {
        id
        contentType
        contentId
        flaggerUserId
        flaggerUser {
          id
          username
          email
          preferredName
          accountStatus
          allowDirectMessages
          theme
          bio
          birthDate
          cognitoIdentityId
          createdAt
          lastAccess
          location
          language
          profilePictureKey
          site
        }
        category
        type
        detail
        reviewerUserId
        reviewerUser {
          id
          username
          email
          preferredName
          accountStatus
          allowDirectMessages
          theme
          bio
          birthDate
          cognitoIdentityId
          createdAt
          lastAccess
          location
          language
          profilePictureKey
          site
        }
        status
        reviewNote
        createTime
        reviewTime
        lastUpdateTime
      }
    }
  }
`;
export const listPausedCantos = /* GraphQL */ `
  query ListPausedCantos($first: Int, $after: String) {
    listPausedCantos(first: $first, after: $after) {
      items {
        id
        body
        user {
          id
          username
          email
          preferredName
          accountStatus
          allowDirectMessages
          theme
          bio
          birthDate
          cognitoIdentityId
          createdAt
          lastAccess
          location
          language
          profilePictureKey
          site
        }
        isPaused
        startTime
        lastUpdateTime
        bookmarkCount {
          count
        }
        bookmarks {
          id
          userId
          interactionType
          contentType
          contentId
          indices
          time
        }
        flagCount {
          count
        }
        flags {
          id
          contentType
          contentId
          flaggerUserId
          category
          type
          detail
          reviewerUserId
          status
          reviewNote
          createTime
          reviewTime
          lastUpdateTime
        }
      }
      nextToken
    }
  }
`;
export const listLiveCantos = /* GraphQL */ `
  query ListLiveCantos($first: Int, $after: String) {
    listLiveCantos(first: $first, after: $after) {
      items {
        id
        body
        user {
          id
          username
          email
          preferredName
          accountStatus
          allowDirectMessages
          theme
          bio
          birthDate
          cognitoIdentityId
          createdAt
          lastAccess
          location
          language
          profilePictureKey
          site
        }
        isPaused
        startTime
        lastUpdateTime
        bookmarkCount {
          count
        }
        bookmarks {
          id
          userId
          interactionType
          contentType
          contentId
          indices
          time
        }
        flagCount {
          count
        }
        flags {
          id
          contentType
          contentId
          flaggerUserId
          category
          type
          detail
          reviewerUserId
          status
          reviewNote
          createTime
          reviewTime
          lastUpdateTime
        }
      }
      nextToken
    }
  }
`;
export const getUserInteractions = /* GraphQL */ `
  query GetUserInteractions(
    $interactionType: UserInteractionType
    $actorUserId: ID!
    $targetUserId: ID!
  ) {
    getUserInteractions(
      interactionType: $interactionType
      actorUserId: $actorUserId
      targetUserId: $targetUserId
    ) {
      id
      actorUserId
      actorUser {
        id
        username
        email
        preferredName
        accountStatus
        allowDirectMessages
        theme
        bio
        birthDate
        cognitoIdentityId
        createdAt
        lastAccess
        location
        language
        profilePictureKey
        site
        canto {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
        streams {
          nextToken
        }
        userWatchInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        userBlockInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        committedStreamCommentCount {
          count
        }
        committedStreamComments {
          id
          userId
          body
          contentType
          contentId
          time
        }
        bookmarkedStreamCount {
          count
        }
        bookmarkedStreams {
          id
          title
          body
          userId
          isSealed
          location
          mood
          position
          startTime
          sealTime
          track
          uncloggerPromptId
        }
        bookmarkedCantoCount {
          count
        }
        bookmarkedCantos {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
      }
      targetUserId
      targetUser {
        id
        username
        email
        preferredName
        accountStatus
        allowDirectMessages
        theme
        bio
        birthDate
        cognitoIdentityId
        createdAt
        lastAccess
        location
        language
        profilePictureKey
        site
        canto {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
        streams {
          nextToken
        }
        userWatchInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        userBlockInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        committedStreamCommentCount {
          count
        }
        committedStreamComments {
          id
          userId
          body
          contentType
          contentId
          time
        }
        bookmarkedStreamCount {
          count
        }
        bookmarkedStreams {
          id
          title
          body
          userId
          isSealed
          location
          mood
          position
          startTime
          sealTime
          track
          uncloggerPromptId
        }
        bookmarkedCantoCount {
          count
        }
        bookmarkedCantos {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
      }
      interactionType
      lastChangeTime
    }
  }
`;
export const listUserInteractionsByActorUserId = /* GraphQL */ `
  query ListUserInteractionsByActorUserId(
    $interactionType: UserInteractionType
    $actorUserId: ID!
    $limit: Int
    $offset: Int
  ) {
    listUserInteractionsByActorUserId(
      interactionType: $interactionType
      actorUserId: $actorUserId
      limit: $limit
      offset: $offset
    ) {
      id
      actorUserId
      actorUser {
        id
        username
        email
        preferredName
        accountStatus
        allowDirectMessages
        theme
        bio
        birthDate
        cognitoIdentityId
        createdAt
        lastAccess
        location
        language
        profilePictureKey
        site
        canto {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
        streams {
          nextToken
        }
        userWatchInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        userBlockInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        committedStreamCommentCount {
          count
        }
        committedStreamComments {
          id
          userId
          body
          contentType
          contentId
          time
        }
        bookmarkedStreamCount {
          count
        }
        bookmarkedStreams {
          id
          title
          body
          userId
          isSealed
          location
          mood
          position
          startTime
          sealTime
          track
          uncloggerPromptId
        }
        bookmarkedCantoCount {
          count
        }
        bookmarkedCantos {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
      }
      targetUserId
      targetUser {
        id
        username
        email
        preferredName
        accountStatus
        allowDirectMessages
        theme
        bio
        birthDate
        cognitoIdentityId
        createdAt
        lastAccess
        location
        language
        profilePictureKey
        site
        canto {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
        streams {
          nextToken
        }
        userWatchInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        userBlockInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        committedStreamCommentCount {
          count
        }
        committedStreamComments {
          id
          userId
          body
          contentType
          contentId
          time
        }
        bookmarkedStreamCount {
          count
        }
        bookmarkedStreams {
          id
          title
          body
          userId
          isSealed
          location
          mood
          position
          startTime
          sealTime
          track
          uncloggerPromptId
        }
        bookmarkedCantoCount {
          count
        }
        bookmarkedCantos {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
      }
      interactionType
      lastChangeTime
    }
  }
`;
export const getContentBookmark = /* GraphQL */ `
  query GetContentBookmark($id: ID!) {
    getContentBookmark(id: $id) {
      id
      userId
      user {
        id
        username
        email
        preferredName
        accountStatus
        allowDirectMessages
        theme
        bio
        birthDate
        cognitoIdentityId
        createdAt
        lastAccess
        location
        language
        profilePictureKey
        site
        canto {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
        streams {
          nextToken
        }
        userWatchInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        userBlockInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        committedStreamCommentCount {
          count
        }
        committedStreamComments {
          id
          userId
          body
          contentType
          contentId
          time
        }
        bookmarkedStreamCount {
          count
        }
        bookmarkedStreams {
          id
          title
          body
          userId
          isSealed
          location
          mood
          position
          startTime
          sealTime
          track
          uncloggerPromptId
        }
        bookmarkedCantoCount {
          count
        }
        bookmarkedCantos {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
      }
      interactionType
      contentType
      contentId
      indices
      time
    }
  }
`;
export const countContentBookmarks = /* GraphQL */ `
  query CountContentBookmarks($contentId: ID!, $contentType: ContentType) {
    countContentBookmarks(contentId: $contentId, contentType: $contentType) {
      count
    }
  }
`;
export const countContentBookmarksByUser = /* GraphQL */ `
  query CountContentBookmarksByUser($userId: ID!, $contentType: ContentType) {
    countContentBookmarksByUser(userId: $userId, contentType: $contentType) {
      count
    }
  }
`;
export const listContentBookmarks = /* GraphQL */ `
  query ListContentBookmarks(
    $contentId: ID!
    $contentType: ContentType
    $limit: Int
    $offset: Int
  ) {
    listContentBookmarks(
      contentId: $contentId
      contentType: $contentType
      limit: $limit
      offset: $offset
    ) {
      id
      userId
      user {
        id
        username
        email
        preferredName
        accountStatus
        allowDirectMessages
        theme
        bio
        birthDate
        cognitoIdentityId
        createdAt
        lastAccess
        location
        language
        profilePictureKey
        site
        canto {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
        streams {
          nextToken
        }
        userWatchInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        userBlockInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        committedStreamCommentCount {
          count
        }
        committedStreamComments {
          id
          userId
          body
          contentType
          contentId
          time
        }
        bookmarkedStreamCount {
          count
        }
        bookmarkedStreams {
          id
          title
          body
          userId
          isSealed
          location
          mood
          position
          startTime
          sealTime
          track
          uncloggerPromptId
        }
        bookmarkedCantoCount {
          count
        }
        bookmarkedCantos {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
      }
      interactionType
      contentType
      contentId
      indices
      time
    }
  }
`;
export const listContentBookmarksByUser = /* GraphQL */ `
  query ListContentBookmarksByUser(
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
      id
      userId
      user {
        id
        username
        email
        preferredName
        accountStatus
        allowDirectMessages
        theme
        bio
        birthDate
        cognitoIdentityId
        createdAt
        lastAccess
        location
        language
        profilePictureKey
        site
        canto {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
        streams {
          nextToken
        }
        userWatchInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        userBlockInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        committedStreamCommentCount {
          count
        }
        committedStreamComments {
          id
          userId
          body
          contentType
          contentId
          time
        }
        bookmarkedStreamCount {
          count
        }
        bookmarkedStreams {
          id
          title
          body
          userId
          isSealed
          location
          mood
          position
          startTime
          sealTime
          track
          uncloggerPromptId
        }
        bookmarkedCantoCount {
          count
        }
        bookmarkedCantos {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
      }
      interactionType
      contentType
      contentId
      indices
      time
    }
  }
`;
export const getContentBookmarkByUser = /* GraphQL */ `
  query GetContentBookmarkByUser($userId: ID!, $contentType: ContentType) {
    getContentBookmarkByUser(userId: $userId, contentType: $contentType) {
      id
      userId
      user {
        id
        username
        email
        preferredName
        accountStatus
        allowDirectMessages
        theme
        bio
        birthDate
        cognitoIdentityId
        createdAt
        lastAccess
        location
        language
        profilePictureKey
        site
        canto {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
        streams {
          nextToken
        }
        userWatchInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        userBlockInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        committedStreamCommentCount {
          count
        }
        committedStreamComments {
          id
          userId
          body
          contentType
          contentId
          time
        }
        bookmarkedStreamCount {
          count
        }
        bookmarkedStreams {
          id
          title
          body
          userId
          isSealed
          location
          mood
          position
          startTime
          sealTime
          track
          uncloggerPromptId
        }
        bookmarkedCantoCount {
          count
        }
        bookmarkedCantos {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
      }
      interactionType
      contentType
      contentId
      indices
      time
    }
  }
`;
export const countContentComments = /* GraphQL */ `
  query CountContentComments($contentId: ID!, $contentType: ContentType) {
    countContentComments(contentId: $contentId, contentType: $contentType) {
      count
    }
  }
`;
export const listContentComments = /* GraphQL */ `
  query ListContentComments(
    $contentId: ID!
    $contentType: ContentType
    $limit: Int
    $offset: Int
  ) {
    listContentComments(
      contentId: $contentId
      contentType: $contentType
      limit: $limit
      offset: $offset
    ) {
      id
      userId
      user {
        id
        username
        email
        preferredName
        accountStatus
        allowDirectMessages
        theme
        bio
        birthDate
        cognitoIdentityId
        createdAt
        lastAccess
        location
        language
        profilePictureKey
        site
        canto {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
        streams {
          nextToken
        }
        userWatchInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        userBlockInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        committedStreamCommentCount {
          count
        }
        committedStreamComments {
          id
          userId
          body
          contentType
          contentId
          time
        }
        bookmarkedStreamCount {
          count
        }
        bookmarkedStreams {
          id
          title
          body
          userId
          isSealed
          location
          mood
          position
          startTime
          sealTime
          track
          uncloggerPromptId
        }
        bookmarkedCantoCount {
          count
        }
        bookmarkedCantos {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
      }
      body
      contentType
      contentId
      flagCount {
        count
      }
      flags {
        id
        contentType
        contentId
        flaggerUserId
        flaggerUser {
          id
          username
          email
          preferredName
          accountStatus
          allowDirectMessages
          theme
          bio
          birthDate
          cognitoIdentityId
          createdAt
          lastAccess
          location
          language
          profilePictureKey
          site
        }
        category
        type
        detail
        reviewerUserId
        reviewerUser {
          id
          username
          email
          preferredName
          accountStatus
          allowDirectMessages
          theme
          bio
          birthDate
          cognitoIdentityId
          createdAt
          lastAccess
          location
          language
          profilePictureKey
          site
        }
        status
        reviewNote
        createTime
        reviewTime
        lastUpdateTime
      }
      time
    }
  }
`;
export const listContentCommentsByUser = /* GraphQL */ `
  query ListContentCommentsByUser(
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
      id
      userId
      user {
        id
        username
        email
        preferredName
        accountStatus
        allowDirectMessages
        theme
        bio
        birthDate
        cognitoIdentityId
        createdAt
        lastAccess
        location
        language
        profilePictureKey
        site
        canto {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
        streams {
          nextToken
        }
        userWatchInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        userBlockInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        committedStreamCommentCount {
          count
        }
        committedStreamComments {
          id
          userId
          body
          contentType
          contentId
          time
        }
        bookmarkedStreamCount {
          count
        }
        bookmarkedStreams {
          id
          title
          body
          userId
          isSealed
          location
          mood
          position
          startTime
          sealTime
          track
          uncloggerPromptId
        }
        bookmarkedCantoCount {
          count
        }
        bookmarkedCantos {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
      }
      body
      contentType
      contentId
      flagCount {
        count
      }
      flags {
        id
        contentType
        contentId
        flaggerUserId
        flaggerUser {
          id
          username
          email
          preferredName
          accountStatus
          allowDirectMessages
          theme
          bio
          birthDate
          cognitoIdentityId
          createdAt
          lastAccess
          location
          language
          profilePictureKey
          site
        }
        category
        type
        detail
        reviewerUserId
        reviewerUser {
          id
          username
          email
          preferredName
          accountStatus
          allowDirectMessages
          theme
          bio
          birthDate
          cognitoIdentityId
          createdAt
          lastAccess
          location
          language
          profilePictureKey
          site
        }
        status
        reviewNote
        createTime
        reviewTime
        lastUpdateTime
      }
      time
    }
  }
`;
export const getFlag = /* GraphQL */ `
  query GetFlag($id: ID!) {
    getFlag(id: $id) {
      id
      contentType
      contentId
      flaggerUserId
      flaggerUser {
        id
        username
        email
        preferredName
        accountStatus
        allowDirectMessages
        theme
        bio
        birthDate
        cognitoIdentityId
        createdAt
        lastAccess
        location
        language
        profilePictureKey
        site
        canto {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
        streams {
          nextToken
        }
        userWatchInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        userBlockInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        committedStreamCommentCount {
          count
        }
        committedStreamComments {
          id
          userId
          body
          contentType
          contentId
          time
        }
        bookmarkedStreamCount {
          count
        }
        bookmarkedStreams {
          id
          title
          body
          userId
          isSealed
          location
          mood
          position
          startTime
          sealTime
          track
          uncloggerPromptId
        }
        bookmarkedCantoCount {
          count
        }
        bookmarkedCantos {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
      }
      category
      type
      detail
      reviewerUserId
      reviewerUser {
        id
        username
        email
        preferredName
        accountStatus
        allowDirectMessages
        theme
        bio
        birthDate
        cognitoIdentityId
        createdAt
        lastAccess
        location
        language
        profilePictureKey
        site
        canto {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
        streams {
          nextToken
        }
        userWatchInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        userBlockInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        committedStreamCommentCount {
          count
        }
        committedStreamComments {
          id
          userId
          body
          contentType
          contentId
          time
        }
        bookmarkedStreamCount {
          count
        }
        bookmarkedStreams {
          id
          title
          body
          userId
          isSealed
          location
          mood
          position
          startTime
          sealTime
          track
          uncloggerPromptId
        }
        bookmarkedCantoCount {
          count
        }
        bookmarkedCantos {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
      }
      status
      reviewNote
      createTime
      reviewTime
      lastUpdateTime
    }
  }
`;
export const countFlags = /* GraphQL */ `
  query CountFlags($searchText: String, $status: FlagApprovalStatus) {
    countFlags(searchText: $searchText, status: $status) {
      count
    }
  }
`;
export const listFlags = /* GraphQL */ `
  query ListFlags(
    $limit: Int
    $offset: Int
    $searchText: String
    $status: FlagApprovalStatus
  ) {
    listFlags(
      limit: $limit
      offset: $offset
      searchText: $searchText
      status: $status
    ) {
      id
      contentType
      contentId
      flaggerUserId
      flaggerUser {
        id
        username
        email
        preferredName
        accountStatus
        allowDirectMessages
        theme
        bio
        birthDate
        cognitoIdentityId
        createdAt
        lastAccess
        location
        language
        profilePictureKey
        site
        canto {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
        streams {
          nextToken
        }
        userWatchInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        userBlockInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        committedStreamCommentCount {
          count
        }
        committedStreamComments {
          id
          userId
          body
          contentType
          contentId
          time
        }
        bookmarkedStreamCount {
          count
        }
        bookmarkedStreams {
          id
          title
          body
          userId
          isSealed
          location
          mood
          position
          startTime
          sealTime
          track
          uncloggerPromptId
        }
        bookmarkedCantoCount {
          count
        }
        bookmarkedCantos {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
      }
      category
      type
      detail
      reviewerUserId
      reviewerUser {
        id
        username
        email
        preferredName
        accountStatus
        allowDirectMessages
        theme
        bio
        birthDate
        cognitoIdentityId
        createdAt
        lastAccess
        location
        language
        profilePictureKey
        site
        canto {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
        streams {
          nextToken
        }
        userWatchInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        userBlockInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        committedStreamCommentCount {
          count
        }
        committedStreamComments {
          id
          userId
          body
          contentType
          contentId
          time
        }
        bookmarkedStreamCount {
          count
        }
        bookmarkedStreams {
          id
          title
          body
          userId
          isSealed
          location
          mood
          position
          startTime
          sealTime
          track
          uncloggerPromptId
        }
        bookmarkedCantoCount {
          count
        }
        bookmarkedCantos {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
      }
      status
      reviewNote
      createTime
      reviewTime
      lastUpdateTime
    }
  }
`;
export const getFlagByUser = /* GraphQL */ `
  query GetFlagByUser($flaggerUserId: ID!, $contentType: ContentType) {
    getFlagByUser(flaggerUserId: $flaggerUserId, contentType: $contentType) {
      id
      contentType
      contentId
      flaggerUserId
      flaggerUser {
        id
        username
        email
        preferredName
        accountStatus
        allowDirectMessages
        theme
        bio
        birthDate
        cognitoIdentityId
        createdAt
        lastAccess
        location
        language
        profilePictureKey
        site
        canto {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
        streams {
          nextToken
        }
        userWatchInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        userBlockInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        committedStreamCommentCount {
          count
        }
        committedStreamComments {
          id
          userId
          body
          contentType
          contentId
          time
        }
        bookmarkedStreamCount {
          count
        }
        bookmarkedStreams {
          id
          title
          body
          userId
          isSealed
          location
          mood
          position
          startTime
          sealTime
          track
          uncloggerPromptId
        }
        bookmarkedCantoCount {
          count
        }
        bookmarkedCantos {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
      }
      category
      type
      detail
      reviewerUserId
      reviewerUser {
        id
        username
        email
        preferredName
        accountStatus
        allowDirectMessages
        theme
        bio
        birthDate
        cognitoIdentityId
        createdAt
        lastAccess
        location
        language
        profilePictureKey
        site
        canto {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
        streams {
          nextToken
        }
        userWatchInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        userBlockInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        committedStreamCommentCount {
          count
        }
        committedStreamComments {
          id
          userId
          body
          contentType
          contentId
          time
        }
        bookmarkedStreamCount {
          count
        }
        bookmarkedStreams {
          id
          title
          body
          userId
          isSealed
          location
          mood
          position
          startTime
          sealTime
          track
          uncloggerPromptId
        }
        bookmarkedCantoCount {
          count
        }
        bookmarkedCantos {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
      }
      status
      reviewNote
      createTime
      reviewTime
      lastUpdateTime
    }
  }
`;
export const listUncloggerPrompts = /* GraphQL */ `
  query ListUncloggerPrompts(
    $limit: Int
    $offset: Int
    $searchText: String
    $status: UncloggerPromptApprovalStatus
  ) {
    listUncloggerPrompts(
      limit: $limit
      offset: $offset
      searchText: $searchText
      status: $status
    ) {
      id
      category
      body
      language
      status
      creatorUserId
      creatorUser {
        id
        username
        email
        preferredName
        accountStatus
        allowDirectMessages
        theme
        bio
        birthDate
        cognitoIdentityId
        createdAt
        lastAccess
        location
        language
        profilePictureKey
        site
        canto {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
        streams {
          nextToken
        }
        userWatchInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        userBlockInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        committedStreamCommentCount {
          count
        }
        committedStreamComments {
          id
          userId
          body
          contentType
          contentId
          time
        }
        bookmarkedStreamCount {
          count
        }
        bookmarkedStreams {
          id
          title
          body
          userId
          isSealed
          location
          mood
          position
          startTime
          sealTime
          track
          uncloggerPromptId
        }
        bookmarkedCantoCount {
          count
        }
        bookmarkedCantos {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
      }
      createTime
      reviewerUserId
      reviewerUser {
        id
        username
        email
        preferredName
        accountStatus
        allowDirectMessages
        theme
        bio
        birthDate
        cognitoIdentityId
        createdAt
        lastAccess
        location
        language
        profilePictureKey
        site
        canto {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
        streams {
          nextToken
        }
        userWatchInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        userBlockInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        committedStreamCommentCount {
          count
        }
        committedStreamComments {
          id
          userId
          body
          contentType
          contentId
          time
        }
        bookmarkedStreamCount {
          count
        }
        bookmarkedStreams {
          id
          title
          body
          userId
          isSealed
          location
          mood
          position
          startTime
          sealTime
          track
          uncloggerPromptId
        }
        bookmarkedCantoCount {
          count
        }
        bookmarkedCantos {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
      }
      reviewNote
      reviewTime
    }
  }
`;
export const countUncloggerPrompts = /* GraphQL */ `
  query CountUncloggerPrompts(
    $searchText: String
    $status: UncloggerPromptApprovalStatus
  ) {
    countUncloggerPrompts(searchText: $searchText, status: $status) {
      count
    }
  }
`;
export const getRandomUncloggerPrompt = /* GraphQL */ `
  query GetRandomUncloggerPrompt(
    $category: UncloggerPromptCategory
    $language: Language
  ) {
    getRandomUncloggerPrompt(category: $category, language: $language) {
      id
      category
      body
      language
      status
      creatorUserId
      creatorUser {
        id
        username
        email
        preferredName
        accountStatus
        allowDirectMessages
        theme
        bio
        birthDate
        cognitoIdentityId
        createdAt
        lastAccess
        location
        language
        profilePictureKey
        site
        canto {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
        streams {
          nextToken
        }
        userWatchInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        userBlockInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        committedStreamCommentCount {
          count
        }
        committedStreamComments {
          id
          userId
          body
          contentType
          contentId
          time
        }
        bookmarkedStreamCount {
          count
        }
        bookmarkedStreams {
          id
          title
          body
          userId
          isSealed
          location
          mood
          position
          startTime
          sealTime
          track
          uncloggerPromptId
        }
        bookmarkedCantoCount {
          count
        }
        bookmarkedCantos {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
      }
      createTime
      reviewerUserId
      reviewerUser {
        id
        username
        email
        preferredName
        accountStatus
        allowDirectMessages
        theme
        bio
        birthDate
        cognitoIdentityId
        createdAt
        lastAccess
        location
        language
        profilePictureKey
        site
        canto {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
        streams {
          nextToken
        }
        userWatchInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        userBlockInteractions {
          id
          actorUserId
          targetUserId
          interactionType
          lastChangeTime
        }
        committedStreamCommentCount {
          count
        }
        committedStreamComments {
          id
          userId
          body
          contentType
          contentId
          time
        }
        bookmarkedStreamCount {
          count
        }
        bookmarkedStreams {
          id
          title
          body
          userId
          isSealed
          location
          mood
          position
          startTime
          sealTime
          track
          uncloggerPromptId
        }
        bookmarkedCantoCount {
          count
        }
        bookmarkedCantos {
          id
          body
          isPaused
          startTime
          lastUpdateTime
        }
      }
      reviewNote
      reviewTime
    }
  }
`;
export const search = /* GraphQL */ `
  query Search($query: String!) {
    search(query: $query) {
      ... on Stream {
        id
        title
        body
        userId
        user {
          id
          username
          email
          preferredName
          accountStatus
          allowDirectMessages
          theme
          bio
          birthDate
          cognitoIdentityId
          createdAt
          lastAccess
          location
          language
          profilePictureKey
          site
          canto {
            id
            body
            isPaused
            startTime
            lastUpdateTime
          }
          streams {
            nextToken
          }
          userWatchInteractions {
            id
            actorUserId
            targetUserId
            interactionType
            lastChangeTime
          }
          userBlockInteractions {
            id
            actorUserId
            targetUserId
            interactionType
            lastChangeTime
          }
          committedStreamCommentCount {
            count
          }
          committedStreamComments {
            id
            userId
            body
            contentType
            contentId
            time
          }
          bookmarkedStreamCount {
            count
          }
          bookmarkedStreams {
            id
            title
            body
            userId
            isSealed
            location
            mood
            position
            startTime
            sealTime
            track
            uncloggerPromptId
          }
          bookmarkedCantoCount {
            count
          }
          bookmarkedCantos {
            id
            body
            isPaused
            startTime
            lastUpdateTime
          }
        }
        isSealed
        location
        mood
        position
        startTime
        sealTime
        track
        uncloggerPromptId
        uncloggerPrompt {
          id
          category
          body
          language
          status
          creatorUserId
          creatorUser {
            id
            username
            email
            preferredName
            accountStatus
            allowDirectMessages
            theme
            bio
            birthDate
            cognitoIdentityId
            createdAt
            lastAccess
            location
            language
            profilePictureKey
            site
          }
          createTime
          reviewerUserId
          reviewerUser {
            id
            username
            email
            preferredName
            accountStatus
            allowDirectMessages
            theme
            bio
            birthDate
            cognitoIdentityId
            createdAt
            lastAccess
            location
            language
            profilePictureKey
            site
          }
          reviewNote
          reviewTime
        }
        bookmarkCount {
          count
        }
        bookmarks {
          id
          userId
          user {
            id
            username
            email
            preferredName
            accountStatus
            allowDirectMessages
            theme
            bio
            birthDate
            cognitoIdentityId
            createdAt
            lastAccess
            location
            language
            profilePictureKey
            site
          }
          interactionType
          contentType
          contentId
          indices
          time
        }
        commentCount {
          count
        }
        comments {
          id
          userId
          user {
            id
            username
            email
            preferredName
            accountStatus
            allowDirectMessages
            theme
            bio
            birthDate
            cognitoIdentityId
            createdAt
            lastAccess
            location
            language
            profilePictureKey
            site
          }
          body
          contentType
          contentId
          flagCount {
            count
          }
          flags {
            id
            contentType
            contentId
            flaggerUserId
            category
            type
            detail
            reviewerUserId
            status
            reviewNote
            createTime
            reviewTime
            lastUpdateTime
          }
          time
        }
        flagCount {
          count
        }
        flags {
          id
          contentType
          contentId
          flaggerUserId
          flaggerUser {
            id
            username
            email
            preferredName
            accountStatus
            allowDirectMessages
            theme
            bio
            birthDate
            cognitoIdentityId
            createdAt
            lastAccess
            location
            language
            profilePictureKey
            site
          }
          category
          type
          detail
          reviewerUserId
          reviewerUser {
            id
            username
            email
            preferredName
            accountStatus
            allowDirectMessages
            theme
            bio
            birthDate
            cognitoIdentityId
            createdAt
            lastAccess
            location
            language
            profilePictureKey
            site
          }
          status
          reviewNote
          createTime
          reviewTime
          lastUpdateTime
        }
      }
      ... on Canto {
        id
        body
        user {
          id
          username
          email
          preferredName
          accountStatus
          allowDirectMessages
          theme
          bio
          birthDate
          cognitoIdentityId
          createdAt
          lastAccess
          location
          language
          profilePictureKey
          site
          canto {
            id
            body
            isPaused
            startTime
            lastUpdateTime
          }
          streams {
            nextToken
          }
          userWatchInteractions {
            id
            actorUserId
            targetUserId
            interactionType
            lastChangeTime
          }
          userBlockInteractions {
            id
            actorUserId
            targetUserId
            interactionType
            lastChangeTime
          }
          committedStreamCommentCount {
            count
          }
          committedStreamComments {
            id
            userId
            body
            contentType
            contentId
            time
          }
          bookmarkedStreamCount {
            count
          }
          bookmarkedStreams {
            id
            title
            body
            userId
            isSealed
            location
            mood
            position
            startTime
            sealTime
            track
            uncloggerPromptId
          }
          bookmarkedCantoCount {
            count
          }
          bookmarkedCantos {
            id
            body
            isPaused
            startTime
            lastUpdateTime
          }
        }
        isPaused
        startTime
        lastUpdateTime
        bookmarkCount {
          count
        }
        bookmarks {
          id
          userId
          user {
            id
            username
            email
            preferredName
            accountStatus
            allowDirectMessages
            theme
            bio
            birthDate
            cognitoIdentityId
            createdAt
            lastAccess
            location
            language
            profilePictureKey
            site
          }
          interactionType
          contentType
          contentId
          indices
          time
        }
        flagCount {
          count
        }
        flags {
          id
          contentType
          contentId
          flaggerUserId
          flaggerUser {
            id
            username
            email
            preferredName
            accountStatus
            allowDirectMessages
            theme
            bio
            birthDate
            cognitoIdentityId
            createdAt
            lastAccess
            location
            language
            profilePictureKey
            site
          }
          category
          type
          detail
          reviewerUserId
          reviewerUser {
            id
            username
            email
            preferredName
            accountStatus
            allowDirectMessages
            theme
            bio
            birthDate
            cognitoIdentityId
            createdAt
            lastAccess
            location
            language
            profilePictureKey
            site
          }
          status
          reviewNote
          createTime
          reviewTime
          lastUpdateTime
        }
      }
      ... on User {
        id
        username
        email
        preferredName
        accountStatus
        allowDirectMessages
        theme
        bio
        birthDate
        cognitoIdentityId
        createdAt
        lastAccess
        location
        language
        profilePictureKey
        site
        canto {
          id
          body
          user {
            id
            username
            email
            preferredName
            accountStatus
            allowDirectMessages
            theme
            bio
            birthDate
            cognitoIdentityId
            createdAt
            lastAccess
            location
            language
            profilePictureKey
            site
          }
          isPaused
          startTime
          lastUpdateTime
          bookmarkCount {
            count
          }
          bookmarks {
            id
            userId
            interactionType
            contentType
            contentId
            indices
            time
          }
          flagCount {
            count
          }
          flags {
            id
            contentType
            contentId
            flaggerUserId
            category
            type
            detail
            reviewerUserId
            status
            reviewNote
            createTime
            reviewTime
            lastUpdateTime
          }
        }
        streams {
          items {
            id
            title
            body
            userId
            isSealed
            location
            mood
            position
            startTime
            sealTime
            track
            uncloggerPromptId
          }
          nextToken
        }
        userWatchInteractions {
          id
          actorUserId
          actorUser {
            id
            username
            email
            preferredName
            accountStatus
            allowDirectMessages
            theme
            bio
            birthDate
            cognitoIdentityId
            createdAt
            lastAccess
            location
            language
            profilePictureKey
            site
          }
          targetUserId
          targetUser {
            id
            username
            email
            preferredName
            accountStatus
            allowDirectMessages
            theme
            bio
            birthDate
            cognitoIdentityId
            createdAt
            lastAccess
            location
            language
            profilePictureKey
            site
          }
          interactionType
          lastChangeTime
        }
        userBlockInteractions {
          id
          actorUserId
          actorUser {
            id
            username
            email
            preferredName
            accountStatus
            allowDirectMessages
            theme
            bio
            birthDate
            cognitoIdentityId
            createdAt
            lastAccess
            location
            language
            profilePictureKey
            site
          }
          targetUserId
          targetUser {
            id
            username
            email
            preferredName
            accountStatus
            allowDirectMessages
            theme
            bio
            birthDate
            cognitoIdentityId
            createdAt
            lastAccess
            location
            language
            profilePictureKey
            site
          }
          interactionType
          lastChangeTime
        }
        committedStreamCommentCount {
          count
        }
        committedStreamComments {
          id
          userId
          user {
            id
            username
            email
            preferredName
            accountStatus
            allowDirectMessages
            theme
            bio
            birthDate
            cognitoIdentityId
            createdAt
            lastAccess
            location
            language
            profilePictureKey
            site
          }
          body
          contentType
          contentId
          flagCount {
            count
          }
          flags {
            id
            contentType
            contentId
            flaggerUserId
            category
            type
            detail
            reviewerUserId
            status
            reviewNote
            createTime
            reviewTime
            lastUpdateTime
          }
          time
        }
        bookmarkedStreamCount {
          count
        }
        bookmarkedStreams {
          id
          title
          body
          userId
          user {
            id
            username
            email
            preferredName
            accountStatus
            allowDirectMessages
            theme
            bio
            birthDate
            cognitoIdentityId
            createdAt
            lastAccess
            location
            language
            profilePictureKey
            site
          }
          isSealed
          location
          mood
          position
          startTime
          sealTime
          track
          uncloggerPromptId
          uncloggerPrompt {
            id
            category
            body
            language
            status
            creatorUserId
            createTime
            reviewerUserId
            reviewNote
            reviewTime
          }
          bookmarkCount {
            count
          }
          bookmarks {
            id
            userId
            interactionType
            contentType
            contentId
            indices
            time
          }
          commentCount {
            count
          }
          comments {
            id
            userId
            body
            contentType
            contentId
            time
          }
          flagCount {
            count
          }
          flags {
            id
            contentType
            contentId
            flaggerUserId
            category
            type
            detail
            reviewerUserId
            status
            reviewNote
            createTime
            reviewTime
            lastUpdateTime
          }
        }
        bookmarkedCantoCount {
          count
        }
        bookmarkedCantos {
          id
          body
          user {
            id
            username
            email
            preferredName
            accountStatus
            allowDirectMessages
            theme
            bio
            birthDate
            cognitoIdentityId
            createdAt
            lastAccess
            location
            language
            profilePictureKey
            site
          }
          isPaused
          startTime
          lastUpdateTime
          bookmarkCount {
            count
          }
          bookmarks {
            id
            userId
            interactionType
            contentType
            contentId
            indices
            time
          }
          flagCount {
            count
          }
          flags {
            id
            contentType
            contentId
            flaggerUserId
            category
            type
            detail
            reviewerUserId
            status
            reviewNote
            createTime
            reviewTime
            lastUpdateTime
          }
        }
      }
    }
  }
`;
export const getRecaptchaTokenResult = /* GraphQL */ `
  query GetRecaptchaTokenResult($token: String!, $ip: String) {
    getRecaptchaTokenResult(token: $token, ip: $ip) {
      challengeTimestamp
      errorCodes
      hostname
      success
    }
  }
`;
