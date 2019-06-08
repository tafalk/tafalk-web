<template>
  <v-toolbar-items>
    <v-btn
      @click="onLoginBtnClick"
      flat
    >{{ $t('auth.login.text') }}</v-btn>
    <v-btn
      v-if="$vuetify.breakpoint.mdAndUp"
      @click="onRegisterBtnClick"
      flat
    >{{ $t('auth.signup.text') }}</v-btn>
    <v-toolbar-side-icon
      v-if="$vuetify.breakpoint.smAndDown"
      @click.stop="toggleDrawer"
      clipped-right
    ></v-toolbar-side-icon>
  </v-toolbar-items>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'TheHeaderUnauthenticatedUserItems',
  methods: {
    ...mapMutations({
      toggleMenuDrawer: 'shared/toggleMenuDrawer'
    }),
    toggleDrawer () {
      this.toggleMenuDrawer()
    },
    onLoginBtnClick: function () {
      this.$router.push({ name: 'login' })
    },
    onRegisterBtnClick: function () {
      this.$router.push({ name: 'register' })
    }
  }
}
</script>
