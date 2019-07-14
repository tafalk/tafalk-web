<template>
  <div class="home">
    <v-container grid-list-lg pt-5>
      <!-- full page loader -->
      <tafalk-page-loading-progress v-if="!getIsPageReady" />
      <v-layout v-else-if="!searchText || searchText.length === 0" row wrap>
        <!-- Streams -->
        <v-flex offset-md2 md8 xs12 infinite-wrapper v-if="isStreamListType">
          <v-layout row wrap>
            <v-flex md12 v-for="stream in streamList" :key="stream.id">
              <tafalk-brief-stream-card
                :stream="stream"
              ></tafalk-brief-stream-card>
            </v-flex>
            <infinite-loading force-use-infinite-wrapper="true" @infinite="infiniteHomeHandler"></infinite-loading>
          </v-layout>
        </v-flex>
        <!-- Cantos -->
        <v-flex offset-md2 md8 xs12 infinite-wrapper v-else-if="isCantoListType">
          <v-layout row wrap>
            <v-flex md12 v-for="canto in cantoList" :key="canto.id">
              <tafalk-brief-canto-card
                :canto="canto"
              ></tafalk-brief-canto-card>
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
        <!-- Search Result (Users) -->
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
        <!-- Search Result (Streams) -->
        <v-flex offset-md2 md8 class="mb-4">
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
        <br />
        <!-- Search Result (Cantos) -->
        <v-flex offset-md2 md8>
          <span class="title grey--text">{{ $t('home.search.result.cantoTitle', { resultCount: searchCantoTypeResults.length }) }}</span>
          <v-layout row wrap>
            <v-flex
              class="mt-2"
              md12
              v-for="searchCantoTypeResult in searchCantoTypeResults"
              :key="searchCantoTypeResult.id"
            >
              <tafalk-brief-canto-card
                :canto="searchCantoTypeResult"
              ></tafalk-brief-canto-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>

    <v-bottom-navigation
      app
      v-if="$vuetify.breakpoint.mdAndUp"
      color="teal"
      fixed
      :value="true"
      v-model="footerEl"
    >
      <v-btn :value=sealedValue>
        <span>{{ $t('home.bottomnav.sealed') }}</span>
        <v-icon>mdi-ghost-off</v-icon>
      </v-btn>
      <!--
      <v-btn text color="deep-orange lighten-1" :value=topRatedValue>
        <span>Popular</span>
        <v-icon>mdi-fire</v-icon>
      </v-btn>
      -->
      <v-btn v-if="authenticatedUser" :value=liveNowValue>
        <span>{{ $t('home.bottomnav.liveNow') }}</span>
        <v-icon>mdi-play-circle-outline</v-icon>
      </v-btn>
      <v-btn v-if="authenticatedUser" :value=byFaveUsersValue>
        <span>{{ $t('home.bottomnav.byFaveUsers') }}</span>
        <v-icon>mdi-star</v-icon>
      </v-btn>
      <v-btn :value=cantoValue>
        <span>{{ $t('home.bottomnav.cantos') }}</span>
        <v-icon>mdi-music</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <tafalk-new-fab v-if="authenticatedUser"></tafalk-new-fab>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import TafalkNewFab from '@/components/home/buttons/NewFab.vue'
import TafalkBriefStreamCard from '@/components/stream/cards/BriefStreamCard.vue'
import TafalkBriefCantoCard from '@/components/canto/cards/BriefCantoCard.vue'
import TafalkBriefUserCard from '@/components/user/cards/BriefUserCard.vue'
import TafalkPageLoadingProgress from '@/components/shared/progresses/ThePageLoading.vue'
import { homeStreamFetchLength } from '@/utils/constants'

export default {
  name: 'Content',
  data () {
    return {
      userTypeName: 'User',
      streamTypeName: 'Stream',
      cantoTypeName: 'Canto',
      footerEl: 'sealed',
      sealedValue: 'sealed',
      topRatedValue: 'toprated',
      liveNowValue: 'livenow',
      byFaveUsersValue: 'byfaveusers',
      cantoValue: 'cantos',
      fetchLimit: homeStreamFetchLength
    }
  },
  components: {
    TafalkNewFab,
    TafalkBriefStreamCard,
    TafalkBriefCantoCard,
    TafalkBriefUserCard,
    TafalkPageLoadingProgress
  },
  async created () {
    await this.fetchInitialSealedBriefStreams({ limit: this.fetchLimit, nextToken: null })
    this.setIsPageReady(true)
  },
  watch: {
    async '$route.query.type' (val) {
      if (this.sealedValue === val) {
        await this.fetchInitialSealedBriefStreams({ limit: this.fetchLimit, nextToken: null })
      } else if (this.liveNowValue === val) {
        await this.fetchInitialLiveBriefStreams({ limit: this.fetchLimit, nextToken: null })
      } else if (this.byFaveUsersValue === val) {
        await this.fetchInitialSealedBriefStreamsByFaveUsers({ limit: this.fetchLimit, nextToken: null })
      } else if (this.cantoValue === val) {
        await this.fetchInitialBriefCantos({ limit: this.fetchLimit, nextToken: null })
      }
    },
    footerEl (val, oldVal) {
      if (val == null || val === '' || val === oldVal) this.clearAll()

      // Clear search text if changed
      if (val !== oldVal) this.clearSearchText()

      this.$router.push({ name: 'content', query: { type: val } })
    }
  },
  computed: {
    ...mapGetters({
      getHasAcceptedCookies: 'getHasAcceptedCookies',
      getAuthenticatedUser: 'authenticatedUser/getUser',
      getSearchText: 'siteSearch/getSearchText',
      getIsSearchTextLongEnough: 'siteSearch/getIsSearchTextLongEnough',
      getStreamList: 'getStreamList',
      getCantoList: 'getCantoList',
      getSearchSiteResults: 'siteSearch/getSearchResults',
      getIsPageReady: 'getIsPageReady',
      getNextStreamToken: 'getNextStreamToken',
      getNextCantoToken: 'getNextCantoToken'
    }),
    authenticatedUser () {
      return this.getAuthenticatedUser
    },
    streamList () {
      return this.getStreamList
    },
    cantoList () {
      return this.getCantoList
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
    searchCantoTypeResults () {
      return this.searchResults.filter(r => r.__typename === this.cantoTypeName)
    },
    isStreamListType () {
      return [this.sealedValue, this.liveNowValue, this.byFaveUsersValue].includes(this.footerEl)
    },
    isCantoListType () {
      return [this.cantoValue].includes(this.footerEl)
    },
    nextStreamToken () {
      return this.getNextStreamToken
    },
    nextCantoToken () {
      return this.getNextCantoToken
    }
  },
  methods: {
    ...mapMutations({
      setIsPageReady: 'setIsPageReady',
      clearSearchText: 'siteSearch/clearSearchText'
    }),
    ...mapActions({
      fetchInitialSealedBriefStreams: 'fetchInitialSealedBriefStreams',
      fetchInitialLiveBriefStreams: 'fetchInitialLiveBriefStreams',
      fetchInitialSealedBriefStreamsByFaveUsers: 'fetchInitialSealedBriefStreamsByFaveUsers',
      fetchInitialBriefCantos: 'fetchInitialBriefCantos',
      fetchFurtherSealedBriefStreams: 'fetchFurtherSealedBriefStreams',
      fetchFurtherLiveBriefStreams: 'fetchFurtherLiveBriefStreams',
      fetchFurtherSealedBriefStreamsByFaveUsers: 'fetchFurtherSealedBriefStreamsByFaveUsers',
      fetchFurtherBriefCantos: 'fetchFurtherBriefCantos',
      clearAll: 'clearAll'
    }),
    async infiniteHomeHandler ($state) {
      // if no new things to load, complete
      if ((this.isStreamListType && this.nextStreamToken == null) || (this.isCantoListType && this.nextCantoToken == null)) {
        $state.complete()
      } else {
        if (this.footerEl === this.sealedValue) {
          await this.fetchFurtherSealedBriefStreams({ limit: this.fetchLimit, nextToken: this.nextStreamToken })
          $state.loaded()
        } else if (this.footerEl === this.liveNowValue) {
          await this.fetchFurtherLiveBriefStreams({ limit: this.fetchLimit, nextToken: this.nextStreamToken })
          $state.loaded()
        } else if (this.footerEl === this.byFaveUsersValue) {
          await this.fetchFurtherSealedBriefStreamsByFaveUsers({ limit: this.fetchLimit, nextToken: this.nextStreamToken })
          $state.loaded()
        } else if (this.footerEl === this.cantoValue) {
          await this.fetchFurtherBriefCantos({ limit: this.fetchLimit, nextToken: this.nextCantoToken })
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
