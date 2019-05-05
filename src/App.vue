<template>
  <v-app :dark="userTheme === 'dark'">
    <tafalk-header/>
    <v-content>
      <v-container fluid full-height>
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
import TafalkHeader from '@/components/shared/TheHeader.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    return {
      //
    }
  }
}
</script>
