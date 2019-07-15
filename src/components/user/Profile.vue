<template>
<v-container fluid pt-5>
  <!-- full page loader -->
  <tafalk-page-loading-progress v-if="!pageReady" />
  <!-- regular content -->
  <v-layout row wrap v-else>
    <v-flex xs12 offset-md2 md8>
      <!-- Not Allowed To See -->
      <tafalk-not-allowed-profile v-if="!isProfileAllowed" />
      <!-- Allowed -->
      <div v-else>
        <v-card flat>
          <!-- edit profile button -->
          <tafalk-profile-edit-speed-dial v-if="isVisitingOwnProfile" />

          <v-container fluid grid-list-lg>
            <v-layout row wrap>

              <!-- Profile Pic Section -->
              <v-flex d-flex xs12 md4>
                <v-container pt-3 fluid grid-list-md>
                  <v-layout align-center column>
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
                    <v-btn
                      color="primary"
                      text
                      v-if="isVisitingOwnProfile"
                      @click.stop="setIsChangeProfilePictureDialogVisible(true)"
                    >{{ $t('user.profilePage.changeProfilePictureButtonText') }}</v-btn>
                  </v-layout>
                </v-container>
              </v-flex>
              <!-- username, bio, site etc. section -->
              <v-flex d-flex xs12 md8>
                <v-card-text>
                  <v-container fluid v-if="visitedUser">
                    <v-layout row wrap>
                      <v-flex d-flex xs12>
                        <div class="display-1 text-xs-center text-sm-right grey--text">
                          @{{visitedUser.username}}
                        </div>
                      </v-flex>
                      <v-flex d-flex xs12>
                        <div class="text-xs-left grey--text"><v-icon color="grey">mdi-bio</v-icon>&nbsp;{{visitedUserBio}}</div>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <p class="text-xs-left grey--text"><v-icon color="grey">mdi-map-marker</v-icon>&nbsp;{{visitedUserLocationValue}}</p>
                        <p class="text-xs-left grey--text"><v-icon color="grey">mdi-web</v-icon>&nbsp;{{visitedUser.site}}</p>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <p v-if="visitedUserAccountCreationDateStr" class="text-xs-left grey--text"><v-icon color="grey">mdi-calendar-clock</v-icon>&nbsp;{{visitedUserAccountCreationDateStr}}</p>
                        <p class="text-xs-left grey--text"><v-icon color="grey">mdi-lock</v-icon>&nbsp;{{visitedUser.profilePrivacy}}</p>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-text>
              </v-flex>
              <tafalk-user-interaction-button-group
                v-if="authenticatedUser && !isVisitingOwnProfile"
              ></tafalk-user-interaction-button-group>
            </v-layout>
          </v-container>
          <v-divider />
          <tafalk-profile-tabs
            :userId="visitedUser.id"
            :isVisitingOwnProfile="isVisitingOwnProfile"
          ></tafalk-profile-tabs>
        </v-card>

        <!-- User Edit Info Dialog -->
        <tafalk-user-change-profile-picture-dialog
          :userId="visitedUser.id"
          :existingProfilePictureObjectUrl="visitedUser.profilePictureObjectUrl"
        ></tafalk-user-change-profile-picture-dialog>
        <!-- Stop Watching 'Are you sure' dialog -->
        <tafalk-user-stop-watching-confirmation-dialog />
        <!-- Block 'Are you sure' dialog -->
        <tafalk-user-block-confirmation-dialog />
        <!-- User Edit Info Dialog -->
        <tafalk-user-info-edit-dialog
          :userId="visitedUser.id"
          :bio="visitedUser.bio"
          :location="visitedUser.location"
          :site="visitedUser.site"
        ></tafalk-user-info-edit-dialog>
        <!-- User Edit Privacy Dialog -->
        <tafalk-user-privacy-edit-dialog
          :userId="visitedUser.id"
          :profilePrivacy="visitedUser.profilePrivacy"
          :allowDirectMesages="visitedUser.allowDirectMesages"
        ></tafalk-user-privacy-edit-dialog>
        <!-- User Delete Account Confirmation Dialog -->
        <tafalk-user-delete-account-confirmation-dialog
          :userId="visitedUser.id">
        </tafalk-user-delete-account-confirmation-dialog>
      </div>
    </v-flex>
  </v-layout>
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
      pageReady: false,
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
      getVisitedUser: 'visitedUser/getUser'
    }),
    authenticatedUser () {
      return this.getAuthenticatedUser
    },
    visitedUser () {
      return this.getVisitedUser
    },
    // visibilty deciders
    isVisitingOwnProfile () {
      return this.authenticatedUser != null && this.authenticatedUser.username === this.visitedUser.username
    },
    isVisitorAllowed () {
      // Blocked User Check
      const outboundBlockId = this.visitedUser.connectionsWithAuthenticatedUser.outbound.blockId

      if (outboundBlockId && outboundBlockId.length > 0) {
        return false
      }

      // Other general privacy setting based checks
      if (!this.authenticatedUser || this.visitedUser.profilePrivacy === 'Private') {
        // Locked to anyone
        return false
      } else if (this.visitedUser.profileUserPrivacy === 'Protected' && this.authenticatedUser == null) {
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
      return (this.visitedUser.bio != null && this.visitedUser.bio.length > 0) ? this.visitedUser.bio : this.defaultBio
    },
    visitedUserColor () {
      return GetHexColorOfString(this.visitedUser.username)
    },
    visitedUserLocationValue () {
      return this.visitedUser.location || this.defaultLocation
    },
    visitedUserAccountCreationDateStr () {
      return this.visitedUser ? (new Date(this.visitedUser.createdAt)).toISOString().slice(0, 10) : null
    }
  },
  watch: {
    '$route.params.username' (username) {
      this.getInitialInfo(this.$route.params.username)
        .then(() => {
          this.pageReady = true
        })
    }
  },
  created () {
    this.getInitialInfo(this.$route.params.username)
      .then(() => {
        this.pageReady = true
      })
  },
  destroyed () {
    this.clearVisitedUser()
  },
  methods: {
    ...mapMutations({
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
        } else if (visitedUserDbResult.username === this.authenticatedUser.username) {
          // TODO: fails when going directly to own profile page?
          visitedUserStoreObject = this.authenticatedUser
        } else {
          visitedUserStoreObject = await GetStoreUser(visitedUserDbResult)

          // get connections
          const graphqlConnectionsFromAuthenticatedUserToVisitedUserResult = await API.graphql(graphqlOperation(GetInteractionsBetweenUsers, {
            actorUserId: this.authenticatedUser.id,
            targetUserId: visitedUserDbResult.id
          }))

          const graphqlConnectionsFromVisitedUserToAuthenticatedUserResult = await API.graphql(graphqlOperation(GetInteractionsBetweenUsers, {
            actorUserId: visitedUserDbResult.id,
            targetUserId: this.authenticatedUser.id
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
