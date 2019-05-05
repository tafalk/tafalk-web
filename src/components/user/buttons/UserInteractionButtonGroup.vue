<template>
  <v-flex d-flex xs12 offset-sm4 sm8 offset-md6 md6>
    <!-- direct messaging button -->
    <!--
    <v-btn
      depressed
      dark
    ><v-icon>email</v-icon>&nbsp;&nbsp;{{ $t('user.profilePage.interactions.message') }}
    </v-btn>
    -->

    <!-- watch/unwatch button -->
    <v-btn v-if="inboundWatchIdFromAuthenticatedUser == null || inboundWatchIdFromAuthenticatedUser.length === 0"
      color="warning"
      @click="onWatchThisUserClick"
    ><v-icon>star_border</v-icon>&nbsp;&nbsp;{{ $t('user.profilePage.interactions.watch') }}
    </v-btn>

    <v-btn v-else
      depressed
      color="grey"
      class="white--text"
      @click="stopWatchingDialog = true"
    ><v-icon>star</v-icon>&nbsp;&nbsp;{{ $t('user.profilePage.interactions.watching') }}
    </v-btn>

    <!-- block/unblock button -->
    <v-btn v-if="inboundBlockIdFromAuthenticatedUser == null  || inboundBlockIdFromAuthenticatedUser.length === 0"
      color="grey"
      :disabled="inboundBlockIdFromAuthenticatedUser != null && inboundWatchIdFromAuthenticatedUser.length > 0"
      @click="blockUserDialog = true"
    ><v-icon>block</v-icon>&nbsp;&nbsp;{{ $t('user.profilePage.interactions.block') }}
    </v-btn>

    <v-btn v-else-if="inboundWatchIdFromAuthenticatedUser == null || inboundWatchIdFromAuthenticatedUser.length === 0"
      depressed
      color="error"
      @click="onUnblockThisUserClick"
    ><v-icon>adjust</v-icon>&nbsp;&nbsp;{{ $t('user.profilePage.interactions.unblock') }}
    </v-btn>
  </v-flex>
</template>
<script>
import { API, graphqlOperation, Logger } from 'aws-amplify'
import { print as gqlToString } from 'graphql/language'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { WatchUser, UnblockUser } from '@/graphql/UserInteraction'
import { GetFirstOrDefaultIdStr } from '@/utils/ArrayUtils'

const logger = new Logger('UserInteractionButtonGroup')

export default {
  name: 'UserInteractionButtonGroup',
  data () {
    return { }
  },
  computed: {
    ...mapGetters({
      getAuthenticatedUser: 'authenticatedUser/getUser',
      getVisitedUser: 'visitedUser/getUser'
    }),
    authenticatedUser () {
      return this.getAuthenticatedUser
    },
    visitedUser () {
      return this.getVisitedUser
    },
    inboundWatchIdFromAuthenticatedUser () {
      return this.visitedUser.connectionsWithAuthenticatedUser.inbound.watchId
    },
    inboundBlockIdFromAuthenticatedUser () {
      return this.visitedUser.connectionsWithAuthenticatedUser.inbound.blockId
    }
  },
  methods: {
    ...mapMutations({
      setInboundWatchIdFromAuthenticatedUser: 'visitedUser/setInboundWatchIdFromAuthenticatedUser',
      clearInboundBlockIdFromAuthenticatedUser: 'visitedUser/clearInboundBlockIdFromAuthenticatedUser'
    }),
    ...mapActions({
      setNewSiteError: 'shared/setNewSiteError'
    }),
    async onWatchThisUserClick () {
      try {
        const graphqlWatchResult = await API.graphql(graphqlOperation(gqlToString(WatchUser), {
          currentAuthenticatedUserId: this.authenticatedUser.id,
          toBeWatchedUserId: this.visitedUser.id
        }))

        const watchId = GetFirstOrDefaultIdStr(graphqlWatchResult.data.createUserInteraction)

        // persist to store
        this.setInboundWatchIdFromAuthenticatedUser(watchId)
      } catch (err) {
        logger.error('An error occurred while watching the user')
        this.setNewSiteError(err.message || err)
      }
    },
    async onUnblockThisUserClick () {
      try {
        const blockId = this.visitedUser.connectionsWithAuthenticatedUser.inbound.blockId

        if (blockId && blockId.length > 0) {
          await API.graphql(graphqlOperation(gqlToString(UnblockUser), {
            blockId
          }))

          this.clearInboundBlockIdFromAuthenticatedUser()
        } else {
          throw new Error(this.$i18n.t('user.block.message.notBlockedError'))
        }
      } catch (err) {
        logger.error('An error occurred while watching the user')
        this.setNewSiteError(err.message || err)
      }
    }
  }
}
</script>
