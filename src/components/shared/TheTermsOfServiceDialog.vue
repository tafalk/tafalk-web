<template>
  <v-dialog v-model="getIsTermsOfServiceDialogVisible" max-width="80%">
    <v-card>
      <v-card-title class="title">{{ $t('agreements.termsOfService.title') }}</v-card-title>
      <v-card-text>
        <p v-html="$t('agreements.termsOfService.body.intro1')"></p>
        <p v-html="$t('agreements.termsOfService.body.intro2')"></p>
        <p v-html="$t('agreements.termsOfService.body.intro3')"></p>
        <p v-html="$t('agreements.termsOfService.body.intro4')"></p>
        <p v-html="$t('agreements.termsOfService.body.intro5')"></p>

        <h2 v-html="$t('agreements.termsOfService.body.accessToSite0')"></h2>
        <p v-html="$t('agreements.termsOfService.body.accessToSite1')"></p>
        <p v-html="$t('agreements.termsOfService.body.accessToSite2')"></p>
        <p v-html="$t('agreements.termsOfService.body.accessToSite3')"></p>
        <p v-html="$t('agreements.termsOfService.body.accessToSite4')"></p>
        <p v-html="$t('agreements.termsOfService.body.accessToSite5')"></p>

        <h2 v-html="$t('agreements.termsOfService.body.userContent0')"></h2>
        <p v-html="$t('agreements.termsOfService.body.userContent1')"></p>
        <p v-html="$t('agreements.termsOfService.body.userContent2')"></p>
        <p v-html="$t('agreements.termsOfService.body.userContent3')"></p>
        <p v-html="$t('agreements.termsOfService.body.userContent4')"></p>
        <p v-html="$t('agreements.termsOfService.body.userContent5')"></p>
        <p v-html="$t('agreements.termsOfService.body.userContent6')"></p>
        <p v-html="$t('agreements.termsOfService.body.userContent7')"></p>

        <h2 v-html="$t('agreements.termsOfService.body.thirdPartyLinksAndAds0')"></h2>
        <p v-html="$t('agreements.termsOfService.body.thirdPartyLinksAndAds1')"></p>
        <p v-html="$t('agreements.termsOfService.body.thirdPartyLinksAndAds2')"></p>
        <p v-html="$t('agreements.termsOfService.body.thirdPartyLinksAndAds3')"></p>
        <p v-html="$t('agreements.termsOfService.body.thirdPartyLinksAndAds4')"></p>
        <p v-html="$t('agreements.termsOfService.body.thirdPartyLinksAndAds5')"></p>

        <h2 v-html="$t('agreements.termsOfService.body.disclaimers0')"></h2>
        <p v-html="$t('agreements.termsOfService.body.disclaimers1')"></p>
        <p v-html="$t('agreements.termsOfService.body.disclaimers2')"></p>

        <h2 v-html="$t('agreements.termsOfService.body.limitation0')"></h2>
        <p v-html="$t('agreements.termsOfService.body.limitation1')"></p>
        <p v-html="$t('agreements.termsOfService.body.limitation2')"></p>
        <p v-html="$t('agreements.termsOfService.body.limitation3')"></p>
        <p v-html="$t('agreements.termsOfService.body.limitation4')"></p>

        <h2 v-html="$t('agreements.termsOfService.body.copyright0')"></h2>
        <p v-html="$t('agreements.termsOfService.body.copyright1')"></p>
        <ul v-html="$t('agreements.termsOfService.body.copyright2')"></ul>
        <p v-html="$t('agreements.termsOfService.body.copyright3')"></p>

        <h2 v-html="$t('agreements.termsOfService.body.general0')"></h2>
        <p v-html="$t('agreements.termsOfService.body.general1')"></p>
        <p v-html="$t('agreements.termsOfService.body.general2')"></p>
        <p v-html="$t('agreements.termsOfService.body.general3')"></p>
        <p v-html="$t('agreements.termsOfService.body.general4')"></p>
        <p v-html="$t('agreements.termsOfService.body.general5')"></p>
        <p v-html="$t('agreements.termsOfService.body.general6')"></p>
        <p v-html="$t('agreements.termsOfService.body.general7')"></p>
        <p v-html="$t('agreements.termsOfService.body.general8')"></p>
        <p v-html="$t('agreements.termsOfService.body.general9')"></p>
        <p v-html="$t('agreements.termsOfService.body.general10')"></p>
        <p v-html="$t('agreements.termsOfService.body.general11')"></p>
        <p v-html="$t('agreements.termsOfService.body.general12')"></p>
        <p v-html="$t('agreements.termsOfService.body.general13')"></p>
        <p v-html="$t('agreements.termsOfService.body.general14')"></p>
        <p v-html="$t('agreements.termsOfService.body.general15')"></p>
        <p v-html="$t('agreements.termsOfService.body.general16')"></p>
        <p v-html="$t('agreements.termsOfService.body.general17')"></p>
        <p v-html="$t('agreements.termsOfService.body.general18')"></p>
        <p v-html="$t('agreements.termsOfService.body.general19')"></p>
        <p v-html="$t('agreements.termsOfService.body.general20')"></p>
        <p v-html="$t('agreements.termsOfService.body.general21')"></p>
        <p v-html="$t('agreements.termsOfService.body.general22')"></p>
        <p v-html="$t('agreements.termsOfService.body.general23')"></p>
        <p v-html="$t('agreements.termsOfService.body.general24')"></p>

        <h2 v-html="$t('agreements.termsOfService.body.contact0')"></h2>
        <p v-html="$t('agreements.termsOfService.body.contact1')"></p>
        <p v-html="$t('agreements.termsOfService.body.contact2')"></p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          flat
          color="purple"
          @click="setIsTermsOfServiceDialogVisible(false)"
        >{{ $t('common.options.okButtonText') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'TheTermsOfServiceDialog',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      getIsTermsOfServiceDialogVisible: 'shared/getIsTermsOfServiceDialogVisible'
    })
  },
  methods: {
    ...mapMutations({
      setIsTermsOfServiceDialogVisible: 'shared/setIsTermsOfServiceDialogVisible'
    })
  }

}
</script>
