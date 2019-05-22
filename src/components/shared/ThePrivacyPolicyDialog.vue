<template>
  <v-dialog v-model="getIsPrivacyPolicyDialogVisible" max-width="80%">
    <v-card>
      <v-card-title class="title">{{ $t('agreements.privacyPolicy.title') }}</v-card-title>
      <v-card-text v-for="n in 5" :key="n">
        {{ $t('agreements.privacyPolicy.body') }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          flat
          color="purple"
          @click="setIsPrivacyPolicyDialogVisible(false)"
        >{{ $t('common.options.okButtonText') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ThePrivacyPolicyDialog',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      getIsPrivacyPolicyDialogVisible: 'shared/getIsPrivacyPolicyDialogVisible'
    })
  },
  methods: {
    ...mapMutations({
      setIsPrivacyPolicyDialogVisible: 'shared/setIsPrivacyPolicyDialogVisible'
    })
  }

}
</script>
