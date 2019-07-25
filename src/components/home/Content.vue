<template>
  <div class="home">
    <v-container grid-list-lg pt-5>
      <!-- full page loader -->
      <tafalk-page-loading-progress v-if="!getIsPageReady" />
      <!-- Regular Content -->
      <v-layout v-else-if="!searchText || searchText.length === 0" row wrap>
        <!-- Streams (No search) -->
        <v-flex offset-md2 md8 xs12 infinite-wrapper v-if="isStreamListType">
          <v-layout row wrap>
            <v-flex md12>
              <v-list>
                <template v-for="(stream, index) in streamList">
                  <tafalk-stream-list-item
                    :key="stream.id"
                    :displayType="listItemDisplayType"
                    :stream="stream"
                    :dense="denseItems"
                    :displayUserInfo="displayUserInfoInItems"
                  ></tafalk-stream-list-item>
                  <v-divider
                    v-if="index + 1 < streamList.length"
                    :key="index"
                  ></v-divider>
                </template>
              </v-list>
            </v-flex>
            <infinite-loading force-use-infinite-wrapper="true" @infinite="infiniteHomeHandler"></infinite-loading>
          </v-layout>
        </v-flex>
        <!-- Cantos (No search) -->
        <v-flex offset-md2 md8 xs12 infinite-wrapper v-else-if="isCantoListType">
          <v-layout row wrap>
            <v-flex md12>
              <v-list>
                <template v-for="(canto, index) in cantoList">
                  <tafalk-canto-list-item
                    :key="canto.id"
                    :displayType="listItemDisplayType"
                    :canto="canto"
                    :dense="denseItems"
                    :displayUserInfo="displayUserInfoInItems"
                    :showUserInteractionData="showUserInteractionDataForCantoItems"
                  ></tafalk-canto-list-item>
                  <v-divider
                    v-if="index + 1 < cantoList.length"
                    :key="index"
                  ></v-divider>
                </template>
              </v-list>
            </v-flex>
            <infinite-loading force-use-infinite-wrapper="true" @infinite="infiniteHomeHandler"></infinite-loading>
          </v-layout>
        </v-flex>
      </v-layout>
      <!-- Search Text Not Long Enough -->
      <v-layout v-else-if="!isSearchTextLongEnough" row wrap>
        <v-flex offset-md2 md8>
          <v-layout row wrap>
            <v-flex md12>
              <h1 class="grey--text">{{ $t('home.search.searchTextNotLongEnoughWarning') }}</h1>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <!-- No Results matching search -->
      <v-layout v-else-if="searchResults.length === 0" row wrap>
        <v-flex offset-md2 md8>
          <v-layout row wrap>
            <v-flex md12>
              <h1 class="grey--text">{{ $t('home.search.noResult', { searchText: searchText }) }}</h1>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <!-- Search Results -->
      <v-layout v-else row wrap>
        <!-- Search Result (Users) -->
        <v-flex offset-md2 md8 xs12 class="mb-4">
          <span class="title grey--text">{{ $t('home.search.result.userTitle', { resultCount: searchUserTypeResultList.length }) }}</span>
          <v-layout row wrap>
            <v-flex xs12 class="mt-2">
              <v-list>
                <template v-for="(searchUserTypeResult, index) in searchUserTypeResultList">
                  <tafalk-user-list-item
                    :key="searchUserTypeResult.id"
                    :displayType="listItemDisplayType"
                    :user="searchUserTypeResult"
                    :dense="denseItems"
                  ></tafalk-user-list-item>
                  <v-divider
                    v-if="index + 1 < searchUserTypeResultList.length"
                    :key="index"
                  ></v-divider>
                </template>
              </v-list>
            </v-flex>
          </v-layout>
        </v-flex>
        <br />
        <!-- Search Result (Streams) -->
        <v-flex offset-md2 md8 xs12 class="mb-4">
          <span class="title grey--text">{{ $t('home.search.result.streamTitle', { resultCount: searchStreamTypeResultList.length }) }}</span>
          <v-layout row wrap>
            <v-flex xs12 class="mt-2">
              <v-list>
                <template v-for="(searchStreamTypeResult, index) in searchStreamTypeResultList">
                  <tafalk-stream-list-item
                    :key="searchStreamTypeResult.id"
                    :displayType="listItemDisplayType"
                    :stream="searchStreamTypeResult"
                    :dense="denseItems"
                    :displayUserInfo="displayUserInfoInItems"
                  ></tafalk-stream-list-item>
                  <v-divider
                    v-if="index + 1 < searchStreamTypeResultList.length"
                    :key="index"
                  ></v-divider>
                </template>
              </v-list>
            </v-flex>
          </v-layout>
        </v-flex>
        <br />
        <!-- Search Result (Cantos) -->
        <v-flex offset-md2 md8 xs12>
          <span class="title grey--text">{{ $t('home.search.result.cantoTitle', { resultCount: searchCantoTypeResultList.length }) }}</span>
          <v-layout row wrap>
            <v-flex xs12 class="mt-2">
              <v-list>
                <template v-for="(searchCantoTypeResult, index) in searchCantoTypeResultList">
                  <tafalk-canto-list-item
                    :key="searchCantoTypeResult.id"
                    :displayType="listItemDisplayType"
                    :canto="searchCantoTypeResult"
                    :dense="denseItems"
                    :displayUserInfo="displayUserInfoInItems"
                    :showUserInteractionData="showUserInteractionDataForCantoItems"
                  ></tafalk-canto-list-item>
                  <v-divider
                    v-if="index + 1 < searchCantoTypeResultList.length"
                    :key="index"
                  ></v-divider>
                </template>
              </v-list>
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
      <v-btn :value="sealedValue">
        <span>{{ $t('home.bottomnav.sealed') }}</span>
        <v-icon>mdi-ghost-off</v-icon>
      </v-btn>
      <v-btn v-if="authenticatedUser" :value="liveNowValue">
        <span>{{ $t('home.bottomnav.liveNow') }}</span>
        <v-icon>mdi-play-circle-outline</v-icon>
      </v-btn>
      <v-btn :value="cantoValue">
        <span>{{ $t('home.bottomnav.cantos') }}</span>
        <v-icon>mdi-music</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <!-- Add new item button -->
    <tafalk-new-fab v-if="authenticatedUser"></tafalk-new-fab>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import TafalkNewFab from '@/components/home/buttons/NewFab.vue'
import TafalkStreamListItem from '@/components/stream/listitems/StreamListItem.vue'
import TafalkCantoListItem from '@/components/canto/listitems/CantoListItem.vue'
import TafalkUserListItem from '@/components/user/listitems/UserListItem.vue'
import TafalkPageLoadingProgress from '@/components/shared/progresses/ThePageLoading.vue'
import { homeStreamFetchLength } from '@/utils/constants'

export default {
  name: 'Content',
  data () {
    return {
      listItemDisplayType: 'card', // other option: item
      userTypeName: 'User',
      streamTypeName: 'Stream',
      cantoTypeName: 'Canto',
      footerEl: null,
      sealedValue: 'sealed',
      topRatedValue: 'toprated',
      liveNowValue: 'livenow',
      byFaveUsersValue: 'byfaveusers',
      cantoValue: 'cantos',
      fetchLimit: homeStreamFetchLength,
      denseItems: false,
      displayUserInfoInItems: true,
      showUserInteractionDataForCantoItems: true
    }
  },
  components: {
    TafalkNewFab,
    TafalkStreamListItem,
    TafalkCantoListItem,
    TafalkUserListItem,
    TafalkPageLoadingProgress
  },
  async created () {
    const typeQueryVal = this.$route.query.type
    this.footerEl = typeQueryVal || this.sealedValue
    await this.fetchInitial(typeQueryVal)
    this.setIsPageReady(true)
  },
  watch: {
    async '$route.query.type' (val) {
      await this.fetchInitial(val)
    },
    async footerEl (val, oldVal) {
      if (val == null || val === '' || val === oldVal) {
        await this.clearAll()
      }

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
    searchUserTypeResultList () {
      return this.searchResults.filter(r => r.__typename === this.userTypeName)
    },
    searchStreamTypeResultList () {
      return this.searchResults.filter(r => r.__typename === this.streamTypeName)
    },
    searchCantoTypeResultList () {
      return this.searchResults.filter(r => r.__typename === this.cantoTypeName)
    },
    isStreamListType () {
      return [this.sealedValue, this.liveNowValue].includes(this.footerEl)
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
    async fetchInitial (val) {
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
