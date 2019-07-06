<template>
  <v-app :dark="userTheme === 'dark'">
    <tafalk-header/>
    <v-content>
      <v-container fluid full-height mt-4 pa-0>
        <router-view/>
        <!-- site messages -->
        <tafalk-site-notification/>
        <!-- first visit intro dialog -->
        <tafalk-first-visit-intro-dialog v-if="hasVisitedBefore === 'false'"/>
      </v-container>
    </v-content>
    <footer>
      <cookie-law
        theme="dark-lime"
        :buttonText="$t('common.footer.cookieLaw.buttonText')"
        :message="$t('common.footer.cookieLaw.message')"
      ></cookie-law>
    </footer>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TafalkHeader from '@/components/shared/TheHeader.vue'
// import TafalkFooter from '@/components/shared/TheFooter.vue'
import TafalkSiteNotification from '@/components/shared/TheSiteNotification.vue'
import TafalkFirstVisitIntroDialog from '@/components/shared/dialogs/TheFirstVisitIntroDialog.vue'
import CookieLaw from 'vue-cookie-law'

export default {
  name: 'App',
  components: {
    TafalkHeader,
    // TafalkFooter,
    TafalkSiteNotification,
    TafalkFirstVisitIntroDialog,
    CookieLaw
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
  },
  computed: {
    ...mapGetters({
      getAuthenticatedUser: 'authenticatedUser/getUser',
      getHasVisitedBefore: 'getHasVisitedBefore'
    }),
    authenticatedUser () {
      return this.getAuthenticatedUser
    },
    userTheme () {
      return (this.authenticatedUser != null && this.authenticatedUser.theme != null) ? this.authenticatedUser.theme : 'light'
    },
    hasVisitedBefore: {
      get: function () {
        return this.getHasVisitedBefore
      },
      set: function (val) {
        this.setHasVisitedBefore(val)
      }
    }
  },
  methods: {
    ...mapActions({
      setNowTime: 'time/setNowTime',
      setHasVisitedBefore: 'setHasVisitedBefore'
    })
  }
}
</script>
