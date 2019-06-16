<template>
<v-card
  hover
  max-height=200
  @click.native="onToStreamButtonClick"
>
  <v-card-title dense primary class="title grey--text">
    {{ stream.title || $t('stream.noTitlePlaceholder') }}
    <v-spacer />
    <v-chip @click.stop="onToAuthorProfileClick(stream.user.username)" small>
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
  </v-card-title>
  <v-card-text class="text-truncate">{{ stream.body }}</v-card-text>
  <v-card-actions class="pa-2 grey--text">
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
import { mapGetters } from 'vuex'
import { Storage } from 'aws-amplify'
import { GetUserHue } from '@/utils/generators'
import { GetElapsedTimeTillNow, GetElapsedTimeBetween } from '@/utils/typeUtils'

export default {
  name: 'BriefStreamCard',
  props: ['stream'],
  data () {
    return {
      streamUserProfilePictureObjectUrl: null,
      streamUserHue: null
    }
  },
  async mounted () {
    this.streamUserHue = GetUserHue(this.stream.user.username)

    this.streamUserProfilePictureObjectUrl = (this.authenticatedUser && this.stream.user.profilePictureKey != null)
      ? await Storage.get(this.stream.user.profilePictureKey, { level: 'protected' })
      : null
  },
  computed: {
    ...mapGetters({
      getAuthenticatedUser: 'authenticatedUser/getUser',
      getNowTime: 'time/getNowTime'
    }),
    authenticatedUser () {
      return this.getAuthenticatedUser
    },
    likeCount () {
      if (this.stream.likes == null) return 0
      return this.stream.likes.length
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
    onToStreamButtonClick () {
      this.$router.push({ name: 'stream', params: { id: this.stream.id } })
    },
    onToAuthorProfileClick (username) {
      this.$router.push({ name: 'profile', params: { username: username } })
    }
  }
}
</script>
