<template>
<v-skeleton-loader
  :loading="!getIsPageReady"
  type="list-item-avatar, article, actions"
>
  <v-container pt-0 mt-0>
    <v-row no-gutters>
      <v-col cols="12" md="8" offset-md="2">
        <v-card flat>
          <!-- Profile Edit Buttons (Authorized User) -->
          <tafalk-profile-edit-speed-dial v-if="isVisitingOwnProfile" />
          <!-- User Info -->
          <v-container v-if="visitedUser">
            <v-row>
              <!-- Avatar Section -->
              <v-col cols="12" md="4" class="text-center">
                <v-row>
                  <v-col cols="12">
                    <!-- Picture itself -->
                    <v-avatar pt-1 size="150">
                      <v-img
                        v-if="authenticatedUser && visitedUser.profilePictureObjectUrl"
                        :src="visitedUser.profilePictureObjectUrl"
                      />
                      <v-img
                        v-else
                        :src="require('@/assets/default-user-avatar.webp')"
                        alt="Woolf"
                        :style="{backgroundColor: visitedUserColor}"
                      />
                    </v-avatar>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <!-- Change Profile Picture Button -->
                    <v-btn
                      color="primary"
                      text
                      v-if="isVisitingOwnProfile"
                      @click.stop="setIsChangeProfilePictureDialogVisible(true)"
                    >{{ $t('user.profilePage.changeProfilePictureButtonText') }}</v-btn>
                  </v-col>
                </v-row>
              </v-col>
              <!-- User Info Section -->
              <v-col cols="12" md="8">
                <!-- Basic Info -->
                <v-row align="center">
                  <v-col cols="12">
                    <!-- User Name -->
                    <v-row align="center">
                      <v-col cols="12">
                        <div class="display-1 text-xs-center text-sm-left grey--text">@{{ visitedUser.username }}</div>
                      </v-col>
                    </v-row>
                    <!-- Bio -->
                    <v-row align="center" v-if="isProfileAllowed">
                      <v-col cols="12">
                        <div class="text-left grey--text"><v-icon color="grey">mdi-bio</v-icon>&nbsp;{{visitedUserBio}}</div>
                      </v-col>
                    </v-row>
                    <!-- Other Basic Info -->
                    <v-row align="center" v-if="isProfileAllowed">
                      <v-col cols="12" sm="6">
                        <p class="text-left grey--text"><v-icon color="grey">mdi-map-marker</v-icon>&nbsp;{{visitedUserLocationValue}}</p>
                        <p class="text-left grey--text"><v-icon color="grey">mdi-web</v-icon>&nbsp;{{visitedUser.site}}</p>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <p v-if="visitedUserAccountCreationDateStr" class="text-left grey--text"><v-icon color="grey">mdi-calendar-clock</v-icon>&nbsp;{{visitedUserAccountCreationDateStr}}</p>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <!-- User Interaction Button Group -->
                <v-row v-if="isProfileAllowed">
                  <v-col cols="12">
                    <tafalk-user-interaction-button-group
                      v-if="authenticatedUser && !isVisitingOwnProfile"
                    ></tafalk-user-interaction-button-group>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
          <v-divider />
          <!-- Tabs -->
          <tafalk-profile-tabs v-if="visitedUser && isProfileAllowed"
            :userId="visitedUser.id"
            :isVisitingOwnProfile="isVisitingOwnProfile"
          ></tafalk-profile-tabs>
        </v-card>
      </v-col>
    </v-row>
    <!-- Dialogs -->
    <!-- User Edit Info Dialog -->
    <tafalk-user-change-profile-picture-dialog
      v-if="visitedUser"
      :userId="visitedUser.id"
      :existingProfilePictureObjectUrl="visitedUser.profilePictureObjectUrl"
    ></tafalk-user-change-profile-picture-dialog>
    <!-- Stop Watching 'Are you sure' dialog -->
    <tafalk-user-stop-watching-confirmation-dialog />
    <!-- Block 'Are you sure' dialog -->
    <tafalk-user-block-confirmation-dialog />
    <!-- User Edit Info Dialog -->
    <tafalk-user-info-edit-dialog
      v-if="visitedUser"
      :userId="visitedUser.id"
      :bio="visitedUser.bio"
      :location="visitedUser.location"
      :site="visitedUser.site"
    ></tafalk-user-info-edit-dialog>
    <!-- User Edit Privacy Dialog -->
    <tafalk-user-privacy-edit-dialog
      v-if="visitedUser"
      :userId="visitedUser.id"
      :allowDirectMessages="visitedUser.allowDirectMessages"
    ></tafalk-user-privacy-edit-dialog>
    <!-- User Delete Account Confirmation Dialog -->
    <tafalk-user-delete-account-confirmation-dialog
      v-if="visitedUser"
      :userId="visitedUser.id">
    </tafalk-user-delete-account-confirmation-dialog>
  </v-container>
</v-skeleton-loader>
</template>

<script>
import { API, graphqlOperation, Logger, Storage } from 'aws-amplify'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { GetUserProfileData } from '@/graphql/Profile'
import { GetInteractionsBetweenUsers } from '@/graphql/UserInteraction'
import { GetFirstOrDefaultIdStr } from '@/utils/typeUtils'
import { GetHexColorOfString } from '@/utils/generators'
import TafalkUserInteractionButtonGroup from '@/components/profile/buttons/UserInteractionButtonGroup.vue'
import TafalkProfileTabs from '@/components/profile/tabs/ProfileTabs.vue'
import TafalkProfileEditSpeedDial from '@/components/profile/buttons/EditSpeedDial.vue'
import TafalkUserChangeProfilePictureDialog from '@/components/profile/dialogs/UserChangeProfilePictureDialog.vue'
import TafalkUserStopWatchingConfirmationDialog from '@/components/profile/dialogs/StopWatchingConfirmationDialog.vue'
import TafalkUserBlockConfirmationDialog from '@/components/profile/dialogs/BlockConfirmationDialog.vue'
import TafalkUserInfoEditDialog from '@/components/profile/dialogs/UserInfoEditDialog.vue'
import TafalkUserPrivacyEditDialog from '@/components/profile/dialogs/UserPrivacyEditDialog'
import TafalkUserDeleteAccountConfirmationDialog from '@/components/profile/dialogs/DeleteAccountConfirmationDialog.vue'

const logger = new Logger('Profile')

export default {
  name: 'Profile',
  data () {
    return {
      changeProfilePictureDialog: false,
      watchTypeUserConnectionValue: 'Watch',
      blockTypeUserConnectionValue: 'Block',
      defaultBio: this.$i18n.t('user.profilePage.defaultBio'),
      defaultLocation: this.$i18n.t('user.profilePage.defaultLocation')
    }
  },
  components: {
    TafalkUserChangeProfilePictureDialog,
    TafalkUserInteractionButtonGroup,
    TafalkProfileTabs,
    TafalkProfileEditSpeedDial,
    TafalkUserBlockConfirmationDialog,
    TafalkUserStopWatchingConfirmationDialog,
    TafalkUserInfoEditDialog,
    TafalkUserPrivacyEditDialog,
    TafalkUserDeleteAccountConfirmationDialog
  },
  computed: {
    ...mapGetters({
      getAuthenticatedUser: 'authenticatedUser/getUser',
      getVisitedUser: 'visitedUser/getUser',
      getIsPageReady: 'getIsPageReady'
    }),
    authenticatedUser () {
      return this.getAuthenticatedUser
    },
    authenticatedUserId () {
      return (this.authenticatedUser || {}).id
    },
    authenticatedUserName () {
      return (this.authenticatedUser || {}).username
    },
    visitedUser () {
      return this.getVisitedUser
    },
    // visibilty deciders
    isVisitingOwnProfile () {
      return this.authenticatedUser && this.visitedUser && this.authenticatedUserName === this.visitedUser.username
    },
    isVisitorAllowed () {
      const outboundBlockId = (((this.visitedUser || {}).connectionsWithAuthenticatedUser || {}).outbound || {}).blockId

      if (outboundBlockId && outboundBlockId.length > 0) return false

      // Other general privacy setting based checks
      if (!this.authenticatedUser || !this.visitedUser) return false

      return true
    },
    isProfileAllowed () {
      return this.isVisitingOwnProfile || this.isVisitorAllowed
    },
    visitedUserBio () {
      return (this.visitedUser && this.visitedUser.bio && this.visitedUser.bio.length > 0) ? this.visitedUser.bio : this.defaultBio
    },
    visitedUserColor () {
      return GetHexColorOfString(this.visitedUser.username || '')
    },
    visitedUserLocationValue () {
      return (this.visitedUser || {}).location || this.defaultLocation
    },
    visitedUserAccountCreationDateStr () {
      return this.visitedUser ? (new Date(this.visitedUser.createdAt)).toISOString().slice(0, 10) : null
    }
  },
  watch: {
    async '$route.params.username' (username) {
      this.setIsPageReady(false)
      this.getInitialInfo(this.$route.params.username)
      this.setIsPageReady(true)
    }
  },
  async created () {
    this.setIsPageReady(false)
    this.getInitialInfo(this.$route.params.username)
    this.setIsPageReady(true)
  },
  destroyed () {
    this.clearVisitedUser()
  },
  methods: {
    ...mapMutations({
      setIsPageReady: 'setIsPageReady',
      setVisitedUser: 'visitedUser/setUser',
      clearVisitedUser: 'visitedUser/clearUser',
      setIsChangeProfilePictureDialogVisible: 'visitedUser/dialog/setIsChangeProfilePictureDialogVisible'
    }),
    ...mapActions({
      setNewSiteError: 'shared/setNewSiteError'
    }),
    async getInitialInfo (username) {
      let visitedUserStoreObject = null

      try {
        const graphqlVisitedProfileResult = await API.graphql(graphqlOperation(GetUserProfileData, { username }))
        const visitedUserProfile = graphqlVisitedProfileResult.data.getUserByUsername[0]

        if (!visitedUserProfile) {
          this.$router.push({ name: 'notFound' })
        } else if (visitedUserProfile.username === this.authenticatedUserName) {
          // TODO: fails when going directly to own profile page?
          visitedUserStoreObject = this.authenticatedUser
        } else {
          const visitedUserProfilePictureObjectUrl = visitedUserProfile.profilePictureKey ? await Storage.get(visitedUserProfile.profilePictureKey, {
            level: 'protected',
            identityId: visitedUserProfile.cognitoIdentityId
          }) : null
          visitedUserStoreObject = {
            ...visitedUserProfile,
            color: GetHexColorOfString(visitedUserProfile.username),
            profilePictureObjectUrl: visitedUserProfilePictureObjectUrl
          }

          if (!this.authenticatedUser) return // no user, no connection

          // get connections
          const graphqlConnectionsFromAuthenticatedUserToVisitedUserResult = await API.graphql(graphqlOperation(GetInteractionsBetweenUsers, {
            actorUserId: this.authenticatedUserId,
            targetUserId: visitedUserProfile.id
          }))

          const graphqlConnectionsFromVisitedUserToAuthenticatedUserResult = await API.graphql(graphqlOperation(GetInteractionsBetweenUsers, {
            actorUserId: (visitedUserProfile || {}).id || '',
            targetUserId: this.authenticatedUserId
          }))

          const inboundUserInteractionsIdIndices = graphqlConnectionsFromAuthenticatedUserToVisitedUserResult.data.queryUserInteractionsBetweenUsersByUserIdIndices
          const outboundUserInteractionsIdIndices = graphqlConnectionsFromVisitedUserToAuthenticatedUserResult.data.queryUserInteractionsBetweenUsersByUserIdIndices

          const inboundWatchingTypeConnections = inboundUserInteractionsIdIndices.filter(rel => rel.interactionType === this.watchTypeUserConnectionValue)
          const outboundWatchingTypeConnections = outboundUserInteractionsIdIndices.filter(rel => rel.interactionType === this.watchTypeUserConnectionValue)

          const inboundBlockingTypeConnections = inboundUserInteractionsIdIndices.filter(rel => rel.interactionType === this.blockTypeUserConnectionValue)
          const outboundBlockingTypeConnections = outboundUserInteractionsIdIndices.filter(rel => rel.interactionType === this.blockTypeUserConnectionValue)

          const connectionsWithAuthenticatedUser = {
            inbound: {
              watchId: GetFirstOrDefaultIdStr(inboundWatchingTypeConnections),
              blockId: GetFirstOrDefaultIdStr(inboundBlockingTypeConnections)
            },
            outbound: {
              watchId: GetFirstOrDefaultIdStr(outboundWatchingTypeConnections),
              blockId: GetFirstOrDefaultIdStr(outboundBlockingTypeConnections)
            }
          }

          // enrich data with user-to-user connections
          visitedUserStoreObject.connectionsWithAuthenticatedUser = connectionsWithAuthenticatedUser
        }

        // persist to store
        this.setVisitedUser(visitedUserStoreObject)
      } catch (err) {
        logger.error('Error occurred while getting user info', JSON.stringify(err.message || err))
        this.setNewSiteError(err.message || err)
      }
    }
  }
}
</script>
