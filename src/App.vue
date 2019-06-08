<template>
  <v-app :dark="userTheme === 'dark'">
    <tafalk-header/>
    <v-content>
      <v-container fluid full-height mt-4 pa-0>
        <router-view/>
        <!-- site messages -->
        <tafalk-site-notification/>
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
import CookieLaw from 'vue-cookie-law'

export default {
  name: 'App',
  components: {
    TafalkHeader,
    // TafalkFooter,
    TafalkSiteNotification,
    CookieLaw
  },
  data () {
    return {
    }
  },
  created () {
    this.setNowTime()
  },
  computed: {
    ...mapGetters({
      getAuthenticatedUser: 'authenticatedUser/getUser'
    }),
    authenticatedUser () {
      return this.getAuthenticatedUser
    },
    userTheme () {
      return (this.authenticatedUser != null && this.authenticatedUser.theme != null) ? this.authenticatedUser.theme : 'light'
    }
  },
  methods: {
    ...mapActions({
      setNowTime: 'time/setNowTime'
    })
  }
}
</script>
