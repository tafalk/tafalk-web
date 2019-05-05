<template>
  <v-card>
    <v-card-title primary-title>
      <v-container pa-3 fluid grid-list-md>
        <v-layout align-center column>
          <span class="grey--text"><v-icon size="100">lock</v-icon></span><br/>
          <span class="grey--text headline">{{ $t('nocontent.unauthorized.title') }}</span>
        </v-layout>
      </v-container>
    </v-card-title>
    <v-card-actions>
      <v-btn
        color="primary"
        flat
        @click="onRegisterButtonClick">{{ $t('nocontent.unauthorized.goToSigninButtonText') }}</v-btn>
      <v-btn
        color="primary"
        flat
        @click="onLoginButtonClick">{{ $t('nocontent.unauthorized.goToLoginButtonText') }}</v-btn>
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
    onRegisterButtonClick () {
      this.$router.push({ name: 'register' })
    },
    onLoginButtonClick () {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
