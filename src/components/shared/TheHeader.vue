<template>
<div>
  <v-toolbar
    flat
    fixed
    app
    extended
    extension-height="2"
  >
    <!-- Progress bar to appear on route changes -->
    <v-progress-linear
      :active="isRouteChanging"
      height="2"
      slot="extension"
      :indeterminate="true">
    </v-progress-linear>

    <!-- Mobile search (removes all on small screens when on ) -->
    <v-text-field
      v-if="isMobileSearchHeaderOn && $vuetify.breakpoint.smAndDown"
      single-line
      clearable
      prepend-icon="mdi-arrow-left"
      :placeholder="$t('common.toolbar.searchPlaceholder')"
      v-model="searchText"
      @input="search"
      @click:prepend="isMobileSearchHeaderOn = false"
      @click:clear="searchText = ''"
    ></v-text-field>

    <!-- Site name / logo -->
    <v-toolbar-title
      v-if="!isMobileSearchHeaderOn"
      @click="onTitleClick"
      v-bind:style="{ 'cursor': 'pointer' }"
    >
      <TheLogo v-if="$vuetify.breakpoint.mdAndUp" class="logo" />
      <TheSmallLogo v-else class="logo" />
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <!-- Search Area -->
    <v-text-field
      v-if="!isRouteChanging && isSearchBarVisible && $vuetify.breakpoint.mdAndUp"
      :placeholder="$t('common.toolbar.searchPlaceholder')"
      prepend-icon="mdi-magnify"
      hide-details
      single-line
      v-model="searchText"
      @input="search"
    />
    <v-btn
      v-if="!isRouteChanging && isSearchBarVisible && $vuetify.breakpoint.smAndDown && !isMobileSearchHeaderOn"
      flat
      icon
      small
      @click="onMobileSearchHeaderOnClick"
    >
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-spacer />
    <!-- Authenticated User Items -->
    <the-header-authenticated-user-items v-if="!isRouteChanging && authenticatedUser && !isMobileSearchHeaderOn" />
    <!-- Unauthenticated User Items -->
    <the-header-unauthenticated-user-items v-else-if="!isRouteChanging && !authenticatedUser && !isMobileSearchHeaderOn"/>
  </v-toolbar>
  <v-navigation-drawer
    clipped
    right
    v-model="menuDrawer"
    temporary
    absolute
    width = "200"
    id = "drawer"
  >
    <v-list dense class="pt-0">
      <!-- Mobile only stream filters -->
      <v-list-tile
        v-if="$vuetify.breakpoint.smAndDown"
        @click="onSealedStreamsClick"
      >
        <v-list-tile-action>
          <v-icon color="teal">mdi-apps</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-sub-title class="teal--text">{{ $t('home.bottomnav.all') }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile
        v-if="$vuetify.breakpoint.smAndDown && authenticatedUser"
        @click="onLiveStreamsClick"
      >
        <v-list-tile-action>
          <v-icon color="red darken-1">mdi-play-circle-outline</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-sub-title class="red--text text--darken-1">{{ $t('home.bottomnav.liveNow') }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile
        v-if="$vuetify.breakpoint.smAndDown && authenticatedUser"
        @click="onByFaveOtherStreamsClick"
      >
        <v-list-tile-action>
          <v-icon color="purple darken-2">mdi-star</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-sub-title class="purple--text text--darken-2">{{ $t('home.bottomnav.byFaveUsers') }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider v-if="$vuetify.breakpoint.smAndDown"/>
      <!-- Site meta -->
      <!-- Language -->
      <v-list-tile
        v-if="authenticatedUser"
        @click="onShowLanguageChooseDialogClick"
      >
        <v-list-tile-title>{{ $t('siteLanguage.text') }}</v-list-tile-title>
      </v-list-tile>

      <!-- Dark Mode Switch -->
      <v-list-tile
        v-if="authenticatedUser"
      >
        <v-list-tile-title>{{ $t('theme.darkMode.text') }}</v-list-tile-title>
        &nbsp;&nbsp;
        <v-list-tile-action>
          <v-switch color="primary" v-model="isDarkTheme"></v-switch>
        </v-list-tile-action>
      </v-list-tile>

      <!-- About -->
      <v-list-tile
        @click="onAboutClick"
      >
        <v-list-tile-title>{{ $t('about.text') }}</v-list-tile-title>
      </v-list-tile>

      <!-- Log Out -->
      <v-list-tile
        v-if="authenticatedUser"
        @click="setIsLogoutConfirmationDialogVisible(true)"
      >
        <v-list-tile-title>{{ $t('auth.logout.text') }}</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import TheLogo from '@/assets/logo.svg'
import TheSmallLogo from '@/assets/smlogo.svg'
import { homeStreamFetchLength } from '@/utils/constants'
import TheHeaderAuthenticatedUserItems from './items/TheHeaderAuthenticatedUserItems.vue'
import TheHeaderUnauthenticatedUserItems from './items/TheHeaderUnauthenticatedUserItems.vue'

export default {
  name: 'Header',
  data () {
    return {
      searchText: '',
      fetchLimit: homeStreamFetchLength,
      isDarkTheme: false,
      isMobileSearchHeaderOn: false
    }
  },
  components: {
    TheLogo,
    TheSmallLogo,
    TheHeaderAuthenticatedUserItems,
    TheHeaderUnauthenticatedUserItems
  },
  created () {
    if (!this.authenticatedUser) return
    this.isDarkTheme = this.authenticatedUser.theme === 'dark'
  },
  computed: {
    ...mapGetters({
      getAuthenticatedUser: 'authenticatedUser/getUser',
      getCurrentRoutePath: 'route/getCurrentRoutePath',
      getIsRouteChanging: 'route/getIsRouteChanging',
      getSearchSiteResults: 'siteSearch/getSearchResults',
      getMenuDrawer: 'shared/getMenuDrawer'
    }),
    authenticatedUser () {
      return this.getAuthenticatedUser
    },
    isRouteChanging () {
      return this.getIsRouteChanging
    },
    isHome () {
      return this.getCurrentRoutePath === '/' // home page
    },
    isSearchBarVisible () {
      return this.isHome && this.authenticatedUser != null
    },
    searchResults () {
      return this.getSearchSiteResults
    },
    menuDrawer: {
      get: function () {
        return this.getMenuDrawer
      },
      set: function (newVal) {
        this.setMenuDrawer(newVal)
      }
    }
  },
  watch: {
    async isDarkTheme (val) {
      const selectedTheme = val ? 'dark' : 'light'

      await this.setTheme({
        userId: this.authenticatedUser.id,
        theme: selectedTheme
      })
    }
  },
  methods: {
    ...mapMutations({
      setAuthenticatedUser: 'authenticatedUser/setUser',
      clearSearchText: 'siteSearch/clearSearchText',
      clearSearchResults: 'siteSearch/clearSearchResults',
      setIsLogoutConfirmationDialogVisible: 'authenticatedUser/dialog/setIsLogoutConfirmationDialogVisible',
      setIsLanguageChooseDialogVisible: 'authenticatedUser/dialog/setIsLanguageChooseDialogVisible',
      setMenuDrawer: 'shared/setMenuDrawer'
    }),
    ...mapActions({
      setSearchSiteResults: 'siteSearch/search',
      fetchInitialSealedBriefStreams: 'fetchInitialSealedBriefStreams',
      fetchInitialLiveBriefStreams: 'fetchInitialLiveBriefStreams',
      fetchInitialSealedBriefStreamsByFaveUsers: 'fetchInitialSealedBriefStreamsByFaveUsers',
      setTheme: 'authenticatedUser/setTheme'
    }),
    async search () {
      await this.setSearchSiteResults(this.searchText)
    },
    onTitleClick () {
      this.clearSearchComponents()
      this.$router.push({ name: 'home' })
    },
    onAboutClick () {
      this.$router.push({ name: 'about' })
    },
    onShowLanguageChooseDialogClick () {
      this.setMenuDrawer(false)
      this.setIsLanguageChooseDialogVisible(true)
    },
    onMobileSearchHeaderOnClick () {
      this.isMobileSearchHeaderOn = true
    },
    async onSealedStreamsClick () {
      this.clearSearchComponents()
      await this.fetchInitialSealedBriefStreams({ limit: this.fetchLimit, nextToken: null })
      this.setMenuDrawer(false)
    },
    async onLiveStreamsClick () {
      this.clearSearchComponents()
      await this.fetchInitialLiveBriefStreams({ limit: this.fetchLimit, nextToken: null })
      this.setMenuDrawer(false)
    },
    async onByFaveOtherStreamsClick () {
      this.clearSearchComponents()
      await this.fetchInitialSealedBriefStreamsByFaveUsers({ limit: this.fetchLimit, nextToken: null })
      this.setMenuDrawer(false)
    },
    clearSearchComponents () {
      this.searchText = ''
      this.clearSearchText()
      this.clearSearchResults()
    }
  }
}
</script>

<style scoped>
.logo {
  margin-top: 10px;
}
</style>
