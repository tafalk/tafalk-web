<template>
<v-card
  v-if="!isUnliked"
  hover
  :max-height="maxHeight"
  @click.native="onToUserProfileClick">
  <v-card-title dense primary>
    <v-avatar v-if="authenticatedUser && userProfilePictureObjectUrl != null" size="60">
      <v-img :src="userProfilePictureObjectUrl" />
    </v-avatar>
    <v-avatar v-else size="60">
      <v-img
        src="@/assets/default-user-avatar.webp"
        alt="Virgina Woolf in Hue"
        :class="userColor"
      />
    </v-avatar>
    <span class="display-1 grey--text">&nbsp;@{{ user.username }}</span>
    <v-spacer />
    <v-btn
      v-if="isVisitingOwnProfile"
      text
      small
      depressed
      color="error"
      :loading="isLoading"
      :disabled="isLoading"
      @click.stop="unlikeUser"
    >
      {{ $t('user.profilePage.tabs.removeLikeUserButtonText') }}
    </v-btn>
  </v-card-title>
</v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Storage, API, graphqlOperation, Logger } from 'aws-amplify'
import { GetInteractionsBetweenUsers, StopWatchingUser } from '@/graphql/UserInteraction'
import { GetHexColorOfString } from '@/utils/generators'

const logger = new Logger('SlimProfileLikedUserCard')

export default {
  name: 'SlimProfileLikedUserCard',
  props: ['user', 'isVisitingOwnProfile'],
  data () {
    return {
      isUnliked: false,
      watchTypeUserConnectionValue: 'Watch',
      maxHeight: 125,
      userProfilePictureObjectUrl: null,
      userColor: null,
      isLoading: false
    }
  },
  async mounted () {
    this.userColor = GetHexColorOfString(this.user.username)

    this.userProfilePictureObjectUrl = (this.authenticatedUser && this.user.profilePictureKey != null)
      ? await Storage.get(this.user.profilePictureKey, { level: 'protected' })
      : null
  },
  computed: {
    ...mapGetters({
      getAuthenticatedUser: 'authenticatedUser/getUser',
      getVisitedUser: 'visitedUser/getUser'
    }),
    authenticatedUser () {
      return this.getAuthenticatedUser
    }
  },
  methods: {
    ...mapActions({
      setNewSiteError: 'shared/setNewSiteError',
      setNewUserInteractionResultSuccess: 'shared/setNewUserInteractionResultSuccess',
      setNewUserInteractionResultError: 'shared/setNewUserInteractionResultError'
    }),
    async unlikeUser () {
      const graphqlConnectionsFromAuthenticatedUserToVisitedUserResult = await API.graphql(graphqlOperation(GetInteractionsBetweenUsers, {
        actorUserId: this.authenticatedUser.id,
        targetUserId: this.user.id
      }))

      const inboundUserInteractionsIdIndices = graphqlConnectionsFromAuthenticatedUserToVisitedUserResult.data.queryUserInteractionsBetweenUsersByUserIdIndices
      const inboundWatchingTypeConnection = inboundUserInteractionsIdIndices.filter(rel => rel.interactionType === this.watchTypeUserConnectionValue)[0]

      this.isLoading = true
      try {
        await API.graphql(graphqlOperation(StopWatchingUser, {
          watchId: inboundWatchingTypeConnection.id
        }))
      } catch (err) {
        logger.error('An error occurred while unfaving the user', err)
        this.setNewUserInteractionResultError(this.$i18n.t('stream.likes.message.genericUncastError'))
      } finally {
        this.isUnliked = true
        this.isLoading = false
      }
    },
    onToUserProfileClick (username) {
      this.$router.push({ name: 'profile', params: { username: this.user.username } })
    }
  }
}
</script>
