<template>
<v-list-tile
  avatar
>
  <v-list-tile-content>
    <v-list-tile-sub-title class="text--primary">{{ comment.content }}</v-list-tile-sub-title>
    <v-list-tile-sub-title><a href="javascript:;" @click.stop="onToCommenterProfileClick(comment.user.username)">@{{ comment.user.username }}</a></v-list-tile-sub-title>
  </v-list-tile-content>
  <v-list-tile-action>
    <!-- Flag -->
    <v-btn
      v-if="authenticatedUser != null && !isOwnComment && !authenticatedUserFlagId"
      flat
      icon
      small
      :color="flagButtonColor"
      @click.stop="onFlagDialogShowClick"
    >
      <v-icon>outlined_flag</v-icon>
    </v-btn>
    <v-btn
      v-else-if="authenticatedUserFlagId"
      flat
      icon
      small
      :color="flagButtonColor"
      @click.stop="onRetractFlagDialogShowClick"
    >
      <v-icon>flag</v-icon>
    </v-btn>
    <!-- timestamp -->
    <v-tooltip right>
      <template v-slot:activator="{ on }">
        <v-list-tile-action-text v-html="getTimePassed(comment.time)" v-on="on"></v-list-tile-action-text>
      </template>
      <span>{{ comment.time }}</span>
    </v-tooltip>
  </v-list-tile-action>
  <!-- Flag comment dialog -->
  <!--
  <tafalk-flag-dialog
    contentType="comment"
    :content="comment"
    ></tafalk-flag-dialog>
  <tafalk-retract-flag-confirmation-dialog
    contentType="comment"
    :authenticatedUserFlagId="authenticatedUserFlagId"
  ></tafalk-retract-flag-confirmation-dialog>
  -->
</v-list-tile>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { GetElapsedTimeTillNow } from '@/utils/TimeUtils'
import { streamCommentFetchLength } from '@/utils/Constants'

export default {
  name: 'StreamComment',
  props: ['comment'],
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
      showRetractFlagDialog: 'flag/dialog/showRetractFlagDialog',
      setFlag: 'flag/setFlag',
      setRetractFlag: 'flag/setRetractFlag'
    }),
    getTimePassed (str) {
      return GetElapsedTimeTillNow(this.getNowTime, str)
    },
    onToCommenterProfileClick (username) {
      this.$router.push({ name: 'profile', params: { username: username } })
    },
    onFlagDialogShowClick () {
      this.setFlag({
        commentId: this.comment.id,
        type: 'comment'
      })
      this.showFlagDialog()
    },
    onRetractFlagDialogShowClick () {
      this.setRetractFlag({
        type: 'comment',
        retractFlagId: this.authenticatedUserFlagId
      })
      this.showRetractFlagDialog()
    }
  }
}
</script>
