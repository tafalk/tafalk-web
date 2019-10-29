<template>
  <v-dialog v-model="getIsPrivacyPolicyDialogVisible" max-width="80%">
    <v-card>
      <v-card-title class="title">{{ $t('agreements.privacyPolicy.title') }}</v-card-title>
      <v-card-text v-html="content">
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          aria-label="Ok"
          text
          color="purple"
          @click="setIsPrivacyPolicyDialogVisible(false)"
        >{{ $t('common.options.okButtonText') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'ThePrivacyPolicyDialog',
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
  computed: {
    ...mapGetters({
      getIsPrivacyPolicyDialogVisible: 'shared/getIsPrivacyPolicyDialogVisible'
    })
  },
  methods: {
    ...mapMutations({
      setIsPrivacyPolicyDialogVisible: 'shared/setIsPrivacyPolicyDialogVisible'
    }),
    ...mapActions({
      setNewSiteError: 'shared/setNewSiteError'
    })
  }

}
</script>
