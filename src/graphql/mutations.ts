/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const updateUser = /* GraphQL */ `
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
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
          parentContentId
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
          trackId
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
          parentContentId
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
        trackId
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
          parentContentId
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
          parentContentId
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input) {
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
          parentContentId
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
          trackId
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
          parentContentId
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
        trackId
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
          parentContentId
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
          parentContentId
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
export const createStream = /* GraphQL */ `
  mutation CreateStream($input: CreateStreamInput!) {
    createStream(input: $input) {
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
          trackId
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
      trackId
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
          parentContentId
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
        parentContentId
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
export const updateStream = /* GraphQL */ `
  mutation UpdateStream($input: UpdateStreamInput!) {
    updateStream(input: $input) {
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
          trackId
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
      trackId
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
          parentContentId
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
        parentContentId
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
export const createCanto = /* GraphQL */ `
  mutation CreateCanto($input: CreateCantoInput!) {
    createCanto(input: $input) {
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
          trackId
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
        parentContentId
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
export const updateCanto = /* GraphQL */ `
  mutation UpdateCanto($input: UpdateCantoInput!) {
    updateCanto(input: $input) {
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
          trackId
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
        parentContentId
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
export const createUserInteraction = /* GraphQL */ `
  mutation CreateUserInteraction($input: CreateUserInteractionInput!) {
    createUserInteraction(input: $input) {
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
          trackId
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
          trackId
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
export const deleteUserInteraction = /* GraphQL */ `
  mutation DeleteUserInteraction($input: DeleteUserInteractionInput!) {
    deleteUserInteraction(input: $input) {
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
          trackId
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
          trackId
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
export const createContentInteraction = /* GraphQL */ `
  mutation CreateContentInteraction($input: CreateContentInteractionInput!) {
    createContentInteraction(input: $input) {
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
          trackId
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
export const updateContentInteraction = /* GraphQL */ `
  mutation UpdateContentInteraction($input: UpdateContentInteractionInput) {
    updateContentInteraction(input: $input) {
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
          trackId
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
export const deleteContentInteraction = /* GraphQL */ `
  mutation DeleteContentInteraction($input: DeleteContentInteractionInput!) {
    deleteContentInteraction(input: $input) {
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
          trackId
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
export const createComment = /* GraphQL */ `
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
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
          trackId
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
        parentContentId
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
export const createFlag = /* GraphQL */ `
  mutation CreateFlag($input: CreateFlagInput!) {
    createFlag(input: $input) {
      id
      contentType
      contentId
      parentContentId
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
          trackId
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
          trackId
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
export const updateFlagContent = /* GraphQL */ `
  mutation UpdateFlagContent($input: UpdateFlagContentInput) {
    updateFlagContent(input: $input) {
      id
      contentType
      contentId
      parentContentId
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
          trackId
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
          trackId
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
export const deleteFlag = /* GraphQL */ `
  mutation DeleteFlag($input: DeleteFlagInput!) {
    deleteFlag(input: $input) {
      id
      contentType
      contentId
      parentContentId
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
          trackId
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
          trackId
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
export const updateFlagReview = /* GraphQL */ `
  mutation UpdateFlagReview($input: UpdateFlagReviewInput) {
    updateFlagReview(input: $input) {
      id
      contentType
      contentId
      parentContentId
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
          trackId
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
          trackId
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
export const createUncloggerPrompt = /* GraphQL */ `
  mutation CreateUncloggerPrompt($input: CreateUncloggerPromptInput!) {
    createUncloggerPrompt(input: $input) {
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
          trackId
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
          trackId
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
export const updateUncloggerPromptContent = /* GraphQL */ `
  mutation UpdateUncloggerPromptContent(
    $input: UpdateUncloggerPromptContentInput!
  ) {
    updateUncloggerPromptContent(input: $input) {
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
          trackId
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
          trackId
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
export const updateUncloggerPromptReview = /* GraphQL */ `
  mutation UpdateUncloggerPromptReview(
    $input: UpdateUncloggerPromptReviewInput!
  ) {
    updateUncloggerPromptReview(input: $input) {
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
          trackId
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
          trackId
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
export const deleteUncloggerPrompt = /* GraphQL */ `
  mutation DeleteUncloggerPrompt($input: DeleteUncloggerPromptInput!) {
    deleteUncloggerPrompt(input: $input) {
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
          trackId
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
          trackId
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
