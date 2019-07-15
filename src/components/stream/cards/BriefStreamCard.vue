<template>
<v-card
  hover
  :max-height="maxHeight"
  @click.native="onToStreamButtonClick"
>
  <v-card-title dense primary class="title grey--text">
    <!-- Stream Header -->
    {{ stream.title || $t('stream.noTitlePlaceholder') }}
    <v-spacer />
    <!-- Stream Author Chip -->
    <v-chip @click.stop="onToAuthorProfileClick" small pill>
      <v-avatar left>
        <!-- Author is not active -->
        <v-icon left v-if="!author" class="white--text">mdi-account-circle</v-icon>
        <!-- Author active but no prifile picture set -->
        <v-img
          v-else-if="!authorProfilePictureObjectUrl"
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
      {{ authorDisplayUsername }}
    </v-chip>
  </v-card-title>
  <!-- Stream Body -->
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
      <v-icon class="grey--text caption">mdi-bookmark</v-icon>&nbsp;{{ bookmarkCount }}
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
import { activeUserAccountStatus } from '@/utils/constants'
import { GetHexColorOfString } from '@/utils/generators'
import { GetElapsedTimeTillNow, GetElapsedTimeBetween } from '@/utils/typeUtils'

export default {
  name: 'BriefStreamCard',
  props: ['stream'],
  data () {
    return {
      maxHeight: 200,
      activeUserAccountStatus,
      authorProfilePictureObjectUrl: null,
      authorColor: null
    }
  },
  async mounted () {
    if (this.author) {
      // the author is active
      this.authorColor = GetHexColorOfString(this.author.username)

      this.authorProfilePictureObjectUrl = (this.authenticatedUser && this.author.profilePictureKey)
        ? await Storage.get(this.author.profilePictureKey, { level: 'protected' })
        : null
    }
  },
  computed: {
    ...mapGetters({
      getAuthenticatedUser: 'authenticatedUser/getUser',
      getNowTime: 'time/getNowTime'
    }),
    author () {
      return (this.stream.user && this.stream.user.accountStatus === this.activeUserAccountStatus) ? this.stream.user : null
    },
    authorDisplayUsername () {
      if (!this.stream.user) {
        return null
      } else if (this.stream.user.accountStatus !== this.activeUserAccountStatus) {
        return this.stream.user.id
      } else {
        return this.author.username
      }
    },
    authenticatedUser () {
      return this.getAuthenticatedUser
    },
    bookmarkCount () {
      return this.stream.bookmarks ? this.stream.bookmarks.length : 0
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
