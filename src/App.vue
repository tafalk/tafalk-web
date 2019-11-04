<template>
  <VApp>
    <TafalkHeader />
    <VContent>
      <VContainer>
        <!-- content -->
        <router-view />
        <!-- site messages -->
        <TafalkSiteNotificationSnackbar />
        <!-- first visit intro dialog -->
        <TafalkFirstVisitIntroDialog v-if="hasVisitedBefore === 'false'" />
        <!-- cookie law -->
        <TafalkCookieLawSnackbar
          v-if="hasVisitedBefore === 'true' && hasAcceptedCookies === 'false'"
        />
      </VContainer>
    </VContent>
  </VApp>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TafalkHeader from '@/components/shared/TheHeader.vue'
import TafalkSiteNotificationSnackbar from '@/components/shared/snackbars/TheSiteNotification.vue'
import TafalkCookieLawSnackbar from '@/components/shared/snackbars/TheCookieLaw.vue'
import TafalkFirstVisitIntroDialog from '@/components/shared/dialogs/TheFirstVisitIntroDialog.vue'
import { introDismissedKey, cookiesAcceptedKey } from '@/utils/constants'

export default {
  name: 'App',
  components: {
    TafalkHeader,
    TafalkSiteNotificationSnackbar,
    TafalkCookieLawSnackbar,
    TafalkFirstVisitIntroDialog
  },
  data() {
    return {
      introDismissedKey,
      cookiesAcceptedKey
    }
  },
  created() {
    // Set time
    this.setNowTime()

    // Set language
    this.$i18n.locale = this.authenticatedUserLanguage

    // Set theme
    this.$vuetify.theme.dark = this.authenticatedUserTheme === 'dark'
  },
  mounted() {
    if (
      !localStorage.getItem(this.introDismissedKey) ||
      localStorage.getItem(this.introDismissedKey) !== 'true'
    ) {
      this.hasVisitedBefore = 'false'
    }
    if (
      !localStorage.getItem(this.cookiesAcceptedKey) ||
      localStorage.getItem(this.cookiesAcceptedKey) !== 'true'
    ) {
      this.hasAcceptedCookies = 'false'
    }
  },
  computed: {
    ...mapGetters({
      getAuthenticatedUser: 'authenticatedUser/getUser',
      getHasVisitedBefore: 'getHasVisitedBefore',
      getHasAcceptedCookies: 'getHasAcceptedCookies'
    }),
    authenticatedUser() {
      return this.getAuthenticatedUser
    },
    authenticatedUserTheme() {
      return this.authenticatedUser ? this.authenticatedUser.theme : 'light'
    },
    authenticatedUserLanguage() {
      return (this.authenticatedUser || {}).language
    },
    hasVisitedBefore: {
      get: function() {
        return this.getHasVisitedBefore
      },
      set: function(val) {
        this.setHasVisitedBefore(val)
      }
    },
    hasAcceptedCookies: {
      get: function() {
        return this.getHasAcceptedCookies
      },
      set: function(val) {
        this.setHasAcceptedCookies(val)
      }
    }
  },
  watch: {
    authenticatedUserTheme(val) {
      this.$vuetify.theme.dark = val === 'dark'
    }
  },
  methods: {
    ...mapActions({
      setNowTime: 'time/setNowTime',
      setHasVisitedBefore: 'setHasVisitedBefore',
      setHasAcceptedCookies: 'setHasAcceptedCookies'
    })
  }
}
</script>
