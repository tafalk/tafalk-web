<template>
<!-- Full page loader -->
<v-skeleton-loader
  :loading="!getIsPageReady"
  type="list-item-avatar, article, list-item-three-line, list-item-three-line, list-item-three-line, list-item-three-line"
>
  <!-- Not allowed -->
  <v-row v-if="!isStreamAllowed" justify="space-between" align="center">
    <v-col cols="12">
      <tafalk-not-allowed-stream />
    </v-col>
  </v-row>
  <!-- Regular content -->
  <v-container v-else>
    <v-row justify="space-between" align="center">
        <v-col cols="11" md="9" offset-md="1">
          <!-- Stream Author Chip -->
          <v-avatar
            @click.stop="onToAuthorProfileClick"
            :style="{ 'cursor': 'pointer' }"
          >
            <!-- Author is not active -->
            <v-icon left v-if="!author" class="white--text">mdi-account-circle</v-icon>
            <!-- Author active but no profile picture set -->
            <v-img
              v-else-if="!authenticatedUser || !authorProfilePictureObjectUrl"
              :src="require('@/assets/default-user-avatar.webp')"
              alt="Virgina Woolf in Hue"
              :style="{backgroundColor: authorColor}"
            ></v-img>
            <!-- Author active and has profile pic -->
            <v-img
              v-else
              :src="authorProfilePictureObjectUrl"
            ></v-img>
          </v-avatar>
          &nbsp;
          <!-- User name -->
          <span class="headline grey--text">{{ authorDisplayUsername }}</span>
        </v-col>
        <!-- Action Menu -->
        <v-col cols="1">
          <v-menu bottom left>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <!-- Remove Bookmark -->
              <v-list-item @click="onRemoveLikeClick" v-if="isSealed && authenticatedUserLikeId">
                <v-list-item-icon>
                  <v-icon :color="bookmarkButtonColor">mdi-bookmark</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ $t('stream.likes.unlikeButtonText') }}</v-list-item-title>
              </v-list-item>
              <!-- Raise Flag -->
              <v-list-item @click="onFlagDialogShowClick" v-if="isSealed && authenticatedUser && !isVisitingOwnStream && !authenticatedUserFlagId">
                <v-list-item-icon>
                  <v-icon :color="flagButtonColor">mdi-flag-variant-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ $t('stream.flag.raiseButtonText') }}</v-list-item-title>
              </v-list-item>
              <!-- Retract Flag -->
              <v-list-item @click="onRetractFlagDialogShowClick" v-if="authenticatedUserFlagId">
                <v-list-item-icon>
                  <v-icon :color="flagButtonColor">mdi-flag-variant</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ $t('stream.flag.retracteButtonText') }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
    </v-row>
    <!-- Meta -->
    <v-row>
      <v-col cols="12" md="10" offset-md="1">
        <!-- Title -->
        <span v-if="hasTitle" class="text--primary body-2">{{stream.title}}</span>
        <span v-if="hasTitle" class="body-2">&emsp;</span>
        <!-- Stream time meta -->
        <span v-if="!isSealed" class="red--text body-2">
          <v-icon color="red">mdi-play</v-icon>
          {{ $t('stream.metadata.liveLabel') }}
        </span>
        <span v-else class="grey--text body-2">
          {{ $t('stream.metadata.sealedLabel') }}: {{ timeFromSealedToNow }} in {{ timeSpentForStream }}
        </span>
        <!-- Stream likes -->
        <span class="grey--text body-2" v-if="likeCount > 0">,&nbsp;</span>
        <span class="grey--text body-2" v-if="likeCount > 0">
          <v-icon class="grey--text body-2">mdi-bookmark</v-icon>{{ likeCount }}
        </span>
        <!-- Stream comments -->
        <span class="grey--text body-2" v-if="commentCount > 0">,&nbsp;</span>
        <span class="grey--text body-2" v-if="commentCount > 0">
          <v-icon class="grey--text body-2">mdi-comment</v-icon>{{ commentCount }}
        </span>
      </v-col>
    </v-row>
    <!-- Body -->
    <v-row>
      <v-col cols="12" md="10" offset-md="1">
        {{ stream.body }}
      </v-col>
    </v-row>
    <!-- Add-Comment Sliding Box -->
    <v-row>
      <v-col cols="12" md="10" offset-md="1">
        <v-slide-y-transition>
          <v-card flat v-show="showCommentBox">
            <v-card-text>
              <v-textarea
                ref="newcommentbox"
                filled
                :label="$t('stream.comments.addNewTextareaLabel')"
                v-model="comment"
                :min="minCommentLength"
                :max="maxCommentLength"
                :counter="maxCommentLength"
                :maxlength="maxCommentLength"
              ></v-textarea>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                text
                @click="onCommentTextAreaToggleShowClick"
              >{{ $t('common.options.cancelButtonText') }}</v-btn>
              <v-btn
                text
                color="primary"
                :loading="isCommentLoading"
                :disabled="!isCommentLengthValid || isCommentLoading"
                @click="onCommentSaveClick"
              >{{ $t('common.options.postButtonText') }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-slide-y-transition>
      </v-col>
    </v-row>
    <!-- Comment List -->
    <v-row>
      <v-col cols="12" md="10" offset-md="1">
        <tafalk-stream-comment-list></tafalk-stream-comment-list>
      </v-col>
    </v-row>
    <!-- Interaction Fabs -->
    <v-container class="fab-container">
      <!-- Share -->
      <v-row justify="end" class="my-2">
        <v-btn
          fab
          outlined
          small
          :color="shareButtonColor"
          @click="onShowShareStreamLinkDialog"
        ><v-icon>mdi-share-variant</v-icon></v-btn>
      </v-row>
      <v-row justify="end" class="my-2">
        <!-- Bookmark -->
        <v-btn
          v-if="isSealed && !authenticatedUserLikeId"
          fab
          outlined
          small
          :color="bookmarkButtonColor"
          :loading="isLikeLoading"
          :disabled="isLikeLoading"
          @click="onLikeClick"
        ><v-icon>mdi-bookmark-outline</v-icon></v-btn>
      </v-row>
      <!-- Comment -->
      <v-row justify="end" class="my-2">
        <v-btn
          v-if="isSealed"
          outlined
          fab
          small
          :color="commentButtonColor"
          @click="onCommentTextAreaToggleShowClick"
        ><v-icon>mdi-comment</v-icon></v-btn>
      </v-row>
    </v-container>
    <!-- Share stream link dialog -->
    <tafalk-share-stream-link-dialog></tafalk-share-stream-link-dialog>
    <!-- Flag stream dialog -->
    <tafalk-flag-dialog
      contentType="stream"
      :contentId="stream.id"
    ></tafalk-flag-dialog>
    <!-- Retract flag stream dialog -->
    <tafalk-retract-flag-confirmation-dialog
      :id="authenticatedUserFlagId"
    ></tafalk-retract-flag-confirmation-dialog>
  </v-container>
</v-skeleton-loader>
</template>

<script>
import { Storage, API, graphqlOperation, Logger } from 'aws-amplify'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { GetStream, OnUpdateStream } from '@/graphql/Stream'
import { ListStreamLikes, CreateLike, DeleteLike, OnCreateOrDeleteStreamLike, CreateComment, ListPaginatedStreamComments } from '@/graphql/StreamReaction'
import { ListFlags, OnCreateOrDeleteFlag } from '@/graphql/Flag'
import { GetInteractionsBetweenUsers } from '@/graphql/UserInteraction'
import { GetHexColorOfString, GetStreamLink } from '@/utils/generators'
import { GetElapsedTimeTillNow, GetElapsedTimeBetween, GetFirstOrDefaultIdStr } from '@/utils/typeUtils'
import { streamCommentFetchLength, activeUserAccountStatus } from '@/utils/constants'
import TafalkNotAllowedStream from '@/components/nocontent/StreamNotAllowed.vue'
import TafalkShareStreamLinkDialog from '@/components/stream/dialogs/ShareStreamLinkDialog.vue'
import TafalkStreamCommentList from '@/components/comment/stream/StreamCommentList.vue'
import TafalkFlagDialog from '@/components/flag/dialogs/FlagDialog.vue'
import TafalkRetractFlagConfirmationDialog from '@/components/flag/dialogs/RetractFlagConfirmationDialog.vue'

const logger = new Logger('Stream')

export default {
  name: 'Stream',
  components: {
    TafalkNotAllowedStream,
    TafalkShareStreamLinkDialog,
    TafalkStreamCommentList,
    TafalkFlagDialog,
    TafalkRetractFlagConfirmationDialog
  },
  data () {
    return {
      activeUserAccountStatus,
      outboundBlockId: null,
      outboundWatchId: null,
      watchTypeUserConnectionValue: 'Watch',
      blockTypeUserConnectionValue: 'Block',
      authorProfilePictureObjectUrl: null,
      streamChange: null,
      likeObjects: null,
      flagObjects: null,
      streamChangeSubscription: null,
      likeChangeSubscription: null,
      flagChangeSubscription: null,
      isLikeLoading: false,
      isCommentLoading: false,
      showCommentBox: false,
      shareButtonColor: 'green',
      bookmarkButtonColor: 'pink',
      commentButtonColor: 'orange',
      flagButtonColor: 'red',
      comment: '',
      minCommentLength: 3,
      maxCommentLength: 200,
      commentFetchLimit: streamCommentFetchLength
    }
  },
  computed: {
    ...mapGetters({
      getAuthenticatedUser: 'authenticatedUser/getUser',
      getStream: 'stream/getStream',
      getIsFlaggedByAuthenticatedUser: 'stream/getIsFlaggedByAuthenticatedUser',
      getNowTime: 'time/getNowTime',
      getIsPageReady: 'getIsPageReady'
    }),
    stream () {
      return this.getStream
    },
    hasTitle () {
      return (this.stream || {}).title && this.stream.title.trim()
    },
    likes () {
      return (this.stream || {}).likes
    },
    comments () {
      return (this.stream || {}).comments
    },
    authenticatedUser () {
      return this.getAuthenticatedUser
    },
    author () {
      return (this.stream || {}).user
    },
    authorDisplayUsername () {
      if (!this.author) return null

      return ((this.author || {}).accountStatus !== this.activeUserAccountStatus) ? (this.author || {}).id : (this.author || {}).username
    },
    authorColor () {
      return GetHexColorOfString((this.author || {}).username)
    },
    isVisitingOwnStream () {
      return this.authenticatedUser && this.authenticatedUser.username === (this.author || {}).username
    },
    isVisitorAllowed () {
      if (this.outboundBlockId && this.outboundBlockId.length > 0) return false // Blocked User Check
      return true
    },
    isStreamAllowed () {
      return this.isVisitingOwnStream || this.isVisitorAllowed
    },
    likeCount () {
      if (!this.likes) return 0
      return this.likes.length
    },
    commentCount () {
      if (!this.comments) return 0
      return this.comments.length
    },
    authenticatedUserLikeId () {
      if (!this.likes) return undefined
      const authenticatedUserLikeItem = this.likes.find(item => item.userId === this.authenticatedUser.id)
      return (authenticatedUserLikeItem) ? authenticatedUserLikeItem.id : authenticatedUserLikeItem
    },
    isCommentLengthValid () {
      return this.comment && this.comment.length >= this.minCommentLength && this.comment.length <= this.maxCommentLength
    },
    isSealed () {
      return (this.stream || {}).isSealed
    },
    timeFromSealedToNow () {
      if (!this.isSealed) return null
      return GetElapsedTimeTillNow(this.getNowTime, (this.stream || {}).sealTime)
    },
    timeSpentForStream () {
      if (!this.isSealed) {
        return GetElapsedTimeTillNow(this.getNowTime, (this.stream || {}).startTime)
      }
      return GetElapsedTimeBetween((this.stream || {}).startTime, (this.stream || {}).sealTime)
    },
    authenticatedUserFlagId () {
      return ((((this.stream || {}).flags || []).find(item => item.userId === this.authenticatedUser.id) || {})).id
    }
  },
  watch: {
    async '$route.params.id' (streamId) {
      this.setIsPageReady(false)
      await this.getInitialInfo(this.$route.params.id)
      this.setIsPageReady(true)
    },
    'streamChange.body' (val) {
      this.stream.body = val
    },
    'streamChange.title' (val) {
      this.stream.title = val
    },
    'streamChange.sealTime' (val) {
      this.stream.sealTime = val
    },
    likeObjects (val) {
      this.setStreamLikes(val)
    },
    flagObjects (val) {
      this.setStreamFlags(val)
    }
  },
  async created () {
    this.setIsPageReady(false)
    await this.getInitialInfo(this.$route.params.id)
    this.setIsPageReady(true)
  },
  beforeDestroy () {
    this.streamChangeSubscription.unsubscribe()
    this.likeChangeSubscription.unsubscribe()
    this.flagChangeSubscription.unsubscribe()
  },
  methods: {
    ...mapMutations({
      showShareStreamLinkDialog: 'stream/dialog/showShareStreamLinkDialog',
      showFlagDialog: 'flag/dialog/showFlagDialog',
      showRetractFlagDialog: 'flag/dialog/showRetractFlagDialog',
      setShareStreamLink: 'stream/setShareStreamLink',
      setStream: 'stream/setStream',
      setStreamLikes: 'stream/setStreamLikes',
      setStreamFlags: 'stream/setStreamFlags',
      setPaginatedStreamComments: 'stream/setPaginatedStreamComments',
      setIsPageReady: 'setIsPageReady'
    }),
    ...mapActions({
      setNewSiteError: 'shared/setNewSiteError',
      setNewUserInteractionResultSuccess: 'shared/setNewUserInteractionResultSuccess',
      setNewUserInteractionResultError: 'shared/setNewUserInteractionResultError'
    }),
    async getInitialInfo (streamId) {
      try {
        const streamGraphqlAsync = API.graphql(graphqlOperation(GetStream, { streamId }))
        const paginatedCommentsGraphqlAsync = API.graphql(graphqlOperation(ListPaginatedStreamComments, {
          streamId: streamId,
          limit: this.commentFetchLimit,
          nextToken: null
        }))
        const streamGraphqlResult = await streamGraphqlAsync
        const paginatedCommentsGraphqlResult = await paginatedCommentsGraphqlAsync

        // add to the vuex store
        this.setStream(streamGraphqlResult.data.getStream)
        this.setPaginatedStreamComments(paginatedCommentsGraphqlResult.data.listPaginatedStreamComments)

        // set profile pic
        this.authorProfilePictureObjectUrl = (this.authenticatedUser && (this.author || {}).profilePictureKey)
          ? await Storage.get((this.author || {}).profilePictureKey, { level: 'protected', identityId: (this.author || {}).cognitoIdentityId })
          : null

        // Subscribe to stream itself for live content changes
        this.streamChangeSubscription = API.graphql(
          graphqlOperation(OnUpdateStream, { id: (this.stream || {}).id })
        ).subscribe({
          next: (eventData) => {
            this.streamChange = eventData.value.data.onUpdateStream
          },
          error: (err) => this.setNewSiteError(err.message || err)
        })

        // Subscribe to likes
        this.likeChangeSubscription = API.graphql(
          graphqlOperation(OnCreateOrDeleteStreamLike, { streamId: (this.stream || {}).id })
        ).subscribe({
          next: async (eventData) => {
            const graphqlLikeListResult = await API.graphql(
              graphqlOperation(ListStreamLikes, { streamId: (this.stream || {}).id })
            )
            this.likeObjects = graphqlLikeListResult.data.listStreamLikes
          },
          error: (err) => this.setNewSiteError(err.message || err)
        })

        // Subscribe to flags
        this.flagChangeSubscription = API.graphql(
          graphqlOperation(OnCreateOrDeleteFlag, { contentId: (this.stream || {}).id })
        ).subscribe({
          next: async (eventData) => {
            const graphqlFlagListResult = await API.graphql(
              graphqlOperation(ListFlags, { contentId: (this.stream || {}).id })
            )
            this.flagObjects = graphqlFlagListResult.data.listFlags
          },
          error: (err) => this.setNewSiteError(err.message || err)
        })

        const graphqlConnectionsFromVisitedStreamAuthorToAuthenticatedUserResult = await API.graphql(graphqlOperation(GetInteractionsBetweenUsers, {
          actorUserId: (this.author || {}).id,
          targetUserId: this.authenticatedUser.id
        }))

        const outboundUserInteractionsIdIndices = graphqlConnectionsFromVisitedStreamAuthorToAuthenticatedUserResult.data.queryUserInteractionsBetweenUsersByUserIdIndices

        const outboundWatchingTypeConnections = outboundUserInteractionsIdIndices.filter(rel => rel.interactionType === this.watchTypeUserConnectionValue)
        const outboundBlockingTypeConnections = outboundUserInteractionsIdIndices.filter(rel => rel.interactionType === this.blockTypeUserConnectionValue)

        this.outboundWatchId = GetFirstOrDefaultIdStr(outboundWatchingTypeConnections)
        this.outboundBlockId = GetFirstOrDefaultIdStr(outboundBlockingTypeConnections)
      } catch (err) {
        logger.error('Error occurred while getting user info', JSON.stringify(err.message || err))
        this.setNewSiteError(err.message || err)
      }
    },
    onShowShareStreamLinkDialog () {
      this.setShareStreamLink(GetStreamLink((this.stream || {}).id))
      this.showShareStreamLinkDialog()
    },
    async onLikeClick () {
      this.isLikeLoading = true
      try {
        await API.graphql(graphqlOperation(CreateLike, {
          streamId: (this.stream || {}).id,
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
    onToAuthorProfileClick () {
      if (!this.author) return
      this.$router.push({ name: 'profile', params: { username: (this.author || {}).username } })
    },
    onCommentTextAreaToggleShowClick () {
      this.comment = ''
      if (!this.showCommentBox) {
        this.commentButtonColor = 'grey'
      } else {
        this.commentButtonColor = 'orange'
      }
      this.showCommentBox = !this.showCommentBox

      this.$refs.newcommentbox.focus() // TODO: This does not work
      this.$vuetify.goTo(this.$refs.newcommentbox)
    },
    onFlagDialogShowClick () {
      this.showFlagDialog()
    },
    onRetractFlagDialogShowClick () {
      this.showRetractFlagDialog()
    },
    async onCommentSaveClick () {
      // Yes, comments are not saved instantly. Braveness is not required for commenters.
      this.isCommentLoading = true
      try {
        await API.graphql(graphqlOperation(CreateComment, {
          streamId: (this.stream || {}).id,
          userId: this.authenticatedUser.id,
          time: new Date().toISOString(),
          content: this.comment
        }))
        this.setNewUserInteractionResultSuccess(this.$i18n.t('stream.comments.message.genericAddSuccess'))

        // Load comments
        const commentsGraphqlResult = await API.graphql(graphqlOperation(ListPaginatedStreamComments, {
          streamId: (this.stream || {}).id,
          limit: this.commentFetchLimit,
          nextToken: null
        }))

        this.setPaginatedStreamComments(commentsGraphqlResult.data.listPaginatedStreamComments)
      } catch (err) {
        logger.error('An error occurred while adding the comment', err)
        this.setNewUserInteractionResultError(this.$i18n.t('stream.comments.message.genericAddError'))
      } finally {
        this.commentButtonColor = 'orange'
        this.isCommentLoading = false
        this.showCommentBox = false
      }
    }
  }
}
</script>

<style scoped>
  .fab-container {
    position: fixed;
    bottom: 2%;
    right: 6.75%;
  }
</style>
