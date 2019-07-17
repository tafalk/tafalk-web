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
      <v-list-item
        three-line
        @click.native="onToCantoClick"
      >
        <v-list-item-content>
          <v-list-item-subtitle v-text="userCanto.body"></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-action-text>
            <v-icon class="grey--text caption">mdi-timer</v-icon>&nbsp;{{ timeSpentForCanto }}
          </v-list-item-action-text>
        </v-list-item-action>
      </v-list-item>
    </v-list-item-group>
  </v-tab-item>

  <!-- Streams -->
  <v-tab-item :value="streamsTabName">
    <v-list three-line>
      <v-list-item-group>
        <template v-for="(userStream, index) in userStreams">
          <v-list-item :key="'S-' + userStream.id">
            <v-list-item-content>
              <v-list-item-title
                v-if="userStream.title"
                v-text="userStream.title"
              ></v-list-item-title>
              <v-list-item-subtitle
                v-if="userStream.body"
                v-text="userStream.body"
              ></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-list-item-action-text v-if="userStream.isSealed !== 0">
                <v-icon class="grey--text caption">mdi-seat-flat</v-icon>{{ getTimeFromSealedToNow(userStream.sealTime) }}
              </v-list-item-action-text>
              <v-list-item-action-text v-if="userStream.isSealed !== 0">
                <v-icon class="grey--text caption">mdi-timer</v-icon>{{ getTimeSpentForSealedStream(userStream.startTime, userStream.sealTime) }}
              </v-list-item-action-text>
              <v-list-item-action-text v-if="userStream.isSealed === 0">
                <v-icon class="grey--text caption">mdi-play</v-icon>&nbsp;Live Now
              </v-list-item-action-text>
              <v-list-item-action-text v-if="userStream.isSealed === 0">
                <v-icon class="grey--text caption">mdi-timer</v-icon>{{ getTimeSpentForLiveStream(userStream.startTime) }}
              </v-list-item-action-text>
              <v-list-item-action-text>
                <v-icon class="grey--text caption">mdi-bookmark</v-icon>{{ userStream.likes ? userStream.likes.length : 0 }}
              </v-list-item-action-text>
              <v-list-item-action-text>
                <v-icon class="grey--text caption">mdi-comment</v-icon>{{ userStream.comments ? userStream.comments.length : 0 }}
              </v-list-item-action-text>
            </v-list-item-action>
          </v-list-item>
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
import { mapGetters } from 'vuex'
import { ListStreamsByUser, ListLikesByUser, ListUserInteractionsByActorUserIdIndex } from '@/graphql/Profile'
import { GetCanto } from '@/graphql/Canto'
import TafalkUserListItem from '@/components/user/listitems/UserListItem.vue'
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
      activeTabIndex: this.cantoTabName,
      userCanto: null,
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
    TafalkUserListItem
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
      this.$router.push({ name: 'canto', params: { id: this.userCanto.id } })
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
