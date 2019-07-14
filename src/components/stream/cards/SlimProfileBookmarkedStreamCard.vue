<template>
<v-card
  v-if="!isUnliked"
  hover
  :max-height="maxHeight"
  @click.native="onToStreamButtonClick"
>
  <v-card-title
    dense
    primary
    class="title grey--text"
  >
    {{ stream.title || $t('stream.noTitlePlaceholder') }}
    <v-spacer />
    <!-- Stream Author Chip -->
    <v-chip @click.stop="onToAuthorProfileClick" small pill>
      <v-avatar left>
        <!-- Author is not active -->
        <v-icon left v-if="!author" class="white-text">mdi-account-circle</v-icon>
        <!-- Author active but no prifile picture set -->
        <v-img
          v-else-if="!authorProfilePictureObjectUrl"
          src="@/assets/default-user-avatar.webp"
          alt="Virgina Woolf in Hue"
          :class="authorColor"
        ></v-img>
        <!-- Author active and has profile pic -->
        <v-img
          v-else
          :src="authorProfilePictureObjectUrl"
        ></v-img>
      </v-avatar>
      {{ authorDisplayUsername }}
    </v-chip>
  </v-card-title>
  <v-card-text class="text-truncate">
    {{ stream.body }}
  </v-card-text>
  <v-card-actions class="pa-2 grey--text">
    <v-btn
      v-if="isVisitingOwnProfile"
      text
      small
      depressed
      color="error"
      :loading="isLoading"
      :disabled="isLoading"
      @click.stop="unbookmarkStream"
    >
      {{ $t('user.profilePage.tabs.removeLikeButtonText') }}
    </v-btn>
    <v-spacer />
    <div v-if="isSealed">
      <span class="pa-2 grey--text caption">
        <v-icon class="grey--text caption">mdi-seat-flat</v-icon>{{ timeFromSealedToNow }}
      </span>
      <span class="pa-2 grey--text caption">
        <v-icon class="grey--text caption">mdi-timer</v-icon>{{ timeSpentForStream }}
      </span>
    </div>
    <div v-else>
      <span class="pa-2 grey--text caption">
        <v-icon class="grey--text caption">mdi-play</v-icon>&nbsp;Live Now
      </span>
      <span class="pa-2 grey--text caption">
        <v-icon class="grey--text caption">mdi-timer</v-icon>&nbsp;{{ timeSpentForStream }}
      </span>
    </div>
    <span class="pa-2 grey--text caption">
      <v-icon class="grey--text caption">mdi-bookmark</v-icon>&nbsp;{{ bookmarkCount }}
    </span>
    <span class="pa-2 grey--text caption">
      <v-icon class="grey--text caption">mdi-comment</v-icon>&nbsp;{{ commentCount }}
    </span>
  </v-card-actions>
</v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Storage, API, graphqlOperation, Logger } from 'aws-amplify'
import { DeleteLike } from '@/graphql/StreamReaction'
import { GetHexColorOfString } from '@/utils/generators'
import { GetElapsedTimeTillNow, GetElapsedTimeBetween } from '@/utils/typeUtils'

const logger = new Logger('SlimProfileBookmarkedStreamCard')

export default {
  name: 'SlimProfileBookmarkedStreamCard',
  props: ['stream', 'isVisitingOwnProfile'],
  data () {
    return {
      isUnliked: false,
      isLoading: false,
      maxHeight: 185,
      authorProfilePictureObjectUrl: null,
      authorColor: null
    }
  },
  async mounted () {
    if (this.author) {
      // the author is active
      this.authorColor = GetHexColorOfString(this.author.username)

      this.authorProfilePictureObjectUrl = (this.authenticatedUser && this.author.profilePictureKey)
        ? await Storage.get(this.stream.user.profilePictureKey, { level: 'protected' })
        : null
    }
  },
  computed: {
    ...mapGetters({
      getAuthenticatedUser: 'authenticatedUser/getUser',
      getVisitedUser: 'visitedUser/getUser',
      getNowTime: 'time/getNowTime'
    }),
    author () {
      return (this.stream.user && this.stream.user.accountStatus === this.activeUserAccountStatus) ? this.stream.user : null
    },
    authorDisplayUsername () {
      if (!this.stream.user) return null
      else if (this.stream.user.accountStatus !== this.activeUserAccountStatus) return this.stream.user.id
      else return this.author.username
    },
    authenticatedUser () {
      return this.getAuthenticatedUser
    },
    visitedUser () {
      return this.getVisitedUser
    },
    bookmarks () {
      return this.stream.bookmarks
    },
    bookmarkCount () {
      return this.bookmarks ? this.bookmarks.length : 0
    },
    profileUserLikeId () {
      const userLike = this.bookmarks.filter(l => l.userId === this.visitedUser.id)[0]
      return userLike ? userLike.id : ''
    },
    commentCount () {
      return this.stream.comments ? this.stream.comments.length : 0
    },
    isSealed () {
      return this.stream.isSealed
    },
    timeFromSealedToNow () {
      return this.isSealed !== 0 ? GetElapsedTimeTillNow(this.getNowTime, this.stream.sealTime) : null
    },
    timeSpentForStream () {
      return this.isSealed === 0 ? GetElapsedTimeTillNow(this.getNowTime, this.stream.startTime) : GetElapsedTimeBetween(this.stream.startTime, this.stream.sealTime)
    }
  },
  methods: {
    ...mapActions({
      setNewSiteError: 'shared/setNewSiteError',
      setNewUserInteractionResultSuccess: 'shared/setNewUserInteractionResultSuccess',
      setNewUserInteractionResultError: 'shared/setNewUserInteractionResultError'
    }),
    async unbookmarkStream () {
      this.isLoading = true
      try {
        await API.graphql(graphqlOperation(DeleteLike, {
          id: this.profileUserLikeId
        }))
      } catch (err) {
        logger.error('An error occurred while deleting the like')
        this.setNewUserInteractionResultError(this.$i18n.t('stream.likes.message.genericUncastError'))
      } finally {
        this.isUnliked = true
        this.isLoading = false
      }
    },
    onToStreamButtonClick () {
      this.$router.push({ name: 'stream', params: { id: this.stream.id } })
    },
    onToAuthorProfileClick () {
      if (!this.author) return
      this.$router.push({ name: 'profile', params: { username: this.author.username } })
    }
  }
}
</script>
