<template>
  <div>
    <v-card flat>
      <v-card-title class="display-1 font-weight-bold">{{
        $t('about.text')
      }}</v-card-title>
      <v-card-text v-html="content"></v-card-text>
    </v-card>
    <v-footer absolute height="auto" color="primary lighten-1">
      <v-row justify="center" no-gutters>
        <v-btn aria-label="About" color="white" text @click="onToAbout">
          {{ $t('about.text') }}
        </v-btn>
        <v-btn
          aria-label="Privacy Policy"
          color="white"
          text
          @click="onToPrivacyPolicy"
        >
          {{ $t('agreements.privacyPolicy.title') }}
        </v-btn>
        <v-btn
          aria-label="Terms of Service"
          color="white"
          text
          @click="onToTermsOfService"
        >
          {{ $t('agreements.termsOfService.title') }}
        </v-btn>
        <v-col class="primary lighten-2 py-3 text-center white--text" cols="12">
          &copy;{{ yearInterval }} — <strong>Tafalk!</strong>
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { GetBrowserLanguageInIso6391 } from '@/utils/generators'
import { copyrightStartYear } from '@/utils/constants'

export default {
  name: 'About',
  data() {
    return {
      content: null,
      s3AboutFolder: 'about',
      copyrightStartYear
    }
  },
  created() {
    const locale = this.$i18n.locale || GetBrowserLanguageInIso6391()
    this.$httpSitePoliciesStorage
      .get(`${this.s3AboutFolder}/${locale}.html`)
      .then(resp => {
        this.content = resp.data
      })
      .catch(err => {
        this.setNewSiteError(err.message || err)
      })
  },
  computed: {
    yearInterval() {
      if (new Date().getFullYear() > copyrightStartYear) {
        return `${copyrightStartYear}-${new Date().getFullYear()}`
      }
      return `${copyrightStartYear}`
    }
  },
  methods: {
    ...mapActions({
      setNewSiteError: 'shared/setNewSiteError'
    }),
    onToAbout() {
      this.$router.push({ name: 'about' })
    },
    onToPrivacyPolicy() {
      this.$router.push({ name: 'privacyPolicy' })
    },
    onToTermsOfService() {
      this.$router.push({ name: 'termsOfService' })
    }
  }
}
</script>
