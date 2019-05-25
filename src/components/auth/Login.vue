<template>
  <v-container grid-list-xl text-xs-center>
    <v-layout row wrap>
      <v-flex md6 sm12-and-down offset-md3>
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
            prepend-icon="person"
            required
          ></v-text-field>
          <v-text-field
            :label="$t('auth.login.passwordLabel')"
            v-model="password"
            name="password"
            :min="minPasswordLength"
            :rules="passwordRules"
            type="password"
            prepend-icon="lock"
            required
          ></v-text-field>
          <!-- Login Button -->
          <v-btn
            color="primary"
            :loading="loading"
            :disabled="!valid || loading"
            type="submit"
          >{{ $t('auth.login.loginButtonText') }}</v-btn>
          <br /><br />
          <!-- Forgot Password Button -->
          <a v-on:click="onForgotPassBtnClick">{{ $t('auth.login.forgotPasswordButtonText') }}</a>
        </v-form>
      </v-flex>
      <v-flex md6 sm12-and-down offset-md3>
        <v-divider></v-divider>
        <v-subheader>{{ $t('auth.login.signinSectionTitle') }}</v-subheader>
        <v-btn
          color="primary"
          @click="onRegisterBtnClick"
        >{{ $t('auth.login.goToSigninButtonText') }}</v-btn>
        <br /><br />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { Auth, API, Logger, graphqlOperation } from 'aws-amplify'
import { mapActions } from 'vuex'
import { GetUserProfileData, UpdateUserCognitoIdentityId } from '@/graphql/Profile'
import { minUsernameOrEmailLength, maxUsernameOrEmailLength, minPasswordLength } from '@/utils/constants'
import { GetStoreUserWithCognitoIdentityId } from '@/utils/storeUtils'

const logger = new Logger('Login')

export default {
  name: 'Login',
  data () {
    return {
      user: null,
      valid: true,
      loader: null,
      loading: false,

      // Form data
      username: '',
      password: '',

      // Constraints
      minUsernameOrEmailLength: minUsernameOrEmailLength,
      maxUsernameOrEmailLength: maxUsernameOrEmailLength,
      minPasswordLength: minPasswordLength,

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
      userDoesNotExistError: this.$i18n.t('auth.message.validation.userDoesNotExist')
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
    }
  },
  methods: {
    // Store
    ...mapActions({
      setNewSiteError: 'shared/setNewSiteError'
    }),

    // Click
    async onLoginBtnClick () {
      this.loader = 'loading'

      try {
        const user = await Auth.signIn(this.username, this.password)
        const credentials = await Auth.currentCredentials()

        const dbUsers = await API.graphql(graphqlOperation(GetUserProfileData, {
          username: user.username
        }))

        const dbUser = dbUsers.data.getUserByUsername[0]

        // Update DB record of the logged in user with cognito identity id
        const cognitoIdentityId = credentials.identityId

        await API.graphql(graphqlOperation(UpdateUserCognitoIdentityId, {
          userId: dbUser.id,
          cognitoIdentityId: cognitoIdentityId
        }))

        const loggedInUserStoreObject = await GetStoreUserWithCognitoIdentityId(dbUser, cognitoIdentityId)

        this.$store.commit('authenticatedUser/setUser', loggedInUserStoreObject)

        // Push to home route
        this.$router.push({ name: 'home' })
      } catch (err) {
        logger.error('an error occurred while logging in: ', JSON.stringify(err))
        this.setNewSiteError(err.message || err)
        if (err === this.userDoesNotExistError) {
          setTimeout(() => {
            this.$router.push({ name: 'register' })
          }, 1000)
        }
      } finally {
        this.loading = false
        this.loader = null
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
