<template>
  <v-app>
    <tafalk-header/>
    <v-content>
      <v-container fluid my-4 py-2>

        <!-- content -->
        <router-view/>
        <!-- site messages -->
        <tafalk-site-notification-snackbar/>
        <!-- first visit intro dialog -->
        <tafalk-first-visit-intro-dialog v-if="hasVisitedBefore === 'false'"/>
        <!-- cookie law -->
        <tafalk-cookie-law-snackbar v-if="hasVisitedBefore === 'true' && hasAcceptedCookies === 'false'"/>
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TafalkHeader from '@/components/shared/TheHeader.vue'
// import TafalkFooter from '@/components/shared/TheFooter.vue'
import TafalkSiteNotificationSnackbar from '@/components/shared/snackbars/TheSiteNotification.vue'
import TafalkCookieLawSnackbar from '@/components/shared/snackbars/TheCookieLaw.vue'
import TafalkFirstVisitIntroDialog from '@/components/shared/dialogs/TheFirstVisitIntroDialog.vue'

export default {
  name: 'App',
  components: {
    TafalkHeader,
    // TafalkFooter,
    TafalkSiteNotificationSnackbar,
    TafalkCookieLawSnackbar,
    TafalkFirstVisitIntroDialog
  },
  data () {
    return {
    }
  },
  created () {
    // Set time
    this.setNowTime()

    if (this.authenticatedUser) {
      // Set language
      if (this.authenticatedUser.language) {
        this.$i18n.locale = this.authenticatedUser.language
      }
      // Set theme
      if (this.authenticatedUser.theme) {
        this.$vuetify.theme.dark = this.authenticatedUser.theme === 'dark'
      }
    }
  },
  mounted () {
    if (localStorage.getItem('intro:dismissed') == null || localStorage.getItem('intro:dismissed') !== 'true') {
      this.hasVisitedBefore = 'false'
    }
    if (localStorage.getItem('cookies:accepted') == null || localStorage.getItem('cookies:accepted') !== 'true') {
      this.hasAcceptedCookies = 'false'
    }
  },
  computed: {
    ...mapGetters({
      getAuthenticatedUser: 'authenticatedUser/getUser',
      getHasVisitedBefore: 'getHasVisitedBefore',
      getHasAcceptedCookies: 'getHasAcceptedCookies'
    }),
    authenticatedUser () {
      return this.getAuthenticatedUser
    },
    hasVisitedBefore: {
      get: function () {
        return this.getHasVisitedBefore
      },
      set: function (val) {
        this.setHasVisitedBefore(val)
      }
    },
    hasAcceptedCookies: {
      get: function () {
        return this.getHasAcceptedCookies
      },
      set: function (val) {
        this.setHasAcceptedCookies(val)
      }
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
