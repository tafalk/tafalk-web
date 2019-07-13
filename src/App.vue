<template>
  <v-app>
    <tafalk-header/>
    <v-content>
      <v-container fluid mt-4 pa-0>
        <router-view/>
        <!-- site messages -->
        <tafalk-site-notification-snackbar/>
        <!-- site messages -->
        <tafalk-cookie-law-snackbar v-if="hasAcceptedCookies === 'false'"/>
        <!-- first visit intro dialog -->
        <tafalk-first-visit-intro-dialog v-if="hasVisitedBefore === 'false'"/>
      </v-container>
    </v-content>
    <footer app>
    </footer>
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
    // Set language
    if (this.authenticatedUser && this.authenticatedUser.language) {
      this.$i18n.locale = this.authenticatedUser.language
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
