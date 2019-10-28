<template>
  <v-dialog v-model="getIsDeleteAccountConfirmationDialogVisible" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">{{ $t('user.deleteAccount.dialog.title') }}</v-card-title>
      <v-card-text>{{ $t('user.deleteAccount.dialog.body') }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          aria-label="Yes"
          color="red darken-1"
          text
          @click.native="onDeleteAccountConfirmClick"
        >{{ $t('common.options.yesButtonText') }}</v-btn>
        <v-btn
          aria-label="No"
          color="light-blue darken-1"
          text
          @click.native="setIsDeleteAccountConfirmationDialogVisible(false)"
        >{{ $t('common.options.noButtonText') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import API, { graphqlOperation } from '@aws-amplify/api'
import Auth from '@aws-amplify/auth'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { DeleteUser } from '@/graphql/Profile'

export default {
  name: 'DeleteAccountConfirmationDialog',
  props: ['userId'],
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      getIsDeleteAccountConfirmationDialogVisible: 'visitedUser/dialog/getIsDeleteAccountConfirmationDialogVisible'
    })
  },
  methods: {
    ...mapMutations({
      setIsDeleteAccountConfirmationDialogVisible: 'visitedUser/dialog/setIsDeleteAccountConfirmationDialogVisible',
      clearAuthenticatedUser: 'authenticatedUser/clearUser'
    }),
    ...mapActions({
      setNewSiteError: 'shared/setNewSiteError'
    }),
    async onDeleteAccountConfirmClick () {
      const authenticatedCognitoUser = await Auth.currentAuthenticatedUser()

      authenticatedCognitoUser.deleteUser((err, result) => {
        if (err) {
          this.setNewSiteError(err.message || err)
          return
        }

        // Remove from DB (UserTable)
        API.graphql(graphqlOperation(DeleteUser, {
          userId: this.userId
        })).then(() => {
          // Route to Account Deleted Page
          this.$router.push({ name: 'farewell' })

          // Clear the vuex store (authenticatedUser)
          this.clearAuthenticatedUser()
        })
      })

      this.setIsDeleteAccountConfirmationDialogVisible(false)
    }
  }
}
</script>
