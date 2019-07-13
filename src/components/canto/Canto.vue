<template>
<v-container fluid grid-list-lg>
  <!-- full page loader -->
  <v-layout v-if="!pageReady || canto == null" align-center fill-height row>
    <v-flex offset-md5 md2 offset-sm5 sm2 offset-xs5-and-up xs2>
      <img src="@/assets/page-preloader.gif" alt="">
    </v-flex>
  </v-layout>
  <!-- regular content -->
  <v-layout row wrap v-else>
    <v-flex xs12 sm12 offset-md2 md8>
      <div v-if="isCantoAllowed">
        <v-card text>
          <v-toolbar dense flat>
            <!-- Title -->
            <v-toolbar-title flat>
              <span class="grey--text headline">{{ $t('canto.metadata.title') }}</span>
            </v-toolbar-title>
            <v-spacer />
            <!-- User avatar -->
            <v-chip @click="onAuthorProfileClick" small pill>
              <v-avatar left v-if="authenticatedUser && cantoUserProfilePictureObjectUrl != null">
                <img :src="cantoUserProfilePictureObjectUrl" />
              </v-avatar>
              <v-avatar left v-else>
                <img
                  src="@/assets/default-user-avatar.jpg"
                  alt="Virgina Woolf in Hue"
                  v-bind:style="cantoUserHue"
                />
              </v-avatar> {{canto.user.username}}
            </v-chip>
          </v-toolbar>
          <!-- Body -->
          <v-card-text>{{ canto.body }}</v-card-text>
          <v-divider />
          <!-- Acions -->
          <v-card-actions>
            <!-- Canto metadata -->
            <span class="grey--text">
              {{ $t('canto.metadata.timeInfoLabel', { created: timeFromCreatedToNow, lastUpdated: timeFromLastUpdatedToNow }) }}
            </span>
            <v-spacer />
            <!-- Share -->
            <v-btn
              text
              icon
              small
              :color="shareButtonColor"
              @click="onShowShareCantoLinkDialog"
            >
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
            &nbsp;
            <!-- Bookmark -->
            <v-btn
              v-if="!authenticatedUserLikeId"
              text
              icon
              small
              :color="bookmarkButtonColor"
              :loading="isLikeLoading"
              :disabled="isLikeLoading"
              @click="onLikeClick"
            >
                <v-icon>mdi-bookmark-outline</v-icon>&nbsp;{{ likeCount }}
            </v-btn>
            <v-btn
              v-if="authenticatedUserLikeId"
              text
              icon
              small
              :color="bookmarkButtonColor"
              :loading="isLikeLoading"
              :disabled="isLikeLoading"
              @click="onRemoveLikeClick"
            >
                <v-icon>mdi-bookmark</v-icon>&nbsp;{{ likeCount }}
            </v-btn>
            &nbsp;
            <!-- Flag -->
            <v-btn
              v-if="authenticatedUser != null && !isVisitingOwnCanto && !authenticatedUserFlagId"
              text
              icon
              small
              :color="flagButtonColor"
              @click.stop="onFlagDialogShowClick"
            >
              <v-icon>mdi-flag-variant-outline</v-icon>
            </v-btn>
            <v-btn
              v-else-if="authenticatedUserFlagId"
              text
              icon
              small
              :color="flagButtonColor"
              @click.stop="onRetractFlagDialogShowClick"
            >
              <v-icon>mdi-flag-variant</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
        <br />
        <!-- Share canto link dialog -->
        <tafalk-share-canto-link-dialog></tafalk-share-canto-link-dialog>
        <!-- Flag canto dialog -->
        <tafalk-flag-dialog
        ></tafalk-flag-dialog>
        <!-- Retract flag canto dialog -->
        <tafalk-retract-flag-confirmation-dialog
        ></tafalk-retract-flag-confirmation-dialog>
      </div>
      <tafalk-not-allowed-canto v-else></tafalk-not-allowed-canto>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import { Storage, API, graphqlOperation, Logger } from 'aws-amplify'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { GetCanto, OnUpdateCanto } from '@/graphql/Canto'
import { ListCantoLikes, CreateLike, DeleteLike, OnCreateOrDeleteCantoLike } from '@/graphql/CantoReaction'
import { GetUserIdByUserName } from '@/graphql/Profile'
import { GetInteractionsBetweenUsers } from '@/graphql/UserInteraction'
import { GetUserHue, GetCantoLink } from '@/utils/generators'
import { GetElapsedTimeTillNow, GetFirstOrDefaultIdStr } from '@/utils/typeUtils'
import TafalkNotAllowedCanto from '@/components/nocontent/CantoNotAllowed.vue'
import TafalkShareCantoLinkDialog from '@/components/canto/dialogs/ShareCantoLinkDialog.vue'
import TafalkFlagDialog from '@/components/flag/dialogs/FlagDialog.vue'
import TafalkRetractFlagConfirmationDialog from '@/components/flag/dialogs/RetractFlagConfirmationDialog.vue'

const logger = new Logger('Canto')

export default {
  name: 'Canto',
  components: {
    TafalkNotAllowedCanto,
    TafalkShareCantoLinkDialog,
    TafalkFlagDialog,
    TafalkRetractFlagConfirmationDialog
  },
  data () {
    return {
      pageReady: false,
      outboundBlockId: null,
      outboundWatchId: null,
      watchTypeUserConnectionValue: 'Watch',
      blockTypeUserConnectionValue: 'Block',
      cantoUserProfilePictureObjectUrl: null,
      cantoChangeSubscription: null,
      cantoChange: null,
      likeObjects: null,
      likeChangeSubscription: null,
      isLikeLoading: false,
      shareButtonColor: 'green',
      bookmarkButtonColor: 'pink',
      flagButtonColor: 'red'
    }
  },
  computed: {
    ...mapGetters({
      getAuthenticatedUser: 'authenticatedUser/getUser',
      getCanto: 'canto/getCanto',
      getIsFlaggedByAuthenticatedUser: 'canto/getIsFlaggedByAuthenticatedUser',
      getNowTime: 'time/getNowTime'
    }),
    canto () {
      return this.getCanto
    },
    likes () {
      return this.canto.likes
    },
    cantoUserHue () {
      return GetUserHue(this.canto.user.username)
    },
    authenticatedUser () {
      return this.getAuthenticatedUser
    },
    author () {
      return this.canto.user || null
    },
    // visibilty deciders
    isVisitingOwnCanto () {
      return this.authenticatedUser != null && this.authenticatedUser.username === this.author.username
    },
    isVisitorAllowed () {
      // Blocked User Check
      if (this.outboundBlockId && this.outboundBlockId.length > 0) {
        return false
      }

      // Other general privacy setting based checks
      if (!this.authenticatedUser || this.stream.privacy === 'Private') {
        // Locked to anyone
        return false
      } else if (this.stream.privacy === 'PrivateButWatching' && (this.outboundWatchId == null || this.outboundWatchId.length === 0)) {
        // Locked to not watched by the author
        return false
      } else if (this.stream.privacy === 'Protected' && this.authenticatedUser == null) {
        // Locked to outcomers and an outcomer is visiting right now
        return false
      } else {
        // Profile is public or an insider visits a protected/public account
        return true
      }
    },
    isCantoAllowed () {
      return this.isVisitingOwnCanto || this.isVisitorAllowed
    },
    likeCount () {
      if (this.likes == null) return 0
      return this.likes.length
    },
    authenticatedUserLikeId () {
      if (this.likes == null) return undefined
      const authenticatedUserLikeItem = this.likes.find(item => item.userId === this.authenticatedUser.id)
      return (authenticatedUserLikeItem) ? authenticatedUserLikeItem.id : authenticatedUserLikeItem
    },
    timeFromCreatedToNow () {
      return GetElapsedTimeTillNow(this.getNowTime, this.canto.startTime)
    },
    timeFromLastUpdatedToNow () {
      return GetElapsedTimeTillNow(this.getNowTime, this.canto.lastUpdateTime)
    },
    authenticatedUserFlagId () {
      return (((this.canto.flags || []).find(item => item.userId === this.authenticatedUser.id) || {})).id
    }
  },
  watch: {
    '$route.params.username' (username) {
      this.getInitialInfo(this.$route.params.username)
        .then(() => {
          this.pageReady = true
        })
    },
    'cantoChange.body' (val) {
      this.canto.body = val
    },
    'cantoChange.lastUpdateTime' (val) {
      this.canto.lastUpdateTime = val
    },
    'cantoChange.likes' (val) {
      // Not reached
    },
    'likeObjects' (val) {
      this.setCantoLikes(val)
    }
  },
  created () {
    this.getInitialInfo(this.$route.params.username)
      .then(() => {
        this.pageReady = true
      })
  },
  beforeDestroy () {
    this.cantoChangeSubscription.unsubscribe()
    this.likeChangeSubscription.unsubscribe()
  },
  methods: {
    ...mapMutations({
      showShareCantoLinkDialog: 'canto/dialog/showShareCantoLinkDialog',
      showFlagDialog: 'flag/dialog/showFlagDialog',
      showRetractFlagDialog: 'flag/dialog/showRetractFlagDialog',
      setShareCantoLink: 'canto/setShareCantoLink',
      setCanto: 'canto/setCanto',
      setCantoLikes: 'canto/setCantoLikes',
      setFlag: 'flag/setFlag',
      setRetractFlag: 'flag/setRetractFlag'
    }),
    ...mapActions({
      setNewSiteError: 'shared/setNewSiteError',
      setNewUserInteractionResultSuccess: 'shared/setNewUserInteractionResultSuccess',
      setNewUserInteractionResultError: 'shared/setNewUserInteractionResultError'
    }),
    async getInitialInfo (username) {
      try {
        const getUserIdByUserNameGraphqlReq = await API.graphql(graphqlOperation(GetUserIdByUserName, { username }))
        const getUserIdByUserNameGraphqlResult = getUserIdByUserNameGraphqlReq.data.getUserByUsername[0]
        const cantoId = getUserIdByUserNameGraphqlResult.id

        const cantoGraphqlResult = await API.graphql(graphqlOperation(GetCanto, { id: cantoId }))

        // add to the vuex store
        this.setCanto(cantoGraphqlResult.data.getCanto)

        // set profile pic
        this.cantoUserProfilePictureObjectUrl = this.canto.user.profilePictureKey != null
          ? await Storage.get(this.authenticatedUser && this.canto.user.profilePictureKey, { level: 'protected' })
          : null

        // Subscribe to canto itself for live content changes
        this.cantoChangeSubscription = API.graphql(
          graphqlOperation(OnUpdateCanto, { id: cantoId })
        ).subscribe({
          next: (eventData) => {
            this.cantoChange = eventData.value.data.onUpdateCanto
          },
          error: (err) => this.setNewSiteError(err.message || err)
        })

        // Subscribe to likes
        this.likeChangeSubscription = API.graphql(
          graphqlOperation(OnCreateOrDeleteCantoLike, { cantoId: cantoId })
        ).subscribe({
          next: async (eventData) => {
            const graphqlLikeListResult = await API.graphql(
              graphqlOperation(ListCantoLikes, { cantoId: cantoId })
            )
            this.likeObjects = graphqlLikeListResult.data.listCantoLikes
            // this.likeObjects = eventData.value.data.onCreateOrDeleteLike
          },
          error: (err) => this.setNewSiteError(err.message || err)
        })

        const graphqlConnectionsFromVisitedCantoAuthorToAuthenticatedUserResult = await API.graphql(graphqlOperation(GetInteractionsBetweenUsers, {
          actorUserId: this.author.id,
          targetUserId: this.authenticatedUser.id
        }))

        const outboundUserInteractionsIdIndices = graphqlConnectionsFromVisitedCantoAuthorToAuthenticatedUserResult.data.queryUserInteractionsBetweenUsersByUserIdIndices

        const outboundWatchingTypeConnections = outboundUserInteractionsIdIndices.filter(rel => rel.interactionType === this.watchTypeUserConnectionValue)
        const outboundBlockingTypeConnections = outboundUserInteractionsIdIndices.filter(rel => rel.interactionType === this.blockTypeUserConnectionValue)

        this.outboundWatchId = GetFirstOrDefaultIdStr(outboundWatchingTypeConnections)
        this.outboundBlockId = GetFirstOrDefaultIdStr(outboundBlockingTypeConnections)
      } catch (err) {
        logger.error('Error occurred while getting canto info', JSON.stringify(err.message || err))
        this.setNewSiteError(err.message || err)
      }
    },
    onShowShareCantoLinkDialog () {
      this.setShareCantoLink(GetCantoLink(this.author.username))
      this.showShareCantoLinkDialog()
    },
    async onLikeClick () {
      this.isLikeLoading = true
      try {
        await API.graphql(graphqlOperation(CreateLike, {
          cantoId: this.author.id,
          userId: this.authenticatedUser.id,
          time: new Date().toISOString()
        }))
      } catch (err) {
        logger.error('An error occurred while adding the like')
        this.setNewUserInteractionResultError(this.$i18n.t('stream.likes.message.genericCastError'))
      } finally {
        this.isLikeLoading = false
      }
    },
    async onRemoveLikeClick () {
      this.isLikeLoading = true
      try {
        await API.graphql(graphqlOperation(DeleteLike, {
          id: this.authenticatedUserLikeId
        }))
      } catch (err) {
        logger.error('An error occurred while deleting the like', JSON.stringify(err))
        this.setNewUserInteractionResultError(this.$i18n.t('stream.likes.message.genericUncastError'))
      } finally {
        this.isLikeLoading = false
      }
    },
    onAuthorProfileClick () {
      this.$router.push({ name: 'profile', params: { username: this.author.username } })
    },
    onFlagDialogShowClick () {
      this.setFlag({
        cantoId: this.canto.id,
        type: 'canto'
      })
      this.showFlagDialog()
    },
    onRetractFlagDialogShowClick () {
      this.setRetractFlag({
        type: 'canto',
        retractFlagId: this.authenticatedUserFlagId
      })
      this.showRetractFlagDialog()
    }
  }
}
</script>

<style scoped>

</style>
