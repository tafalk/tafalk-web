<template>
  <!-- C A R D   D I S P L A Y -->
  <v-card
    v-if="displayType === cardDisplayType"
    flat
    :max-height="maxHeight"
    @click.native="onToCantoButtonClick"
  >
    <!-- Card Title -->
    <v-card-title
      :dense="dense"
      class="title grey--text"
    >
      <!-- Canto Header -->
      <v-spacer />
      <!-- Canto Author Chip -->
      <v-chip
        v-if="displayUserInfo"
        :small="dense"
        color="transparent"
        pill
        @click.stop="onToAuthorProfileClick"
      >
        <!-- avatar -->
        <v-avatar left>
          <!-- Author is not active -->
          <v-icon left v-if="!author" class="white--text">mdi-account-circle</v-icon>
          <!-- Author active but no profile picture set -->
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

    <!-- Card Body -->
    <v-card-text class="text-truncate">{{ body }}</v-card-text>

    <!-- Card Bottom -->
    <v-card-actions class="pa-2 grey--text">
      <v-spacer v-if="$vuetify.breakpoint.smAndUp"/>
      <span class="pa-2 grey--text caption">
        <v-icon class="grey--text caption">mdi-timer</v-icon>&nbsp;{{ timeSpentForCanto }}
      </span>
      <v-spacer v-if="showUserInteractionData"/>
      <span v-if="showUserInteractionData" class="pa-2 grey--text caption">
        <v-icon class="grey--text caption">mdi-bookmark</v-icon>&nbsp;{{ bookmarkCount }}
      </span>
      <v-spacer v-if="$vuetify.breakpoint.smAndUp && showUserInteractionData"/>
    </v-card-actions>
  </v-card>

  <!-- I T E M   D I S P L A Y -->
  <v-list-item
    v-else
    :style="{ 'cursor': 'pointer' }"
    :two-line="!dense"
    :three-line="dense"
    @click.native="onToCantoButtonClick"
  >
    <!-- Avatar -->
    <v-list-item-avatar
      v-if="displayUserInfo"
      :style="{ 'cursor': 'pointer' }"
      @click.stop="onToAuthorProfileClick"
    >
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
    </v-list-item-avatar>

    <!-- Content -->
    <v-list-item-content>
      <!-- Line 1 -->
      <v-list-item-subtitle>
        <!-- User name -->
        <span v-if="displayUserInfo" class="body-2">{{ authorDisplayUsername }}</span>
        <span v-if="displayUserInfo" class="caption">&mdash;</span>
        <!-- Time spent -->
        <span class="grey--text caption"><v-icon class="grey--text caption">mdi-timer</v-icon>{{ timeSpentForCanto }}</span>
      </v-list-item-subtitle>
      <!-- Line 2 -->
      <v-list-item-title>
        <span class="grey--text">{{ body }}</span>
      </v-list-item-title>
    </v-list-item-content>

    <!-- Actions -->
    <v-list-item-action>
      <!-- Bookmarks -->
      <v-list-item-action-text>
        <v-icon v-if="showUserInteractionData" class="grey--text caption">mdi-bookmark</v-icon>{{ bookmarkCount }}
      </v-list-item-action-text>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import { mapGetters } from 'vuex'
import { Storage } from 'aws-amplify'
import { GetHexColorOfString } from '@/utils/generators'
import { GetElapsedTimeBetween } from '@/utils/typeUtils'
import { activeUserAccountStatus } from '@/utils/constants'

export default {
  name: 'CantoListItem',
  props: ['displayType', 'canto', 'dense', 'displayUserInfo', 'showUserInteractionData'],
  data () {
    return {
      cardDisplayType: 'card',
      itemDisplayType: 'item',
      activeUserAccountStatus,
      authorProfilePictureObjectUrl: null,
      authorColor: null
    }
  },
  async mounted () {
    this.authorColor = GetHexColorOfString(((this.canto || {}).user || {}).username || '')

    this.authorProfilePictureObjectUrl = (this.authenticatedUser && ((this.canto || {}).user || {}).profilePictureKey != null)
      ? await Storage.get(((this.canto || {}).user || {}).profilePictureKey, { level: 'protected' })
      : null
  },
  computed: {
    ...mapGetters({
      getAuthenticatedUser: 'authenticatedUser/getUser',
      getNowTime: 'time/getNowTime'
    }),
    maxHeight () {
      return this.dense ? 180 : 200
    },
    author () {
      if (!this.canto) return null
      return (this.canto.user && this.canto.user.accountStatus === this.activeUserAccountStatus) ? this.canto.user : null
    },
    authorDisplayUsername () {
      if (!this.canto.user) {
        return null
      } else if (this.author.accountStatus !== this.activeUserAccountStatus) {
        return this.author.id
      } else {
        return this.author.username
      }
    },
    body () {
      if (!this.canto) return null
      return this.canto.body
    },
    authenticatedUser () {
      return this.getAuthenticatedUser
    },
    timeSpentForCanto () {
      if (!this.canto) return null
      return GetElapsedTimeBetween(this.canto.startTime, this.canto.lastUpdateTime)
    },
    bookmarkCount () {
      if (!this.canto) return 0
      return this.canto.bookmarks != null ? this.canto.bookmarks.length : 0
    }
  },
  methods: {
    onToCantoButtonClick () {
      this.$router.push({ name: 'canto', params: { id: this.canto.id } })
    },
    onToAuthorProfileClick () {
      if (!this.canto || !this.canto.user) return
      this.$router.push({ name: 'profile', params: { username: this.canto.user.username } })
    }
  }
}
</script>
