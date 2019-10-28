<template>
  <v-dialog v-model="getIsLogoutConfirmationDialogVisible" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">{{ $t('auth.logout.dialog.title') }}</v-card-title>
      <v-card-text>{{ $t('auth.logout.dialog.body') }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn aria-label="Yes" color="red darken-1" text @click.native="onLogoutConfirmBtnClick">{{ $t('common.options.yesButtonText') }}</v-btn>
        <v-btn aria-label="No" color="light-blue darken-1" text @click.native="setIsLogoutConfirmationDialogVisible(false)">{{ $t('common.options.noButtonText') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Auth from '@aws-amplify/auth'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'LogoutConfirmationDialog',
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      getIsLogoutConfirmationDialogVisible: 'authenticatedUser/dialog/getIsLogoutConfirmationDialogVisible'
    })
  },
  methods: {
    ...mapMutations({
      setIsLogoutConfirmationDialogVisible: 'authenticatedUser/dialog/setIsLogoutConfirmationDialogVisible',
      clearAuthenticatedUser: 'authenticatedUser/clearUser'
    }),
    ...mapActions({
      setNewSiteError: 'shared/setNewSiteError'
    }),
    async onLogoutConfirmBtnClick () {
      try {
        // AWS Amplify clear user
        await Auth.signOut()
        // Vuex store clear user
        this.clearAuthenticatedUser()
        // redirect to home page
        this.$router.push({ name: 'home' })
      } catch (err) {
        this.setNewSiteError(err.message || err)
      } finally {
        this.setIsLogoutConfirmationDialogVisible(false)
      }
    }
  }
}
</script>
