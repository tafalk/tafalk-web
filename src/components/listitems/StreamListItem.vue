<template>
  <!-- C A R D   D I S P L A Y -->
  <v-card
    v-if="displayType === cardDisplayType"
    flat
    :max-height="maxHeight"
    @click.native="onToStreamBtnClick"
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
          <v-img
            v-else
            :src="authorProfilePictureObjectUrl"
          ></v-img>
        </v-avatar>
        {{ authorDisplayUsername }}
      </v-chip>
    </v-card-title>
    <!-- Blocked Content -->
    <v-banner single-line v-if="blocked && !showContentAnyway">
      {{ $t('blockedContent.body') }}
      <template v-slot:actions>
        <v-btn aria-label="Show" depressed color="primary" @click.stop="showContentAnywayBtnClick">
          {{ $t('blockedContent.showButtonText') }}
        </v-btn>
      </template>
    </v-banner>
    <!-- Body -->
    <v-card-text v-if="!blocked || showContentAnyway" class="text-truncate">
      <span v-if="hasTitle" class="text--primary">{{stream.title}}</span>
      <span v-if="hasTitle">&mdash;</span>
      {{ stream.body }}
    </v-card-text>
    <!-- Actions -->
    <v-card-actions v-if="!blocked || showContentAnyway" class="pa-2 grey--text">
      <v-spacer v-if="$vuetify.breakpoint.smAndUp"/>
      <span v-if="isSealed" class="pa-2 grey--text caption">
        <v-icon class="grey--text caption">mdi-seat-flat</v-icon>{{ timeFromSealedToNow }}
      </span>
      <v-spacer v-if="!isSealed"/>
      <span v-if="!isSealed" class="pa-2 grey--text caption">
        <v-icon class="grey--text caption">mdi-play</v-icon>&nbsp;{{ $t('stream.metadata.liveLabel') }}
      </span>
      <v-spacer/>
      <span class="pa-2 grey--text caption">
        <v-icon class="grey--text caption">mdi-timer</v-icon>&nbsp;{{ timeSpentForStream }}
      </span>
      <v-spacer/>
      <span class="pa-2 grey--text caption">
        <v-icon class="grey--text caption">mdi-bookmark</v-icon>&nbsp;{{ bookmarkCount }}
      </span>
      <v-spacer/>
      <span class="pa-2 grey--text caption">
        <v-icon class="grey--text caption">mdi-comment</v-icon>&nbsp;{{ commentCount }}
      </span>
      <v-spacer v-if="$vuetify.breakpoint.smAndUp"/>
    </v-card-actions>
  </v-card>

  <!-- I T E M   D I S P L A Y -->
  <v-list-item
    v-else
    :style="{ 'cursor': 'pointer' }"
    :two-line="!dense"
    :three-line="dense"
    @click.native="onToStreamBtnClick"
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
        <span class="grey--text caption"><v-icon class="grey--text caption">mdi-timer</v-icon>{{ timeSpentForStream }}</span>
        <span class="grey--text caption">,</span>
        <span v-if="isSealed" class="grey--text caption"><v-icon class="grey--text caption">mdi-seat-flat</v-icon>{{ timeFromSealedToNow }}</span>
        <span v-if="!isSealed" class="red--text caption"><v-icon class="red--text caption">mdi-play</v-icon>&nbsp;{{ $t('stream.metadata.liveLabel') }}</span>
      </v-list-item-subtitle>
      <!-- Blocked Content -->
      <v-banner single-line v-if="blocked && !showContentAnyway">
        {{ $t('blockedContent.body') }}
        <template v-slot:actions>
          <v-btn aria-label="Show" depressed color="primary" @click.stop="showContentAnywayBtnClick">
            {{ $t('blockedContent.showButtonText') }}
          </v-btn>
        </template>
      </v-banner>
      <!-- Body -->
      <v-list-item-title v-if="!blocked || showContentAnyway">
        <span v-if="hasTitle" class="text--primary">{{stream.title}}</span>
        <span v-if="hasTitle">&mdash;</span>
        <span class="grey--text">{{stream.body}}</span>
      </v-list-item-title>
    </v-list-item-content>
    <!-- Actions -->
    <v-list-item-action v-if="!blocked || showContentAnyway">
      <v-list-item-action-text>
        <v-icon class="grey--text caption">mdi-bookmark</v-icon>{{ bookmarkCount }}
      </v-list-item-action-text>
      <v-list-item-action-text>
        <v-icon class="grey--text caption">mdi-comment</v-icon>{{ commentCount }}
      </v-list-item-action-text>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import Storage from '@aws-amplify/storage'
import { mapGetters } from 'vuex'
import { activeUserAccountStatus, blockTypeUserConnectionValue } from '@/utils/constants'
import { GetHexColorOfString } from '@/utils/generators'
import { GetElapsedTimeTillNow, GetElapsedTimeBetween } from '@/utils/typeUtils'

export default {
  name: 'StreamListItem',
  props: ['displayType', 'stream', 'dense', 'displayUserInfo'],
  data () {
    return {
      cardDisplayType: 'card',
      itemDisplayType: 'item',
      showContentAnyway: false,
      activeUserAccountStatus,
      blockTypeUserConnectionValue,
      authorProfilePictureObjectUrl: null,
      authorColor: null
    }
  },
  async mounted () {
    if (this.author) {
      // the author is active
      this.authorColor = GetHexColorOfString(this.author.username)

      this.authorProfilePictureObjectUrl = (this.author.profilePictureKey)
        ? await Storage.get(this.author.profilePictureKey, { level: 'protected', identityId: this.author.cognitoIdentityId })
        : null
    }
  },
  computed: {
    ...mapGetters({
      getAuthenticatedUser: 'authenticatedUser/getUser',
      getNowTime: 'time/getNowTime'
    }),
    maxHeight () {
      return this.dense ? 180 : 200
    },
    hasTitle () {
      return this.stream.title && this.stream.title.trim
    },
    author () {
      return (this.stream.user && this.stream.user.accountStatus === this.activeUserAccountStatus) ? this.stream.user : null
    },
    authorDisplayUsername () {
      if (!this.stream.user) return null
      return this.author.accountStatus === this.activeUserAccountStatus ? this.author.username : this.author.id
    },
    authenticatedUser () {
      return this.getAuthenticatedUser
    },
    blocked () {
      if (!this.authenticatedUser) return false
      return this.authenticatedUser.userInteractions.items
        .some(el => el.interactionType === this.blockTypeUserConnectionValue && el.targetUserId === this.author.id)
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
    onToStreamBtnClick () {
      this.$router.push({ name: 'stream', params: { id: this.stream.id } })
    },
    onToAuthorProfileClick () {
      if (!this.author) return
      this.$router.push({ name: 'profile', params: { username: this.author.username } })
    },
    showContentAnywayBtnClick () {
      this.showContentAnyway = true
    }
  }
}
</script>
