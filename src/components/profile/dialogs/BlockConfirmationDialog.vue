<template>
  <v-dialog
    v-model="getIsBlockConfirmationDialogVisible"
    persistent
    max-width="290"
  >
    <v-card>
      <v-card-title class="headline">{{
        $t('user.block.dialog.title')
      }}</v-card-title>
      <v-card-text>{{ $t('user.block.dialog.body') }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          aria-label="Yes"
          color="red darken-1"
          text
          @click.native="onBlockThisUserConfirmClick"
          >{{ $t('common.options.yesButtonText') }}</v-btn
        >
        <v-btn
          aria-label="No"
          color="light-blue darken-1"
          text
          @click.native="setIsBlockConfirmationDialogVisible(false)"
          >{{ $t('common.options.noButtonText') }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import API, { graphqlOperation } from '@aws-amplify/api'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { BlockUser } from '@/graphql/UserInteraction'
import { GetFirstOrDefaultIdStr } from '@/utils/typeUtils'

export default {
  name: 'BlockConfirmationDialog',
  data() {
    return {
      blockTypeuserConnectionValue: 'Block'
    }
  },
  computed: {
    ...mapGetters({
      getIsBlockConfirmationDialogVisible:
        'visitedUser/dialog/getIsBlockConfirmationDialogVisible',
      getAuthenticatedUser: 'authenticatedUser/getUser',
      getVisitedUser: 'visitedUser/getUser'
    }),
    authenticatedUser() {
      return this.getAuthenticatedUser
    },
    visitedUser() {
      return this.getVisitedUser
    }
  },
  methods: {
    ...mapMutations({
      setIsBlockConfirmationDialogVisible:
        'visitedUser/dialog/setIsBlockConfirmationDialogVisible',
      setInboundBlockIdFromAuthenticatedUser:
        'visitedUser/setInboundBlockIdFromAuthenticatedUser'
    }),
    ...mapActions({
      setNewSiteError: 'shared/setNewSiteError'
    }),
    async onBlockThisUserConfirmClick() {
      try {
        const currentBlockId = this.visitedUser.connectionsWithAuthenticatedUser
          .inbound.watchId

        if (!currentBlockId?.length) {
          const graphqlBlockResult = await API.graphql(
            graphqlOperation(BlockUser, {
              currentAuthenticatedUserId: this.authenticatedUser.id,
              toBeBlockedUserId: this.visitedUser.id
            })
          )

          // add the result as an array
          const blockId = GetFirstOrDefaultIdStr(
            graphqlBlockResult.data.createUserInteraction
          )
          this.setInboundBlockIdFromAuthenticatedUser(blockId)
        }
      } catch (err) {
        this.setNewSiteError(err.message ?? err)
      } finally {
        // close the dialog
        this.setIsBlockConfirmationDialogVisible(false)
      }
    }
  }
}
</script>
