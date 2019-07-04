<template>
  <v-card flat>
    <v-card-text v-html="content"></v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'About',
  data () {
    return {
      content: null,
      s3PrivacyPolicyFolder: 'privacy-policy'
    }
  },
  created () {
    this.$httpSitePoliciesStorage.get(`${this.s3PrivacyPolicyFolder}/${this.$i18n.locale}.html`).then(resp => {
      this.content = resp.data
    }).catch(err => {
      this.setNewSiteError(err.message || err)
    })
  },
  methods: {
    ...mapActions({
      setNewSiteError: 'shared/setNewSiteError'
    })
  }

}
</script>
