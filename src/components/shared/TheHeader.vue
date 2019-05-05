<template>
  <v-toolbar flat fixed app extended extension-height="2">
    <!-- Progress bar to appear on route changes -->
    <v-progress-linear
      :active="isRouteChanging"
      height="2"
      slot="extension"
      :indeterminate="true">
    </v-progress-linear>
    <!-- Site name / logo -->
    <v-toolbar-title
      @click="onTitleClick"
      v-bind:style="{ 'cursor': 'pointer' }"
    >
      <TheLogo v-if="$vuetify.breakpoint.smAndUp" class="logo" />
      <TheSmallLogo v-else class="logo" />
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <!-- Search Area -->
    <v-text-field
      v-if="!isRouteChanging && isSearchBarVisible"
      :placeholder="$t('common.toolbar.searchPlaceholder')"
      prepend-icon="search"
      hide-details single-line
      v-model="searchText"
      @input="search"
    >
    </v-text-field>
    <v-spacer></v-spacer>
    <!-- Authenticated User Items -->
    <the-header-authenticated-user-items v-if="!isRouteChanging && authenticatedUser" />
    <!-- Unauthenticated User Items -->
    <the-header-unauthenticated-user-items v-else-if="!isRouteChanging && !authenticatedUser"/>
  </v-toolbar>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import TheLogo from '@/assets/logo.svg'
import TheSmallLogo from '@/assets/smlogo.svg'
import TheHeaderAuthenticatedUserItems from './items/TheHeaderAuthenticatedUserItems.vue'
import TheHeaderUnauthenticatedUserItems from '@/items/TheHeaderUnauthenticatedUserItems.vue'

export default {
  name: 'Header',
  data () {
    return {
      searchText: ''
    }
  },
  components: {
    TheLogo,
    TheSmallLogo,
    TheHeaderAuthenticatedUserItems,
    TheHeaderUnauthenticatedUserItems
  },
  computed: {
    ...mapGetters({
      getAuthenticatedUser: 'authenticatedUser/getUser',
      getCurrentRoutePath: 'route/getCurrentRoutePath',
      getIsRouteChanging: 'route/getIsRouteChanging',
      getSearchSiteResults: 'siteSearch/getSearchResults'
    }),
    authenticatedUser () {
      return this.getAuthenticatedUser
    },
    isRouteChanging () {
      return this.getIsRouteChanging
    },
    isSearchBarVisible () {
      const isHome = this.getCurrentRoutePath === '/' // home page
      return isHome && this.authenticatedUser != null
    },
    searchResults () {
      return this.getSearchSiteResults
    }
  },
  methods: {
    ...mapMutations({
      setAuthenticatedUser: 'authenticatedUser/setUser',
      clearSearchText: 'siteSearch/clearSearchText',
      clearSearchResults: 'siteSearch/clearSearchResults'
    }),
    ...mapActions({
      setSearchSiteResults: 'siteSearch/search'
    }),
    async search () {
      await this.setSearchSiteResults(this.searchText)
    },
    onTitleClick () {
      this.searchText = ''
      this.clearSearchText()
      this.clearSearchResults()
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style scoped>
.logo {
  margin-top: 10px;
}
</style>
