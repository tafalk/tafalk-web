<template>
<v-list-item>
  <v-list-item-content>
    <v-list-item-subtitle>
      <!-- Blocked Content -->
      <v-banner single-line v-if="blocked && !showContentAnyway">
        {{ $t('blockedContent.body') }}
        <template v-slot:actions>
          <v-btn depressed color="primary" @click.stop="showContentAnywayBtnClick">
            {{ $t('blockedContent.showButtonText') }}
          </v-btn>
        </template>
      </v-banner>
      <!-- Comment body -->
      <v-list-item-subtitle v-if="!blocked || showContentAnyway" class="text--primary">
        <a href="javascript:;" @click.stop="onToCommenterProfileClick(commentorUser.username)">
          @{{ commentorUser.username }}
        </a> &mdash; {{ comment.content }}
      </v-list-item-subtitle>
      <!-- timestamp -->
      <v-tooltip right v-if="!blocked || showContentAnyway" >
        <template v-slot:activator="{ on }">
          <v-list-item-action-text v-html="getTimePassed(comment.time)" v-on="on"></v-list-item-action-text>
        </template>
        <span class="caption">{{ comment.time }}</span>
      </v-tooltip>
    </v-list-item-subtitle>
  </v-list-item-content>
  <v-list-item-action v-if="!blocked || showContentAnyway" >
    <!-- Flag -->
    <v-btn
      v-if="authenticatedUser && !isOwnComment && !authenticatedUserFlagId"
      text
      icon
      small
      :color="flagButtonColor"
      @click.stop="onFlagDialogShowClick"
    >
      <v-icon>mdi-flag-outline</v-icon>
    </v-btn>
    <v-btn
      v-else-if="authenticatedUserFlagId"
      text
      icon
      small
      :color="flagButtonColor"
      @click.stop="onRetractFlagDialogShowClick"
    >
      <v-icon>mdi-flag</v-icon>
    </v-btn>
  </v-list-item-action>
  <!-- Flag comment dialog -->
  <tafalk-flag-dialog
    contentType="canto"
    :contentId="comment.id"
  ></tafalk-flag-dialog>
  <tafalk-retract-flag-confirmation-dialog
    :id="authenticatedUserFlagId"
  ></tafalk-retract-flag-confirmation-dialog>
</v-list-item>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { GetElapsedTimeTillNow } from '@/utils/typeUtils'
import { streamCommentFetchLength, blockTypeUserConnectionValue } from '@/utils/constants'
import TafalkFlagDialog from '@/components/flag/dialogs/FlagDialog.vue'
import TafalkRetractFlagConfirmationDialog from '@/components/flag/dialogs/RetractFlagConfirmationDialog.vue'

export default {
  name: 'StreamComment',
  props: ['comment'],
  components: {
    TafalkFlagDialog,
    TafalkRetractFlagConfirmationDialog
  },
  data () {
    return {
      datenow: '',
      showContentAnyway: false,
      flagButtonColor: 'grey',
      fetchLimit: streamCommentFetchLength,
      blockTypeUserConnectionValue
    }
  },
  computed: {
    ...mapGetters({
      getStream: 'stream/getStream',
      getAuthenticatedUser: 'authenticatedUser/getUser',
      getPaginatedStreamComments: 'stream/getPaginatedStreamComments',
      getNowTime: 'time/getNowTime'
    }),
    stream () {
      return this.getStream
    },
    authenticatedUser () {
      return this.getAuthenticatedUser
    },
    commentorUser () {
      return comment.user || {}
    },
    blocked () {
      if (!this.authenticatedUser) return false
      return this.authenticatedUser.userInteractions.items
        .some(el => el.interactionType === this.blockTypeUserConnectionValue && el.targetUserId === this.commentorUser.id)
    },
    isOwnComment () {
      return this.authenticatedUser.username === this.commentorUser.username
    },
    authenticatedUserFlagId () {
      return ((this.comment.flags || []).find(item => item.userId === this.authenticatedUser.id) || {}).id
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  methods: {
    ...mapMutations({
      setPaginatedStreamComments: 'stream/setPaginatedStreamComments',
      showFlagDialog: 'flag/dialog/showFlagDialog',
      showRetractFlagDialog: 'flag/dialog/showRetractFlagDialog'
    }),
    getTimePassed (str) {
      return GetElapsedTimeTillNow(this.getNowTime, str)
    },
    onToCommenterProfileClick (username) {
      this.$router.push({ name: 'profile', params: { username: username } })
    },
    onFlagDialogShowClick () {
      this.showFlagDialog()
    },
    onRetractFlagDialogShowClick () {
      this.showRetractFlagDialog()
    },
    showContentAnywayBtnClick () {
      this.showContentAnyway = true
    }
  }
}
</script>
