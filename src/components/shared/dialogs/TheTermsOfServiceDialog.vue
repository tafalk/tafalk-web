<template>
  <v-dialog v-model="getIsTermsOfServiceDialogVisible" max-width="80%">
    <v-card>
      <v-card-title class="title">{{ $t('agreements.termsOfService.title') }}</v-card-title>
      <v-card-text v-html="content">
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          color="purple"
          @click="setIsTermsOfServiceDialogVisible(false)"
        >{{ $t('common.options.okButtonText') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'TheTermsOfServiceDialog',
  data () {
    return {
      content: null,
      s3TermsOfUseFolder: 'terms-of-use'
    }
  },
  created () {
    this.$httpSitePoliciesStorage.get(`${this.s3TermsOfUseFolder}/${this.$i18n.locale}.html`).then(resp => {
      this.content = resp.data
    }).catch(err => {
      this.setNewSiteError(err.message || err)
    })
  },
  computed: {
    ...mapGetters({
      getIsTermsOfServiceDialogVisible: 'shared/getIsTermsOfServiceDialogVisible'
    })
  },
  methods: {
    ...mapMutations({
      setIsTermsOfServiceDialogVisible: 'shared/setIsTermsOfServiceDialogVisible'
    }),
    ...mapActions({
      setNewSiteError: 'shared/setNewSiteError'
    })
  }

}
</script>
