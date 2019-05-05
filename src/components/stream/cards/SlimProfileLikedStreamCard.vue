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
    <v-chip @click.stop="onToAuthorProfileClick(stream.user.username)" class="text-lg-right">
      <v-avatar v-if="authenticatedUser && streamUserProfilePictureObjectUrl != null" >
        <img
          :src="streamUserProfilePictureObjectUrl"
        />
      </v-avatar>
      <v-avatar v-else>
        <img
          src="@/assets/default-user-avatar.jpg"
          alt="Virgina Woolf in Hue"
          v-bind:style="streamUserHue"
        />
      </v-avatar>
      {{ stream.user.username }}
    </v-chip>
    <v-spacer />
  </v-card-title>
  <v-layout>
    <v-flex xs10>
      <v-card-text class="text-truncate">
        {{ stream.body }}
      </v-card-text>
    </v-flex>
    <v-flex xs2>
      <v-btn
        v-if="isVisitingOwnProfile"
        flat
        small
        depressed
        color="error"
        :loading="isLoading"
        :disabled="isLoading"
        @click.stop="unlikeStream"
      >
        {{ $t('user.profilePage.tabs.removeLikeButtonText') }}
      </v-btn>
    </v-flex>
  </v-layout>
  <v-card-actions class="pa-3 grey--text">
    <v-spacer />
    <div v-if="isSealed">
      <v-btn
        small
        flat
        color="grey"
        disabled
        class="text-lowercase"
      >
        <v-icon>airline_seat_flat</v-icon>&nbsp;{{ timeFromSealedToNow }}
      </v-btn>
      <v-btn
        small
        flat
        color="grey"
        disabled
        class="text-lowercase"
      >
        <v-icon>timer</v-icon>&nbsp;{{ timeSpentForStream }}
      </v-btn>
    </div>
    <div v-else>
      <v-btn
        small
        flat
        color="grey"
        disabled
      >
        <v-icon>play_arrow</v-icon>&nbsp;Live Now
      </v-btn>
      <v-btn
        small
        flat
        color="grey"
        disabled
        class="text-lowercase"
      >
        <v-icon>timer</v-icon>&nbsp;{{ timeSpentForStream }}
      </v-btn>
    </div>
    <v-btn
      small
      flat
      color="grey"
      disabled
    >
      <v-icon>bookmark</v-icon>&nbsp;{{ likeCount }}
    </v-btn>
    <v-btn
      small
      flat
      color="grey"
      disabled
    >
      <v-icon>comment</v-icon>&nbsp;{{ commentCount }}
    </v-btn>
  </v-card-actions>
</v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Storage, API, graphqlOperation, Logger } from 'aws-amplify'
import { DeleteLike } from '@/graphql/StreamReaction'
import { GetUserHue } from '@/utils/DefaultProfilePainter'
import { GetElapsedTimeTillNow, GetElapsedTimeBetween } from '@/utils/TimeUtils'

const logger = new Logger('SlimProfileLikedStreamCard')

export default {
  name: 'SlimProfileLikedStreamCard',
  props: ['stream', 'isVisitingOwnProfile'],
  data () {
    return {
      isUnliked: false,
      maxHeight: 185,
      streamUserProfilePictureObjectUrl: null,
      streamUserHue: null,
      isLoading: false
    }
  },
  mounted () {
    this.streamUserHue = GetUserHue(this.stream.user.username)

    if (this.authenticatedUser && this.stream.user.profilePictureKey != null) {
      Storage.get(this.stream.user.profilePictureKey, {
        level: 'protected'
      }).then(resp => (this.streamUserProfilePictureObjectUrl = resp))
    }
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
      return GetElapsedTimeTillNow(this.stream.sealedAt)
    },
    timeSpentForStream () {
      if (this.isSealed === 0) {
        return GetElapsedTimeTillNow(this.stream.startedAt)
      }

      return GetElapsedTimeBetween(this.stream.startedAt, this.stream.sealedAt)
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
