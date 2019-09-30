<template>
<v-list-item>
  <v-list-item-content>
    <v-list-item-subtitle>
      <!-- Comment body -->
      <v-list-item-subtitle class="text--primary"><a href="javascript:;" @click.stop="onToCommenterProfileClick(comment.user.username)">@{{ comment.user.username }}</a> &mdash; {{ comment.content }}</v-list-item-subtitle>
      <!-- timestamp -->
      <v-tooltip right>
        <template v-slot:activator="{ on }">
          <v-list-item-action-text v-html="getTimePassed(comment.time)" v-on="on"></v-list-item-action-text>
        </template>
        <span class="caption">{{ comment.time }}</span>
      </v-tooltip>
    </v-list-item-subtitle>
  </v-list-item-content>
  <v-list-item-action>
    <!-- Flag -->
    <v-btn
      v-if="authenticatedUser != null && !isOwnComment && !authenticatedUserFlagId"
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
import { streamCommentFetchLength } from '@/utils/constants'
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
      flagButtonColor: 'grey',
      fetchLimit: streamCommentFetchLength
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
    isOwnComment () {
      return this.authenticatedUser.username === this.comment.user.username
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
    }
  }
}
</script>
