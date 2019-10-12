<template>
<v-container>
  <v-row>
    <v-col cols="12" md="6" offset-md="3" class="text-center">
      <v-form v-model="valid" @submit.prevent="onLoginBtnClick">
        <!-- Form Fields -->
        <v-text-field
          :label="$t('auth.login.userNameOrEmailLabel')"
          v-model="username"
          autofocus
          :min="minUsernameOrEmailLength"
          :max="maxUsernameOrEmailLength"
          :maxlength="maxUsernameOrEmailLength"
          :rules="usernameRules"
          prepend-icon="mdi-account"
        ></v-text-field>
        <v-text-field
          :label="$t('auth.login.passwordLabel')"
          v-model="password"
          name="password"
          :min="minPasswordLength"
          :rules="passwordRules"
          type="password"
          prepend-icon="mdi-lock"
        ></v-text-field>
        <v-btn
          color="primary"
          :loading="loading"
          :disabled="!valid || loading"
          type="submit"
        >{{ $t('auth.login.loginButtonText') }}</v-btn>
      </v-form>
    </v-col>
  </v-row>
  <v-row class="py-3" justify="center">
    <!-- Forgot Password Button -->
    <a v-on:click="onForgotPassBtnClick">{{ $t('auth.login.forgotPasswordButtonText') }}</a>
  </v-row>
  <v-row>
    <v-col xs="12" md="6" offset-md="3">
      <v-divider></v-divider>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-subheader>{{ $t('auth.login.signinSectionTitle') }}</v-subheader>
  </v-row>
  <v-row justify="center">
    <v-btn
      color="primary"
      @click="onRegisterBtnClick"
    >{{ $t('auth.login.goToSigninButtonText') }}
    </v-btn>
  </v-row>
</v-container>
</template>

<script>
import { Auth, API, Logger, graphqlOperation } from 'aws-amplify'
import { mapActions } from 'vuex'
import { GetUserProfileData, UpdateUserCognitoIdentityId } from '@/graphql/Profile'
import { minUsernameOrEmailLength, maxUsernameOrEmailLength, minPasswordLength } from '@/utils/constants'
import { GetHexColorOfString } from '@/utils/generators'

const logger = new Logger('Login')

export default {
  name: 'Login',
  data () {
    return {
      user: null,
      valid: true,
      loading: false,

      // Form data
      username: '',
      password: '',

      // Constraints
      minUsernameOrEmailLength,
      maxUsernameOrEmailLength,
      minPasswordLength,

      // Rules
      usernameRules: [
        v => !!v || this.$i18n.t('auth.message.validation.userNameOrEmailReq'),
        v => (v && v.length > 1) || this.$i18n.t('auth.message.validation.userNameLengthLowLimit'),
        v => (v && v.length <= 254) || this.$i18n.t('auth.message.validation.userNameOrEmailLengthUpLimit')
      ],
      passwordRules: [
        v => !!v || this.$i18n.t('auth.message.validation.passwordReq')
      ],

      // Messages
      userDoesNotExistError: this.$i18n.t('auth.message.validation.userDoesNotExist'),
      delayBeforeRouteInMillis
    }
  },
  methods: {
    // Store
    ...mapActions({
      setNewSiteError: 'shared/setNewSiteError'
    }),

    // Click
    async onLoginBtnClick () {
      this.loading = true

      try {
        const user = await Auth.signIn(this.username, this.password)
        const credentials = await Auth.currentCredentials()

        const userProfiles = await API.graphql(
          graphqlOperation(GetUserProfileData, { username: user.username })
        )

        let userProfile = userProfiles.data.getUserByUsername[0]

        if (!userProfile.cognitoIdentityId) {
          // If first login, there may be need to update cognito identity id
          const cognitoIdentityId = credentials.identityId
          await API.graphql(
            graphqlOperation(UpdateUserCognitoIdentityId, {
              userId: userProfile.id,
              cognitoIdentityId: cognitoIdentityId
            })
          )

          userProfile.cognitoIdentityId = cognitoIdentityId
        }

        this.$store.commit('authenticatedUser/setUser', {
          ...userProfile,
          color: GetHexColorOfString(userProfile.username)
        })

        // Push to home route
        this.$router.push({ name: 'home' })
      } catch (err) {
        logger.error('an error occurred while logging in: ', JSON.stringify(err))
        this.setNewSiteError(err.message || err)
        if (err === this.userDoesNotExistError) {
          setTimeout(
            () => { this.$router.push({ name: 'register' }) },
            this.delayBeforeRouteInMillis
          )
        }
      } finally {
        this.loading = false
      }
    },
    onForgotPassBtnClick () {
      this.$router.push({ name: 'forgotPassword' })
    },
    onRegisterBtnClick () {
      this.$router.push({ name: 'register' })
    }
  }
}
</script>
