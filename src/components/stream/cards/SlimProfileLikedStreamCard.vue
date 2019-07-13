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
    <v-chip @click.stop="onToAuthorProfileClick(stream.user.username)" small pill>
      <v-avatar left v-if="authenticatedUser && streamUserProfilePictureObjectUrl != null" >
        <img :src="streamUserProfilePictureObjectUrl"/>
      </v-avatar>
      <v-avatar left v-else>
        <img
          src="@/assets/default-user-avatar.webp"
          alt="Virgina Woolf in Hue"
          :class="streamUserColor"
        />
      </v-avatar>
      {{ stream.user.username }}
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
      @click.stop="unlikeStream"
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
      <v-icon class="grey--text caption">mdi-bookmark</v-icon>&nbsp;{{ likeCount }}
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

const logger = new Logger('SlimProfileLikedStreamCard')

export default {
  name: 'SlimProfileLikedStreamCard',
  props: ['stream', 'isVisitingOwnProfile'],
  data () {
    return {
      isUnliked: false,
      maxHeight: 185,
      streamUserProfilePictureObjectUrl: null,
      streamUserColor: null,
      isLoading: false
    }
  },
  async mounted () {
    this.streamUserColor = GetHexColorOfString(this.stream.user.username)

    this.streamUserProfilePictureObjectUrl = (this.authenticatedUser && this.stream.user.profilePictureKey != null)
      ? await Storage.get(this.stream.user.profilePictureKey, { level: 'protected' })
      : null
  },
  computed: {
    ...mapGetters({
      getAuthenticatedUser: 'authenticatedUser/getUser',
      getVisitedUser: 'visitedUser/getUser',
      getNowTime: 'time/getNowTime'
    }),
    authenticatedUser () {
      return this.getAuthenticatedUser
    },
    visitedUser () {
      return this.getVisitedUser
    },
    likes () {
      return this.stream.likes
    },
    likeCount () {
      if (this.likes == null) return 0
      return this.likes.length
    },
    profileUserLikeId () {
      const userLike = this.likes.filter(l => l.userId === this.visitedUser.id)[0]

      return (userLike) ? userLike.id : ''
    },
    commentCount () {
      if (this.stream.comments == null) return 0
      return this.stream.comments.length
    },
    isSealed () {
      return this.stream.isSealed
    },
    timeFromSealedToNow () {
      if (this.isSealed === 0) {
        return null
      }
      return GetElapsedTimeTillNow(this.getNowTime, this.stream.sealTime)
    },
    timeSpentForStream () {
      if (this.isSealed === 0) {
        return GetElapsedTimeTillNow(this.getNowTime, this.stream.startTime)
      }

      return GetElapsedTimeBetween(this.stream.startTime, this.stream.sealTime)
    }
  },
  methods: {
    ...mapActions({
      setNewSiteError: 'shared/setNewSiteError',
      setNewUserInteractionResultSuccess: 'shared/setNewUserInteractionResultSuccess',
      setNewUserInteractionResultError: 'shared/setNewUserInteractionResultError'
    }),
    async unlikeStream () {
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
    onToAuthorProfileClick (username) {
      this.$router.push({ name: 'profile', params: { username: username } })
    }
  }
}
</script>
