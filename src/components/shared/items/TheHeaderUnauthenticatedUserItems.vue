<template>
  <div>
    <v-btn aria-label="Login" @click="onLoginBtnClick" text>{{
      $t('auth.login.text')
    }}</v-btn>
    <v-btn
      aria-label="Signup"
      v-if="$vuetify.breakpoint.mdAndUp"
      @click="onRegisterBtnClick"
      text
      >{{ $t('auth.signup.text') }}</v-btn
    >
    <v-app-bar-nav-icon
      aria-label="Toggle Drawer"
      @click.stop="toggleDrawer"
    ></v-app-bar-nav-icon>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'TheHeaderUnauthenticatedUserItems',
  methods: {
    ...mapMutations({
      toggleMenuDrawer: 'shared/toggleMenuDrawer'
    }),
    toggleDrawer() {
      this.toggleMenuDrawer()
    },
    onLoginBtnClick: function() {
      this.$router.push({ name: 'login' })
    },
    onRegisterBtnClick: function() {
      this.$router.push({ name: 'register' })
    }
  }
}
</script>
