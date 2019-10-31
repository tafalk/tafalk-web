<template>
<!-- Full page loader -->
<v-skeleton-loader
  :loading="!getIsPageReady"
  type="list-item-avatar, article, list-item-three-line, list-item-three-line, list-item-three-line, list-item-three-line"
>
  <!-- Not allowed -->
  <v-row v-if="!isCantoAllowed" justify="space-between" align="center">
    <TafalkContentNotAllowed />
  </v-row>
  <!-- Regular content -->
  <v-container v-else>
    <v-row justify="space-between" align="center">
      <v-col cols="11" md="9" offset-md="1">
        <!-- Canto Author Chip -->
        <v-avatar
          @click.stop="onToAuthorProfileClick"
          size="32"
          :style="{ 'cursor': 'pointer' }"
        >
          <!-- Author active but no profile picture set -->
          <v-img
            v-if="!authenticatedUser || !authorProfilePictureObjectUrl"
            :src="require('@/assets/default-user-avatar.webp')"
            alt="Virgina Woolf in Hue"
            :style="{backgroundColor: authorColor}"
          ></v-img>
          <!-- Author has profile pic -->
          <v-img
            v-else
            :src="authorProfilePictureObjectUrl"
          ></v-img>
        </v-avatar>
        &nbsp;
        <!-- User name -->
        <span class="headline grey--text">{{ (author || {}).username }}</span>
      </v-col>
      <!-- Action Menu -->
      <v-col cols="1">
        <v-menu bottom left>
          <template v-slot:activator="{ on }">
            <v-btn aria-label="Actions" icon v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <!-- Remove Bookmark -->
            <v-list-item @click="onRemoveLikeClick" v-if="authenticatedUserLikeId">
              <v-list-item-icon>
                <v-icon :color="bookmarkButtonColor">mdi-bookmark</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ $t('canto.likes.unlikeButtonText') }}</v-list-item-title>
            </v-list-item>
            <!-- Raise Flag -->
            <v-list-item @click="onFlagDialogShowClick" v-if="authenticatedUser && !isVisitingOwnCanto && !authenticatedUserFlagId">
              <v-list-item-icon>
                <v-icon :color="flagButtonColor">mdi-flag-variant-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ $t('canto.flag.raiseButtonText') }}</v-list-item-title>
            </v-list-item>
            <!-- Retract Flag -->
            <v-list-item @click="onRetractFlagDialogShowClick" v-if="authenticatedUserFlagId">
              <v-list-item-icon>
                <v-icon :color="flagButtonColor">mdi-flag-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ $t('canto.flag.retracteButtonText') }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <!-- Meta -->
    <v-row>
      <v-col cols="12" md="10" offset-md="1">
        <!-- Canto metadata -->
        <span class="grey--text body-2">
          {{ $t('canto.metadata.timeInfoLabel', { created: timeFromCreatedToNow, lastUpdated: timeFromLastUpdatedToNow }) }}
        </span>
        <!-- Canto likes -->
        <span class="grey--text body-2" v-if="likeCount > 0">,&nbsp;</span>
        <span class="grey--text body-2" v-if="likeCount > 0">
          <v-icon class="grey--text body-2">mdi-bookmark</v-icon>{{ likeCount }}
        </span>
      </v-col>
    </v-row>
    <!-- Body -->
    <v-row>
      <v-col cols="12" md="10" offset-md="1" ref="cantoBody"
        v-html="cantoBody"
        :class="selectApplicableClass"
        :style="{ whiteSpace: 'pre-line' }"
      ></v-col>
    </v-row>

    <!-- Interaction Fabs -->
    <v-container class="fab-container">
      <!-- Share -->
      <v-row justify="end" class="my-2">
        <v-btn
          aria-label="Share"
          fab
          outlined
          x-small
          :color="shareButtonColor"
          @click="onShowShareCantoLinkDialog"
        >
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>
      </v-row>
      <v-row justify="end" class="my-2">
        <!-- Bookmark -->
        <v-btn
          aria-label="Bookmark"
          v-if="authenticatedUser && !authenticatedUserLikeId"
          fab
          outlined
          x-small
          :color="bookmarkButtonColor"
          :loading="isLikeLoading"
          :disabled="isLikeLoading"
          @click="onFirstLikeClick"
        >
          <v-icon>mdi-bookmark-outline</v-icon>
        </v-btn>
        <v-btn
          aria-label="Move Bookmark"
          v-if="authenticatedUser && authenticatedUserLikeId"
          fab
          outlined
          x-small
          :color="bookmarkButtonColor"
          :loading="isMoveLikeLoading"
          :disabled="isMoveLikeLoading"
          @click="onMoveLikeClick"
        >
          <v-icon>mdi-bookmark-plus</v-icon>
        </v-btn>
      </v-row>
    </v-container>

    <!-- Dialogs -->
    <!-- Share canto link dialog -->
    <tafalk-share-canto-link-dialog></tafalk-share-canto-link-dialog>
    <!-- Flag canto dialog -->
    <tafalk-flag-dialog
      contentType="canto"
      :contentId="canto.id"
    ></tafalk-flag-dialog>
    <!-- Retract flag canto dialog -->
    <tafalk-retract-flag-confirmation-dialog
      :id="authenticatedUserFlagId"
    ></tafalk-retract-flag-confirmation-dialog>

    <!-- Snackbars -->
    <v-snackbar
      v-model="isSelectToMoveBookmarkSnackbarVisible"
      :multi-line="$vuetify.breakpoint.xsOnly"
    >
      {{ $t('canto.likes.message.unselectedNewBookmarkIndexError') }}
      <v-btn
        aria-label="Close"
        color="pink"
        text
        @click="isSelectToMoveBookmarkSnackbarVisible = false"
      >
        {{ $t('common.options.closeButtonText') }}
      </v-btn>
    </v-snackbar>
  </v-container>
</v-skeleton-loader>
</template>

<script>
import API, { graphqlOperation } from '@aws-amplify/api'
import Storage from '@aws-amplify/storage'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { GetCanto, OnUpdateCanto } from '@/graphql/Canto'
import { ListCantoLikes, CreateLike, UpdateLikeIndices, DeleteLike, OnCreateOrDeleteCantoLike } from '@/graphql/CantoReaction'
import { ListFlags, OnCreateOrDeleteFlag } from '@/graphql/Flag'
import { GetUserIdByUserName } from '@/graphql/Profile'
import { GetInteractionsBetweenUsers } from '@/graphql/UserInteraction'
import { cantoBookmarkId, cantoPreBookmarkClass, cantoPostBookmarkClass } from '@/utils/constants'
import { GetHexColorOfString, GetCantoLink, BookmarkCantoContent, GetSiblings } from '@/utils/generators'
import { GetElapsedTimeTillNow, GetFirstOrDefaultIdStr } from '@/utils/typeUtils'
import TafalkContentNotAllowed from '@/components/nocontent/ContentNotAllowed.vue'
import TafalkShareCantoLinkDialog from '@/components/canto/dialogs/ShareCantoLinkDialog.vue'
import TafalkFlagDialog from '@/components/flag/dialogs/FlagDialog.vue'
import TafalkRetractFlagConfirmationDialog from '@/components/flag/dialogs/RetractFlagConfirmationDialog.vue'

export default {
  name: 'Canto',
  components: {
    TafalkContentNotAllowed,
    TafalkShareCantoLinkDialog,
    TafalkFlagDialog,
    TafalkRetractFlagConfirmationDialog
  },
  data () {
    return {
      outboundBlockId: null,
      outboundWatchId: null,
      watchTypeUserConnectionValue: 'Watch',
      blockTypeUserConnectionValue: 'Block',
      authorProfilePictureObjectUrl: null,
      cantoChangeSubscription: null,
      cantoChange: null,
      likeObjects: null,
      flagObjects: null,
      likeChangeSubscription: null,
      flagChangeSubscription: null,
      isLikeLoading: false,
      isMoveLikeLoading: false,
      isRemoveLikeLoading: false,
      shareButtonColor: 'green',
      bookmarkButtonColor: 'pink',
      flagButtonColor: 'red',
      likeIndexSeparator: '-',
      selectApplicableClass: 'select-applicable',
      isSelectToMoveBookmarkSnackbarVisible: false
    }
  },
  computed: {
    ...mapGetters({
      getAuthenticatedUser: 'authenticatedUser/getUser',
      getCanto: 'canto/getCanto',
      // getIsFlaggedByAuthenticatedUser: 'canto/getIsFlaggedByAuthenticatedUser',
      getCantoBodyUserSelection: 'canto/getBodyUserSelection',
      getNowTime: 'time/getNowTime',
      getIsPageReady: 'getIsPageReady'
    }),
    canto () {
      return this.getCanto || {}
    },
    cantoBody () {
      if (!this.canto || !this.canto.body) return ''
      return this.canto.body.trim()
    },
    likes () {
      return this.canto ? this.canto.likes : []
    },
    authenticatedUser () {
      return this.getAuthenticatedUser || {}
    },
    author () {
      return this.canto ? this.canto.user : null
    },
    authorColor () {
      return this.canto ? GetHexColorOfString((this.author || {}).username) : null
    },
    // visibilty deciders
    isVisitingOwnCanto () {
      return this.authenticatedUser && this.author && this.authenticatedUser.username === (this.author || {}).username
    },
    isVisitorAllowed () {
      if (this.outboundBlockId && this.outboundBlockId.length) return false // Blocked User Check

      return true
    },
    isCantoAllowed () {
      return this.isVisitingOwnCanto || this.isVisitorAllowed
    },
    likeCount () {
      return (this.likes || []).length
    },
    authenticatedUserLikeId () {
      if (!this.likes) return undefined
      const authenticatedUserLikeItem = this.likes.find(item => item.userId === this.authenticatedUser.id)
      return (authenticatedUserLikeItem) ? authenticatedUserLikeItem.id : authenticatedUserLikeItem
    },
    authenticatedUserLikeIndices () {
      const authenticatedUserLikeItem = (this.likes || []).find(item => item.userId === this.authenticatedUser.id)
      if (!authenticatedUserLikeItem || !authenticatedUserLikeItem.indices) return []
      return authenticatedUserLikeItem.indices.split(this.likeIndexSeparator, 2)
    },
    timeFromCreatedToNow () {
      return (this.canto) ? GetElapsedTimeTillNow(this.getNowTime, this.canto.startTime) : null
    },
    timeFromLastUpdatedToNow () {
      return (this.canto) ? GetElapsedTimeTillNow(this.getNowTime, this.canto.lastUpdateTime) : null
    },
    authenticatedUserFlagId () {
      return ((((this.canto || {}).flags || []).find(item => item.userId === this.authenticatedUser.id) || {})).id
    },
    cantoBodyUserSelection () {
      return this.getCantoBodyUserSelection
    }
  },
  watch: {
    async '$route.params.username' (username) {
      this.setIsPageReady(false)
      await this.getInitialInfo(this.$route.params.username)
      this.setIsPageReady(true)
    },
    'cantoChange.body' (val) {
      this.canto.body = val
    },
    'cantoChange.lastUpdateTime' (val) {
      this.canto.lastUpdateTime = val
    },
    likeObjects (val) {
      this.setCantoLikes(val)
    },
    flagObjects (val) {
      this.setCantoFlags(val)
    },
    authenticatedUserLikeIndices (newVal, oldVal) {
      if (!this.$refs.cantoBody) return
      // Selection did not change, no nothing
      if (newVal === oldVal) return
      this.$refs.cantoBody.innerHTML = BookmarkCantoContent(this.$refs.cantoBody, newVal)
    }
  },
  async created () {
    // Selection Event Handler
    document.addEventListener('selectionchange', this.onSelectionChange)
    // Fetch initial data
    this.setIsPageReady(false)
    this.getInitialInfo(this.$route.params.username)
    this.setIsPageReady(true)
  },
  updated () {
    if (!this.$refs.cantoBody) return
    this.$nextTick(() => {
      // The whole view is rendered. ¯\_(ツ)_/¯
      this.$refs.cantoBody.innerHTML = BookmarkCantoContent(this.$refs.cantoBody, this.authenticatedUserLikeIndices)

      if (this.authenticatedUserLikeIndices && this.authenticatedUserLikeIndices.length) {
        this.$vuetify.goTo(`span#${cantoBookmarkId}`)
      }
    })
  },
  beforeDestroy () {
    // Selection Event Handler
    document.removeEventListener('selectionchange', this.onSelectionChange)
    this.cantoChangeSubscription.unsubscribe()
    this.likeChangeSubscription.unsubscribe()
    this.flagChangeSubscription.unsubscribe()
  },
  methods: {
    ...mapMutations({
      showShareCantoLinkDialog: 'canto/dialog/showShareCantoLinkDialog',
      showFlagDialog: 'flag/dialog/showFlagDialog',
      showRetractFlagDialog: 'flag/dialog/showRetractFlagDialog',
      setShareCantoLink: 'canto/setShareCantoLink',
      setCanto: 'canto/setCanto',
      setCantoLikes: 'canto/setCantoLikes',
      setCantoFlags: 'canto/setCantoFlags',
      setIsPageReady: 'setIsPageReady',
      setCantoBodyUserSelection: 'canto/setBodyUserSelection'
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
        this.authorProfilePictureObjectUrl = this.canto.user.profilePictureKey != null
          ? await Storage.get(this.authenticatedUser && this.canto.user.profilePictureKey, { level: 'protected', identityId: this.canto.user.cognitoIdentityId })
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
          },
          error: (err) => this.setNewSiteError(err.message || err)
        })

        // Subscribe to flags
        this.flagChangeSubscription = API.graphql(
          graphqlOperation(OnCreateOrDeleteFlag, { contentId: cantoId })
        ).subscribe({
          next: async (eventData) => {
            const graphqlFlagListResult = await API.graphql(
              graphqlOperation(ListFlags, { contentId: cantoId })
            )
            this.flagObjects = graphqlFlagListResult.data.listFlags
          },
          error: (err) => this.setNewSiteError(err.message || err)
        })

        const graphqlConnectionsFromVisitedCantoAuthorToAuthenticatedUserResult = await API.graphql(graphqlOperation(GetInteractionsBetweenUsers, {
          actorUserId: (this.author || {}).id,
          targetUserId: this.authenticatedUser.id
        }))

        const outboundUserInteractionsIdIndices = graphqlConnectionsFromVisitedCantoAuthorToAuthenticatedUserResult.data.queryUserInteractionsBetweenUsersByUserIdIndices

        const outboundWatchingTypeConnections = outboundUserInteractionsIdIndices.filter(rel => rel.interactionType === this.watchTypeUserConnectionValue)
        const outboundBlockingTypeConnections = outboundUserInteractionsIdIndices.filter(rel => rel.interactionType === this.blockTypeUserConnectionValue)

        this.outboundWatchId = GetFirstOrDefaultIdStr(outboundWatchingTypeConnections)
        this.outboundBlockId = GetFirstOrDefaultIdStr(outboundBlockingTypeConnections)
      } catch (err) {
        this.setNewSiteError(err.message || err)
      }
    },
    onShowShareCantoLinkDialog () {
      this.setShareCantoLink(GetCantoLink((this.author || {}).username))
      this.showShareCantoLinkDialog()
    },
    async onFirstLikeClick () {
      this.isLikeLoading = true
      try {
        // Get end index of first string
        const words = this.cantoBody.split(' ')
        const indexEnd = (words && words.length) ? (words[0] || '').length : (this.cantoBody || '').length

        // Create Like with index
        await API.graphql(graphqlOperation(CreateLike, {
          cantoId: (this.author || {}).id,
          userId: this.authenticatedUser.id,
          time: new Date().toISOString(),
          indices: `0${this.likeIndexSeparator}${indexEnd}`
        }))
      } catch (err) {
        this.setNewUserInteractionResultError(this.$i18n.t('canto.likes.message.genericCastError'))
      } finally {
        this.isLikeLoading = false
      }
    },
    async onMoveLikeClick () {
      if (!this.cantoBodyUserSelection) {
        this.isSelectToMoveBookmarkSnackbarVisible = true
        return
      }
      this.isMoveLikeLoading = true
      try {
        await API.graphql(graphqlOperation(UpdateLikeIndices, {
          id: this.authenticatedUserLikeId,
          indices: `${this.cantoBodyUserSelection.start}${this.likeIndexSeparator}${this.cantoBodyUserSelection.end}`,
          time: new Date().toISOString()
        }))
      } catch (err) {
        this.setNewUserInteractionResultError(this.$i18n.t('canto.likes.message.genericUncastError'))
      } finally {
        this.isMoveLikeLoading = false
      }
    },
    async onRemoveLikeClick () {
      this.isRemoveLikeLoading = true
      try {
        await API.graphql(graphqlOperation(DeleteLike, {
          id: this.authenticatedUserLikeId
        }))
      } catch (err) {
        this.setNewUserInteractionResultError(this.$i18n.t('canto.likes.message.genericUncastError'))
      } finally {
        this.isRemoveLikeLoading = false
      }
    },
    onSelectionChange (e) {
      // Get selection Range
      const range = document.getSelection().getRangeAt(0)
      if (range.collapsed) {
        // if a single click (not a tafalkish selection indeed)
        this.setCantoBodyUserSelection(null)
        return
      }

      const rangeStartContainer = range.startContainer
      const rangeEndContainer = range.endContainer
      const rangeStartOffset = range.startOffset
      const rangeEndOffset = range.endOffset

      if (rangeStartContainer !== rangeEndContainer && range.commonAncestorContainer.classList.contains(this.selectApplicableClass)) {
        // start and end are not in the body
        this.setCantoBodyUserSelection(null)
        return
      }

      if (rangeStartContainer.parentNode.classList.contains(cantoPreBookmarkClass) && rangeEndContainer.parentNode.classList.contains(cantoPreBookmarkClass)) {
        // Range starts and ends before the existing bookmark
        this.setCantoBodyUserSelection({
          start: rangeStartOffset,
          end: rangeEndOffset
        })
        return
      }
      if (rangeStartContainer.parentNode.classList.contains(cantoPostBookmarkClass) && rangeEndContainer.parentNode.classList.contains(cantoPostBookmarkClass)) {
        const siblingSpans = GetSiblings(rangeStartContainer.parentNode)
        const indexOffset = siblingSpans.reduce((prev, next) => prev + (next.innerText || '').length, 0)
        // Range starts after the existing bookmark
        this.setCantoBodyUserSelection({
          start: rangeStartOffset + indexOffset,
          end: rangeEndOffset + indexOffset
        })
      }
    },
    onToAuthorProfileClick () {
      this.$router.push({ name: 'profile', params: { username: (this.author || {}).username } })
    },
    onFlagDialogShowClick () {
      this.showFlagDialog()
    },
    onRetractFlagDialogShowClick () {
      this.showRetractFlagDialog()
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
