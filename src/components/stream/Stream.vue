<template>
<v-container fluid grid-list-md>
  <!-- full page loader -->
  <v-layout v-if="!pageReady || stream == null" align-center fill-height row>
    <v-flex offset-md5 md2 offset-sm5 sm2 offset-xs5-and-up xs2>
      <img src="@/assets/page-preloader.gif" alt="">
    </v-flex>
  </v-layout>
  <!-- regular content -->
  <v-layout row wrap v-else>
    <v-flex xs12 sm12 offset-md2 md8 infinite-wrapper>
      <div v-if="isStreamAllowed">
        <v-card flat>
          <v-toolbar dense flat>
            <v-toolbar-title flat>
              <span class="grey--text headline">{{ stream.title }}</span>
            </v-toolbar-title>
            <v-spacer />
            <v-chip @click="onAuthorProfileClick" small>
              <v-avatar v-if="authenticatedUser && streamUserProfilePictureObjectUrl != null">
                <img :src="streamUserProfilePictureObjectUrl" />
              </v-avatar>
              <v-avatar v-else size="200">
                <img
                  src="@/assets/default-user-avatar.jpg"
                  alt="Virgina Woolf in Hue"
                  v-bind:style="streamUserHue"
                />
              </v-avatar> {{stream.user.username}}
            </v-chip>
          </v-toolbar>
          <v-card-text>{{ stream.body }}</v-card-text>
          <v-divider />
          <v-card-actions>
            <!-- Stream metadata -->
            <span v-if="!isSealed" class="red--text">
              <v-icon class="red--text">play_arrow</v-icon>
              {{ $t('stream.metadata.liveLabel') }}
            </span>
            <span v-else class="grey--text">
              {{ $t('stream.metadata.sealedLabel') }}: {{ timeFromSealedToNow }} in {{ timeSpentForStream }}
            </span>
            <v-spacer />
            <!-- Share -->
            <v-btn
              flat
              icon
              small
              :color="shareButtonColor"
              @click="onShowShareStreamLinkDialog"
            >
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
            &nbsp;
            <!-- Bookmark -->
            <v-btn
              v-if="isSealed && !authenticatedUserLikeId"
              flat
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
              v-if="isSealed && authenticatedUserLikeId"
              flat
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
            <!-- Comment -->
            <v-btn
              v-if="isSealed"
              flat
              icon
              small
              :color="commentButtonColor"
              @click="onCommentTextAreaToggleShowClick"
            >
              <v-icon>mdi-comment</v-icon>
            </v-btn>
            &nbsp;
            <!-- Flag -->
            <v-btn
              v-if="isSealed && authenticatedUser != null && !isVisitingOwnStream && !authenticatedUserFlagId"
              flat
              icon
              small
              :color="flagButtonColor"
              @click.stop="onFlagDialogShowClick"
            >
              <v-icon>mdi-flag-variant-outline</v-icon>
            </v-btn>
            <v-btn
              v-else-if="authenticatedUserFlagId"
              flat
              icon
              small
              :color="flagButtonColor"
              @click.stop="onRetractFlagDialogShowClick"
            >
              <v-icon>mdi-flag-variant</v-icon>
            </v-btn>
          </v-card-actions>
          <!-- Add-comment sliding box -->
          <v-slide-y-transition>
            <v-card flat v-show="showCommentBox">
              <v-card-text>
                <v-textarea
                  box
                  :label="$t('stream.comments.addNewTextareaLabel')"
                  v-model="comment"
                  :min="minCommentLength"
                  :max="maxCommentLength"
                  :maxlength="maxCommentLength"
                ></v-textarea>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn flat
                  @click="onCommentTextAreaToggleShowClick"
                >{{ $t('common.options.cancelButtonText') }}</v-btn>
                <v-btn flat
                  :loading="isCommentLoading"
                  :disabled="!isCommentLengthValid || isCommentLoading"
                  @click="onCommentSaveClick"
                >{{ $t('common.options.postButtonText') }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-slide-y-transition>
        </v-card>
        <br />
        <!-- Existing comments -->
        <tafalk-stream-comment-list></tafalk-stream-comment-list>
        <!-- Share stream link dialog -->
        <tafalk-share-stream-link-dialog></tafalk-share-stream-link-dialog>
        <!-- Flag stream dialog -->
        <tafalk-flag-dialog
        ></tafalk-flag-dialog>
        <!-- Retract flag stream dialog -->
        <tafalk-retract-flag-confirmation-dialog
        ></tafalk-retract-flag-confirmation-dialog>
      </div>
      <tafalk-not-allowed-stream v-else></tafalk-not-allowed-stream>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import { Storage, API, graphqlOperation, Logger } from 'aws-amplify'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { GetStream, OnUpdateStream } from '@/graphql/Stream'
import { ListStreamLikes, CreateLike, DeleteLike, OnCreateOrDeleteStreamLike, CreateComment, ListPaginatedStreamComments } from '@/graphql/StreamReaction'
import { GetInteractionsBetweenUsers } from '@/graphql/UserInteraction'
import { GetUserHue, GetStreamLink } from '@/utils/generators'
import { GetElapsedTimeTillNow, GetElapsedTimeBetween, GetFirstOrDefaultIdStr } from '@/utils/typeUtils'
import { streamCommentFetchLength } from '@/utils/constants'
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
      pageReady: false,
      outboundBlockId: null,
      outboundWatchId: null,
      watchTypeUserConnectionValue: 'Watch',
      blockTypeUserConnectionValue: 'Block',
      streamUserProfilePictureObjectUrl: null,
      streamChangeSubscription: null,
      streamChange: null,
      likeObjects: null,
      likeChangeSubscription: null,
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
      getNowTime: 'time/getNowTime'
    }),
    stream () {
      return this.getStream
    },
    likes () {
      return this.stream.likes
    },
    comments () {
      return this.stream.comments
    },
    streamUserHue () {
      return GetUserHue(this.stream.user.username)
    },
    authenticatedUser () {
      return this.getAuthenticatedUser
    },
    author () {
      return this.stream.user || null
    },
    // visibilty deciders
    isVisitingOwnStream () {
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
    isStreamAllowed () {
      return this.isVisitingOwnStream || this.isVisitorAllowed
    },
    likeCount () {
      if (this.likes == null) return 0
      return this.likes.length
    },
    commentCount () {
      if (this.comments == null) return 0
      return this.comments.length
    },
    authenticatedUserLikeId () {
      if (this.likes == null) return undefined
      const authenticatedUserLikeItem = this.likes.find(item => item.userId === this.authenticatedUser.id)
      return (authenticatedUserLikeItem) ? authenticatedUserLikeItem.id : authenticatedUserLikeItem
    },
    isCommentLengthValid () {
      return this.comment && this.comment.length >= this.minCommentLength && this.comment.length <= this.maxCommentLength
    },
    isSealed () {
      return this.stream.isSealed
    },
    timeFromSealedToNow () {
      if (!this.isSealed) {
        return null
      }
      return GetElapsedTimeTillNow(this.getNowTime, this.stream.sealTime)
    },
    timeSpentForStream () {
      if (!this.isSealed) {
        return GetElapsedTimeTillNow(this.getNowTime, this.stream.startTime)
      }
      return GetElapsedTimeBetween(this.stream.startTime, this.stream.sealTime)
    },
    authenticatedUserFlagId () {
      return (((this.stream.flags || []).find(item => item.userId === this.authenticatedUser.id) || {})).id
    }
  },
  watch: {
    '$route.params.id' (streamId) {
      this.getInitialInfo(this.$route.params.id)
        .then(() => {
          this.pageReady = true
        })
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
    'streamChange.likes' (val) {
      // Not reached
    },
    'likeObjects' (val) {
      this.setStreamLikes(val)
    }
  },
  created () {
    this.getInitialInfo(this.$route.params.id)
      .then(() => {
        this.pageReady = true
      })
  },
  beforeDestroy () {
    this.streamChangeSubscription.unsubscribe()
    this.likeChangeSubscription.unsubscribe()
  },
  methods: {
    ...mapMutations({
      showShareStreamLinkDialog: 'stream/dialog/showShareStreamLinkDialog',
      showFlagDialog: 'flag/dialog/showFlagDialog',
      showRetractFlagDialog: 'flag/dialog/showRetractFlagDialog',
      setShareStreamLink: 'stream/setShareStreamLink',
      setStream: 'stream/setStream',
      setStreamLikes: 'stream/setStreamLikes',
      setPaginatedStreamComments: 'stream/setPaginatedStreamComments',
      setFlag: 'flag/setFlag',
      setRetractFlag: 'flag/setRetractFlag'
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
        this.streamUserProfilePictureObjectUrl = this.stream.user.profilePictureKey != null
          ? await Storage.get(this.authenticatedUser && this.stream.user.profilePictureKey, { level: 'protected' })
          : null

        // Subscribe to stream itself for live content changes
        this.streamChangeSubscription = API.graphql(
          graphqlOperation(OnUpdateStream, { id: this.stream.id })
        ).subscribe({
          next: (eventData) => {
            this.streamChange = eventData.value.data.onUpdateStream
          },
          error: (err) => this.setNewSiteError(err.message || err)
        })

        // Subscribe to likes
        this.likeChangeSubscription = API.graphql(
          graphqlOperation(OnCreateOrDeleteStreamLike, { streamId: this.stream.id })
        ).subscribe({
          next: async (eventData) => {
            const graphqlLikeListResult = await API.graphql(
              graphqlOperation(ListStreamLikes, { streamId: this.stream.id })
            )
            this.likeObjects = graphqlLikeListResult.data.listStreamLikes
            // this.likeObjects = eventData.value.data.onCreateOrDeleteLike
          },
          error: (err) => this.setNewSiteError(err.message || err)
        })

        const graphqlConnectionsFromVisitedStreamAuthorToAuthenticatedUserResult = await API.graphql(graphqlOperation(GetInteractionsBetweenUsers, {
          actorUserId: this.author.id,
          targetUserId: this.authenticatedUser.id
        }))

        const outboundUserInteractionsIdIndices = graphqlConnectionsFromVisitedStreamAuthorToAuthenticatedUserResult.data.queryUserInteractionsBetweenUsersByUserIdIndices

        const outboundWatchingTypeConnections = outboundUserInteractionsIdIndices.filter(rel => rel.interactionType === this.watchTypeUserConnectionValue)
        const outboundBlockingTypeConnections = outboundUserInteractionsIdIndices.filter(rel => rel.interactionType === this.blockTypeUserConnectionValue)

        this.outboundWatchId = GetFirstOrDefaultIdStr(outboundWatchingTypeConnections)
        this.outboundBlockId = GetFirstOrDefaultIdStr(outboundBlockingTypeConnections)
      } catch (err) {
        logger.error('Error occurred while getting user info', JSON.stringify(err))
        this.setNewSiteError(err.message || err)
      }
    },
    onShowShareStreamLinkDialog () {
      this.setShareStreamLink(GetStreamLink(this.stream.id))
      this.showShareStreamLinkDialog()
    },
    async onLikeClick () {
      this.isLikeLoading = true
      try {
        await API.graphql(graphqlOperation(CreateLike, {
          streamId: this.stream.id,
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
      this.$router.push({ name: 'profile', params: { username: this.stream.user.username } })
    },
    onCommentTextAreaToggleShowClick () {
      this.comment = ''
      if (!this.showCommentBox) {
        this.commentButtonColor = 'grey'
      } else {
        this.commentButtonColor = 'orange'
      }
      this.showCommentBox = !this.showCommentBox
    },
    onFlagDialogShowClick () {
      this.setFlag({
        streamId: this.stream.id,
        type: 'stream'
      })
      this.showFlagDialog()
    },
    onRetractFlagDialogShowClick () {
      this.setRetractFlag({
        type: 'stream',
        retractFlagId: this.authenticatedUserFlagId
      })
      this.showRetractFlagDialog()
    },
    async onCommentSaveClick () {
      // Yes, comments are not saved instantly. Braveness is not required for commenters.
      this.isCommentLoading = true
      try {
        await API.graphql(graphqlOperation(CreateComment, {
          streamId: this.stream.id,
          userId: this.authenticatedUser.id,
          time: new Date().toISOString(),
          content: this.comment
        }))
        this.setNewUserInteractionResultSuccess(this.$i18n.t('stream.comments.message.genericAddSuccess'))

        // Load comments
        const commentsGraphqlResult = await API.graphql(graphqlOperation(ListPaginatedStreamComments, {
          streamId: this.stream.id,
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
