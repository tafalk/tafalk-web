<template>
<!-- full page loader -->
<tafalk-page-loading-progress v-if="!getIsPageReady" />
<!-- regular content -->
<v-container v-else pt-5>
  <!-- Not Allowed To See -->
  <tafalk-not-allowed-profile v-if="!isProfileAllowed" />
  <!-- Allowed -->
  <v-container v-else>
    <v-row>
      <v-col
        cols="12"
        md="8"
        offset-md="2"
        class="text-center"
      >
        <v-card flat>
          <!-- Profile Edit Buttons (Authorized User) -->
          <tafalk-profile-edit-speed-dial v-if="isVisitingOwnProfile" />
          <!-- User Info -->
          <v-container v-if="visitedUser">
            <v-row>
              <!-- Avatar Section -->
              <v-col
                cols="12"
                md="4"
              >
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
              <v-col
                cols="12"
                md="8"
              >
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
                    <v-row align="center">
                      <v-col cols="12">
                        <div class="text-left grey--text"><v-icon color="grey">mdi-bio</v-icon>&nbsp;{{visitedUserBio}}</div>
                      </v-col>
                    </v-row>
                    <!-- Other Basic Info -->
                    <v-row align="center">
                      <v-col cols="12" sm="6">
                        <p class="text-left grey--text"><v-icon color="grey">mdi-map-marker</v-icon>&nbsp;{{visitedUserLocationValue}}</p>
                        <p class="text-left grey--text"><v-icon color="grey">mdi-web</v-icon>&nbsp;{{visitedUser.site}}</p>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <p v-if="visitedUserAccountCreationDateStr" class="text-left grey--text"><v-icon color="grey">mdi-calendar-clock</v-icon>&nbsp;{{visitedUserAccountCreationDateStr}}</p>
                        <p class="text-left grey--text"><v-icon color="grey">mdi-lock</v-icon>&nbsp;{{visitedUser.profilePrivacy}}</p>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <!-- User Interaction Button Group -->
                <v-row>
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
          <tafalk-profile-tabs v-if="visitedUser"
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
      :profilePrivacy="visitedUser.profilePrivacy"
      :allowDirectMesages="visitedUser.allowDirectMesages"
    ></tafalk-user-privacy-edit-dialog>
    <!-- User Delete Account Confirmation Dialog -->
    <tafalk-user-delete-account-confirmation-dialog
      v-if="visitedUser"
      :userId="visitedUser.id">
    </tafalk-user-delete-account-confirmation-dialog>
  </v-container>
</v-container>
</template>

<script>
import { API, graphqlOperation, Logger } from 'aws-amplify'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { GetUserProfileData } from '@/graphql/Profile'
import { GetInteractionsBetweenUsers } from '@/graphql/UserInteraction'
import { GetStoreUser } from '@/utils/storeUtils'
import { GetFirstOrDefaultIdStr } from '@/utils/typeUtils'
import { GetHexColorOfString } from '@/utils/generators'
import TafalkNotAllowedProfile from '@/components/nocontent/ProfileNotAllowed.vue'
import TafalkUserInteractionButtonGroup from '@/components/user/buttons/UserInteractionButtonGroup.vue'
import TafalkProfileTabs from '@/components/user/tabs/ProfileTabs.vue'
import TafalkProfileEditSpeedDial from '@/components/user/buttons/EditSpeedDial.vue'
import TafalkUserChangeProfilePictureDialog from '@/components/user/dialogs/UserChangeProfilePictureDialog.vue'
import TafalkUserStopWatchingConfirmationDialog from '@/components/user/dialogs/StopWatchingConfirmationDialog.vue'
import TafalkUserBlockConfirmationDialog from '@/components/user/dialogs/BlockConfirmationDialog.vue'
import TafalkUserInfoEditDialog from '@/components/user/dialogs/UserInfoEditDialog.vue'
import TafalkUserPrivacyEditDialog from '@/components/user/dialogs/UserPrivacyEditDialog'
import TafalkUserDeleteAccountConfirmationDialog from '@/components/user/dialogs/DeleteAccountConfirmationDialog.vue'
import TafalkPageLoadingProgress from '@/components/shared/progresses/ThePageLoading.vue'

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
    TafalkPageLoadingProgress,
    TafalkUserChangeProfilePictureDialog,
    TafalkNotAllowedProfile,
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
      // Blocked User Check
      if (!this.visitedUser || !this.visitedUser.connectionsWithAuthenticatedUser || !this.visitedUser.connectionsWithAuthenticatedUser.outbound) {
        return false
      }
      const outboundBlockId = this.visitedUser.connectionsWithAuthenticatedUser.outbound.blockId || null

      if (outboundBlockId && outboundBlockId.length > 0) {
        return false
      }

      // Other general privacy setting based checks
      if (!this.authenticatedUser || !this.visitedUser || this.visitedUser.profilePrivacy === 'Private') {
        // Locked to anyone
        return false
      } else if (this.visitedUser && this.visitedUser.profileUserPrivacy === 'Protected' && this.authenticatedUser == null) {
        // Locked to outcomers and an outcomer is visiting right now
        return false
      } else {
        // Profile is public or an insider visits a protected/public account
        return true
      }
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
    '$route.params.username' (username) {
      this.setIsPageReady(false)
      this.getInitialInfo(this.$route.params.username)
        .then(() => {
          this.setIsPageReady(true)
        })
    }
  },
  created () {
    this.setIsPageReady(false)
    this.getInitialInfo(this.$route.params.username)
      .then(() => {
        this.setIsPageReady(true)
      })
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
        const visitedUserDbResult = graphqlVisitedProfileResult.data.getUserByUsername[0]

        if (!visitedUserDbResult) {
          this.$router.push({ name: 'notFound' })
        } else if (visitedUserDbResult.username === this.authenticatedUserName) {
          // TODO: fails when going directly to own profile page?
          visitedUserStoreObject = this.authenticatedUser
        } else {
          visitedUserStoreObject = await GetStoreUser(visitedUserDbResult)

          // get connections
          const graphqlConnectionsFromAuthenticatedUserToVisitedUserResult = await API.graphql(graphqlOperation(GetInteractionsBetweenUsers, {
            actorUserId: this.authenticatedUserId,
            targetUserId: visitedUserDbResult.id
          }))

          const graphqlConnectionsFromVisitedUserToAuthenticatedUserResult = await API.graphql(graphqlOperation(GetInteractionsBetweenUsers, {
            actorUserId: (visitedUserDbResult || {}).id || '',
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
        logger.error('Error occurred while getting user info', err)
        this.setNewSiteError(err.message || err)
      }
    }
  }
}
</script>
