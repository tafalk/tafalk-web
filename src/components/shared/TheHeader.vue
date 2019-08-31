<template>
<div>
  <v-toolbar
    dense
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
    <v-container fluid v-if="isMobileSearchHeaderOn && $vuetify.breakpoint.smAndDown">
      <v-text-field
        single-line
        clearable
        prepend-icon="mdi-arrow-left"
        :placeholder="$t('common.toolbar.searchPlaceholder')"
        v-model="searchText"
        @input="search"
        @click:prepend="onSearchBackButtonClick"
        @click:clear="clearSearchText"
      ></v-text-field>
    </v-container>

    <!-- Site name / logo -->
    <v-toolbar-title
      v-if="!isMobileSearchHeaderOn"
      @click="onTitleClick"
      :style="{ 'cursor': 'pointer' }"
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
  </v-toolbar>
  <v-navigation-drawer
    app
    clipped
    right
    v-model="menuDrawer"
    temporary
    id = "drawer"
  >
    <v-list nav class="pt-0">
      <!-- Mobile only stream filters -->
      <v-subheader v-if="$vuetify.breakpoint.smAndDown">{{ $t('common.toolbar.menu.contentsSubheader') }}</v-subheader>
      <v-list-item-group v-model="menuContentEl" v-if="$vuetify.breakpoint.smAndDown">
        <v-list-item
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
          v-if="authenticatedUser"
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
          @click="onCantosClick"
        >
          <v-list-item-action>
            <v-icon color="cyan">mdi-music</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-subtitle class="teal--text">{{ $t('home.bottomnav.cantos') }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <!-- Site meta -->
      <!-- Language -->
      <v-divider v-if="$vuetify.breakpoint.smAndDown"/>
      <v-subheader>{{ $t('common.toolbar.menu.settingsSubheader') }}</v-subheader>
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
          <v-switch color="primary" v-model="authenticatedUserTheme"></v-switch>
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
      isMobileSearchHeaderOn: false,
      menuContentEl: null,
      sealedValue: 'sealed',
      topRatedValue: 'toprated',
      liveNowValue: 'livenow',
      byFaveUsersValue: 'byfaveusers',
      cantoValue: 'cantos'
    }
  },
  components: {
    TheLogo,
    TheSmallLogo,
    TheHeaderAuthenticatedUserItems,
    TheHeaderUnauthenticatedUserItems
  },
  created () {
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
    authenticatedUserTheme: {
      get: function () {
        return this.authenticatedUser && this.authenticatedUser.theme === 'dark'
      },
      set: async function (val) {
        const selectedTheme = val ? 'dark' : 'light'
        this.setTheme({
          userId: this.authenticatedUser.id,
          theme: selectedTheme
        }).finally(() => {
          this.$vuetify.theme.dark = val
        })
      }
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
    '$route.query.type' (val) {
      // TODO: programmatically highlight
      // this.menuContentEl = val ? this.menuContentDict[val] : this.menuContentDict[this.sealedValue]
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
      setTheme: 'authenticatedUser/setTheme',
      clearAll: 'clearAll'
    }),
    async search () {
      await this.setSearchSiteResults(this.searchText)
    },
    onTitleClick () {
      this.clearSearchTextAndResults()
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
    onSealedStreamsClick () {
      this.clearSearchTextAndResults()
      // this.clearAll()
      this.$router.push({ name: 'content', query: { type: this.sealedValue } })
      this.setMenuDrawer(false)
    },
    onLiveStreamsClick () {
      this.clearSearchTextAndResults()
      // this.clearAll()
      this.$router.push({ name: 'content', query: { type: this.liveNowValue } })
      this.setMenuDrawer(false)
    },
    onCantosClick () {
      this.clearSearchTextAndResults()
      // this.clearAll()
      this.$router.push({ name: 'content', query: { type: this.cantoValue } })
      this.setMenuDrawer(false)
    },
    onSearchBackButtonClick () {
      this.clearSearchTextAndResults()
      this.isMobileSearchHeaderOn = false
    },
    clearSearchTextAndResults () {
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
