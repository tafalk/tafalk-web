<template>
<v-container text-xs-center>
  <v-row>
    <v-col cols="6" offset="3" class="text-center">
      <v-form v-model="valid" @submit.prevent="onConfirmBtnClick">
        <v-text-field
          :label="$t('auth.confirmRegistration.userNameLabel')"
          v-model="username"
          autofocus
          :counter="maxUsernameLength"
          :min="minUsernameLength"
          :max="maxUsernameLength"
          :maxlength="maxUsernameLength"
          :rules="usernameRules"
          prepend-icon="mdi-lock"
        ></v-text-field>
        <v-text-field
          :label="$t('auth.confirmRegistration.verificationCodeLabel')"
          v-model="verificationCode"
          prepend-icon="mdi-message-processing"
        ></v-text-field>
        <v-btn
          color="primary"
          :loading="loadingSend"
          :disabled="!valid || loadingSend"
          type="submit"
          class="ma-3"
        >{{ $t('auth.confirmRegistration.confirmButtonText') }}</v-btn>
        <v-btn
          :loading="loadingResend"
          :disabled="loadingResend"
          @click="onResendBtnClick"
        >{{ $t('auth.confirmRegistration.resendButtonText') }}</v-btn>
      </v-form>
    </v-col>
  </v-row>
</v-container>
</template>

<script >
import Auth from '@aws-amplify/auth'
import { Logger } from '@aws-amplify/core'
import { mapActions } from 'vuex'
import { minUsernameLength, maxUsernameLength } from '@/utils/constants'

const logger = new Logger('ConfirmRegistrationView')

export default {
  name: 'ConfirmRegistration',
  data () {
    return {
      valid: true,
      loadingSend: false,
      loadingResend: false,
      username: '',
      verificationCode: '',
      minUsernameLength,
      maxUsernameLength,
      delayBeforeRouteInMillis: 500,

      // Rules
      usernameRules: [
        v => !!v || this.$i18n.t('auth.message.validation.userNameReq'),
        v => (v && v.length > 1) || this.$i18n.t('auth.message.validation.userNameLengthLowLimit'),
        v => (v && v.length <= 24) || this.$i18n.t('auth.message.validation.userNameLengthUpLimit')
      ]
    }
  },
  methods: {
    // Store
    ...mapActions({
      setNewSiteError: 'shared/setNewSiteError',
      setNewNoTimeoutSiteSuccess: 'shared/setNewNoTimeoutSiteSuccess'
    }),

    // Click
    async onConfirmBtnClick () {
      this.loadingSend = true
      try {
        const data = await Auth.confirmSignUp(this.username, this.verificationCode)
        this.setNewNoTimeoutSiteSuccess(this.$i18n.t('auth.confirmRegistration.message.success'))
        setTimeout(() => {
          this.$router.push({ name: 'login' })
        }, this.delayBeforeRouteInMillis)
      } catch (err) {
        logger.error('confirm registration error', err)
        this.setNewSiteError(err.message || err)
      } finally {
        this.loadingSend = false
      }
    },
    async onResendBtnClick () {
      this.loadingResend = true
      try {
        await Auth.resendSignUp(this.username)
      } catch (err) {
        this.setNewSiteError(err.message || err)
      } finally {
        this.loadingResend = false
      }
    }
  }
}
</script>
