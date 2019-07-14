<template>
<v-tabs left v-model="activeTabIndex" show-arrows>
  <v-tabs-slider></v-tabs-slider>
  <v-tab href="#streams-tab">
    {{ $t('user.profilePage.tabs.streams') }}
  </v-tab>
  <v-tab href="#bookmarked-streams-tab">
    {{ $t('user.profilePage.tabs.likedContents') }}
  </v-tab>
  <v-tab href="#liked-users-tab">
    {{ $t('user.profilePage.tabs.likedUsers') }}
  </v-tab>
  <v-tab-item :value="streamsTabName">
    <v-flex class="pt-2"
      v-for="userStream in userStreams"
      :key="'S-' + userStream.id"
    >
      <tafalk-slim-profile-own-stream-card
        :stream="userStream"
      ></tafalk-slim-profile-own-stream-card>
    </v-flex>
    <infinite-loading
      force-use-infinite-wrapper="true"
      @infinite="infiniteStreamTabHandler"
    ></infinite-loading>
  </v-tab-item>

  <v-tab-item :value="bookmarkedStreamsTabName">
    <v-flex class="pt-2"
      v-for="bookmarkedStream in bookmarkedStreams"
      :key="'L-' + bookmarkedStream.id"
    >
      <tafalk-slim-profile-bookmarked-stream-card
        :stream="bookmarkedStream"
        :isVisitingOwnProfile="isVisitingOwnProfile"
      ></tafalk-slim-profile-bookmarked-stream-card>
    </v-flex>
    <infinite-loading
      force-use-infinite-wrapper="true"
      @infinite="infiniteBookmarkedStreamTabHandler"
    ></infinite-loading>
  </v-tab-item>

  <v-tab-item :value="likedUsersTabName">
    <v-flex class="pt-2"
      v-for="likedUser in likedUsers"
      :key="likedUser.id"
    >
      <tafalk-slim-profile-liked-user-card
        :user="likedUser"
        :isVisitingOwnProfile="isVisitingOwnProfile"
      ></tafalk-slim-profile-liked-user-card>
    </v-flex>
    <infinite-loading
      force-use-infinite-wrapper="true"
      @infinite="infiniteLikedUserTabHandler"
    ></infinite-loading>
  </v-tab-item>
</v-tabs>
</template>

<script>
import { API, graphqlOperation } from 'aws-amplify'
import { ListStreamsByUser, ListLikesByUser, ListUserInteractionsByActorUserIdIndex } from '@/graphql/Profile'
import TafalkSlimProfileOwnStreamCard from '@/components/stream/cards/SlimProfileOwnStreamCard.vue'
import TafalkSlimProfileBookmarkedStreamCard from '@/components/stream/cards/SlimProfileBookmarkedStreamCard.vue'
import TafalkSlimProfileLikedUserCard from '@/components/user/cards/SlimProfileLikedUserCard.vue'

export default {
  name: 'ProfileTabs',
  props: ['userId', 'isVisitingOwnProfile'],
  data () {
    return {
      streamsTabName: 'streams-tab',
      bookmarkedStreamsTabName: 'bookmarked-streams-tab',
      likedUsersTabName: 'liked-users-tab',
      activeTabIndex: this.streamsTabName,
      userStreams: [],
      bookmarkedStreams: [],
      likedUsers: [],
      fetchLimit: 3,
      userStreamFetchNextToken: '',
      bookmarkedStreamFetchNextToken: '',
      likedUserFetchNextToken: '',
      watchTypeUserConnectionValue: 'Watch'
    }
  },
  components: {
    TafalkSlimProfileOwnStreamCard,
    TafalkSlimProfileBookmarkedStreamCard,
    TafalkSlimProfileLikedUserCard
  },
  computed: {
  },
  async mounted () {
    // send async queries
    const graphqlVisitedProfileStreamsReq = API.graphql(graphqlOperation(ListStreamsByUser, { userId: this.userId, limit: this.fetchLimit, nextToken: this.userStreamFetchNextToken }))
    const graphqlVisitedProfileBookmarkedStreamsReq = API.graphql(graphqlOperation(ListLikesByUser, { userId: this.userId, limit: this.fetchLimit, nextToken: this.bookmarkedStreamFetchNextToken }))
    const graphqlVisitedProfileOutboundInteractedUsersReq = API.graphql(graphqlOperation(ListUserInteractionsByActorUserIdIndex, { userId: this.userId, limit: this.fetchLimit, nextToken: this.likedUserFetchNextToken }))

    // load own streams
    const graphqlVisitedProfileStreamsResult = await graphqlVisitedProfileStreamsReq
    const visitedProfileStreamsDbResult = graphqlVisitedProfileStreamsResult.data.listStreamsByUser

    const initialFetchUserStreams = visitedProfileStreamsDbResult.items
    this.userStreamFetchNextToken = visitedProfileStreamsDbResult.nextToken
    this.userStreams.push(...initialFetchUserStreams)

    // load liked streams
    const graphqlVisitedProfileBookmarkedStreamsResult = await graphqlVisitedProfileBookmarkedStreamsReq
    const visitedProfileBookmarkedStreamsDbResult = graphqlVisitedProfileBookmarkedStreamsResult.data.listLikesByUser

    const initialFetchBookmarkedStreams = visitedProfileBookmarkedStreamsDbResult.items.map(item => item.stream)
    this.bookmarkedStreamFetchNextToken = visitedProfileBookmarkedStreamsDbResult.nextToken
    this.bookmarkedStreams.push(...initialFetchBookmarkedStreams)

    // load liked users
    const graphqlVisitedProfileOutboundInteractedUsersResult = await graphqlVisitedProfileOutboundInteractedUsersReq
    const visitedProfileOutboundInteractedUsersDbResult = graphqlVisitedProfileOutboundInteractedUsersResult.data.listUserInteractionsByActorUserIdIndex
    const initialFetchLikedUsers = visitedProfileOutboundInteractedUsersDbResult.items
      .filter(rel => rel.interactionType === this.watchTypeUserConnectionValue)
      .map(item => item.targetUser)
    this.likedUserFetchNextToken = visitedProfileOutboundInteractedUsersDbResult.nextToken
    this.likedUsers.push(...initialFetchLikedUsers)
    // if the result is not enough
    while (this.likedUsers.length < this.fetchLimit && this.likedUserFetchNextToken != null) {
      const rawNewFetchResult = await API.graphql(graphqlOperation(ListUserInteractionsByActorUserIdIndex, {
        userId: this.userId,
        limit: this.fetchLimit,
        nextToken: this.likedUserFetchNextToken
      }))

      let newFetch = rawNewFetchResult.data.listUserInteractionsByActorUserIdIndex.items
        .filter(rel => rel.interactionType === this.watchTypeUserConnectionValue)
        .map(item => item.targetUser)
      this.likedUsers.push(...newFetch)
      this.likedUserFetchNextToken = rawNewFetchResult.data.listUserInteractionsByActorUserIdIndex.nextToken
    }
  },
  methods: {
    async infiniteStreamTabHandler ($state) {
      // if no new things to load, complete
      if (!this.userStreamFetchNextToken) {
        $state.complete()
      } else {
        const scrollStreamEndNewFetchResult = await API.graphql(graphqlOperation(ListStreamsByUser, {
          userId: this.userId,
          limit: this.fetchLimit,
          nextToken: this.userStreamFetchNextToken
        }))

        const newPaginatedStreamByUserType = scrollStreamEndNewFetchResult.data.listStreamsByUser

        this.userStreamFetchNextToken = newPaginatedStreamByUserType.nextToken
        this.userStreams.push(...newPaginatedStreamByUserType.items)

        $state.loaded()
      }
    },
    async infiniteBookmarkedStreamTabHandler ($state) {
      // if no new things to load, complete
      if (!this.bookmarkedStreamFetchNextToken) {
        $state.complete()
      } else {
        const scrollLikeEndNewFetchResult = await API.graphql(graphqlOperation(ListLikesByUser, {
          userId: this.userId,
          limit: this.fetchLimit,
          nextToken: this.bookmarkedStreamFetchNextToken
        }))

        const newPaginatedLikeByUserType = scrollLikeEndNewFetchResult.data.listLikesByUser

        this.bookmarkedStreamFetchNextToken = newPaginatedLikeByUserType.nextToken
        this.bookmarkedStreams.push(...newPaginatedLikeByUserType.items.map(item => item.stream))

        $state.loaded()
      }
    },
    async infiniteLikedUserTabHandler ($state) {
      // if no new things to load, complete
      if (!this.likedUserFetchNextToken) {
        $state.complete()
      } else {
        const scrollLikedUserEndNewFetchResult = await API.graphql(graphqlOperation(ListUserInteractionsByActorUserIdIndex, {
          userId: this.userId,
          limit: this.fetchLimit,
          nextToken: this.likedUserFetchNextToken
        }))

        const newPaginatedLikedUserByUserType = scrollLikedUserEndNewFetchResult.data.listUserInteractionsByActorUserIdIndex
        const newPaginatedLikedUserByUserTypeFetch = newPaginatedLikedUserByUserType.items.filter(rel => rel.interactionType === this.watchTypeUserConnectionValue).map(item => item.targetUser)
        this.likedUserFetchNextToken = newPaginatedLikedUserByUserType.nextToken
        this.likedUsers.push(...newPaginatedLikedUserByUserTypeFetch)

        // if the result is not enough
        while (newPaginatedLikedUserByUserTypeFetch < this.fetchLimit && this.likedUserFetchNextToken != null) {
          const rawLikedUserNewFetchResult = await API.graphql(graphqlOperation(ListUserInteractionsByActorUserIdIndex, { userId: this.userId, limit: this.fetchLimit, nextToken: this.likedUserFetchNextToken }))
          let newLikedUserFetch = rawLikedUserNewFetchResult.data.listUserInteractionsByActorUserIdIndex.items
            .filter(rel => rel.interactionType === this.watchTypeUserConnectionValue)
            .map(item => item.targetUser)
          this.likedUsers.push(...newLikedUserFetch)
          this.likedUserFetchNextToken = rawLikedUserNewFetchResult.data.listUserInteractionsByActorUserIdIndex.nextToken
        }
        $state.loaded()
      }
    }
  }
}
</script>
