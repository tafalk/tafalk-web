/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export enum Language {
  en = 'en',
  tr = 'tr'
}

// E N U M S
export enum ContentType {
  stream = 'stream',
  canto = 'canto',
  comment = 'comment'
}

export enum Mood {
  Aroused = 'Aroused',
  AsUsual = 'AsUsual',
  Drunk = 'Drunk',
  HardToExplain = 'HardToExplain',
  High = 'High',
  Melancholic = 'Melancholic',
  Relieved = 'Relieved'
}

export enum Position {
  AllFours = 'AllFours',
  Kneeling = 'Kneeling',
  Lying = 'Lying',
  Sitting = 'Sitting',
  Squatting = 'Squatting',
  Standing = 'Standing',
  Walking = 'Walking'
}

export enum UserInteractionType {
  Block = 'Block',
  Watch = 'Watch'
}

export enum FlagApprovalStatus {
  Pending = 'Pending',
  Declined = 'Declined',
  Accepted = 'Accepted',
  OnHold = 'OnHold'
}

export enum UncloggerPromptCategory {
  Trivia = 'Trivia',
  HistoricalEvent = 'HistoricalEvent',
  News = 'News',
  PhilosophySchools = 'PhilosophySchools',
  Other = 'Other'
}

export enum UncloggerPromptApprovalStatus {
  Pending = 'Pending',
  Declined = 'Declined',
  Accepted = 'Accepted',
  OnHold = 'OnHold'
}

export type UpdateUserInput = {
  accountStatus?: string | null
  allowDirectMessages?: boolean | null
  bio?: string | null
  birthDate?: string | null
  cognitoIdentityId?: string | null
  createdAt?: string | null
  email?: string | null
  fullName?: string | null
  id: string
  lastAccess?: string | null
  location?: string | null
  preferredName?: string | null
  language?: Language | null
  profilePictureKey?: string | null
  site?: string | null
  theme?: string | null
  username?: string | null
}

export enum ContentInteractionType {
  Bookmark = 'Bookmark'
}

export type DeleteUserInput = {
  id: string
}

export type CreateStreamInput = {
  id: string
  body?: string | null
  isSealed?: number | null
  location?: string | null
  mood?: Mood | null
  position?: Position | null
  sealTime?: string | null
  startTime: string
  title?: string | null
  trackId?: string | null
  userId: string
}

export type UpdateStreamInput = {
  id: string
  body?: string | null
  isSealed?: number | null
  location?: string | null
  mood?: Mood | null
  position?: Position | null
  sealTime?: string | null
  startTime?: string | null
  title?: string | null
  uncloggerPromptId?: string | null
  trackId?: string | null
}

export type CreateCantoInput = {
  id: string
  body?: string | null
  isPaused?: number | null
  startTime: string
  lastUpdateTime?: string | null
}

export type UpdateCantoInput = {
  id: string
  body?: string | null
  isPaused?: number | null
  lastUpdateTime: string
}

export type CreateUserInteractionInput = {
  actorUserId: string
  interactionType?: UserInteractionType | null
  targetUserId: string
}

export type DeleteUserInteractionInput = {
  id: string
}

export type CreateContentInteractionInput = {
  userId: string
  interactionType: ContentInteractionType
  contentType: ContentType
  contentId: string
  indices?: string | null
}

export type UpdateContentInteractionInput = {
  id: string
  indices: string
}

export type DeleteContentInteractionInput = {
  id: string
}

export type CreateCommentInput = {
  userId: string
  body: string
  contentType: ContentType
  contentId: string
}

export type CreateFlagInput = {
  contentType: ContentType
  contentId?: string | null
  flaggerUserId: string
  category: string
  type: string
  detail?: string | null
}

export type UpdateFlagContentInput = {
  id: string
  category?: string | null
  type?: string | null
  detail?: string | null
}

export type UpdateFlagReviewInput = {
  id: string
  reviewerUserId?: string | null
  status?: FlagApprovalStatus | null
  reviewNote?: string | null
}

export type DeleteFlagInput = {
  id: string
}

export type CreateUncloggerPromptInput = {
  category: UncloggerPromptCategory
  body: string
  language?: Language | null
  creatorUserId?: string | null
}

export type UpdateUncloggerPromptContentInput = {
  id: string
  category?: UncloggerPromptCategory | null
  body?: string | null
  language?: Language | null
}

export type UpdateUncloggerPromptReviewInput = {
  id: string
  reviewerUserId?: string | null
  status?: UncloggerPromptApprovalStatus | null
  reviewNote?: string | null
}

export type DeleteUncloggerPromptInput = {
  id: string
}

export type GetUserQueryVariables = {
  username: string
}

export type GetUserQuery = {
  // User
  getUserByUsername: {
    __typename: 'User'
    id: string
    cognitoIdentityId: string | null
    username: string
    email: string | null
    bio: string | null
    birthDate: string
    theme: string | null
    location: string | null
    profilePictureKey: string | null
    allowDirectMessages: boolean | null
    site: string | null
    language: Language | null
    createdAt: string | null
    lastAccess: string | null
    accountStatus: string | null
    userWatchInteractions: Array<{
      __typename: 'UserInteraction'
      id: string
      targetUserId: string
    } | null> | null
    userBlockInteractions: Array<{
      __typename: 'UserInteraction'
      id: string
      targetUserId: string
    } | null> | null
  } | null
}

export type GetUserProfileContentQueryVariables = {
  username: string
}

export type GetUserProfileContentQuery = {
  // User
  getUserByUsername: {
    __typename: 'User'
    id: string
    cognitoIdentityId: string | null
    username: string
    email: string | null
    bio: string | null
    birthDate: string
    theme: string | null
    location: string | null
    profilePictureKey: string | null
    allowDirectMessages: boolean | null
    site: string | null
    language: Language | null
    createdAt: string | null
    lastAccess: string | null
    accountStatus: string | null
    streams: {
      __typename: 'StreamConnection'
      items: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        startTime: string
        sealTime: string | null
        isSealed: number | null
        user: {
          __typename: 'User'
          id: string
          username: string
          profilePictureKey: string | null
          language: Language | null
        } | null
        bookmarkCount: {
          __typename: 'ResultCount'
          count: number | null
        } | null
        commentCount: {
          __typename: 'ResultCount'
          count: number | null
        } | null
      } | null> | null
      nextToken: string | null
    } | null
    canto: {
      __typename: 'Canto'
      id: string
      body: string
      startTime: string
      lastUpdateTime: string | null
      isPaused: number | null
      user: {
        __typename: 'User'
        id: string
        username: string
        profilePictureKey: string | null
        language: Language | null
      } | null
      bookmarkCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
    } | null
    userWatchInteractions: Array<{
      __typename: 'UserInteraction'
      id: string
      targetUserId: string
    } | null> | null
    userBlockInteractions: Array<{
      __typename: 'UserInteraction'
      id: string
      targetUserId: string
    } | null> | null
    committedStreamComments: Array<{
      __typename: 'Comment'
      id: string
      contentId: string
      contentType: ContentType
      body: string | null
    } | null> | null
    bookmarkedStreams: Array<{
      __typename: 'Stream'
      id: string
    } | null> | null
    bookmarkedCantos: Array<{
      __typename: 'Canto'
      id: string
    } | null> | null
  } | null
}

export type GetStreamByIdQueryVariables = {
  id: string
}

export type GetStreamByIdQuery = {
  // Stream
  getStream: {
    __typename: 'Stream'
    id: string
    user: {
      __typename: 'User'
      id: string
      username: string
      profilePictureKey: string | null
      accountStatus: string | null
      cognitoIdentityId: string | null
    } | null
    title: string | null
    body: string
    mood: Mood | null
    position: Position | null
    uncloggerPromptId: string | null
    trackId: string | null
    startTime: string
    isSealed: number | null
    sealTime: string | null
    bookmarkCount: {
      __typename: 'ResultCount'
      count: number | null
    } | null
    comments: Array<{
      __typename: 'Comment'
      id: string
      contentId: string
      contentType: ContentType
      userId: string
      user: {
        __typename: 'User'
        id: string
        username: string
        profilePictureKey: string | null
        accountStatus: string | null
        cognitoIdentityId: string | null
      } | null
      time: string | null
      flags: Array<{
        __typename: 'Flag'
        id: string
        contentType: ContentType
        contentId: string | null
        flaggerUserId: string
        category: string
        type: string
        detail: string | null
        createTime: string | null
      } | null> | null
    } | null> | null
    flags: Array<{
      __typename: 'Flag'
      id: string
      contentType: ContentType
      contentId: string | null
      flaggerUserId: string
      category: string
      type: string
      detail: string | null
      createTime: string | null
    } | null> | null
  } | null
}

export type GetCantoByIdQueryVariables = {
  id: string
}

export type GetCantoByIdQuery = {
  // Cantos
  getCanto: {
    __typename: 'Canto'
    id: string
    user: {
      __typename: 'User'
      id: string
      username: string
      profilePictureKey: string | null
      accountStatus: string | null
      cognitoIdentityId: string | null
    } | null
    body: string
    startTime: string
    lastUpdateTime: string | null
    isPaused: number | null
    bookmarkCount: {
      __typename: 'ResultCount'
      count: number | null
    } | null
  } | null
}

export type ListUserStreamsForProfileQueryVariables = {
  userId: string
  limit?: number | null
  nextToken?: string | null
}

export type ListUserStreamsForProfileQuery = {
  listStreamsByUser: {
    __typename: 'StreamConnection'
    items: Array<{
      __typename: 'Stream'
      id: string
      title: string | null
      body: string
      startTime: string
      sealTime: string | null
      isSealed: number | null
      user: {
        __typename: 'User'
        id: string
        username: string
        profilePictureKey: string | null
        language: Language | null
      } | null
      bookmarkCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      commentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
    } | null> | null
    nextToken: string | null
  } | null
}

export type ListContentBookmarksByUserForProfileQueryVariables = {
  userId: string
  contentType?: ContentType | null
  limit?: number | null
  offset?: number | null
}

export type ListContentBookmarksByUserForProfileQuery = {
  listContentBookmarksByUser: Array<{
    __typename: 'ContentInteraction'
    id: string
  } | null> | null
}

export type ListUserInteractionsByUserForProfileQueryVariables = {
  actorUserId: string
  type?: UserInteractionType | null
  limit?: number | null
  offset?: number | null
}

export type ListUserInteractionsByUserForProfileQuery = {
  listUserInteractionsByActorUserId: Array<{
    __typename: 'UserInteraction'
    id: string
    targetUserId: string
  } | null> | null
}

export type ListCommentsByUserForProfileQueryVariables = {
  userId: string
  contentType?: ContentType | null
  limit?: number | null
  offset?: number | null
}

export type ListCommentsByUserForProfileQuery = {
  listContentCommentsByUser: Array<{
    __typename: 'Comment'
    id: string
    contentId: string
    contentType: ContentType
    body: string | null
  } | null> | null
}

export type ListSealedStreamsForInfoCardQueryVariables = {
  limit?: number | null
  nextToken?: string | null
}

export type ListSealedStreamsForInfoCardQuery = {
  listSealedStreams: {
    __typename: 'StreamConnection'
    items: Array<{
      __typename: 'Stream'
      id: string
      title: string | null
      body: string
      startTime: string
      isSealed: number | null
      sealTime: string | null
      user: {
        __typename: 'User'
        id: string
        username: string
        profilePictureKey: string | null
        accountStatus: string | null
        cognitoIdentityId: string | null
      } | null
      bookmarkCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      commentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
    } | null> | null
    nextToken: string | null
  } | null
}

export type ListLiveStreamsForInfoCardQueryVariables = {
  limit?: number | null
  nextToken?: string | null
}

export type ListLiveStreamsForInfoCardQuery = {
  listLiveStreams: {
    __typename: 'StreamConnection'
    items: Array<{
      __typename: 'Stream'
      id: string
      title: string | null
      body: string
      startTime: string
      isSealed: number | null
      sealTime: string | null
      user: {
        __typename: 'User'
        id: string
        username: string
        profilePictureKey: string | null
        accountStatus: string | null
        cognitoIdentityId: string | null
      } | null
      bookmarkCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      commentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
    } | null> | null
    nextToken: string | null
  } | null
}

export type ListPausedCantosForInfoCardQueryVariables = {
  limit?: number | null
  nextToken?: string | null
}

export type ListPausedCantosForInfoCardQuery = {
  listPausedCantos: {
    __typename: 'CantoConnection'
    items: Array<{
      __typename: 'Canto'
      id: string
      body: string
      startTime: string
      lastUpdateTime: string | null
      user: {
        __typename: 'User'
        id: string
        username: string
        profilePictureKey: string | null
        accountStatus: string | null
        cognitoIdentityId: string | null
      } | null
    } | null> | null
    nextToken: string | null
  } | null
}

export type ListLiveCantosForInfoCardQueryVariables = {
  limit?: number | null
  nextToken?: string | null
}

export type ListLiveCantosForInfoCardQuery = {
  listLiveCantos: {
    __typename: 'CantoConnection'
    items: Array<{
      __typename: 'Canto'
      id: string
      body: string
      startTime: string
      lastUpdateTime: string | null
      user: {
        __typename: 'User'
        id: string
        username: string
        profilePictureKey: string | null
        accountStatus: string | null
        cognitoIdentityId: string | null
      } | null
    } | null> | null
    nextToken: string | null
  } | null
}

export type SearchSiteContentQueryVariables = {
  query: string
}

export type SearchSiteContentQuery = {
  // Search
  search: Array<
    | (
        | {
            __typename: 'Stream'
            id: string
            title: string | null
            body: string
            isSealed: number | null
            user: {
              __typename: 'User'
              username: string
              profilePictureKey: string | null
              cognitoIdentityId: string | null
            } | null
          }
        | {
            __typename: 'Canto'
            id: string
            body: string
            user: {
              __typename: 'User'
              username: string
              profilePictureKey: string | null
              cognitoIdentityId: string | null
            } | null
          }
        | {
            __typename: 'User'
            id: string
            username: string
            profilePictureKey: string | null
            cognitoIdentityId: string | null
          }
      )
    | null
  > | null
}

export type GetContentBookmarkIdByUserQueryVariables = {
  userId: string
  contentType?: ContentType | null
}

export type GetContentBookmarkIdByUserQuery = {
  getContentBookmarkByUser: {
    __typename: 'ContentInteraction'
    id: string
    indices: string | null
  } | null
}

export type GetFlagIdByUserQueryVariables = {
  flaggerUserId: string
  contentType?: ContentType | null
}

export type GetFlagIdByUserQuery = {
  getFlagByUser: {
    __typename: 'Flag'
    id: string
  } | null
}

export type GetFlagByIdQueryVariables = {
  id: string
}

export type GetFlagByIdQuery = {
  // Flag
  getFlag: {
    __typename: 'Flag'
    id: string
    contentType: ContentType
    contentId: string | null
    flaggerUserId: string
    category: string
    type: string
    detail: string | null
    status: FlagApprovalStatus | null
  } | null
}

export type ListStreamCommentsQueryVariables = {
  contentId: string
  limit?: number | null
  offset?: number | null
}

export type ListStreamCommentsQuery = {
  listContentComments: Array<{
    __typename: 'Comment'
    id: string
    contentId: string
    contentType: ContentType
    userId: string
    user: {
      __typename: 'User'
      id: string
      username: string
      profilePictureKey: string | null
      accountStatus: string | null
      cognitoIdentityId: string | null
    } | null
    time: string | null
    flags: Array<{
      __typename: 'Flag'
      id: string
      contentType: ContentType
      contentId: string | null
      flaggerUserId: string
      category: string
      type: string
      detail: string | null
      createTime: string | null
    } | null> | null
  } | null> | null
}

export type GetRandomUncloggerPromptForStreamQueryVariables = {
  category?: UncloggerPromptCategory | null
  language?: Language | null
}

export type GetRandomUncloggerPromptForStreamQuery = {
  getRandomUncloggerPrompt: {
    __typename: 'UncloggerPrompt'
    id: string
    category: UncloggerPromptCategory
    body: string
    language: Language | null
    creatorUser: {
      __typename: 'User'
      username: string
    } | null
    createTime: string | null
  } | null
}

export type ListFlagsForAdminQueryVariables = {
  limit?: number | null
  offset?: number | null
  searchText?: string | null
  status?: FlagApprovalStatus | null
}

export type ListFlagsForAdminQuery = {
  listFlags: Array<{
    __typename: 'Flag'
    id: string
    contentType: ContentType
    contentId: string | null
    category: string
    type: string
    detail: string | null
    flaggerUserId: string
    createTime: string | null
    status: FlagApprovalStatus | null
    reviewTime: string | null
  } | null> | null
}

export type CountFlagsForAdminQueryVariables = {
  searchText?: string | null
  status?: FlagApprovalStatus | null
}

export type CountFlagsForAdminQuery = {
  countFlags: {
    __typename: 'ResultCount'
    count: number | null
  } | null
}

export type ListUncloggerPromptsForAdminQueryVariables = {
  limit?: number | null
  offset?: number | null
  searchText?: string | null
  status?: UncloggerPromptApprovalStatus | null
}

export type ListUncloggerPromptsForAdminQuery = {
  // UncloggerPrompt
  listUncloggerPrompts: Array<{
    __typename: 'UncloggerPrompt'
    id: string
    category: UncloggerPromptCategory
    body: string
    language: Language | null
    creatorUserId: string | null
    createTime: string | null
    status: UncloggerPromptApprovalStatus | null
    reviewTime: string | null
  } | null> | null
}

export type CountUncloggerPromptsForAdminQueryVariables = {
  searchText?: string | null
  status?: UncloggerPromptApprovalStatus | null
}

export type CountUncloggerPromptsForAdminQuery = {
  countUncloggerPrompts: {
    __typename: 'ResultCount'
    count: number | null
  } | null
}

export type UpdateUserLanguageMutationVariables = {
  userId: string
  language?: Language | null
}

export type UpdateUserLanguageMutation = {
  // User
  updateUser: {
    __typename: 'User'
    id: string
  } | null
}

export type UpdateUserThemeMutationVariables = {
  userId: string
  theme?: string | null
}

export type UpdateUserThemeMutation = {
  // User
  updateUser: {
    __typename: 'User'
    id: string
  } | null
}

export type UpdateUserCognitoIdentityIdMutationVariables = {
  userId: string
  cognitoIdentityId?: string | null
}

export type UpdateUserCognitoIdentityIdMutation = {
  // User
  updateUser: {
    __typename: 'User'
    id: string
  } | null
}

export type UpdateUserProfilePictureKeyMutationVariables = {
  userId: string
  profilePictureKey?: string | null
}

export type UpdateUserProfilePictureKeyMutation = {
  // User
  updateUser: {
    __typename: 'User'
    id: string
  } | null
}

export type UpdateUserBioMutationVariables = {
  userId: string
  bio?: string | null
}

export type UpdateUserBioMutation = {
  // User
  updateUser: {
    __typename: 'User'
    id: string
  } | null
}

export type DeleteUserByIdMutationVariables = {
  userId: string
}

export type DeleteUserByIdMutation = {
  deleteUser: {
    __typename: 'User'
    id: string
  } | null
}

export type CreateStreamBookmarkMutationVariables = {
  userId: string
  contentId: string
}

export type CreateStreamBookmarkMutation = {
  // Content interaction
  createContentInteraction: {
    __typename: 'ContentInteraction'
    id: string
  } | null
}

export type CreateCantoBookmarkMutationVariables = {
  userId: string
  contentId: string
  indices?: string | null
}

export type CreateCantoBookmarkMutation = {
  // Content interaction
  createContentInteraction: {
    __typename: 'ContentInteraction'
    id: string
  } | null
}

export type UpdateCantoBookmarkMutationVariables = {
  id: string
  indices: string
}

export type UpdateCantoBookmarkMutation = {
  updateContentInteraction: {
    __typename: 'ContentInteraction'
    id: string
  } | null
}

export type DeleteBookmarkMutationVariables = {
  id: string
}

export type DeleteBookmarkMutation = {
  deleteContentInteraction: {
    __typename: 'ContentInteraction'
    id: string
  } | null
}

export type CreateStreamFlagMutationVariables = {
  contentId?: string | null
  flaggerUserId: string
  category: string
  type: string
  detail?: string | null
}

export type CreateStreamFlagMutation = {
  // Flag
  createFlag: {
    __typename: 'Flag'
    id: string
  } | null
}

export type CreateCantoFlagMutationVariables = {
  contentId?: string | null
  flaggerUserId: string
  category: string
  type: string
  detail?: string | null
}

export type CreateCantoFlagMutation = {
  // Flag
  createFlag: {
    __typename: 'Flag'
    id: string
  } | null
}

export type UpdateContentFlagMutationVariables = {
  id: string
  category?: string | null
  type?: string | null
  detail?: string | null
}

export type UpdateContentFlagMutation = {
  updateFlagContent: {
    __typename: 'Flag'
    id: string
  } | null
}

export type DeleteFlagByIdMutationVariables = {
  id: string
}

export type DeleteFlagByIdMutation = {
  deleteFlag: {
    __typename: 'Flag'
    id: string
  } | null
}

export type CreateStreamCommentMutationVariables = {
  contentId: string
  userId: string
  body: string
}

export type CreateStreamCommentMutation = {
  // Comment
  createComment: {
    __typename: 'Comment'
    id: string
  } | null
}

export type CreateNewStreamMutationVariables = {
  id: string
  body?: string | null
  startTime: string
  sealTime?: string | null
  userId: string
}

export type CreateNewStreamMutation = {
  // Stream
  createStream: {
    __typename: 'Stream'
    id: string
  } | null
}

export type UpdateStreamTitleMutationVariables = {
  id: string
  title?: string | null
}

export type UpdateStreamTitleMutation = {
  updateStream: {
    __typename: 'Stream'
    id: string
  } | null
}

export type UpdateStreamBodyMutationVariables = {
  id: string
  body?: string | null
}

export type UpdateStreamBodyMutation = {
  updateStream: {
    __typename: 'Stream'
    id: string
  } | null
}

export type UpdateStreamUncloggerPromptIdMutationVariables = {
  id: string
  uncloggerPromptId?: string | null
}

export type UpdateStreamUncloggerPromptIdMutation = {
  updateStream: {
    __typename: 'Stream'
    id: string
  } | null
}

export type UpdateStreamTrackIdMutationVariables = {
  id: string
  trackId?: string | null
}

export type UpdateStreamTrackIdMutation = {
  updateStream: {
    __typename: 'Stream'
    id: string
  } | null
}

export type UpdateStreamMoodMutationVariables = {
  id: string
  mood?: Mood | null
}

export type UpdateStreamMoodMutation = {
  updateStream: {
    __typename: 'Stream'
    id: string
  } | null
}

export type UpdateStreamPositionMutationVariables = {
  id: string
  position?: Position | null
}

export type UpdateStreamPositionMutation = {
  updateStream: {
    __typename: 'Stream'
    id: string
  } | null
}

export type UpdateStreamAllFieldsMutationVariables = {
  id: string
  title?: string | null
  body?: string | null
  uncloggerPromptId?: string | null
  trackId?: string | null
  mood?: Mood | null
  position?: Position | null
}

export type UpdateStreamAllFieldsMutation = {
  updateStream: {
    __typename: 'Stream'
    id: string
  } | null
}

export type SealAndUpdateStreamAllFieldsMutationVariables = {
  id: string
  title?: string | null
  body?: string | null
  uncloggerPromptId?: string | null
  trackId?: string | null
  mood?: Mood | null
  position?: Position | null
  sealTime?: string | null
}

export type SealAndUpdateStreamAllFieldsMutation = {
  updateStream: {
    __typename: 'Stream'
    id: string
  } | null
}

export type CreateNewCantoMutationVariables = {
  id: string
  body?: string | null
  startTime: string
  lastUpdateTime?: string | null
}

export type CreateNewCantoMutation = {
  // Canto
  createCanto: {
    __typename: 'Canto'
    id: string
  } | null
}

export type UpdateCantoAllFieldsMutationVariables = {
  id: string
  body?: string | null
  lastUpdateTime: string
}

export type UpdateCantoAllFieldsMutation = {
  updateCanto: {
    __typename: 'Canto'
    id: string
  } | null
}

export type UpdateCantoBodyMutationVariables = {
  id: string
  body?: string | null
  lastUpdateTime: string
}

export type UpdateCantoBodyMutation = {
  updateCanto: {
    __typename: 'Canto'
    id: string
  } | null
}

export type PauseAndUpdateCantoAllFieldsMutationVariables = {
  id: string
  body?: string | null
  lastUpdateTime: string
}

export type PauseAndUpdateCantoAllFieldsMutation = {
  updateCanto: {
    __typename: 'Canto'
    id: string
  } | null
}

export type UpdateFlagReviewForAdminMutationVariables = {
  id: string
  reviewerUserId?: string | null
  status?: FlagApprovalStatus | null
  reviewNote?: string | null
}

export type UpdateFlagReviewForAdminMutation = {
  updateFlagReview: {
    __typename: 'Flag'
    id: string
  } | null
}

export type UpdateFlagContentForAdminMutationVariables = {
  id: string
  category?: string | null
  type?: string | null
  detail?: string | null
}

export type UpdateFlagContentForAdminMutation = {
  updateFlagContent: {
    __typename: 'Flag'
    id: string
  } | null
}

export type UpdateUncloggerPromptReviewForAdminMutationVariables = {
  id: string
  reviewerUserId?: string | null
  status?: UncloggerPromptApprovalStatus | null
  reviewNote?: string | null
}

export type UpdateUncloggerPromptReviewForAdminMutation = {
  updateUncloggerPromptReview: {
    __typename: 'UncloggerPrompt'
    id: string
  } | null
}

export type UpdateUncloggerPromptContentForAdminMutationVariables = {
  id: string
  category?: UncloggerPromptCategory | null
  body?: string | null
  language?: Language | null
}

export type UpdateUncloggerPromptContentForAdminMutation = {
  updateUncloggerPromptContent: {
    __typename: 'UncloggerPrompt'
    id: string
  } | null
}

export type OnUpdateCantoByIdSubscriptionVariables = {
  id: string
}

export type OnUpdateCantoByIdSubscription = {
  onUpdateCanto: {
    __typename: 'Canto'
    id: string
    body: string
    startTime: string
    lastUpdateTime: string | null
    isPaused: number | null
    bookmarks: Array<{
      __typename: 'ContentInteraction'
      id: string
      contentType: ContentType
      contentId: string
      userId: string
      indices: string | null
      time: string | null
    } | null> | null
  } | null
}

export type OnUpdateStreamByIdSubscriptionVariables = {
  id: string
}

export type OnUpdateStreamByIdSubscription = {
  onUpdateStream: {
    __typename: 'Stream'
    id: string
    title: string | null
    body: string
    startTime: string
    sealTime: string | null
    isSealed: number | null
    bookmarks: Array<{
      __typename: 'ContentInteraction'
      id: string
      contentType: ContentType
      contentId: string
      userId: string
      indices: string | null
      time: string | null
    } | null> | null
  } | null
}

export type UpdateUserMutationVariables = {
  input: UpdateUserInput
}

export type UpdateUserMutation = {
  // User
  updateUser: {
    __typename: 'User'
    id: string
    username: string
    email: string | null
    preferredName: string | null
    accountStatus: string | null
    allowDirectMessages: boolean | null
    theme: string | null
    bio: string | null
    birthDate: string
    cognitoIdentityId: string | null
    createdAt: string | null
    lastAccess: string | null
    location: string | null
    language: Language | null
    profilePictureKey: string | null
    site: string | null
    canto: {
      __typename: 'Canto'
      id: string
      body: string
      user: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      isPaused: number | null
      startTime: string
      lastUpdateTime: string | null
      bookmarkCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarks: Array<{
        __typename: 'ContentInteraction'
        id: string
        userId: string
        interactionType: ContentInteractionType
        contentType: ContentType
        contentId: string
        indices: string | null
        time: string | null
      } | null> | null
      flagCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      flags: Array<{
        __typename: 'Flag'
        id: string
        contentType: ContentType
        contentId: string | null
        flaggerUserId: string
        category: string
        type: string
        detail: string | null
        reviewerUserId: string | null
        status: FlagApprovalStatus | null
        reviewNote: string | null
        createTime: string | null
        reviewTime: string | null
        lastUpdateTime: string | null
      } | null> | null
    } | null
    streams: {
      __typename: 'StreamConnection'
      items: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      nextToken: string | null
    } | null
    userWatchInteractions: Array<{
      __typename: 'UserInteraction'
      id: string
      actorUserId: string
      actorUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      targetUserId: string
      targetUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      interactionType: UserInteractionType | null
      lastChangeTime: string
    } | null> | null
    userBlockInteractions: Array<{
      __typename: 'UserInteraction'
      id: string
      actorUserId: string
      actorUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      targetUserId: string
      targetUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      interactionType: UserInteractionType | null
      lastChangeTime: string
    } | null> | null
    committedStreamCommentCount: {
      __typename: 'ResultCount'
      count: number | null
    } | null
    committedStreamComments: Array<{
      __typename: 'Comment'
      id: string
      userId: string
      user: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      body: string | null
      contentType: ContentType
      contentId: string
      flagCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      flags: Array<{
        __typename: 'Flag'
        id: string
        contentType: ContentType
        contentId: string | null
        flaggerUserId: string
        category: string
        type: string
        detail: string | null
        reviewerUserId: string | null
        status: FlagApprovalStatus | null
        reviewNote: string | null
        createTime: string | null
        reviewTime: string | null
        lastUpdateTime: string | null
      } | null> | null
      time: string | null
    } | null> | null
    bookmarkedStreamCount: {
      __typename: 'ResultCount'
      count: number | null
    } | null
    bookmarkedStreams: Array<{
      __typename: 'Stream'
      id: string
      title: string | null
      body: string
      userId: string
      user: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      isSealed: number | null
      location: string | null
      mood: Mood | null
      position: Position | null
      startTime: string
      sealTime: string | null
      trackId: string | null
      uncloggerPromptId: string | null
      uncloggerPrompt: {
        __typename: 'UncloggerPrompt'
        id: string
        category: UncloggerPromptCategory
        body: string
        language: Language | null
        status: UncloggerPromptApprovalStatus | null
        creatorUserId: string | null
        createTime: string | null
        reviewerUserId: string | null
        reviewNote: string | null
        reviewTime: string | null
      } | null
      bookmarkCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarks: Array<{
        __typename: 'ContentInteraction'
        id: string
        userId: string
        interactionType: ContentInteractionType
        contentType: ContentType
        contentId: string
        indices: string | null
        time: string | null
      } | null> | null
      commentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      comments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      flagCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      flags: Array<{
        __typename: 'Flag'
        id: string
        contentType: ContentType
        contentId: string | null
        flaggerUserId: string
        category: string
        type: string
        detail: string | null
        reviewerUserId: string | null
        status: FlagApprovalStatus | null
        reviewNote: string | null
        createTime: string | null
        reviewTime: string | null
        lastUpdateTime: string | null
      } | null> | null
    } | null> | null
    bookmarkedCantoCount: {
      __typename: 'ResultCount'
      count: number | null
    } | null
    bookmarkedCantos: Array<{
      __typename: 'Canto'
      id: string
      body: string
      user: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      isPaused: number | null
      startTime: string
      lastUpdateTime: string | null
      bookmarkCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarks: Array<{
        __typename: 'ContentInteraction'
        id: string
        userId: string
        interactionType: ContentInteractionType
        contentType: ContentType
        contentId: string
        indices: string | null
        time: string | null
      } | null> | null
      flagCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      flags: Array<{
        __typename: 'Flag'
        id: string
        contentType: ContentType
        contentId: string | null
        flaggerUserId: string
        category: string
        type: string
        detail: string | null
        reviewerUserId: string | null
        status: FlagApprovalStatus | null
        reviewNote: string | null
        createTime: string | null
        reviewTime: string | null
        lastUpdateTime: string | null
      } | null> | null
    } | null> | null
  } | null
}

export type DeleteUserMutationVariables = {
  input: DeleteUserInput
}

export type DeleteUserMutation = {
  deleteUser: {
    __typename: 'User'
    id: string
    username: string
    email: string | null
    preferredName: string | null
    accountStatus: string | null
    allowDirectMessages: boolean | null
    theme: string | null
    bio: string | null
    birthDate: string
    cognitoIdentityId: string | null
    createdAt: string | null
    lastAccess: string | null
    location: string | null
    language: Language | null
    profilePictureKey: string | null
    site: string | null
    canto: {
      __typename: 'Canto'
      id: string
      body: string
      user: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      isPaused: number | null
      startTime: string
      lastUpdateTime: string | null
      bookmarkCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarks: Array<{
        __typename: 'ContentInteraction'
        id: string
        userId: string
        interactionType: ContentInteractionType
        contentType: ContentType
        contentId: string
        indices: string | null
        time: string | null
      } | null> | null
      flagCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      flags: Array<{
        __typename: 'Flag'
        id: string
        contentType: ContentType
        contentId: string | null
        flaggerUserId: string
        category: string
        type: string
        detail: string | null
        reviewerUserId: string | null
        status: FlagApprovalStatus | null
        reviewNote: string | null
        createTime: string | null
        reviewTime: string | null
        lastUpdateTime: string | null
      } | null> | null
    } | null
    streams: {
      __typename: 'StreamConnection'
      items: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      nextToken: string | null
    } | null
    userWatchInteractions: Array<{
      __typename: 'UserInteraction'
      id: string
      actorUserId: string
      actorUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      targetUserId: string
      targetUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      interactionType: UserInteractionType | null
      lastChangeTime: string
    } | null> | null
    userBlockInteractions: Array<{
      __typename: 'UserInteraction'
      id: string
      actorUserId: string
      actorUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      targetUserId: string
      targetUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      interactionType: UserInteractionType | null
      lastChangeTime: string
    } | null> | null
    committedStreamCommentCount: {
      __typename: 'ResultCount'
      count: number | null
    } | null
    committedStreamComments: Array<{
      __typename: 'Comment'
      id: string
      userId: string
      user: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      body: string | null
      contentType: ContentType
      contentId: string
      flagCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      flags: Array<{
        __typename: 'Flag'
        id: string
        contentType: ContentType
        contentId: string | null
        flaggerUserId: string
        category: string
        type: string
        detail: string | null
        reviewerUserId: string | null
        status: FlagApprovalStatus | null
        reviewNote: string | null
        createTime: string | null
        reviewTime: string | null
        lastUpdateTime: string | null
      } | null> | null
      time: string | null
    } | null> | null
    bookmarkedStreamCount: {
      __typename: 'ResultCount'
      count: number | null
    } | null
    bookmarkedStreams: Array<{
      __typename: 'Stream'
      id: string
      title: string | null
      body: string
      userId: string
      user: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      isSealed: number | null
      location: string | null
      mood: Mood | null
      position: Position | null
      startTime: string
      sealTime: string | null
      trackId: string | null
      uncloggerPromptId: string | null
      uncloggerPrompt: {
        __typename: 'UncloggerPrompt'
        id: string
        category: UncloggerPromptCategory
        body: string
        language: Language | null
        status: UncloggerPromptApprovalStatus | null
        creatorUserId: string | null
        createTime: string | null
        reviewerUserId: string | null
        reviewNote: string | null
        reviewTime: string | null
      } | null
      bookmarkCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarks: Array<{
        __typename: 'ContentInteraction'
        id: string
        userId: string
        interactionType: ContentInteractionType
        contentType: ContentType
        contentId: string
        indices: string | null
        time: string | null
      } | null> | null
      commentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      comments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      flagCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      flags: Array<{
        __typename: 'Flag'
        id: string
        contentType: ContentType
        contentId: string | null
        flaggerUserId: string
        category: string
        type: string
        detail: string | null
        reviewerUserId: string | null
        status: FlagApprovalStatus | null
        reviewNote: string | null
        createTime: string | null
        reviewTime: string | null
        lastUpdateTime: string | null
      } | null> | null
    } | null> | null
    bookmarkedCantoCount: {
      __typename: 'ResultCount'
      count: number | null
    } | null
    bookmarkedCantos: Array<{
      __typename: 'Canto'
      id: string
      body: string
      user: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      isPaused: number | null
      startTime: string
      lastUpdateTime: string | null
      bookmarkCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarks: Array<{
        __typename: 'ContentInteraction'
        id: string
        userId: string
        interactionType: ContentInteractionType
        contentType: ContentType
        contentId: string
        indices: string | null
        time: string | null
      } | null> | null
      flagCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      flags: Array<{
        __typename: 'Flag'
        id: string
        contentType: ContentType
        contentId: string | null
        flaggerUserId: string
        category: string
        type: string
        detail: string | null
        reviewerUserId: string | null
        status: FlagApprovalStatus | null
        reviewNote: string | null
        createTime: string | null
        reviewTime: string | null
        lastUpdateTime: string | null
      } | null> | null
    } | null> | null
  } | null
}

export type CreateStreamMutationVariables = {
  input: CreateStreamInput
}

export type CreateStreamMutation = {
  // Stream
  createStream: {
    __typename: 'Stream'
    id: string
    title: string | null
    body: string
    userId: string
    user: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    isSealed: number | null
    location: string | null
    mood: Mood | null
    position: Position | null
    startTime: string
    sealTime: string | null
    trackId: string | null
    uncloggerPromptId: string | null
    uncloggerPrompt: {
      __typename: 'UncloggerPrompt'
      id: string
      category: UncloggerPromptCategory
      body: string
      language: Language | null
      status: UncloggerPromptApprovalStatus | null
      creatorUserId: string | null
      creatorUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      createTime: string | null
      reviewerUserId: string | null
      reviewerUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      reviewNote: string | null
      reviewTime: string | null
    } | null
    bookmarkCount: {
      __typename: 'ResultCount'
      count: number | null
    } | null
    bookmarks: Array<{
      __typename: 'ContentInteraction'
      id: string
      userId: string
      user: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      interactionType: ContentInteractionType
      contentType: ContentType
      contentId: string
      indices: string | null
      time: string | null
    } | null> | null
    commentCount: {
      __typename: 'ResultCount'
      count: number | null
    } | null
    comments: Array<{
      __typename: 'Comment'
      id: string
      userId: string
      user: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      body: string | null
      contentType: ContentType
      contentId: string
      flagCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      flags: Array<{
        __typename: 'Flag'
        id: string
        contentType: ContentType
        contentId: string | null
        flaggerUserId: string
        category: string
        type: string
        detail: string | null
        reviewerUserId: string | null
        status: FlagApprovalStatus | null
        reviewNote: string | null
        createTime: string | null
        reviewTime: string | null
        lastUpdateTime: string | null
      } | null> | null
      time: string | null
    } | null> | null
    flagCount: {
      __typename: 'ResultCount'
      count: number | null
    } | null
    flags: Array<{
      __typename: 'Flag'
      id: string
      contentType: ContentType
      contentId: string | null
      flaggerUserId: string
      flaggerUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      category: string
      type: string
      detail: string | null
      reviewerUserId: string | null
      reviewerUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      status: FlagApprovalStatus | null
      reviewNote: string | null
      createTime: string | null
      reviewTime: string | null
      lastUpdateTime: string | null
    } | null> | null
  } | null
}

export type UpdateStreamMutationVariables = {
  input: UpdateStreamInput
}

export type UpdateStreamMutation = {
  updateStream: {
    __typename: 'Stream'
    id: string
    title: string | null
    body: string
    userId: string
    user: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    isSealed: number | null
    location: string | null
    mood: Mood | null
    position: Position | null
    startTime: string
    sealTime: string | null
    trackId: string | null
    uncloggerPromptId: string | null
    uncloggerPrompt: {
      __typename: 'UncloggerPrompt'
      id: string
      category: UncloggerPromptCategory
      body: string
      language: Language | null
      status: UncloggerPromptApprovalStatus | null
      creatorUserId: string | null
      creatorUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      createTime: string | null
      reviewerUserId: string | null
      reviewerUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      reviewNote: string | null
      reviewTime: string | null
    } | null
    bookmarkCount: {
      __typename: 'ResultCount'
      count: number | null
    } | null
    bookmarks: Array<{
      __typename: 'ContentInteraction'
      id: string
      userId: string
      user: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      interactionType: ContentInteractionType
      contentType: ContentType
      contentId: string
      indices: string | null
      time: string | null
    } | null> | null
    commentCount: {
      __typename: 'ResultCount'
      count: number | null
    } | null
    comments: Array<{
      __typename: 'Comment'
      id: string
      userId: string
      user: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      body: string | null
      contentType: ContentType
      contentId: string
      flagCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      flags: Array<{
        __typename: 'Flag'
        id: string
        contentType: ContentType
        contentId: string | null
        flaggerUserId: string
        category: string
        type: string
        detail: string | null
        reviewerUserId: string | null
        status: FlagApprovalStatus | null
        reviewNote: string | null
        createTime: string | null
        reviewTime: string | null
        lastUpdateTime: string | null
      } | null> | null
      time: string | null
    } | null> | null
    flagCount: {
      __typename: 'ResultCount'
      count: number | null
    } | null
    flags: Array<{
      __typename: 'Flag'
      id: string
      contentType: ContentType
      contentId: string | null
      flaggerUserId: string
      flaggerUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      category: string
      type: string
      detail: string | null
      reviewerUserId: string | null
      reviewerUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      status: FlagApprovalStatus | null
      reviewNote: string | null
      createTime: string | null
      reviewTime: string | null
      lastUpdateTime: string | null
    } | null> | null
  } | null
}

export type CreateCantoMutationVariables = {
  input: CreateCantoInput
}

export type CreateCantoMutation = {
  // Canto
  createCanto: {
    __typename: 'Canto'
    id: string
    body: string
    user: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    isPaused: number | null
    startTime: string
    lastUpdateTime: string | null
    bookmarkCount: {
      __typename: 'ResultCount'
      count: number | null
    } | null
    bookmarks: Array<{
      __typename: 'ContentInteraction'
      id: string
      userId: string
      user: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      interactionType: ContentInteractionType
      contentType: ContentType
      contentId: string
      indices: string | null
      time: string | null
    } | null> | null
    flagCount: {
      __typename: 'ResultCount'
      count: number | null
    } | null
    flags: Array<{
      __typename: 'Flag'
      id: string
      contentType: ContentType
      contentId: string | null
      flaggerUserId: string
      flaggerUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      category: string
      type: string
      detail: string | null
      reviewerUserId: string | null
      reviewerUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      status: FlagApprovalStatus | null
      reviewNote: string | null
      createTime: string | null
      reviewTime: string | null
      lastUpdateTime: string | null
    } | null> | null
  } | null
}

export type UpdateCantoMutationVariables = {
  input: UpdateCantoInput
}

export type UpdateCantoMutation = {
  updateCanto: {
    __typename: 'Canto'
    id: string
    body: string
    user: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    isPaused: number | null
    startTime: string
    lastUpdateTime: string | null
    bookmarkCount: {
      __typename: 'ResultCount'
      count: number | null
    } | null
    bookmarks: Array<{
      __typename: 'ContentInteraction'
      id: string
      userId: string
      user: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      interactionType: ContentInteractionType
      contentType: ContentType
      contentId: string
      indices: string | null
      time: string | null
    } | null> | null
    flagCount: {
      __typename: 'ResultCount'
      count: number | null
    } | null
    flags: Array<{
      __typename: 'Flag'
      id: string
      contentType: ContentType
      contentId: string | null
      flaggerUserId: string
      flaggerUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      category: string
      type: string
      detail: string | null
      reviewerUserId: string | null
      reviewerUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      status: FlagApprovalStatus | null
      reviewNote: string | null
      createTime: string | null
      reviewTime: string | null
      lastUpdateTime: string | null
    } | null> | null
  } | null
}

export type CreateUserInteractionMutationVariables = {
  input: CreateUserInteractionInput
}

export type CreateUserInteractionMutation = {
  // User interaction
  createUserInteraction: {
    __typename: 'UserInteraction'
    id: string
    actorUserId: string
    actorUser: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    targetUserId: string
    targetUser: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    interactionType: UserInteractionType | null
    lastChangeTime: string
  } | null
}

export type DeleteUserInteractionMutationVariables = {
  input: DeleteUserInteractionInput
}

export type DeleteUserInteractionMutation = {
  deleteUserInteraction: {
    __typename: 'UserInteraction'
    id: string
    actorUserId: string
    actorUser: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    targetUserId: string
    targetUser: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    interactionType: UserInteractionType | null
    lastChangeTime: string
  } | null
}

export type CreateContentInteractionMutationVariables = {
  input: CreateContentInteractionInput
}

export type CreateContentInteractionMutation = {
  // Content interaction
  createContentInteraction: {
    __typename: 'ContentInteraction'
    id: string
    userId: string
    user: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    interactionType: ContentInteractionType
    contentType: ContentType
    contentId: string
    indices: string | null
    time: string | null
  } | null
}

export type UpdateContentInteractionMutationVariables = {
  input?: UpdateContentInteractionInput | null
}

export type UpdateContentInteractionMutation = {
  updateContentInteraction: {
    __typename: 'ContentInteraction'
    id: string
    userId: string
    user: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    interactionType: ContentInteractionType
    contentType: ContentType
    contentId: string
    indices: string | null
    time: string | null
  } | null
}

export type DeleteContentInteractionMutationVariables = {
  input: DeleteContentInteractionInput
}

export type DeleteContentInteractionMutation = {
  deleteContentInteraction: {
    __typename: 'ContentInteraction'
    id: string
    userId: string
    user: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    interactionType: ContentInteractionType
    contentType: ContentType
    contentId: string
    indices: string | null
    time: string | null
  } | null
}

export type CreateCommentMutationVariables = {
  input: CreateCommentInput
}

export type CreateCommentMutation = {
  // Comment
  createComment: {
    __typename: 'Comment'
    id: string
    userId: string
    user: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    body: string | null
    contentType: ContentType
    contentId: string
    flagCount: {
      __typename: 'ResultCount'
      count: number | null
    } | null
    flags: Array<{
      __typename: 'Flag'
      id: string
      contentType: ContentType
      contentId: string | null
      flaggerUserId: string
      flaggerUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      category: string
      type: string
      detail: string | null
      reviewerUserId: string | null
      reviewerUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      status: FlagApprovalStatus | null
      reviewNote: string | null
      createTime: string | null
      reviewTime: string | null
      lastUpdateTime: string | null
    } | null> | null
    time: string | null
  } | null
}

export type CreateFlagMutationVariables = {
  input: CreateFlagInput
}

export type CreateFlagMutation = {
  // Flag
  createFlag: {
    __typename: 'Flag'
    id: string
    contentType: ContentType
    contentId: string | null
    flaggerUserId: string
    flaggerUser: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    category: string
    type: string
    detail: string | null
    reviewerUserId: string | null
    reviewerUser: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    status: FlagApprovalStatus | null
    reviewNote: string | null
    createTime: string | null
    reviewTime: string | null
    lastUpdateTime: string | null
  } | null
}

export type UpdateFlagContentMutationVariables = {
  input?: UpdateFlagContentInput | null
}

export type UpdateFlagContentMutation = {
  updateFlagContent: {
    __typename: 'Flag'
    id: string
    contentType: ContentType
    contentId: string | null
    flaggerUserId: string
    flaggerUser: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    category: string
    type: string
    detail: string | null
    reviewerUserId: string | null
    reviewerUser: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    status: FlagApprovalStatus | null
    reviewNote: string | null
    createTime: string | null
    reviewTime: string | null
    lastUpdateTime: string | null
  } | null
}

export type UpdateFlagReviewMutationVariables = {
  input?: UpdateFlagReviewInput | null
}

export type UpdateFlagReviewMutation = {
  updateFlagReview: {
    __typename: 'Flag'
    id: string
    contentType: ContentType
    contentId: string | null
    flaggerUserId: string
    flaggerUser: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    category: string
    type: string
    detail: string | null
    reviewerUserId: string | null
    reviewerUser: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    status: FlagApprovalStatus | null
    reviewNote: string | null
    createTime: string | null
    reviewTime: string | null
    lastUpdateTime: string | null
  } | null
}

export type DeleteFlagMutationVariables = {
  input: DeleteFlagInput
}

export type DeleteFlagMutation = {
  deleteFlag: {
    __typename: 'Flag'
    id: string
    contentType: ContentType
    contentId: string | null
    flaggerUserId: string
    flaggerUser: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    category: string
    type: string
    detail: string | null
    reviewerUserId: string | null
    reviewerUser: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    status: FlagApprovalStatus | null
    reviewNote: string | null
    createTime: string | null
    reviewTime: string | null
    lastUpdateTime: string | null
  } | null
}

export type CreateUncloggerPromptMutationVariables = {
  input: CreateUncloggerPromptInput
}

export type CreateUncloggerPromptMutation = {
  // UncloggerPrompt
  createUncloggerPrompt: {
    __typename: 'UncloggerPrompt'
    id: string
    category: UncloggerPromptCategory
    body: string
    language: Language | null
    status: UncloggerPromptApprovalStatus | null
    creatorUserId: string | null
    creatorUser: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    createTime: string | null
    reviewerUserId: string | null
    reviewerUser: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    reviewNote: string | null
    reviewTime: string | null
  } | null
}

export type UpdateUncloggerPromptContentMutationVariables = {
  input: UpdateUncloggerPromptContentInput
}

export type UpdateUncloggerPromptContentMutation = {
  updateUncloggerPromptContent: {
    __typename: 'UncloggerPrompt'
    id: string
    category: UncloggerPromptCategory
    body: string
    language: Language | null
    status: UncloggerPromptApprovalStatus | null
    creatorUserId: string | null
    creatorUser: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    createTime: string | null
    reviewerUserId: string | null
    reviewerUser: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    reviewNote: string | null
    reviewTime: string | null
  } | null
}

export type UpdateUncloggerPromptReviewMutationVariables = {
  input: UpdateUncloggerPromptReviewInput
}

export type UpdateUncloggerPromptReviewMutation = {
  updateUncloggerPromptReview: {
    __typename: 'UncloggerPrompt'
    id: string
    category: UncloggerPromptCategory
    body: string
    language: Language | null
    status: UncloggerPromptApprovalStatus | null
    creatorUserId: string | null
    creatorUser: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    createTime: string | null
    reviewerUserId: string | null
    reviewerUser: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    reviewNote: string | null
    reviewTime: string | null
  } | null
}

export type DeleteUncloggerPromptMutationVariables = {
  input: DeleteUncloggerPromptInput
}

export type DeleteUncloggerPromptMutation = {
  deleteUncloggerPrompt: {
    __typename: 'UncloggerPrompt'
    id: string
    category: UncloggerPromptCategory
    body: string
    language: Language | null
    status: UncloggerPromptApprovalStatus | null
    creatorUserId: string | null
    creatorUser: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    createTime: string | null
    reviewerUserId: string | null
    reviewerUser: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    reviewNote: string | null
    reviewTime: string | null
  } | null
}

export type GetUserByUsernameQueryVariables = {
  username: string
}

export type GetUserByUsernameQuery = {
  // User
  getUserByUsername: {
    __typename: 'User'
    id: string
    username: string
    email: string | null
    preferredName: string | null
    accountStatus: string | null
    allowDirectMessages: boolean | null
    theme: string | null
    bio: string | null
    birthDate: string
    cognitoIdentityId: string | null
    createdAt: string | null
    lastAccess: string | null
    location: string | null
    language: Language | null
    profilePictureKey: string | null
    site: string | null
    canto: {
      __typename: 'Canto'
      id: string
      body: string
      user: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      isPaused: number | null
      startTime: string
      lastUpdateTime: string | null
      bookmarkCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarks: Array<{
        __typename: 'ContentInteraction'
        id: string
        userId: string
        interactionType: ContentInteractionType
        contentType: ContentType
        contentId: string
        indices: string | null
        time: string | null
      } | null> | null
      flagCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      flags: Array<{
        __typename: 'Flag'
        id: string
        contentType: ContentType
        contentId: string | null
        flaggerUserId: string
        category: string
        type: string
        detail: string | null
        reviewerUserId: string | null
        status: FlagApprovalStatus | null
        reviewNote: string | null
        createTime: string | null
        reviewTime: string | null
        lastUpdateTime: string | null
      } | null> | null
    } | null
    streams: {
      __typename: 'StreamConnection'
      items: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      nextToken: string | null
    } | null
    userWatchInteractions: Array<{
      __typename: 'UserInteraction'
      id: string
      actorUserId: string
      actorUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      targetUserId: string
      targetUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      interactionType: UserInteractionType | null
      lastChangeTime: string
    } | null> | null
    userBlockInteractions: Array<{
      __typename: 'UserInteraction'
      id: string
      actorUserId: string
      actorUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      targetUserId: string
      targetUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      interactionType: UserInteractionType | null
      lastChangeTime: string
    } | null> | null
    committedStreamCommentCount: {
      __typename: 'ResultCount'
      count: number | null
    } | null
    committedStreamComments: Array<{
      __typename: 'Comment'
      id: string
      userId: string
      user: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      body: string | null
      contentType: ContentType
      contentId: string
      flagCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      flags: Array<{
        __typename: 'Flag'
        id: string
        contentType: ContentType
        contentId: string | null
        flaggerUserId: string
        category: string
        type: string
        detail: string | null
        reviewerUserId: string | null
        status: FlagApprovalStatus | null
        reviewNote: string | null
        createTime: string | null
        reviewTime: string | null
        lastUpdateTime: string | null
      } | null> | null
      time: string | null
    } | null> | null
    bookmarkedStreamCount: {
      __typename: 'ResultCount'
      count: number | null
    } | null
    bookmarkedStreams: Array<{
      __typename: 'Stream'
      id: string
      title: string | null
      body: string
      userId: string
      user: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      isSealed: number | null
      location: string | null
      mood: Mood | null
      position: Position | null
      startTime: string
      sealTime: string | null
      trackId: string | null
      uncloggerPromptId: string | null
      uncloggerPrompt: {
        __typename: 'UncloggerPrompt'
        id: string
        category: UncloggerPromptCategory
        body: string
        language: Language | null
        status: UncloggerPromptApprovalStatus | null
        creatorUserId: string | null
        createTime: string | null
        reviewerUserId: string | null
        reviewNote: string | null
        reviewTime: string | null
      } | null
      bookmarkCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarks: Array<{
        __typename: 'ContentInteraction'
        id: string
        userId: string
        interactionType: ContentInteractionType
        contentType: ContentType
        contentId: string
        indices: string | null
        time: string | null
      } | null> | null
      commentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      comments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      flagCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      flags: Array<{
        __typename: 'Flag'
        id: string
        contentType: ContentType
        contentId: string | null
        flaggerUserId: string
        category: string
        type: string
        detail: string | null
        reviewerUserId: string | null
        status: FlagApprovalStatus | null
        reviewNote: string | null
        createTime: string | null
        reviewTime: string | null
        lastUpdateTime: string | null
      } | null> | null
    } | null> | null
    bookmarkedCantoCount: {
      __typename: 'ResultCount'
      count: number | null
    } | null
    bookmarkedCantos: Array<{
      __typename: 'Canto'
      id: string
      body: string
      user: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      isPaused: number | null
      startTime: string
      lastUpdateTime: string | null
      bookmarkCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarks: Array<{
        __typename: 'ContentInteraction'
        id: string
        userId: string
        interactionType: ContentInteractionType
        contentType: ContentType
        contentId: string
        indices: string | null
        time: string | null
      } | null> | null
      flagCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      flags: Array<{
        __typename: 'Flag'
        id: string
        contentType: ContentType
        contentId: string | null
        flaggerUserId: string
        category: string
        type: string
        detail: string | null
        reviewerUserId: string | null
        status: FlagApprovalStatus | null
        reviewNote: string | null
        createTime: string | null
        reviewTime: string | null
        lastUpdateTime: string | null
      } | null> | null
    } | null> | null
  } | null
}

export type GetStreamQueryVariables = {
  id: string
}

export type GetStreamQuery = {
  // Stream
  getStream: {
    __typename: 'Stream'
    id: string
    title: string | null
    body: string
    userId: string
    user: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    isSealed: number | null
    location: string | null
    mood: Mood | null
    position: Position | null
    startTime: string
    sealTime: string | null
    trackId: string | null
    uncloggerPromptId: string | null
    uncloggerPrompt: {
      __typename: 'UncloggerPrompt'
      id: string
      category: UncloggerPromptCategory
      body: string
      language: Language | null
      status: UncloggerPromptApprovalStatus | null
      creatorUserId: string | null
      creatorUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      createTime: string | null
      reviewerUserId: string | null
      reviewerUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      reviewNote: string | null
      reviewTime: string | null
    } | null
    bookmarkCount: {
      __typename: 'ResultCount'
      count: number | null
    } | null
    bookmarks: Array<{
      __typename: 'ContentInteraction'
      id: string
      userId: string
      user: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      interactionType: ContentInteractionType
      contentType: ContentType
      contentId: string
      indices: string | null
      time: string | null
    } | null> | null
    commentCount: {
      __typename: 'ResultCount'
      count: number | null
    } | null
    comments: Array<{
      __typename: 'Comment'
      id: string
      userId: string
      user: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      body: string | null
      contentType: ContentType
      contentId: string
      flagCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      flags: Array<{
        __typename: 'Flag'
        id: string
        contentType: ContentType
        contentId: string | null
        flaggerUserId: string
        category: string
        type: string
        detail: string | null
        reviewerUserId: string | null
        status: FlagApprovalStatus | null
        reviewNote: string | null
        createTime: string | null
        reviewTime: string | null
        lastUpdateTime: string | null
      } | null> | null
      time: string | null
    } | null> | null
    flagCount: {
      __typename: 'ResultCount'
      count: number | null
    } | null
    flags: Array<{
      __typename: 'Flag'
      id: string
      contentType: ContentType
      contentId: string | null
      flaggerUserId: string
      flaggerUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      category: string
      type: string
      detail: string | null
      reviewerUserId: string | null
      reviewerUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      status: FlagApprovalStatus | null
      reviewNote: string | null
      createTime: string | null
      reviewTime: string | null
      lastUpdateTime: string | null
    } | null> | null
  } | null
}

export type ListStreamsByUserQueryVariables = {
  first?: number | null
  after?: string | null
  userId: string
}

export type ListStreamsByUserQuery = {
  listStreamsByUser: {
    __typename: 'StreamConnection'
    items: Array<{
      __typename: 'Stream'
      id: string
      title: string | null
      body: string
      userId: string
      user: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      isSealed: number | null
      location: string | null
      mood: Mood | null
      position: Position | null
      startTime: string
      sealTime: string | null
      trackId: string | null
      uncloggerPromptId: string | null
      uncloggerPrompt: {
        __typename: 'UncloggerPrompt'
        id: string
        category: UncloggerPromptCategory
        body: string
        language: Language | null
        status: UncloggerPromptApprovalStatus | null
        creatorUserId: string | null
        createTime: string | null
        reviewerUserId: string | null
        reviewNote: string | null
        reviewTime: string | null
      } | null
      bookmarkCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarks: Array<{
        __typename: 'ContentInteraction'
        id: string
        userId: string
        interactionType: ContentInteractionType
        contentType: ContentType
        contentId: string
        indices: string | null
        time: string | null
      } | null> | null
      commentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      comments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      flagCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      flags: Array<{
        __typename: 'Flag'
        id: string
        contentType: ContentType
        contentId: string | null
        flaggerUserId: string
        category: string
        type: string
        detail: string | null
        reviewerUserId: string | null
        status: FlagApprovalStatus | null
        reviewNote: string | null
        createTime: string | null
        reviewTime: string | null
        lastUpdateTime: string | null
      } | null> | null
    } | null> | null
    nextToken: string | null
  } | null
}

export type ListSealedStreamsQueryVariables = {
  first?: number | null
  after?: string | null
}

export type ListSealedStreamsQuery = {
  listSealedStreams: {
    __typename: 'StreamConnection'
    items: Array<{
      __typename: 'Stream'
      id: string
      title: string | null
      body: string
      userId: string
      user: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      isSealed: number | null
      location: string | null
      mood: Mood | null
      position: Position | null
      startTime: string
      sealTime: string | null
      trackId: string | null
      uncloggerPromptId: string | null
      uncloggerPrompt: {
        __typename: 'UncloggerPrompt'
        id: string
        category: UncloggerPromptCategory
        body: string
        language: Language | null
        status: UncloggerPromptApprovalStatus | null
        creatorUserId: string | null
        createTime: string | null
        reviewerUserId: string | null
        reviewNote: string | null
        reviewTime: string | null
      } | null
      bookmarkCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarks: Array<{
        __typename: 'ContentInteraction'
        id: string
        userId: string
        interactionType: ContentInteractionType
        contentType: ContentType
        contentId: string
        indices: string | null
        time: string | null
      } | null> | null
      commentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      comments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      flagCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      flags: Array<{
        __typename: 'Flag'
        id: string
        contentType: ContentType
        contentId: string | null
        flaggerUserId: string
        category: string
        type: string
        detail: string | null
        reviewerUserId: string | null
        status: FlagApprovalStatus | null
        reviewNote: string | null
        createTime: string | null
        reviewTime: string | null
        lastUpdateTime: string | null
      } | null> | null
    } | null> | null
    nextToken: string | null
  } | null
}

export type ListLiveStreamsQueryVariables = {
  first?: number | null
  after?: string | null
}

export type ListLiveStreamsQuery = {
  listLiveStreams: {
    __typename: 'StreamConnection'
    items: Array<{
      __typename: 'Stream'
      id: string
      title: string | null
      body: string
      userId: string
      user: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      isSealed: number | null
      location: string | null
      mood: Mood | null
      position: Position | null
      startTime: string
      sealTime: string | null
      trackId: string | null
      uncloggerPromptId: string | null
      uncloggerPrompt: {
        __typename: 'UncloggerPrompt'
        id: string
        category: UncloggerPromptCategory
        body: string
        language: Language | null
        status: UncloggerPromptApprovalStatus | null
        creatorUserId: string | null
        createTime: string | null
        reviewerUserId: string | null
        reviewNote: string | null
        reviewTime: string | null
      } | null
      bookmarkCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarks: Array<{
        __typename: 'ContentInteraction'
        id: string
        userId: string
        interactionType: ContentInteractionType
        contentType: ContentType
        contentId: string
        indices: string | null
        time: string | null
      } | null> | null
      commentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      comments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      flagCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      flags: Array<{
        __typename: 'Flag'
        id: string
        contentType: ContentType
        contentId: string | null
        flaggerUserId: string
        category: string
        type: string
        detail: string | null
        reviewerUserId: string | null
        status: FlagApprovalStatus | null
        reviewNote: string | null
        createTime: string | null
        reviewTime: string | null
        lastUpdateTime: string | null
      } | null> | null
    } | null> | null
    nextToken: string | null
  } | null
}

export type GetCantoQueryVariables = {
  id: string
}

export type GetCantoQuery = {
  // Cantos
  getCanto: {
    __typename: 'Canto'
    id: string
    body: string
    user: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    isPaused: number | null
    startTime: string
    lastUpdateTime: string | null
    bookmarkCount: {
      __typename: 'ResultCount'
      count: number | null
    } | null
    bookmarks: Array<{
      __typename: 'ContentInteraction'
      id: string
      userId: string
      user: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      interactionType: ContentInteractionType
      contentType: ContentType
      contentId: string
      indices: string | null
      time: string | null
    } | null> | null
    flagCount: {
      __typename: 'ResultCount'
      count: number | null
    } | null
    flags: Array<{
      __typename: 'Flag'
      id: string
      contentType: ContentType
      contentId: string | null
      flaggerUserId: string
      flaggerUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      category: string
      type: string
      detail: string | null
      reviewerUserId: string | null
      reviewerUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      status: FlagApprovalStatus | null
      reviewNote: string | null
      createTime: string | null
      reviewTime: string | null
      lastUpdateTime: string | null
    } | null> | null
  } | null
}

export type ListPausedCantosQueryVariables = {
  first?: number | null
  after?: string | null
}

export type ListPausedCantosQuery = {
  listPausedCantos: {
    __typename: 'CantoConnection'
    items: Array<{
      __typename: 'Canto'
      id: string
      body: string
      user: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      isPaused: number | null
      startTime: string
      lastUpdateTime: string | null
      bookmarkCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarks: Array<{
        __typename: 'ContentInteraction'
        id: string
        userId: string
        interactionType: ContentInteractionType
        contentType: ContentType
        contentId: string
        indices: string | null
        time: string | null
      } | null> | null
      flagCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      flags: Array<{
        __typename: 'Flag'
        id: string
        contentType: ContentType
        contentId: string | null
        flaggerUserId: string
        category: string
        type: string
        detail: string | null
        reviewerUserId: string | null
        status: FlagApprovalStatus | null
        reviewNote: string | null
        createTime: string | null
        reviewTime: string | null
        lastUpdateTime: string | null
      } | null> | null
    } | null> | null
    nextToken: string | null
  } | null
}

export type ListLiveCantosQueryVariables = {
  first?: number | null
  after?: string | null
}

export type ListLiveCantosQuery = {
  listLiveCantos: {
    __typename: 'CantoConnection'
    items: Array<{
      __typename: 'Canto'
      id: string
      body: string
      user: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      isPaused: number | null
      startTime: string
      lastUpdateTime: string | null
      bookmarkCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarks: Array<{
        __typename: 'ContentInteraction'
        id: string
        userId: string
        interactionType: ContentInteractionType
        contentType: ContentType
        contentId: string
        indices: string | null
        time: string | null
      } | null> | null
      flagCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      flags: Array<{
        __typename: 'Flag'
        id: string
        contentType: ContentType
        contentId: string | null
        flaggerUserId: string
        category: string
        type: string
        detail: string | null
        reviewerUserId: string | null
        status: FlagApprovalStatus | null
        reviewNote: string | null
        createTime: string | null
        reviewTime: string | null
        lastUpdateTime: string | null
      } | null> | null
    } | null> | null
    nextToken: string | null
  } | null
}

export type GetUserInteractionsQueryVariables = {
  interactionType?: UserInteractionType | null
  actorUserId: string
  targetUserId: string
}

export type GetUserInteractionsQuery = {
  // User interaction
  getUserInteractions: Array<{
    __typename: 'UserInteraction'
    id: string
    actorUserId: string
    actorUser: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    targetUserId: string
    targetUser: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    interactionType: UserInteractionType | null
    lastChangeTime: string
  } | null> | null
}

export type ListUserInteractionsByActorUserIdQueryVariables = {
  interactionType?: UserInteractionType | null
  actorUserId: string
  limit?: number | null
  offset?: number | null
}

export type ListUserInteractionsByActorUserIdQuery = {
  listUserInteractionsByActorUserId: Array<{
    __typename: 'UserInteraction'
    id: string
    actorUserId: string
    actorUser: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    targetUserId: string
    targetUser: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    interactionType: UserInteractionType | null
    lastChangeTime: string
  } | null> | null
}

export type GetContentBookmarkQueryVariables = {
  id: string
}

export type GetContentBookmarkQuery = {
  // Bookmarks
  getContentBookmark: {
    __typename: 'ContentInteraction'
    id: string
    userId: string
    user: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    interactionType: ContentInteractionType
    contentType: ContentType
    contentId: string
    indices: string | null
    time: string | null
  } | null
}

export type CountContentBookmarksQueryVariables = {
  contentId: string
  contentType?: ContentType | null
}

export type CountContentBookmarksQuery = {
  countContentBookmarks: {
    __typename: 'ResultCount'
    count: number | null
  } | null
}

export type CountContentBookmarksByUserQueryVariables = {
  userId: string
  contentType?: ContentType | null
}

export type CountContentBookmarksByUserQuery = {
  countContentBookmarksByUser: {
    __typename: 'ResultCount'
    count: number | null
  } | null
}

export type ListContentBookmarksQueryVariables = {
  contentId: string
  contentType?: ContentType | null
  limit?: number | null
  offset?: number | null
}

export type ListContentBookmarksQuery = {
  listContentBookmarks: Array<{
    __typename: 'ContentInteraction'
    id: string
    userId: string
    user: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    interactionType: ContentInteractionType
    contentType: ContentType
    contentId: string
    indices: string | null
    time: string | null
  } | null> | null
}

export type ListContentBookmarksByUserQueryVariables = {
  userId: string
  contentType?: ContentType | null
  limit?: number | null
  offset?: number | null
}

export type ListContentBookmarksByUserQuery = {
  listContentBookmarksByUser: Array<{
    __typename: 'ContentInteraction'
    id: string
    userId: string
    user: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    interactionType: ContentInteractionType
    contentType: ContentType
    contentId: string
    indices: string | null
    time: string | null
  } | null> | null
}

export type GetContentBookmarkByUserQueryVariables = {
  userId: string
  contentType?: ContentType | null
}

export type GetContentBookmarkByUserQuery = {
  getContentBookmarkByUser: {
    __typename: 'ContentInteraction'
    id: string
    userId: string
    user: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    interactionType: ContentInteractionType
    contentType: ContentType
    contentId: string
    indices: string | null
    time: string | null
  } | null
}

export type CountContentCommentsQueryVariables = {
  contentId: string
  contentType?: ContentType | null
}

export type CountContentCommentsQuery = {
  // Comments
  countContentComments: {
    __typename: 'ResultCount'
    count: number | null
  } | null
}

export type ListContentCommentsQueryVariables = {
  contentId: string
  contentType?: ContentType | null
  limit?: number | null
  offset?: number | null
}

export type ListContentCommentsQuery = {
  listContentComments: Array<{
    __typename: 'Comment'
    id: string
    userId: string
    user: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    body: string | null
    contentType: ContentType
    contentId: string
    flagCount: {
      __typename: 'ResultCount'
      count: number | null
    } | null
    flags: Array<{
      __typename: 'Flag'
      id: string
      contentType: ContentType
      contentId: string | null
      flaggerUserId: string
      flaggerUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      category: string
      type: string
      detail: string | null
      reviewerUserId: string | null
      reviewerUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      status: FlagApprovalStatus | null
      reviewNote: string | null
      createTime: string | null
      reviewTime: string | null
      lastUpdateTime: string | null
    } | null> | null
    time: string | null
  } | null> | null
}

export type ListContentCommentsByUserQueryVariables = {
  userId: string
  contentType?: ContentType | null
  limit?: number | null
  offset?: number | null
}

export type ListContentCommentsByUserQuery = {
  listContentCommentsByUser: Array<{
    __typename: 'Comment'
    id: string
    userId: string
    user: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    body: string | null
    contentType: ContentType
    contentId: string
    flagCount: {
      __typename: 'ResultCount'
      count: number | null
    } | null
    flags: Array<{
      __typename: 'Flag'
      id: string
      contentType: ContentType
      contentId: string | null
      flaggerUserId: string
      flaggerUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      category: string
      type: string
      detail: string | null
      reviewerUserId: string | null
      reviewerUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      status: FlagApprovalStatus | null
      reviewNote: string | null
      createTime: string | null
      reviewTime: string | null
      lastUpdateTime: string | null
    } | null> | null
    time: string | null
  } | null> | null
}

export type GetFlagQueryVariables = {
  id: string
}

export type GetFlagQuery = {
  // Flag
  getFlag: {
    __typename: 'Flag'
    id: string
    contentType: ContentType
    contentId: string | null
    flaggerUserId: string
    flaggerUser: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    category: string
    type: string
    detail: string | null
    reviewerUserId: string | null
    reviewerUser: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    status: FlagApprovalStatus | null
    reviewNote: string | null
    createTime: string | null
    reviewTime: string | null
    lastUpdateTime: string | null
  } | null
}

export type CountFlagsQueryVariables = {
  searchText?: string | null
  status?: FlagApprovalStatus | null
}

export type CountFlagsQuery = {
  countFlags: {
    __typename: 'ResultCount'
    count: number | null
  } | null
}

export type ListFlagsQueryVariables = {
  limit?: number | null
  offset?: number | null
  searchText?: string | null
  status?: FlagApprovalStatus | null
}

export type ListFlagsQuery = {
  listFlags: Array<{
    __typename: 'Flag'
    id: string
    contentType: ContentType
    contentId: string | null
    flaggerUserId: string
    flaggerUser: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    category: string
    type: string
    detail: string | null
    reviewerUserId: string | null
    reviewerUser: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    status: FlagApprovalStatus | null
    reviewNote: string | null
    createTime: string | null
    reviewTime: string | null
    lastUpdateTime: string | null
  } | null> | null
}

export type GetFlagByUserQueryVariables = {
  flaggerUserId: string
  contentType?: ContentType | null
}

export type GetFlagByUserQuery = {
  getFlagByUser: {
    __typename: 'Flag'
    id: string
    contentType: ContentType
    contentId: string | null
    flaggerUserId: string
    flaggerUser: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    category: string
    type: string
    detail: string | null
    reviewerUserId: string | null
    reviewerUser: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    status: FlagApprovalStatus | null
    reviewNote: string | null
    createTime: string | null
    reviewTime: string | null
    lastUpdateTime: string | null
  } | null
}

export type ListUncloggerPromptsQueryVariables = {
  limit?: number | null
  offset?: number | null
  searchText?: string | null
  status?: UncloggerPromptApprovalStatus | null
}

export type ListUncloggerPromptsQuery = {
  // UncloggerPrompt
  listUncloggerPrompts: Array<{
    __typename: 'UncloggerPrompt'
    id: string
    category: UncloggerPromptCategory
    body: string
    language: Language | null
    status: UncloggerPromptApprovalStatus | null
    creatorUserId: string | null
    creatorUser: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    createTime: string | null
    reviewerUserId: string | null
    reviewerUser: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    reviewNote: string | null
    reviewTime: string | null
  } | null> | null
}

export type CountUncloggerPromptsQueryVariables = {
  searchText?: string | null
  status?: UncloggerPromptApprovalStatus | null
}

export type CountUncloggerPromptsQuery = {
  countUncloggerPrompts: {
    __typename: 'ResultCount'
    count: number | null
  } | null
}

export type GetRandomUncloggerPromptQueryVariables = {
  category?: UncloggerPromptCategory | null
  language?: Language | null
}

export type GetRandomUncloggerPromptQuery = {
  getRandomUncloggerPrompt: {
    __typename: 'UncloggerPrompt'
    id: string
    category: UncloggerPromptCategory
    body: string
    language: Language | null
    status: UncloggerPromptApprovalStatus | null
    creatorUserId: string | null
    creatorUser: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    createTime: string | null
    reviewerUserId: string | null
    reviewerUser: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    reviewNote: string | null
    reviewTime: string | null
  } | null
}

export type SearchQueryVariables = {
  query: string
}

export type SearchQuery = {
  // Search
  search: Array<
    | (
        | {
            __typename: 'Stream'
            id: string
            title: string | null
            body: string
            userId: string
            user: {
              __typename: 'User'
              id: string
              username: string
              email: string | null
              preferredName: string | null
              accountStatus: string | null
              allowDirectMessages: boolean | null
              theme: string | null
              bio: string | null
              birthDate: string
              cognitoIdentityId: string | null
              createdAt: string | null
              lastAccess: string | null
              location: string | null
              language: Language | null
              profilePictureKey: string | null
              site: string | null
              canto: {
                __typename: 'Canto'
                id: string
                body: string
                isPaused: number | null
                startTime: string
                lastUpdateTime: string | null
              } | null
              streams: {
                __typename: 'StreamConnection'
                nextToken: string | null
              } | null
              userWatchInteractions: Array<{
                __typename: 'UserInteraction'
                id: string
                actorUserId: string
                targetUserId: string
                interactionType: UserInteractionType | null
                lastChangeTime: string
              } | null> | null
              userBlockInteractions: Array<{
                __typename: 'UserInteraction'
                id: string
                actorUserId: string
                targetUserId: string
                interactionType: UserInteractionType | null
                lastChangeTime: string
              } | null> | null
              committedStreamCommentCount: {
                __typename: 'ResultCount'
                count: number | null
              } | null
              committedStreamComments: Array<{
                __typename: 'Comment'
                id: string
                userId: string
                body: string | null
                contentType: ContentType
                contentId: string
                time: string | null
              } | null> | null
              bookmarkedStreamCount: {
                __typename: 'ResultCount'
                count: number | null
              } | null
              bookmarkedStreams: Array<{
                __typename: 'Stream'
                id: string
                title: string | null
                body: string
                userId: string
                isSealed: number | null
                location: string | null
                mood: Mood | null
                position: Position | null
                startTime: string
                sealTime: string | null
                trackId: string | null
                uncloggerPromptId: string | null
              } | null> | null
              bookmarkedCantoCount: {
                __typename: 'ResultCount'
                count: number | null
              } | null
              bookmarkedCantos: Array<{
                __typename: 'Canto'
                id: string
                body: string
                isPaused: number | null
                startTime: string
                lastUpdateTime: string | null
              } | null> | null
            } | null
            isSealed: number | null
            location: string | null
            mood: Mood | null
            position: Position | null
            startTime: string
            sealTime: string | null
            trackId: string | null
            uncloggerPromptId: string | null
            uncloggerPrompt: {
              __typename: 'UncloggerPrompt'
              id: string
              category: UncloggerPromptCategory
              body: string
              language: Language | null
              status: UncloggerPromptApprovalStatus | null
              creatorUserId: string | null
              creatorUser: {
                __typename: 'User'
                id: string
                username: string
                email: string | null
                preferredName: string | null
                accountStatus: string | null
                allowDirectMessages: boolean | null
                theme: string | null
                bio: string | null
                birthDate: string
                cognitoIdentityId: string | null
                createdAt: string | null
                lastAccess: string | null
                location: string | null
                language: Language | null
                profilePictureKey: string | null
                site: string | null
              } | null
              createTime: string | null
              reviewerUserId: string | null
              reviewerUser: {
                __typename: 'User'
                id: string
                username: string
                email: string | null
                preferredName: string | null
                accountStatus: string | null
                allowDirectMessages: boolean | null
                theme: string | null
                bio: string | null
                birthDate: string
                cognitoIdentityId: string | null
                createdAt: string | null
                lastAccess: string | null
                location: string | null
                language: Language | null
                profilePictureKey: string | null
                site: string | null
              } | null
              reviewNote: string | null
              reviewTime: string | null
            } | null
            bookmarkCount: {
              __typename: 'ResultCount'
              count: number | null
            } | null
            bookmarks: Array<{
              __typename: 'ContentInteraction'
              id: string
              userId: string
              user: {
                __typename: 'User'
                id: string
                username: string
                email: string | null
                preferredName: string | null
                accountStatus: string | null
                allowDirectMessages: boolean | null
                theme: string | null
                bio: string | null
                birthDate: string
                cognitoIdentityId: string | null
                createdAt: string | null
                lastAccess: string | null
                location: string | null
                language: Language | null
                profilePictureKey: string | null
                site: string | null
              } | null
              interactionType: ContentInteractionType
              contentType: ContentType
              contentId: string
              indices: string | null
              time: string | null
            } | null> | null
            commentCount: {
              __typename: 'ResultCount'
              count: number | null
            } | null
            comments: Array<{
              __typename: 'Comment'
              id: string
              userId: string
              user: {
                __typename: 'User'
                id: string
                username: string
                email: string | null
                preferredName: string | null
                accountStatus: string | null
                allowDirectMessages: boolean | null
                theme: string | null
                bio: string | null
                birthDate: string
                cognitoIdentityId: string | null
                createdAt: string | null
                lastAccess: string | null
                location: string | null
                language: Language | null
                profilePictureKey: string | null
                site: string | null
              } | null
              body: string | null
              contentType: ContentType
              contentId: string
              flagCount: {
                __typename: 'ResultCount'
                count: number | null
              } | null
              flags: Array<{
                __typename: 'Flag'
                id: string
                contentType: ContentType
                contentId: string | null
                flaggerUserId: string
                category: string
                type: string
                detail: string | null
                reviewerUserId: string | null
                status: FlagApprovalStatus | null
                reviewNote: string | null
                createTime: string | null
                reviewTime: string | null
                lastUpdateTime: string | null
              } | null> | null
              time: string | null
            } | null> | null
            flagCount: {
              __typename: 'ResultCount'
              count: number | null
            } | null
            flags: Array<{
              __typename: 'Flag'
              id: string
              contentType: ContentType
              contentId: string | null
              flaggerUserId: string
              flaggerUser: {
                __typename: 'User'
                id: string
                username: string
                email: string | null
                preferredName: string | null
                accountStatus: string | null
                allowDirectMessages: boolean | null
                theme: string | null
                bio: string | null
                birthDate: string
                cognitoIdentityId: string | null
                createdAt: string | null
                lastAccess: string | null
                location: string | null
                language: Language | null
                profilePictureKey: string | null
                site: string | null
              } | null
              category: string
              type: string
              detail: string | null
              reviewerUserId: string | null
              reviewerUser: {
                __typename: 'User'
                id: string
                username: string
                email: string | null
                preferredName: string | null
                accountStatus: string | null
                allowDirectMessages: boolean | null
                theme: string | null
                bio: string | null
                birthDate: string
                cognitoIdentityId: string | null
                createdAt: string | null
                lastAccess: string | null
                location: string | null
                language: Language | null
                profilePictureKey: string | null
                site: string | null
              } | null
              status: FlagApprovalStatus | null
              reviewNote: string | null
              createTime: string | null
              reviewTime: string | null
              lastUpdateTime: string | null
            } | null> | null
          }
        | {
            __typename: 'Canto'
            id: string
            body: string
            user: {
              __typename: 'User'
              id: string
              username: string
              email: string | null
              preferredName: string | null
              accountStatus: string | null
              allowDirectMessages: boolean | null
              theme: string | null
              bio: string | null
              birthDate: string
              cognitoIdentityId: string | null
              createdAt: string | null
              lastAccess: string | null
              location: string | null
              language: Language | null
              profilePictureKey: string | null
              site: string | null
              canto: {
                __typename: 'Canto'
                id: string
                body: string
                isPaused: number | null
                startTime: string
                lastUpdateTime: string | null
              } | null
              streams: {
                __typename: 'StreamConnection'
                nextToken: string | null
              } | null
              userWatchInteractions: Array<{
                __typename: 'UserInteraction'
                id: string
                actorUserId: string
                targetUserId: string
                interactionType: UserInteractionType | null
                lastChangeTime: string
              } | null> | null
              userBlockInteractions: Array<{
                __typename: 'UserInteraction'
                id: string
                actorUserId: string
                targetUserId: string
                interactionType: UserInteractionType | null
                lastChangeTime: string
              } | null> | null
              committedStreamCommentCount: {
                __typename: 'ResultCount'
                count: number | null
              } | null
              committedStreamComments: Array<{
                __typename: 'Comment'
                id: string
                userId: string
                body: string | null
                contentType: ContentType
                contentId: string
                time: string | null
              } | null> | null
              bookmarkedStreamCount: {
                __typename: 'ResultCount'
                count: number | null
              } | null
              bookmarkedStreams: Array<{
                __typename: 'Stream'
                id: string
                title: string | null
                body: string
                userId: string
                isSealed: number | null
                location: string | null
                mood: Mood | null
                position: Position | null
                startTime: string
                sealTime: string | null
                trackId: string | null
                uncloggerPromptId: string | null
              } | null> | null
              bookmarkedCantoCount: {
                __typename: 'ResultCount'
                count: number | null
              } | null
              bookmarkedCantos: Array<{
                __typename: 'Canto'
                id: string
                body: string
                isPaused: number | null
                startTime: string
                lastUpdateTime: string | null
              } | null> | null
            } | null
            isPaused: number | null
            startTime: string
            lastUpdateTime: string | null
            bookmarkCount: {
              __typename: 'ResultCount'
              count: number | null
            } | null
            bookmarks: Array<{
              __typename: 'ContentInteraction'
              id: string
              userId: string
              user: {
                __typename: 'User'
                id: string
                username: string
                email: string | null
                preferredName: string | null
                accountStatus: string | null
                allowDirectMessages: boolean | null
                theme: string | null
                bio: string | null
                birthDate: string
                cognitoIdentityId: string | null
                createdAt: string | null
                lastAccess: string | null
                location: string | null
                language: Language | null
                profilePictureKey: string | null
                site: string | null
              } | null
              interactionType: ContentInteractionType
              contentType: ContentType
              contentId: string
              indices: string | null
              time: string | null
            } | null> | null
            flagCount: {
              __typename: 'ResultCount'
              count: number | null
            } | null
            flags: Array<{
              __typename: 'Flag'
              id: string
              contentType: ContentType
              contentId: string | null
              flaggerUserId: string
              flaggerUser: {
                __typename: 'User'
                id: string
                username: string
                email: string | null
                preferredName: string | null
                accountStatus: string | null
                allowDirectMessages: boolean | null
                theme: string | null
                bio: string | null
                birthDate: string
                cognitoIdentityId: string | null
                createdAt: string | null
                lastAccess: string | null
                location: string | null
                language: Language | null
                profilePictureKey: string | null
                site: string | null
              } | null
              category: string
              type: string
              detail: string | null
              reviewerUserId: string | null
              reviewerUser: {
                __typename: 'User'
                id: string
                username: string
                email: string | null
                preferredName: string | null
                accountStatus: string | null
                allowDirectMessages: boolean | null
                theme: string | null
                bio: string | null
                birthDate: string
                cognitoIdentityId: string | null
                createdAt: string | null
                lastAccess: string | null
                location: string | null
                language: Language | null
                profilePictureKey: string | null
                site: string | null
              } | null
              status: FlagApprovalStatus | null
              reviewNote: string | null
              createTime: string | null
              reviewTime: string | null
              lastUpdateTime: string | null
            } | null> | null
          }
        | {
            __typename: 'User'
            id: string
            username: string
            email: string | null
            preferredName: string | null
            accountStatus: string | null
            allowDirectMessages: boolean | null
            theme: string | null
            bio: string | null
            birthDate: string
            cognitoIdentityId: string | null
            createdAt: string | null
            lastAccess: string | null
            location: string | null
            language: Language | null
            profilePictureKey: string | null
            site: string | null
            canto: {
              __typename: 'Canto'
              id: string
              body: string
              user: {
                __typename: 'User'
                id: string
                username: string
                email: string | null
                preferredName: string | null
                accountStatus: string | null
                allowDirectMessages: boolean | null
                theme: string | null
                bio: string | null
                birthDate: string
                cognitoIdentityId: string | null
                createdAt: string | null
                lastAccess: string | null
                location: string | null
                language: Language | null
                profilePictureKey: string | null
                site: string | null
              } | null
              isPaused: number | null
              startTime: string
              lastUpdateTime: string | null
              bookmarkCount: {
                __typename: 'ResultCount'
                count: number | null
              } | null
              bookmarks: Array<{
                __typename: 'ContentInteraction'
                id: string
                userId: string
                interactionType: ContentInteractionType
                contentType: ContentType
                contentId: string
                indices: string | null
                time: string | null
              } | null> | null
              flagCount: {
                __typename: 'ResultCount'
                count: number | null
              } | null
              flags: Array<{
                __typename: 'Flag'
                id: string
                contentType: ContentType
                contentId: string | null
                flaggerUserId: string
                category: string
                type: string
                detail: string | null
                reviewerUserId: string | null
                status: FlagApprovalStatus | null
                reviewNote: string | null
                createTime: string | null
                reviewTime: string | null
                lastUpdateTime: string | null
              } | null> | null
            } | null
            streams: {
              __typename: 'StreamConnection'
              items: Array<{
                __typename: 'Stream'
                id: string
                title: string | null
                body: string
                userId: string
                isSealed: number | null
                location: string | null
                mood: Mood | null
                position: Position | null
                startTime: string
                sealTime: string | null
                trackId: string | null
                uncloggerPromptId: string | null
              } | null> | null
              nextToken: string | null
            } | null
            userWatchInteractions: Array<{
              __typename: 'UserInteraction'
              id: string
              actorUserId: string
              actorUser: {
                __typename: 'User'
                id: string
                username: string
                email: string | null
                preferredName: string | null
                accountStatus: string | null
                allowDirectMessages: boolean | null
                theme: string | null
                bio: string | null
                birthDate: string
                cognitoIdentityId: string | null
                createdAt: string | null
                lastAccess: string | null
                location: string | null
                language: Language | null
                profilePictureKey: string | null
                site: string | null
              } | null
              targetUserId: string
              targetUser: {
                __typename: 'User'
                id: string
                username: string
                email: string | null
                preferredName: string | null
                accountStatus: string | null
                allowDirectMessages: boolean | null
                theme: string | null
                bio: string | null
                birthDate: string
                cognitoIdentityId: string | null
                createdAt: string | null
                lastAccess: string | null
                location: string | null
                language: Language | null
                profilePictureKey: string | null
                site: string | null
              } | null
              interactionType: UserInteractionType | null
              lastChangeTime: string
            } | null> | null
            userBlockInteractions: Array<{
              __typename: 'UserInteraction'
              id: string
              actorUserId: string
              actorUser: {
                __typename: 'User'
                id: string
                username: string
                email: string | null
                preferredName: string | null
                accountStatus: string | null
                allowDirectMessages: boolean | null
                theme: string | null
                bio: string | null
                birthDate: string
                cognitoIdentityId: string | null
                createdAt: string | null
                lastAccess: string | null
                location: string | null
                language: Language | null
                profilePictureKey: string | null
                site: string | null
              } | null
              targetUserId: string
              targetUser: {
                __typename: 'User'
                id: string
                username: string
                email: string | null
                preferredName: string | null
                accountStatus: string | null
                allowDirectMessages: boolean | null
                theme: string | null
                bio: string | null
                birthDate: string
                cognitoIdentityId: string | null
                createdAt: string | null
                lastAccess: string | null
                location: string | null
                language: Language | null
                profilePictureKey: string | null
                site: string | null
              } | null
              interactionType: UserInteractionType | null
              lastChangeTime: string
            } | null> | null
            committedStreamCommentCount: {
              __typename: 'ResultCount'
              count: number | null
            } | null
            committedStreamComments: Array<{
              __typename: 'Comment'
              id: string
              userId: string
              user: {
                __typename: 'User'
                id: string
                username: string
                email: string | null
                preferredName: string | null
                accountStatus: string | null
                allowDirectMessages: boolean | null
                theme: string | null
                bio: string | null
                birthDate: string
                cognitoIdentityId: string | null
                createdAt: string | null
                lastAccess: string | null
                location: string | null
                language: Language | null
                profilePictureKey: string | null
                site: string | null
              } | null
              body: string | null
              contentType: ContentType
              contentId: string
              flagCount: {
                __typename: 'ResultCount'
                count: number | null
              } | null
              flags: Array<{
                __typename: 'Flag'
                id: string
                contentType: ContentType
                contentId: string | null
                flaggerUserId: string
                category: string
                type: string
                detail: string | null
                reviewerUserId: string | null
                status: FlagApprovalStatus | null
                reviewNote: string | null
                createTime: string | null
                reviewTime: string | null
                lastUpdateTime: string | null
              } | null> | null
              time: string | null
            } | null> | null
            bookmarkedStreamCount: {
              __typename: 'ResultCount'
              count: number | null
            } | null
            bookmarkedStreams: Array<{
              __typename: 'Stream'
              id: string
              title: string | null
              body: string
              userId: string
              user: {
                __typename: 'User'
                id: string
                username: string
                email: string | null
                preferredName: string | null
                accountStatus: string | null
                allowDirectMessages: boolean | null
                theme: string | null
                bio: string | null
                birthDate: string
                cognitoIdentityId: string | null
                createdAt: string | null
                lastAccess: string | null
                location: string | null
                language: Language | null
                profilePictureKey: string | null
                site: string | null
              } | null
              isSealed: number | null
              location: string | null
              mood: Mood | null
              position: Position | null
              startTime: string
              sealTime: string | null
              trackId: string | null
              uncloggerPromptId: string | null
              uncloggerPrompt: {
                __typename: 'UncloggerPrompt'
                id: string
                category: UncloggerPromptCategory
                body: string
                language: Language | null
                status: UncloggerPromptApprovalStatus | null
                creatorUserId: string | null
                createTime: string | null
                reviewerUserId: string | null
                reviewNote: string | null
                reviewTime: string | null
              } | null
              bookmarkCount: {
                __typename: 'ResultCount'
                count: number | null
              } | null
              bookmarks: Array<{
                __typename: 'ContentInteraction'
                id: string
                userId: string
                interactionType: ContentInteractionType
                contentType: ContentType
                contentId: string
                indices: string | null
                time: string | null
              } | null> | null
              commentCount: {
                __typename: 'ResultCount'
                count: number | null
              } | null
              comments: Array<{
                __typename: 'Comment'
                id: string
                userId: string
                body: string | null
                contentType: ContentType
                contentId: string
                time: string | null
              } | null> | null
              flagCount: {
                __typename: 'ResultCount'
                count: number | null
              } | null
              flags: Array<{
                __typename: 'Flag'
                id: string
                contentType: ContentType
                contentId: string | null
                flaggerUserId: string
                category: string
                type: string
                detail: string | null
                reviewerUserId: string | null
                status: FlagApprovalStatus | null
                reviewNote: string | null
                createTime: string | null
                reviewTime: string | null
                lastUpdateTime: string | null
              } | null> | null
            } | null> | null
            bookmarkedCantoCount: {
              __typename: 'ResultCount'
              count: number | null
            } | null
            bookmarkedCantos: Array<{
              __typename: 'Canto'
              id: string
              body: string
              user: {
                __typename: 'User'
                id: string
                username: string
                email: string | null
                preferredName: string | null
                accountStatus: string | null
                allowDirectMessages: boolean | null
                theme: string | null
                bio: string | null
                birthDate: string
                cognitoIdentityId: string | null
                createdAt: string | null
                lastAccess: string | null
                location: string | null
                language: Language | null
                profilePictureKey: string | null
                site: string | null
              } | null
              isPaused: number | null
              startTime: string
              lastUpdateTime: string | null
              bookmarkCount: {
                __typename: 'ResultCount'
                count: number | null
              } | null
              bookmarks: Array<{
                __typename: 'ContentInteraction'
                id: string
                userId: string
                interactionType: ContentInteractionType
                contentType: ContentType
                contentId: string
                indices: string | null
                time: string | null
              } | null> | null
              flagCount: {
                __typename: 'ResultCount'
                count: number | null
              } | null
              flags: Array<{
                __typename: 'Flag'
                id: string
                contentType: ContentType
                contentId: string | null
                flaggerUserId: string
                category: string
                type: string
                detail: string | null
                reviewerUserId: string | null
                status: FlagApprovalStatus | null
                reviewNote: string | null
                createTime: string | null
                reviewTime: string | null
                lastUpdateTime: string | null
              } | null> | null
            } | null> | null
          }
      )
    | null
  > | null
}

export type GetRecaptchaTokenResultQueryVariables = {
  token: string
  ip?: string | null
}

export type GetRecaptchaTokenResultQuery = {
  // Recaptcha V3 token
  getRecaptchaTokenResult: {
    __typename: 'RecaptchaV3Result'
    challengeTimestamp: string | null
    errorCodes: Array<string | null> | null
    hostname: string | null
    success: boolean | null
  } | null
}

export type OnUpdateStreamSubscriptionVariables = {
  id: string
}

export type OnUpdateStreamSubscription = {
  onUpdateStream: {
    __typename: 'Stream'
    id: string
    title: string | null
    body: string
    userId: string
    user: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    isSealed: number | null
    location: string | null
    mood: Mood | null
    position: Position | null
    startTime: string
    sealTime: string | null
    trackId: string | null
    uncloggerPromptId: string | null
    uncloggerPrompt: {
      __typename: 'UncloggerPrompt'
      id: string
      category: UncloggerPromptCategory
      body: string
      language: Language | null
      status: UncloggerPromptApprovalStatus | null
      creatorUserId: string | null
      creatorUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      createTime: string | null
      reviewerUserId: string | null
      reviewerUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      reviewNote: string | null
      reviewTime: string | null
    } | null
    bookmarkCount: {
      __typename: 'ResultCount'
      count: number | null
    } | null
    bookmarks: Array<{
      __typename: 'ContentInteraction'
      id: string
      userId: string
      user: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      interactionType: ContentInteractionType
      contentType: ContentType
      contentId: string
      indices: string | null
      time: string | null
    } | null> | null
    commentCount: {
      __typename: 'ResultCount'
      count: number | null
    } | null
    comments: Array<{
      __typename: 'Comment'
      id: string
      userId: string
      user: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      body: string | null
      contentType: ContentType
      contentId: string
      flagCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      flags: Array<{
        __typename: 'Flag'
        id: string
        contentType: ContentType
        contentId: string | null
        flaggerUserId: string
        category: string
        type: string
        detail: string | null
        reviewerUserId: string | null
        status: FlagApprovalStatus | null
        reviewNote: string | null
        createTime: string | null
        reviewTime: string | null
        lastUpdateTime: string | null
      } | null> | null
      time: string | null
    } | null> | null
    flagCount: {
      __typename: 'ResultCount'
      count: number | null
    } | null
    flags: Array<{
      __typename: 'Flag'
      id: string
      contentType: ContentType
      contentId: string | null
      flaggerUserId: string
      flaggerUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      category: string
      type: string
      detail: string | null
      reviewerUserId: string | null
      reviewerUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      status: FlagApprovalStatus | null
      reviewNote: string | null
      createTime: string | null
      reviewTime: string | null
      lastUpdateTime: string | null
    } | null> | null
  } | null
}

export type OnUpdateCantoSubscriptionVariables = {
  id: string
}

export type OnUpdateCantoSubscription = {
  onUpdateCanto: {
    __typename: 'Canto'
    id: string
    body: string
    user: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    isPaused: number | null
    startTime: string
    lastUpdateTime: string | null
    bookmarkCount: {
      __typename: 'ResultCount'
      count: number | null
    } | null
    bookmarks: Array<{
      __typename: 'ContentInteraction'
      id: string
      userId: string
      user: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      interactionType: ContentInteractionType
      contentType: ContentType
      contentId: string
      indices: string | null
      time: string | null
    } | null> | null
    flagCount: {
      __typename: 'ResultCount'
      count: number | null
    } | null
    flags: Array<{
      __typename: 'Flag'
      id: string
      contentType: ContentType
      contentId: string | null
      flaggerUserId: string
      flaggerUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      category: string
      type: string
      detail: string | null
      reviewerUserId: string | null
      reviewerUser: {
        __typename: 'User'
        id: string
        username: string
        email: string | null
        preferredName: string | null
        accountStatus: string | null
        allowDirectMessages: boolean | null
        theme: string | null
        bio: string | null
        birthDate: string
        cognitoIdentityId: string | null
        createdAt: string | null
        lastAccess: string | null
        location: string | null
        language: Language | null
        profilePictureKey: string | null
        site: string | null
      } | null
      status: FlagApprovalStatus | null
      reviewNote: string | null
      createTime: string | null
      reviewTime: string | null
      lastUpdateTime: string | null
    } | null> | null
  } | null
}

export type OnCreateOrDeleteContentInteractionSubscriptionVariables = {
  contentId?: string | null
}

export type OnCreateOrDeleteContentInteractionSubscription = {
  onCreateOrDeleteContentInteraction: {
    __typename: 'ContentInteraction'
    id: string
    userId: string
    user: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    interactionType: ContentInteractionType
    contentType: ContentType
    contentId: string
    indices: string | null
    time: string | null
  } | null
}

export type OnCreateOrDeleteFlagSubscriptionVariables = {
  contentId?: string | null
}

export type OnCreateOrDeleteFlagSubscription = {
  onCreateOrDeleteFlag: {
    __typename: 'Flag'
    id: string
    contentType: ContentType
    contentId: string | null
    flaggerUserId: string
    flaggerUser: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    category: string
    type: string
    detail: string | null
    reviewerUserId: string | null
    reviewerUser: {
      __typename: 'User'
      id: string
      username: string
      email: string | null
      preferredName: string | null
      accountStatus: string | null
      allowDirectMessages: boolean | null
      theme: string | null
      bio: string | null
      birthDate: string
      cognitoIdentityId: string | null
      createdAt: string | null
      lastAccess: string | null
      location: string | null
      language: Language | null
      profilePictureKey: string | null
      site: string | null
      canto: {
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null
      streams: {
        __typename: 'StreamConnection'
        nextToken: string | null
      } | null
      userWatchInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      userBlockInteractions: Array<{
        __typename: 'UserInteraction'
        id: string
        actorUserId: string
        targetUserId: string
        interactionType: UserInteractionType | null
        lastChangeTime: string
      } | null> | null
      committedStreamCommentCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      committedStreamComments: Array<{
        __typename: 'Comment'
        id: string
        userId: string
        body: string | null
        contentType: ContentType
        contentId: string
        time: string | null
      } | null> | null
      bookmarkedStreamCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedStreams: Array<{
        __typename: 'Stream'
        id: string
        title: string | null
        body: string
        userId: string
        isSealed: number | null
        location: string | null
        mood: Mood | null
        position: Position | null
        startTime: string
        sealTime: string | null
        trackId: string | null
        uncloggerPromptId: string | null
      } | null> | null
      bookmarkedCantoCount: {
        __typename: 'ResultCount'
        count: number | null
      } | null
      bookmarkedCantos: Array<{
        __typename: 'Canto'
        id: string
        body: string
        isPaused: number | null
        startTime: string
        lastUpdateTime: string | null
      } | null> | null
    } | null
    status: FlagApprovalStatus | null
    reviewNote: string | null
    createTime: string | null
    reviewTime: string | null
    lastUpdateTime: string | null
  } | null
}
