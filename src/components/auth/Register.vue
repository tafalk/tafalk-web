<template>
  <v-container grid-list-lg text-xs-center>
    <v-layout row wrap>
      <v-flex md6 sm12-and-down offset-md3>
        <v-form v-model="valid" @submit.prevent="onRegisterBtnClick">
          <v-layout wrap>
            <v-flex md6 sm12-and-down>
              <v-text-field
                :label="$t('auth.signup.firstNameLabel')"
                v-model="firstName"
                autofocus
                :min="minFirstNameLength"
                :max="maxFirstNameLength"
                :maxlength="maxFirstNameLength"
                :rules="firstNameRules"
                required
            ></v-text-field>
          </v-flex>
          <v-flex md6 sm12-and-down>
              <v-text-field
                :label="$t('auth.signup.lastNameLabel')"
                v-model="lastName"
                :min="minLastNameLength"
                :max="maxLastNameLength"
                :maxlength="maxLastNameLength"
                :rules="lastNameRules"
                required
            ></v-text-field>
          </v-flex>
           </v-layout>
          <v-text-field
            :label="$t('auth.signup.userNameLabel')"
            v-model="username"
            :counter="maxUsernameLength"
            :min="minUsernameLength"
            :max="maxUsernameLength"
            :maxlength="maxUsernameLength"
            :rules="usernameRules"
            prepend-icon="mdi-account"
            required
          ></v-text-field>
          <v-text-field
            :label="$t('auth.signup.emailLabel')"
            v-model="email"
            :rules="emailRules"
            prepend-icon="mdi-mail"
            required
          ></v-text-field>
          <v-text-field
            :label="$t('auth.signup.passwordLabel')"
            v-model="password"
            name="password"
            :min="minPasswordLength"
            :rules="passwordRules"
            prepend-icon="mdi-lock"
            type="password"
            required
          ></v-text-field>
          <!-- TODO: Add Custom progress bar for strength -->
          <!-- https://vuetifyjs.com/en/components/text-fields#example-progress-bar -->
          <v-text-field
            :label="$t('auth.signup.retypePasswordLabel')"
            v-model="retypePassword"
            :rules="retypePasswordRules"
            type="password"
            prepend-icon="mdi-lock"
            required
          ></v-text-field>
          <v-menu
            ref="menu"
            lazy
            :close-on-content-click="false"
            v-model="menu"
            transition="scale-transition"
            offset-y
            full-width
            :nudge-right="40"
            min-width="290px"
          >
            <v-text-field
              slot="activator"
              :label="$t('auth.signup.birthDateLabel')"
              v-model="birthDate"
              :rules="birthDateRules"
              prepend-icon="mdi-calendar"
              readonly
            ></v-text-field>
            <v-date-picker
              ref="picker"
              v-model="birthDate"
              @change="saveDate"
              min="1950-01-01"
              :max="new Date().toISOString().substr(0, 10)"
            ></v-date-picker>
          </v-menu>
          <v-checkbox
            v-model="termsAgreed"
            :rules="termsAgreedRules"
            type="checkbox"
            required
          >
            <div slot="label" @click.stop >
              <i18n path="auth.signup.agreeLabelText">
                <a place="termsOfServiceAction" href="javascript:;" @click.stop="setIsTermsOfServiceDialogVisible(true)">{{ $t('auth.signup.termsOfServiceHyperlinkText') }}</a>
                <a place="privacyPolicyAction" href="javascript:;" @click.stop="setIsPrivacyPolicyDialogVisible(true)">{{ $t('auth.signup.privacyPolicyHyperlinkText') }}</a>
              </i18n>
            </div>
          </v-checkbox>
          <v-btn
            color="primary"
            :loading="loading"
            :disabled="!valid || loading"
            type="submit"
            >{{ $t('auth.signup.signupButtonText') }}</v-btn>
        </v-form>
      </v-flex>
    <tafalk-terms-of-service-dialog></tafalk-terms-of-service-dialog>
    <tafalk-privacy-policy-dialog></tafalk-privacy-policy-dialog>
    </v-layout>
  </v-container>
</template>

<script>
import { Auth, Logger } from 'aws-amplify'
import TafalkTermsOfServiceDialog from '@/components/shared/dialogs/TheTermsOfServiceDialog.vue'
import TafalkPrivacyPolicyDialog from '@/components/shared/dialogs/ThePrivacyPolicyDialog.vue'
import { mapMutations, mapActions } from 'vuex'
import { minFirstNameLength, maxFirstNameLength, minLastNameLength, maxLastNameLength, minUsernameLength, maxUsernameLength, minPasswordLength } from '@/utils/constants'
import { CheckPassword } from '@/utils/validator'

const logger = new Logger('Register')

export default {
  name: 'Register',
  data () {
    return {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      retypePassword: '',
      email: '',
      birthDate: null,
      menu: false,
      termsAgreed: false,

      minFirstNameLength: minFirstNameLength,
      maxFirstNameLength: maxFirstNameLength,
      minLastNameLength: minLastNameLength,
      maxLastNameLength: maxLastNameLength,
      minUsernameLength: minUsernameLength,
      maxUsernameLength: maxUsernameLength,
      minPasswordLength: minPasswordLength,

      valid: true,
      firstNameRules: [
        v => !!v || this.$i18n.t('auth.message.validation.firstNameReq'),
        v => (v && v.length >= 1) || this.$i18n.t('auth.message.validation.firstNameLengthLowLimit'),
        v => (v && v.length <= 50) || this.$i18n.t('auth.message.validation.firstNameLengthUpLimit')
      ],
      lastNameRules: [
        v => !!v || this.$i18n.t('auth.message.validation.lastNameReq'),
        v => (v && v.length >= 1) || this.$i18n.t('auth.message.validation.lastNameLengthLowLimit'),
        v => (v && v.length <= 50) || this.$i18n.t('auth.message.validation.lastNameLengthLowLimit')
      ],
      usernameRules: [
        v => !!v || this.$i18n.t('auth.message.validation.userNameReq'),
        v => (v && v.length > 1) || this.$i18n.t('auth.message.validation.userNameLengthLowLimit'),
        v => (v && v.length <= 24) || this.$i18n.t('auth.message.validation.userNameLengthUpLimit')
      ],
      emailRules: [
        v => !!v || this.$i18n.t('auth.message.validation.emailReq'),
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          this.$i18n.t('auth.message.validation.emailNotValid')
      ],
      passwordRules: [
        v => !!v || this.$i18n.t('auth.message.validation.passwordReq'),
        v => (v && CheckPassword(v)) || this.$i18n.t('auth.message.validation.passwordWeakWithHint')
      ],
      retypePasswordRules: [
        v => !!v || this.$i18n.t('auth.message.validation.passwordRetypeReq'),
        v => (v && v === this.password) || this.$i18n.t('auth.message.validation.retypedPasswordDoesNotMatch')
      ],
      termsAgreedRules: [
        v => !!v || this.$i18n.t('auth.message.validation.termsNotAgreed')
      ],
      birthDateRules: [
        v => !!v || this.$i18n.t('auth.message.validation.birthDateReq'),
        v => (v && this.isAgeLegal(v)) || this.$i18n.t('auth.message.validation.tooYoung')
      ],
      loader: null,
      loading: false
    }
  },
  components: {
    TafalkTermsOfServiceDialog,
    TafalkPrivacyPolicyDialog
  },
  watch: {
    menu (val) {
      val && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
    loader () {
      const l = this.loader
      this[l] = !this[l]
      if (this.error != null) {
        this[l] = false
      }
      this.loader = null
    }
  },
  methods: {
    ...mapMutations({
      setIsTermsOfServiceDialogVisible: 'shared/setIsTermsOfServiceDialogVisible',
      setIsPrivacyPolicyDialogVisible: 'shared/setIsPrivacyPolicyDialogVisible'
    }),
    ...mapActions({
      setNewSiteError: 'shared/setNewSiteError'
    }),
    async onRegisterBtnClick () {
      this.loader = 'loading'

      try {
        const data = await Auth.signUp({
          'username': this.username,
          'password': this.password,
          'attributes': {
            'email': this.email,
            'birthdate': this.birthDate,
            'name': this.firstName,
            'family_name': this.lastName
          }
        })
        logger.debug('register success', data)

        this.$router.push({ name: 'confirmRegistration' })
      } catch (err) {
        logger.error('register error', err)
        this.setNewSiteError(err.message || err)
      } finally {
        this.loader = null
      }
    },
    saveDate (date) {
      this.$refs.menu.save(date)
    },
    isAgeLegal (birthdayISOString) {
      let today = new Date()
      let birth = new Date(birthdayISOString)
      let age = today.getFullYear() - birth.getFullYear()
      let m = today.getMonth() - birth.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--
      }
      return age >= 18
    }
  }
}
</script>
