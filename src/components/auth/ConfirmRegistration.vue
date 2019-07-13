<template>
<v-container grid-list-lg text-xs-center>
  <v-layout row wrap>
    <v-flex xs6 offset-xs3>
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
          :loading="loading"
          :disabled="!valid || loading"
          type="submit"
        >
          {{ $t('auth.confirmRegistration.confirmButtonText') }}
        </v-btn>
        <v-btn
          :loading="loadingResend"
          :disabled="loadingResend"
          @click="onResendBtnClick">{{ $t('auth.confirmRegistration.resendButtonText') }}</v-btn>
      </v-form>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script >
import { Auth, Logger } from 'aws-amplify'
import { mapActions } from 'vuex'
import { minUsernameLength, maxUsernameLength } from '@/utils/constants'

const logger = new Logger('ConfirmRegistrationView')

export default {
  name: 'ConfirmRegistration',
  data () {
    return {
      valid: true,
      loader: null,
      loading: false,
      loaderResend: null,
      loadingResend: false,

      // Form Data
      username: '',
      verificationCode: '',

      // Constraints
      minUsernameLength: minUsernameLength,
      maxUsernameLength: maxUsernameLength,

      // Rules
      usernameRules: [
        v => !!v || this.$i18n.t('auth.message.validation.userNameReq'),
        v => (v && v.length > 1) || this.$i18n.t('auth.message.validation.userNameLengthLowLimit'),
        v => (v && v.length <= 24) || this.$i18n.t('auth.message.validation.userNameLengthUpLimit')
      ]
    }
  },
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]
      if (this.error != null) {
        this[l] = false
      }
      this.loader = null
    },
    loaderResend () {
      const l = this.loaderResend
      this[l] = !this[l]
      if (this.error != null) {
        this[l] = false
      }
      this.loaderResend = null
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
      this.loader = 'loading'
      try {
        const data = await Auth.confirmSignUp(this.username, this.verificationCode)
        logger.debug('confirm registration success', data)
        this.setNewNoTimeoutSiteSuccess(this.$i18n.t('auth.confirmRegistration.message.success'))
        setTimeout(() => {
          this.loader = null
          this.$router.push({ name: 'login' })
        }, 500)
      } catch (err) {
        logger.error('confirm registration error', err)
        this.setNewSiteError(err.message || err)
      } finally {
        this.loader = null
      }
    },
    async onResendBtnClick () {
      try {
        await Auth.resendSignUp(this.username)
        this.loaderResend = null
        logger.debug('code resent')
      } catch (err) {
        this.loaderResend = null
        logger.error('resend code error', err)
        this.setNewSiteError(err.message || err)
      }
    }
  }
}
</script>
