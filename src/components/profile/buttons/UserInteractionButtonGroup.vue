<template>
  <v-row>
    <v-col cols="12" sm="6">
      <!-- direct messaging button -->
      <!--
    <v-btn
      aria-label="Message"
      depressed
      dark
    ><v-icon>mdi-email</v-icon>&nbsp;&nbsp;{{ $t('user.profilePage.interactions.message') }}
    </v-btn>
    -->

      <!-- watch/unwatch button -->
      <v-btn
        aria-label="Watch"
        v-if="
          !inboundWatchIdFromAuthenticatedUser ||
            inboundWatchIdFromAuthenticatedUser.length === 0
        "
        color="warning"
        @click="onWatchThisUserClick"
        block
      >
        <v-icon>mdi-star-outline</v-icon>&nbsp;&nbsp;{{
          $t('user.profilePage.interactions.watch')
        }}
      </v-btn>
      <v-btn
        v-else
        aria-label="Unwatch"
        depressed
        color="grey"
        class="white--text"
        @click="onUnwatchThisUserClick"
        block
      >
        <v-icon>mdi-star</v-icon>&nbsp;&nbsp;{{
          $t('user.profilePage.interactions.watching')
        }}
      </v-btn>
    </v-col>
    <v-spacer></v-spacer>
    <v-col cols="12" sm="6">
      <!-- block/unblock button -->
      <v-btn
        aria-label="Block"
        v-if="
          !inboundBlockIdFromAuthenticatedUser ||
            inboundBlockIdFromAuthenticatedUser.length === 0
        "
        color="grey"
        :disabled="
          inboundBlockIdFromAuthenticatedUser &&
            inboundWatchIdFromAuthenticatedUser.length > 0
        "
        @click="onBlockThisUserClick"
        block
        ><v-icon>mdi-cancel</v-icon>&nbsp;&nbsp;{{
          $t('user.profilePage.interactions.block')
        }}
      </v-btn>
      <v-btn
        aria-label="Unblock"
        v-else-if="
          !inboundWatchIdFromAuthenticatedUser ||
            inboundWatchIdFromAuthenticatedUser.length === 0
        "
        depressed
        color="error"
        @click="onUnblockThisUserClick"
        block
        ><v-icon>mdi-adjust</v-icon>&nbsp;&nbsp;{{
          $t('user.profilePage.interactions.unblock')
        }}
      </v-btn>
    </v-col>
  </v-row>
</template>
<script>
import API, { graphqlOperation } from '@aws-amplify/api'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { WatchUser, UnblockUser } from '@/graphql/UserInteraction'
import { GetFirstOrDefaultIdStr } from '@/utils/typeUtils'

export default {
  name: 'UserInteractionButtonGroup',
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      getAuthenticatedUser: 'authenticatedUser/getUser',
      getVisitedUser: 'visitedUser/getUser'
    }),
    authenticatedUser() {
      return this.getAuthenticatedUser
    },
    visitedUser() {
      return this.getVisitedUser
    },
    inboundWatchIdFromAuthenticatedUser() {
      return this.visitedUser.connectionsWithAuthenticatedUser.inbound.watchId
    },
    inboundBlockIdFromAuthenticatedUser() {
      return this.visitedUser.connectionsWithAuthenticatedUser.inbound.blockId
    }
  },
  methods: {
    ...mapMutations({
      setInboundWatchIdFromAuthenticatedUser:
        'visitedUser/setInboundWatchIdFromAuthenticatedUser',
      clearInboundBlockIdFromAuthenticatedUser:
        'visitedUser/clearInboundBlockIdFromAuthenticatedUser',
      setIsStopWatchingConfirmationDialogVisible:
        'visitedUser/dialog/setIsStopWatchingConfirmationDialogVisible',
      setIsBlockConfirmationDialogVisible:
        'visitedUser/dialog/setIsBlockConfirmationDialogVisible'
    }),
    ...mapActions({
      setNewSiteError: 'shared/setNewSiteError'
    }),
    async onWatchThisUserClick() {
      try {
        const graphqlWatchResult = await API.graphql(
          graphqlOperation(WatchUser, {
            currentAuthenticatedUserId: this.authenticatedUser.id,
            toBeWatchedUserId: this.visitedUser.id
          })
        )

        const watchId = GetFirstOrDefaultIdStr(
          graphqlWatchResult.data.createUserInteraction
        )

        // persist to store
        this.setInboundWatchIdFromAuthenticatedUser(watchId)
      } catch (err) {
        this.setNewSiteError(err.message ?? err)
      }
    },
    onUnwatchThisUserClick() {
      this.setIsStopWatchingConfirmationDialogVisible(true)
    },
    onBlockThisUserClick() {
      this.setIsBlockConfirmationDialogVisible(true)
    },
    async onUnblockThisUserClick() {
      try {
        const blockId = this.visitedUser.connectionsWithAuthenticatedUser
          .inbound.blockId

        if (blockId && blockId.length > 0) {
          await API.graphql(
            graphqlOperation(UnblockUser, {
              blockId
            })
          )

          this.clearInboundBlockIdFromAuthenticatedUser()
        } else {
          throw new Error(this.$i18n.t('user.block.message.notBlockedError'))
        }
      } catch (err) {
        this.setNewSiteError(err.message ?? err)
      }
    }
  }
}
</script>
