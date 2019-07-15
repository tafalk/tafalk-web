<template>
<v-card
  flat
  :max-height="maxHeight"
  @click.native="onToCantoButtonClick"
>
  <v-card-title
    :dense="dense"
    class="title grey--text"
  >
    <v-spacer />
    <v-chip
      @click.stop="onToAuthorProfileClick"
      :small="dense"
      v-if="avatared"
      pill
    >
      <v-avatar left>
        <v-img
          v-if="authenticatedUser && cantoUserProfilePictureObjectUrl"
          :src="cantoUserProfilePictureObjectUrl"
        />
        <v-img
          v-else
          :src="require('@/assets/default-user-avatar.webp')"
          alt="Virgina Woolf in Hue"
          :style="{backgroundColor: cantoUserColor}"
        />
      </v-avatar>
      {{ canto.user.username }}
    </v-chip>
  </v-card-title>
  <v-card-text class="text-truncate">{{ canto.body }}</v-card-text>
  <v-card-actions class="pa-2 grey--text">
    <v-spacer />
    <span class="pa-2 grey--text caption">
      <v-icon class="grey--text caption">mdi-timer</v-icon>&nbsp;{{ timeSpentForCanto }}
    </span>
  </v-card-actions>
</v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { Storage } from 'aws-amplify'
import { GetHexColorOfString } from '@/utils/generators'
import { GetElapsedTimeBetween } from '@/utils/typeUtils'

export default {
  name: 'BriefCantoCard',
  props: ['canto', 'dense', 'avatared'],
  data () {
    return {
      cantoUserProfilePictureObjectUrl: null,
      cantoUserColor: null
    }
  },
  async mounted () {
    this.cantoUserColor = GetHexColorOfString(this.canto.user.username)

    this.cantoUserProfilePictureObjectUrl = (this.authenticatedUser && this.canto.user.profilePictureKey != null)
      ? await Storage.get(this.canto.user.profilePictureKey, { level: 'protected' })
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
    authenticatedUser () {
      return this.getAuthenticatedUser
    },
    timeSpentForCanto () {
      return GetElapsedTimeBetween(this.canto.startTime, this.canto.lastUpdateTime)
    }
  },
  methods: {
    onToCantoButtonClick () {
      this.$router.push({ name: 'canto', params: { id: this.canto.id } })
    },
    onToAuthorProfileClick () {
      this.$router.push({ name: 'profile', params: { username: this.canto.user.username } })
    }
  }
}
</script>
