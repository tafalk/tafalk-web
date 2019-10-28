<template>
  <v-card flat>
    <v-card-title primary-title>
      <v-container pa-3>
        <v-row align="center" justify="center">
          <span class="grey--text"><v-icon size="100">mdi-lock</v-icon></span>
        </v-row>
        <v-row align="center" justify="center">
          <span class="grey--text headline">{{ $t('nocontent.unauthorized.title') }}</span>
        </v-row>
      </v-container>
    </v-card-title>
    <v-card-actions>
      <v-btn
        aria-label="Register"
        color="primary"
        text
        @click="onRegisterBtnClick">{{ $t('nocontent.unauthorized.goToSigninButtonText') }}</v-btn>
      <v-btn
        aria-label="Login"
        color="primary"
        text
        @click="onLoginBtnClick">{{ $t('nocontent.unauthorized.goToLoginButtonText') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'AuthorizationRequired',
  data () {
    return {
    }
  },
  methods: {
    onRegisterBtnClick () {
      this.$router.push({ name: 'register' })
    },
    onLoginBtnClick () {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
