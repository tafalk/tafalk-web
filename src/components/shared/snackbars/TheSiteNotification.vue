<template>
  <v-snackbar
    v-model="isSiteNotificationVisible"
    :color="siteNotificationType"
    auto-height
    :timeout="siteNotificationTimeout"
  >
  {{ siteNotificationText }}
    <v-btn
      dark
      text
      icon
      @click="setIsSiteNotificationVisible(false)"
    >
      mdi-close-circle
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'TheSiteNotification',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      getSiteNotification: 'shared/getSiteNotification'
    }),
    isSiteNotificationVisible: {
      // getter
      get: function () {
        return this.getSiteNotification.isSiteNotificationVisible
      },
      // setter
      set: function (newValue) {
        this.setIsSiteNotificationVisible(newValue)
      }
    },
    siteNotificationText () {
      return this.getSiteNotification.siteNotificationText
    },
    siteNotificationType () {
      return this.getSiteNotification.siteNotificationType
    },
    siteNotificationTimeout () {
      return this.getSiteNotification.siteNotificationTimeout
    }
  },
  watch: {
    isSiteNotificationVisible (val) {
      if (!val) {
        this.clearSiteNotification()
      }
    }
  },
  methods: {
    ...mapMutations({
      clearSiteNotification: 'shared/clearSiteNotification',
      setIsSiteNotificationVisible: 'shared/setIsSiteNotificationVisible'
    })
  }
}
</script>
