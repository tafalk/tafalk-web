<template>
<div>
  <v-card flat>
    <v-card-title class="display-1 font-weight-bold">{{ $t('about.text') }}</v-card-title>
    <v-card-text v-html="content"></v-card-text>
  </v-card>
  <v-footer absolute height="auto" color="primary lighten-1">
    <v-layout justify-center row wrap>
      <v-btn color="white" text @click="onToAbout">
        {{ $t('about.text') }}
      </v-btn>
      <v-btn color="white" text @click="onToPrivacyPolicy">
        {{ $t('agreements.privacyPolicy.title') }}
      </v-btn>
      <v-btn color="white" text @click="onToTermsOfService">
        {{ $t('agreements.termsOfService.title') }}
      </v-btn>
      <v-flex xs12 primary lighten-2 text-xs-center py-3 white--text>
        &copy;{{ yearInterval }} — <strong>Tafalk!</strong>
      </v-flex>
    </v-layout>
  </v-footer>
</div>
</template>

<script>
import { mapActions } from 'vuex'
import { copyrightStartYear } from '@/utils/constants'

export default {
  name: 'About',
  data () {
    return {
      content: null,
      s3AboutFolder: 'about',
      copyrightStartYear
    }
  },
  created () {
    this.$httpSitePoliciesStorage.get(`${this.s3AboutFolder}/${this.$i18n.locale}.html`).then(resp => {
      this.content = resp.data
    }).catch(err => {
      this.setNewSiteError(err.message || err)
    })
  },
  computed: {
    yearInterval () {
      if (new Date().getFullYear() > copyrightStartYear) {
        return copyrightStartYear + '-' + new Date().getFullYear()
      }
      return copyrightStartYear.toString()
    }
  },
  methods: {
    ...mapActions({
      setNewSiteError: 'shared/setNewSiteError'
    }),
    onToAbout () {
      this.$router.push({ name: 'about' })
    },
    onToPrivacyPolicy () {
      this.$router.push({ name: 'privacyPolicy' })
    },
    onToTermsOfService () {
      this.$router.push({ name: 'termsOfService' })
    }
  }

}
</script>
