/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onUpdateStream = /* GraphQL */ `
  subscription OnUpdateStream($id: ID!) {
    onUpdateStream(id: $id) {
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
          privacy
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
      privacy
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
export const onUpdateCanto = /* GraphQL */ `
  subscription OnUpdateCanto($id: ID!) {
    onUpdateCanto(id: $id) {
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
          privacy
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
export const onCreateOrDeleteContentInteraction = /* GraphQL */ `
  subscription OnCreateOrDeleteContentInteraction($contentId: String) {
    onCreateOrDeleteContentInteraction(contentId: $contentId) {
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
          privacy
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
export const onCreateOrDeleteFlag = /* GraphQL */ `
  subscription OnCreateOrDeleteFlag($contentId: String) {
    onCreateOrDeleteFlag(contentId: $contentId) {
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
          privacy
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
          privacy
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
