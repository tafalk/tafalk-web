<template>
  <v-container>
    <v-row>
      <v-col
        xs="12"
        md="6"
        offset-md="3"
      >
        <v-stepper v-model="forgotPasswordCurrentStep">
          <v-stepper-header>
            <v-stepper-step
              :complete="forgotPasswordCurrentStep > 1"
              step="1"
            >{{ $t('auth.forgotPassword.steps.enterUserName') }}</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step
              :complete="forgotPasswordCurrentStep > 2"
              step="2"
            >{{ $t('auth.forgotPassword.steps.enterReceivedCode') }}</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step
              step="3"
            >{{ $t('auth.forgotPassword.steps.enterNewPassword') }}</v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1" >
              <v-form v-model="step1Valid" >
                <v-text-field
                  :label="$t('auth.forgotPassword.userNameLabel')"
                  v-model="username"
                  autofocus
                  counter="24"
                  :min="minUsernameLength"
                  :max="maxUsernameLength"
                  :maxlength="maxUsernameLength"
                  :rules="usernameRules"
                  prepend-icon="mdi-account"
                ></v-text-field>
                <v-btn
                  color="primary"
                  :loading="loadingSend"
                  :disabled="loadingSend || !username"
                  @click="onSendBtnClick"
                >{{ $t('auth.forgotPassword.receiveCodeButtonText') }}</v-btn>
              </v-form>
            </v-stepper-content>
            <v-stepper-content step="2" >
              <v-form v-model="step2Valid" >
                <v-text-field
                  :label="$t('auth.forgotPassword.codeLabel')"
                  v-model="code"
                  prepend-icon="mdi-message-processing"
                ></v-text-field>
                <v-btn
                  text
                  @click="forgotPasswordCurrentStep = 1"
                >{{ $t('auth.forgotPassword.steps.returnPreviousStepButtonText') }}</v-btn>
                <v-btn
                  color="primary"
                  :disabled="!code"
                  @click="forgotPasswordCurrentStep = 3"
                >{{ $t('auth.forgotPassword.steps.continueToNextStepButtonText') }}</v-btn>
              </v-form>
            </v-stepper-content>
            <v-stepper-content step="3" >
              <v-form v-model="step3Valid" >
                <v-text-field
                  :label="$t('auth.forgotPassword.newPasswordLabel')"
                  v-model="password"
                  name="password"
                  hint="At least 8 characters"
                  :min="minPasswordLength"
                  :rules="passwordRules"
                  type="password"
                  prepend-icon="mdi-lock"
                ></v-text-field>
                <v-btn
                  text
                  @click="forgotPasswordCurrentStep = 2"
                >{{ $t('auth.forgotPassword.steps.returnPreviousStepButtonText') }}</v-btn>
                <v-btn
                  color="primary"
                  :loading="loadingSubmit"
                  :disabled="!password"
                  @click="onChangePasswordBtnClick"
                >{{ $t('auth.forgotPassword.steps.changePasswordButtonText') }}</v-btn>

              </v-form>
            </v-stepper-content>
          </v-stepper-items>

          <!-- Recaptcha text -->
          <span class="grey--text caption">
          This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy">Privacy Policy</a> and <a href="https://policies.google.com/terms">Terms of Service</a> apply.
        </span>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { API, graphqlOperation, Auth, Logger } from 'aws-amplify'
import { mapActions } from 'vuex'
import { minUsernameLength, maxUsernameLength, minPasswordLength } from '@/utils/constants'
import { CheckPassword } from '@/utils/validator'
import { GetRecaptchaTokenResult } from '@/graphql/RecaptchaToken'

const logger = new Logger('ForgotPasswordView')

export default {
  name: 'ForgotPassword',
  data () {
    return {
      forgotPasswordCurrentStep: 0,
      step1Valid: true,
      step2Valid: true,
      step3Valid: true,

      // Form Data
      username: '',
      code: '',
      password: '',

      // Constraints
      minUsernameLength: minUsernameLength,
      maxUsernameLength: maxUsernameLength,
      minPasswordLength: minPasswordLength,

      // Rules
      usernameRules: [
        v => !!v || this.$i18n.t('auth.message.validation.userNameReq'),
        v => (v && v.length > 1) || this.$i18n.t('auth.message.validation.userNameLengthLowLimit'),
        v => (v && v.length <= 24) || this.$i18n.t('auth.message.validation.userNameLengthUpLimit')
      ],
      passwordRules: [
        v => !!v || this.$i18n.t('auth.message.validation.passwordReq'),
        v => (v && CheckPassword(v)) || this.$i18n.t('auth.message.validation.passwordWeak')
      ],

      // Loading
      loaderSend: null,
      loadingSend: false,
      loaderSubmit: null,
      loadingSubmit: false
    }
  },
  watch: {
    loaderSend () {
      const l = this.loaderSend
      this[l] = !this[l]
      if (this.error != null) {
        this[l] = false
      }
      this.loaderSend = null
    },
    loaderSubmit () {
      const l = this.loaderSubmit
      this[l] = !this[l]
      if (this.error != null) {
        this[l] = false
      }
      this.loaderSubmit = null
    }
  },
  methods: {
    ...mapActions({
      setNewSiteError: 'shared/setNewSiteError'
    }),
    async onSendBtnClick () {
      try {
        var data = await Auth.forgotPassword(this.username)
        logger.debug('code resent', data)
        this.forgotPasswordCurrentStep = 2
      } catch (err) {
        logger.error('code resent error', err)
        this.setNewSiteError(err.message || err)
      }
    },
    async onChangePasswordBtnClick () {
      try {
        // Get recaptcha token
        const token = await this.$recaptcha('login')

        // Validate it
        const validationGraphqlResult = await API.graphql(graphqlOperation(GetRecaptchaTokenResult, {
          token
        }))

        if (!validationGraphqlResult.data.getRecaptchaTokenResult.success) {
          throw new Error('Could not verify you as human')
        }

        // Amplify auth library call
        await Auth.forgotPasswordSubmit(this.username, this.code, this.password)
        this.$router.push({ name: 'home' })
      } catch (err) {
        logger.error('password refresh error', err)
        this.setNewSiteError(err.message || err)
      }
    }
  }
}
</script>
