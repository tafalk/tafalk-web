<template>
<v-container fluid grid-list-md>
  <!-- full page loader -->
  <v-layout v-if="!pageReady" align-center fill-height>
    <v-flex offset-md5 md2 offset-sm5 sm2 offset-xs5-and-up xs2>
      <img  src="@/assets/page-preloader.gif" alt="">
    </v-flex>
  </v-layout>
  <!-- regular content -->
  <v-layout row wrap v-else>
    <v-flex d-flex xs12 sm12 offset-md2 md8>
      <div v-if="isProfileAllowed">
        <v-card>
          <!-- edit profile button -->
          <tafalk-profile-edit-speed-dial v-if="isVisitingOwnProfile" />

          <v-container fluid grid-list-md>
            <v-layout row wrap>
              <v-flex d-flex xs12 sm4 md4>
                <v-container pa-3 fluid grid-list-md>
                  <v-layout align-center column>
                    <v-avatar v-if="authenticatedUser && visitedUser.profilePictureObjectUrl != null" pt-1 size="200">
                      <img :src="visitedUser.profilePictureObjectUrl" />
                    </v-avatar>
                    <v-avatar v-else pt-1 size="200">
                      <img
                        src="@/assets/default-user-avatar.jpg"
                        alt="Woolf"
                        v-bind:style="visitedUser.hue"
                      />
                    </v-avatar>
                    <v-btn
                      color="primary"
                      flat
                      v-if="isVisitingOwnProfile"
                      @click.stop="setIsChangeProfilePictureDialogVisible(true)"
                    >{{ $t('user.profilePage.changeProfilePictureButtonText') }}</v-btn>
                  </v-layout>
                </v-container>
              </v-flex>
              <v-flex d-flex xs12 sm4 md4>
                <v-card-title primary-title>
                  <div v-if="visitedUser != null">
                    <div class="display-1 grey--text">@{{visitedUser.username}}</div><br/>
                    <span class="grey--text">Bio:&nbsp;{{visitedUserBio}}</span><br/>
                    <span class="grey--text">Site:&nbsp;{{visitedUser.site}}</span>
                  </div>
                </v-card-title>
              </v-flex>
              <v-flex d-flex xs12 sm4 md4>
                <v-card-title primary-title>
                  <div>
                    <span v-if="visitedUserAccountCreationDateStr" class="grey--text"><v-icon>assignment_ind</v-icon>&nbsp;{{visitedUserAccountCreationDateStr}}</span><br/>
                    <span v-if="visitedUser != null" class="grey--text"><v-icon>location_on</v-icon>&nbsp;{{visitedUserLocationValue}}</span><br/>
                    <span v-if="visitedUser != null" class="grey--text"><v-icon>lock</v-icon>&nbsp;{{visitedUser.profilePrivacy}}</span><br/>
                  </div>
                </v-card-title>
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
      <tafalk-not-allowed-profile v-else></tafalk-not-allowed-profile>
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
      if (this.visitedUser.bio == null || this.visitedUser.bio.length === 0) {
        return this.defaultBio
      }
      return this.visitedUser.bio
    },
    visitedUserLocationValue () {
      if (this.visitedUser.location == null) {
        return this.defaultLocation
      }
      return this.visitedUser.location.value
    },
    visitedUserAccountCreationDateStr () {
      if (!this.visitedUser) {
        return null
      }
      return (new Date(this.visitedUser.createdAt)).toISOString().slice(0, 10)
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
