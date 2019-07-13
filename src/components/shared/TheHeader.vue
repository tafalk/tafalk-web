<template>
<div>
  <v-system-bar app height="30" color="deep-purple darken-3"></v-system-bar>
  <v-app-bar
    flat
    fixed
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
      @click:prepend="onSearchBackButtonClick"
      @click:clear="clearSearchText"
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
      text
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
  </v-app-bar>
  <v-navigation-drawer
    app
    clipped
    right
    v-model="menuDrawer"
    temporary
    id = "drawer"
  >
    <v-list rounded class="pt-0">
      <!-- Mobile only stream filters -->
      <v-list-item
        v-if="$vuetify.breakpoint.smAndDown"
        @click="onSealedStreamsClick"
      >
        <v-list-item-action>
          <v-icon color="teal">mdi-ghost-off</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-subtitle class="teal--text">{{ $t('home.bottomnav.sealed') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        v-if="$vuetify.breakpoint.smAndDown && authenticatedUser"
        @click="onLiveStreamsClick"
      >
        <v-list-item-action>
          <v-icon color="red darken-1">mdi-play-circle-outline</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-subtitle class="red--text text--darken-1">{{ $t('home.bottomnav.liveNow') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        v-if="$vuetify.breakpoint.smAndDown && authenticatedUser"
        @click="onByFaveOtherStreamsClick"
      >
        <v-list-item-action>
          <v-icon color="purple darken-2">mdi-star</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-subtitle class="purple--text text--darken-2">{{ $t('home.bottomnav.byFaveUsers') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        v-if="$vuetify.breakpoint.smAndDown"
        @click="onCantosClick"
      >
        <v-list-item-action>
          <v-icon color="cyan">mdi-music</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-subtitle class="teal--text">{{ $t('home.bottomnav.cantos') }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider v-if="$vuetify.breakpoint.smAndDown"/>
      <!-- Site meta -->
      <!-- Language -->
      <v-list-item
        v-if="authenticatedUser"
        @click="onShowLanguageChooseDialogClick"
      >
        <v-list-item-title>{{ $t('siteLanguage.text') }}</v-list-item-title>
      </v-list-item>

      <!-- Dark Mode Switch -->
      <v-list-item
        v-if="authenticatedUser"
      >
        <v-list-item-title>{{ $t('theme.darkMode.text') }}</v-list-item-title>
        &nbsp;&nbsp;
        <v-list-item-action>
          <v-switch color="primary" v-model="isDarkTheme"></v-switch>
        </v-list-item-action>
      </v-list-item>

      <!-- About -->
      <v-list-item
        @click="onAboutClick"
      >
        <v-list-item-title>{{ $t('about.text') }}</v-list-item-title>
      </v-list-item>

      <!-- Log Out -->
      <v-list-item
        v-if="authenticatedUser"
        @click="setIsLogoutConfirmationDialogVisible(true)"
      >
        <v-list-item-title>{{ $t('auth.logout.text') }}</v-list-item-title>
      </v-list-item>
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
    const isUserThemeDark = this.authenticatedUser.theme === 'dark'
    this.$vuetify.theme.dark = isUserThemeDark
    this.isDarkTheme = isUserThemeDark
  },
  computed: {
    ...mapGetters({
      getAuthenticatedUser: 'authenticatedUser/getUser',
      getCurrentRoutePath: 'route/getCurrentRoutePath',
      getIsRouteChanging: 'route/getIsRouteChanging',
      getSearchText: 'siteSearch/getSearchText',
      getSearchSiteResults: 'siteSearch/getSearchResults',
      getMenuDrawer: 'shared/getMenuDrawer'
    }),
    searchText: {
      get: function () {
        return this.getSearchText
      },
      set: function (val) {
        this.setSearchText(val)
      }
    },
    authenticatedUser () {
      return this.getAuthenticatedUser
    },
    isRouteChanging () {
      return this.getIsRouteChanging
    },
    isHome () {
      return this.getCurrentRoutePath === '/' || this.getCurrentRoutePath.startsWith('/content')
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

      this.$vuetify.theme.dark = val
    }
  },
  methods: {
    ...mapMutations({
      setAuthenticatedUser: 'authenticatedUser/setUser',
      setSearchText: 'siteSearch/setSearchText',
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
      fetchInitialBriefCantos: 'fetchInitialBriefCantos',
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
    async onCantosClick () {
      this.clearSearchComponents()
      await this.fetchInitialBriefCantos({ limit: this.fetchLimit, nextToken: null })
      this.setMenuDrawer(false)
    },
    onSearchBackButtonClick () {
      this.clearSearchComponents()
      this.isMobileSearchHeaderOn = false
    },
    clearSearchComponents () {
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
