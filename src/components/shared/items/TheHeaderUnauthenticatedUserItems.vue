<template>
  <v-toolbar-items>
    <v-btn
      @click="onLoginBtnClick"
      flat
    >{{ $t('auth.login.text') }}</v-btn>
    <v-btn
      @click="onRegisterBtnClick"
      flat
    >{{ $t('auth.signup.text') }}</v-btn>
  </v-toolbar-items>
</template>

<script>
export default {
  name: 'TheHeaderUnauthenticatedUserItems',
  methods: {
    onLoginBtnClick: function () {
      this.$router.push({ name: 'login' })
    },
    onRegisterBtnClick: function () {
      this.$router.push({ name: 'register' })
    }
  }
}
</script>
