<template>
  <!-- C A R D   D I S P L A Y -->
  <v-card
    v-if="displayType === cardDisplayType"
    flat
    :max-height="maxHeight"
    @click.native="onToCantoClick"
  >
    <v-card-title :dense="dense" class="title grey--text">
      <v-spacer />
      <!-- avatar -->
      <v-chip
        v-if="displayUserInfo"
        :small="dense"
        color="transparent"
        pill
        @click.stop="onToAuthorProfileClick"
      >
        <v-avatar left>
          <v-icon left v-if="!author" class="white--text">mdi-account-circle</v-icon>
          <v-img
            v-else-if="!authorProfilePictureObjectUrl"
            :src="require('@/assets/default-user-avatar.webp')"
            alt="Virgina Woolf in Hue"
            :style="{backgroundColor: authorColor}"
          ></v-img>
          <v-img v-else :src="authorProfilePictureObjectUrl"></v-img>
        </v-avatar>
        {{ authorDisplayUsername }}
      </v-chip>
    </v-card-title>
    <!-- Blocked Content -->
    <v-banner single-line v-if="blocked && !showContentAnyway">
      {{ $t('blockedContent.body') }}
      <template v-slot:actions>
        <v-btn depressed color="primary" @click.stop="showContentAnywayBtnClick">
          {{ $t('blockedContent.showButtonText') }}
        </v-btn>
      </template>
    </v-banner>
    <!-- Body -->
    <v-card-text v-if="!blocked || showContentAnyway" class="text-truncate">{{ body }}</v-card-text>
    <!-- Actions -->
    <v-card-actions v-if="!blocked || showContentAnyway" class="pa-2 grey--text">
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
    @click.native="onToCantoClick"
  >
    <!-- avatar -->
    <v-list-item-avatar
      v-if="displayUserInfo"
      :style="{ 'cursor': 'pointer' }"
      @click.stop="onToAuthorProfileClick"
    >
      <v-icon left v-if="!author" class="white--text">mdi-account-circle</v-icon>
      <v-img
        v-else-if="!authorProfilePictureObjectUrl"
        :src="require('@/assets/default-user-avatar.webp')"
        alt="Virgina Woolf in Hue"
        :style="{backgroundColor: authorColor}"
      ></v-img>
      <v-img
        v-else
        :src="authorProfilePictureObjectUrl"
      ></v-img>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-subtitle>
        <span v-if="displayUserInfo" class="body-2">{{ authorDisplayUsername }}</span>
        <span v-if="displayUserInfo" class="caption">&mdash;</span>
        <span class="grey--text caption"><v-icon class="grey--text caption">mdi-timer</v-icon>{{ timeSpentForCanto }}</span>
      </v-list-item-subtitle>
      <!-- Blocked Content -->
      <v-banner single-line v-if="blocked && !showContentAnyway">
        {{ $t('blockedContent.body') }}
        <template v-slot:actions>
          <v-btn depressed color="primary" @click.stop="showContentAnywayBtnClick">
            {{ $t('blockedContent.showButtonText') }}
          </v-btn>
        </template>
      </v-banner>
      <!-- Content -->
      <v-list-item-title v-if="!blocked || showContentAnyway" >
        <span class="grey--text">{{ body }}</span>
      </v-list-item-title>
    </v-list-item-content>
    <v-list-item-action v-if="!blocked || showContentAnyway" >
      <v-list-item-action-text>
        <v-icon v-if="showUserInteractionData" class="grey--text caption">mdi-bookmark</v-icon>{{ bookmarkCount }}
      </v-list-item-action-text>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import Storage from '@aws-amplify/storage'
import { mapGetters } from 'vuex'
import { GetHexColorOfString } from '@/utils/generators'
import { GetElapsedTimeBetween } from '@/utils/typeUtils'
import { activeUserAccountStatus, blockTypeUserConnectionValue } from '@/utils/constants'

export default {
  name: 'CantoListItem',
  props: ['displayType', 'canto', 'dense', 'displayUserInfo', 'showUserInteractionData'],
  data () {
    return {
      cardDisplayType: 'card',
      itemDisplayType: 'item',
      blockTypeUserConnectionValue,
      showContentAnyway: false,
      activeUserAccountStatus,
      authorProfilePictureObjectUrl: null,
      authorColor: null
    }
  },
  async mounted () {
    this.authorColor = GetHexColorOfString(((this.canto || {}).user || {}).username || '')

    this.authorProfilePictureObjectUrl = (((this.canto || {}).user || {}).profilePictureKey != null)
      ? await Storage.get(((this.canto || {}).user || {}).profilePictureKey, { level: 'protected', identityId: this.canto.user.cognitoIdentityId })
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
      if (!this.author) return null
      return (this.author.accountStatus === this.activeUserAccountStatus) ? this.author.username : this.author.id
    },
    authenticatedUser () {
      return this.getAuthenticatedUser
    },
    blocked () {
      if (!this.authenticatedUser) return false
      return this.authenticatedUser.userInteractions.items
        .some(el => el.interactionType === this.blockTypeUserConnectionValue && el.targetUserId === this.author.id)
    },
    body () {
      if (!this.canto) return null
      return this.canto.body
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
    onToCantoClick () {
      this.$router.push({ name: 'canto', params: { username: this.canto.user.username } })
    },
    onToAuthorProfileClick () {
      if (!this.canto || !this.canto.user) return
      this.$router.push({ name: 'profile', params: { username: this.canto.user.username } })
    },
    showContentAnywayBtnClick () {
      this.showContentAnyway = true
    }
  }
}
</script>
