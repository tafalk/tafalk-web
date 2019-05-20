<template>
  <div class="home">
    <v-container grid-list-md>
      <!-- full page loader -->
      <v-layout v-if="!pageReady" align-center fill-height>
        <v-flex offset-md5 md2 offset-sm5 sm2 offset-xs5-and-up xs2>
          <img  src="@/assets/page-preloader.gif" alt="">
        </v-flex>
      </v-layout>
      <v-layout v-else-if="!searchText || searchText.length === 0" row wrap>
        <v-flex offset-md2 md8 xs12 infinite-wrapper>
          <v-layout row wrap>
            <v-flex md12 v-for="stream in streamList" :key="stream.id">
              <tafalk-brief-stream-card
                :stream="stream"
              ></tafalk-brief-stream-card>
            </v-flex>
            <infinite-loading force-use-infinite-wrapper="true" @infinite="infiniteHomeHandler"></infinite-loading>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout v-else-if="!isSearchTextLongEnough" row wrap>
        <v-flex offset-md2 md8>
          <v-layout row wrap>
            <v-flex md12>
              <h1 class="grey--text">{{ $t('home.search.searchTextNotLongEnoughWarning') }}</h1>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout v-else-if="searchResults.length === 0" row wrap>
        <v-flex offset-md2 md8>
          <v-layout row wrap>
            <v-flex md12>
              <h1 class="grey--text">{{ $t('home.search.noResult', { searchText: searchText }) }}</h1>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout v-else row wrap>
        <v-flex offset-md2 md8 class="mb-4">
          <span class="title grey--text">{{ $t('home.search.result.userTitle', { resultCount: searchUserTypeResults.length }) }}</span>
          <v-layout row wrap>
            <v-flex
              class="mt-2"
              md12
              v-for="searchUserTypeResult in searchUserTypeResults"
              :key="searchUserTypeResult.id"
            >
              <tafalk-brief-user-card
                :user="searchUserTypeResult"
              ></tafalk-brief-user-card>
            </v-flex>
          </v-layout>
        </v-flex>
        <br />
        <v-flex offset-md2 md8>
          <span class="title grey--text">{{ $t('home.search.result.streamTitle', { resultCount: searchStreamTypeResults.length }) }}</span>
          <v-layout row wrap>
            <v-flex
              class="mt-2"
              md12
              v-for="searchStreamTypeResult in searchStreamTypeResults"
              :key="searchStreamTypeResult.id"
            >
              <tafalk-brief-stream-card
                :stream="searchStreamTypeResult"
              ></tafalk-brief-stream-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>

    <v-bottom-nav fixed :value="true" :active.sync="footerEl">
      <v-btn flat color="teal" :value=recentValue>
        <span>{{ $t('home.bottomnav.all') }}</span>
        <v-icon>apps</v-icon>
      </v-btn>
      <!--
      <v-btn flat color="deep-orange lighten-1" :value=topRatedValue>
        <span>Popular</span>
        <v-icon>whatshot</v-icon>
      </v-btn>
      -->
      <v-btn v-if="authenticatedUser" flat color="red darken-1" :value=liveNowValue>
        <span>{{ $t('home.bottomnav.liveNow') }}</span>
        <v-icon>play_circle_outline</v-icon>
      </v-btn>
      <v-btn v-if="authenticatedUser" flat color="purple darken-2" :value=byFaveUsersValue>
        <span>{{ $t('home.bottomnav.byFaveUsers') }}</span>
        <v-icon>star</v-icon>
      </v-btn>
    </v-bottom-nav>
    <tafalk-new-stream-fab v-if="authenticatedUser"></tafalk-new-stream-fab>
  </div>
</template>

<script>
import { API, graphqlOperation } from 'aws-amplify'
import { mapGetters } from 'vuex'
import TafalkNewStreamFab from '@/components/home/buttons/NewStreamFab.vue'
import TafalkBriefStreamCard from '@/components/stream/cards/BriefStreamCard.vue'
import TafalkBriefUserCard from '@/components/user/cards/BriefUserCard.vue'
import { homeStreamFetchLength } from '@/utils/constants'
import { ListSealedBriefStreams, ListLiveBriefStreams } from '@/graphql/Stream'

export default {
  name: 'Home',
  data () {
    return {
      pageReady: false,
      // busy: false,
      userTypeName: 'User',
      streamTypeName: 'Stream',
      recentValue: 'recent',
      topRatedValue: 'top-rated',
      liveNowValue: 'live-now',
      byFaveUsersValue: 'by-fave-users',
      streamList: [],
      footerEl: null,
      nextToken: null,
      fetchLimit: homeStreamFetchLength
    }
  },
  components: {
    TafalkNewStreamFab,
    TafalkBriefStreamCard,
    TafalkBriefUserCard
  },
  created () {
    this.footerEl = 'recent'
    this.pageReady = true
  },
  watch: {
    async footerEl (val, oldVal) {
      if (val == null || val === '' || val === oldVal) {
        this.streamList = []
      }

      this.pageReady = false

      if (this.recentValue === val) {
        const rawFetch = this.streamList = await API.graphql(graphqlOperation(ListSealedBriefStreams, {
          limit: this.fetchLimit,
          nextToken: null
        }))
        this.streamList = rawFetch.data.listSealedStreams.items
        this.nextToken = rawFetch.data.listSealedStreams.nextToken
      } else if (this.liveNowValue === val) {
        const rawFetch = await API.graphql(graphqlOperation(ListLiveBriefStreams, {
          limit: this.fetchLimit,
          nextToken: null
        }))
        this.streamList = rawFetch.data.listLiveStreams.items
        this.nextToken = rawFetch.data.listLiveStreams.nextToken
      } else if (this.byFaveUsersValue === val) {
        const rawFetch = await API.graphql(graphqlOperation(ListSealedBriefStreams, {
          limit: this.fetchLimit,
          nextToken: null
        }))
        this.streamList = rawFetch.data.listSealedStreams.items.filter(s => s.likes.some(i => i.userId === this.authenticatedUser.id))
        this.nextToken = rawFetch.data.listSealedStreams.nextToken

        // If the filtered result is not enough fetch a new portion
        /*
        let countOfByFaveOthers = 0
        while (countOfByFaveOthers < this.fetchLimit && this.nextToken != null) {
          const rawNewFetch = await API.graphql(ListSealedBriefStreams, {
            limit: this.fetchLimit,
            nextToken: this.nextToken
          }))

          let newInitialFetch = rawNewFetch.data.listSealedStreams.items.filter(s => s.likes.some(i => i.userId === this.authenticatedUser.id))
          this.streamList.push(...newInitialFetch)
          this.nextToken = rawNewFetch.data.listSealedStreams.nextToken
          countOfByFaveOthers += newInitialFetch.length
        }
        */
      } else if (this.topRatedValue === val) {
        // popularism not implemeted yet :9
      }

      this.pageReady = true
    }
  },
  computed: {
    ...mapGetters({
      getAuthenticatedUser: 'authenticatedUser/getUser',
      getSearchText: 'siteSearch/getSearchText',
      getIsSearchTextLongEnough: 'siteSearch/getIsSearchTextLongEnough',
      getSearchSiteResults: 'siteSearch/getSearchResults'
    }),
    authenticatedUser () {
      return this.getAuthenticatedUser
    },
    searchText () {
      return this.getSearchText
    },
    isSearchTextLongEnough () {
      return this.getIsSearchTextLongEnough
    },
    searchResults () {
      return this.getSearchSiteResults
    },
    searchUserTypeResults () {
      return this.searchResults.filter(r => r.__typename === this.userTypeName)
    },
    searchStreamTypeResults () {
      return this.searchResults.filter(r => r.__typename === this.streamTypeName)
    }
  },
  methods: {
    async infiniteHomeHandler ($state) {
      // if no new things to load, complete
      if (this.nextToken == null) {
        $state.complete()
      } else {
        if (this.footerEl === this.recentValue) {
          const scrollEndNewFetch = await API.graphql(graphqlOperation(ListSealedBriefStreams, {
            limit: this.fetchLimit,
            nextToken: this.nextToken
          }))
          this.streamList.push(...scrollEndNewFetch.data.listSealedStreams.items)
          this.nextToken = scrollEndNewFetch.data.listSealedStreams.nextToken
          $state.loaded()
        } else if (this.footerEl === this.liveNowValue) {
          const scrollEndNewFetch = await API.graphql(graphqlOperation(ListLiveBriefStreams, {
            limit: this.fetchLimit,
            nextToken: this.nextToken
          }))
          this.streamList.push(...scrollEndNewFetch.data.listLiveStreams.items)
          this.nextToken = scrollEndNewFetch.data.listLiveStreams.nextToken
          $state.loaded()
        } else if (this.footerEl === this.byFaveUsersValue) {
          const scrollEndNewFetch = await API.graphql(graphqlOperation(ListSealedBriefStreams, {
            limit: this.fetchLimit,
            nextToken: this.nextToken
          }))
          this.streamList = scrollEndNewFetch.data.listSealedStreams.items.filter(s => s.likes.some(i => i.userId === this.authenticatedUser.id))
          this.nextToken = scrollEndNewFetch.data.listSealedStreams.nextToke
          // If the filtered result is not enough fetch a new portion
          let countOfByFaveOthers = 0
          while (countOfByFaveOthers < this.fetchLimit && this.nextToken != null) {
            const rawNewFetch = await API.graphql(graphqlOperation(ListSealedBriefStreams, {
              limit: this.fetchLimit,
              nextToken: this.nextToken
            }))
            let newFetch = rawNewFetch.data.listSealedStreams.items.filter(s => s.likes.some(i => i.userId === this.authenticatedUser.id))
            this.streamList.push(...newFetch)
            this.nextToken = rawNewFetch.data.listSealedStreams.nextToken
            countOfByFaveOthers += newFetch.length
          }
          $state.loaded()
        } else if (this.footerEl === this.topRatedValue) {
          // popularism not implemeted yet :9
        }
      }
    }
  }
}
</script>
<style scoped>

</style>
