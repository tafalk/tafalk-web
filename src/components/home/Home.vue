<template>
  <div class="home">
    <v-container grid-list-md>
      <!-- full page loader -->
      <v-layout v-if="!getIsPageReady" align-center fill-height>
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

    <v-bottom-nav
      v-if="$vuetify.breakpoint.mdAndUp"
      fixed
      :value="true"
      :active.sync="footerEl"
    >
      <v-btn flat color="teal" :value=recentValue>
        <span>{{ $t('home.bottomnav.all') }}</span>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <!--
      <v-btn flat color="deep-orange lighten-1" :value=topRatedValue>
        <span>Popular</span>
        <v-icon>mdi-fire</v-icon>
      </v-btn>
      -->
      <v-btn v-if="authenticatedUser" flat color="red darken-1" :value=liveNowValue>
        <span>{{ $t('home.bottomnav.liveNow') }}</span>
        <v-icon>mdi-play-circle-outline</v-icon>
      </v-btn>
      <v-btn v-if="authenticatedUser" flat color="purple darken-2" :value=byFaveUsersValue>
        <span>{{ $t('home.bottomnav.byFaveUsers') }}</span>
        <v-icon>mdi-star</v-icon>
      </v-btn>
    </v-bottom-nav>
    <tafalk-new-fab v-if="authenticatedUser"></tafalk-new-fab>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import TafalkNewFab from '@/components/home/buttons/NewFab.vue'
import TafalkBriefStreamCard from '@/components/stream/cards/BriefStreamCard.vue'
import TafalkBriefUserCard from '@/components/user/cards/BriefUserCard.vue'
import { homeStreamFetchLength } from '@/utils/constants'

export default {
  name: 'Home',
  data () {
    return {
      userTypeName: 'User',
      streamTypeName: 'Stream',
      recentValue: 'recent',
      topRatedValue: 'top-rated',
      liveNowValue: 'live-now',
      byFaveUsersValue: 'by-fave-users',
      footerEl: null,
      fetchLimit: homeStreamFetchLength
    }
  },
  components: {
    TafalkNewFab,
    TafalkBriefStreamCard,
    TafalkBriefUserCard
  },
  created () {
    this.footerEl = 'recent'
    this.setIsPageReady(true)
  },
  watch: {
    async footerEl (val, oldVal) {
      if (val == null || val === '' || val === oldVal) {
        this.clearStreamList()
      }

      if (this.recentValue === val) {
        await this.fetchInitialSealedBriefStreams({ limit: this.fetchLimit, nextToken: null })
      } else if (this.liveNowValue === val) {
        await this.fetchInitialLiveBriefStreams({ limit: this.fetchLimit, nextToken: null })
      } else if (this.byFaveUsersValue === val) {
        await this.fetchInitialSealedBriefStreamsByFaveUsers({ limit: this.fetchLimit, nextToken: null })
      } else if (this.topRatedValue === val) {
        // popularism not implemeted yet :9
      }
    }
  },
  computed: {
    ...mapGetters({
      getAuthenticatedUser: 'authenticatedUser/getUser',
      getSearchText: 'siteSearch/getSearchText',
      getIsSearchTextLongEnough: 'siteSearch/getIsSearchTextLongEnough',
      getStreamList: 'getStreamList',
      getSearchSiteResults: 'siteSearch/getSearchResults',
      getIsPageReady: 'getIsPageReady',
      getNextStreamToken: 'getNextStreamToken'
    }),
    authenticatedUser () {
      return this.getAuthenticatedUser
    },
    streamList () {
      return this.getStreamList
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
    },
    nextToken () {
      return this.getNextStreamToken
    }
  },
  methods: {
    ...mapMutations({
      setIsPageReady: 'setIsPageReady',
      clearStreamList: 'clearStreamList'
    }),
    ...mapActions({
      fetchInitialSealedBriefStreams: 'fetchInitialSealedBriefStreams',
      fetchInitialLiveBriefStreams: 'fetchInitialLiveBriefStreams',
      fetchInitialSealedBriefStreamsByFaveUsers: 'fetchInitialSealedBriefStreamsByFaveUsers',
      fetchFurtherSealedBriefStreams: 'fetchFurtherSealedBriefStreams',
      fetchFurtherLiveBriefStreams: 'fetchFurtherLiveBriefStreams',
      fetchFurtherSealedBriefStreamsByFaveUsers: 'fetchFurtherSealedBriefStreamsByFaveUsers'
    }),
    async infiniteHomeHandler ($state) {
      // if no new things to load, complete
      if (this.nextToken == null) {
        $state.complete()
      } else {
        if (this.footerEl === this.recentValue) {
          await this.fetchFurtherSealedBriefStreams({ limit: this.fetchLimit, nextToken: this.nextToken })
          $state.loaded()
        } else if (this.footerEl === this.liveNowValue) {
          await this.fetchFurtherLiveBriefStreams({ limit: this.fetchLimit, nextToken: this.nextToken })
          $state.loaded()
        } else if (this.footerEl === this.byFaveUsersValue) {
          await this.fetchFurtherSealedBriefStreamsByFaveUsers({ limit: this.fetchLimit, nextToken: this.nextToken })
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
