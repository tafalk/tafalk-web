<template>
<v-tabs left v-model="activeTabIndex" show-arrows grow>
  <v-tabs-slider></v-tabs-slider>
  <!-- Tabs -->
  <v-tab href="#canto-tab">
    {{ $t('user.profilePage.tabs.canto') }}
  </v-tab>
  <v-tab href="#streams-tab">
    {{ $t('user.profilePage.tabs.streams') }}
  </v-tab>
  <v-tab href="#bookmarked-streams-tab" v-if="isVisitingOwnProfile">
    {{ $t('user.profilePage.tabs.likedContents') }}
  </v-tab>
  <v-tab href="#liked-users-tab" v-if="isVisitingOwnProfile">
    {{ $t('user.profilePage.tabs.likedUsers') }}
  </v-tab>

  <!-- Tab Contents -->
  <!-- Canto -->
  <v-tab-item :value="cantoTabName">
    <v-list-item-group>
      <tafalk-canto-list-item
        :displayType="listItemDisplayType"
        :canto="userCanto"
        :dense="trueValue"
        :displayUserInfo="falseValue"
        :showUserInteractionData="falseValue"
      ></tafalk-canto-list-item>
    </v-list-item-group>
  </v-tab-item>

  <!-- Own Streams -->
  <v-tab-item :value="streamsTabName">
    <v-list>
      <v-list-item-group>
        <template v-for="(userStream, index) in userStreams">
          <tafalk-stream-list-item
            :key="'S-' + userStream.id"
            :displayType="listItemDisplayType"
            :stream="userStream"
            :dense="trueValue"
            :displayUserInfo="falseValue"
          ></tafalk-stream-list-item>
          <v-divider
            v-if="index + 1 < userStreams.length"
            :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
    <infinite-loading
      force-use-infinite-wrapper="true"
      @infinite="infiniteStreamTabHandler"
    ></infinite-loading>
  </v-tab-item>
  <!-- Bookmarked Streams -->
  <v-tab-item :value="bookmarkedStreamsTabName">
    <v-list>
      <v-list-item-group>
        <template v-for="(bookmarkedStream, index) in bookmarkedStreams">
          <tafalk-stream-list-item
            :key="'B-' + bookmarkedStream.id"
            :displayType="listItemDisplayType"
            :stream="bookmarkedStream"
            :dense="trueValue"
            :displayUserInfo="trueValue"
          ></tafalk-stream-list-item>
          <v-divider
            v-if="index + 1 < bookmarkedStreams.length"
            :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
    <infinite-loading
      force-use-infinite-wrapper="true"
      @infinite="infiniteBookmarkedStreamTabHandler"
    ></infinite-loading>
  </v-tab-item>
  <!-- Fave Others -->
  <v-tab-item :value="likedUsersTabName">
    <v-list>
      <v-list-item-group>
        <template v-for="(likedUser, index) in likedUsers">
          <tafalk-user-list-item
            :key="likedUser.id"
            :displayType="listItemDisplayType"
            :user="likedUser"
            :dense="trueValue"
          ></tafalk-user-list-item>
          <v-divider
            v-if="index + 1 < likedUsers.length"
            :key="index"
          ></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
    <infinite-loading
      force-use-infinite-wrapper="true"
      @infinite="infiniteLikedUserTabHandler"
    ></infinite-loading>
  </v-tab-item>
</v-tabs>
</template>

<script>
import { API, graphqlOperation } from 'aws-amplify'
import { mapGetters } from 'vuex'
import { ListStreamsByUser, ListLikesByUser, ListUserInteractionsByActorUserIdIndex } from '@/graphql/Profile'
import { GetCanto } from '@/graphql/Canto'
import TafalkUserListItem from '@/components/listitems/UserProfileListItem.vue'
import TafalkStreamListItem from '@/components/listitems/StreamListItem.vue'
import TafalkCantoListItem from '@/components/listitems/CantoListItem.vue'
import { GetElapsedTimeTillNow, GetElapsedTimeBetween } from '@/utils/typeUtils'

export default {
  name: 'ProfileTabs',
  props: ['userId', 'isVisitingOwnProfile'],
  data () {
    return {
      cantoTabName: 'canto-tab',
      streamsTabName: 'streams-tab',
      bookmarkedStreamsTabName: 'bookmarked-streams-tab',
      likedUsersTabName: 'liked-users-tab',
      listItemDisplayType: 'item',
      activeTabIndex: this.cantoTabName,
      userCanto: null,
      trueValue: true,
      falseValue: false,
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
    TafalkUserListItem,
    TafalkStreamListItem,
    TafalkCantoListItem
  },
  computed: {
    ...mapGetters({
      getNowTime: 'time/getNowTime'
    }),
    timeSpentForCanto () {
      return GetElapsedTimeBetween(this.userCanto.startTime, this.userCanto.lastUpdateTime)
    }
  },
  async mounted () {
    // send async queries
    const graphqlVisitedProfileCantoReq = API.graphql(graphqlOperation(GetCanto, { id: this.userId }))
    const graphqlVisitedProfileStreamsReq = API.graphql(graphqlOperation(ListStreamsByUser, { userId: this.userId, limit: this.fetchLimit, nextToken: this.userStreamFetchNextToken }))
    const graphqlVisitedProfileBookmarkedStreamsReq = API.graphql(graphqlOperation(ListLikesByUser, { userId: this.userId, limit: this.fetchLimit, nextToken: this.bookmarkedStreamFetchNextToken }))
    const graphqlVisitedProfileOutboundInteractedUsersReq = API.graphql(graphqlOperation(ListUserInteractionsByActorUserIdIndex, { userId: this.userId, limit: this.fetchLimit, nextToken: this.likedUserFetchNextToken }))

    // load canto
    const graphqlVisitedProfileCantoResult = await graphqlVisitedProfileCantoReq
    this.userCanto = graphqlVisitedProfileCantoResult.data.getCanto

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
    onToCantoClick () {
      this.$router.push({ name: 'canto', params: { username: this.userCanto.user.username } })
    },
    getTimeFromSealedToNow (sealTime) {
      return GetElapsedTimeTillNow(this.getNowTime, sealTime)
    },
    getTimeSpentForSealedStream (startTime, sealTime) {
      return GetElapsedTimeBetween(startTime, sealTime)
    },
    getTimeSpentForLiveStream (startTime) {
      return GetElapsedTimeTillNow(this.getNowTime, startTime)
    },
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
