<template>
<v-card
  hover
  max-height=200
  @click.native="onToCantoButtonClick"
>
  <v-card-title dense primary class="title grey--text">
    <v-spacer />
    <v-chip @click.stop="onToAuthorProfileClick(canto.user.username)" small pill>
      <v-avatar left v-if="authenticatedUser && cantoUserProfilePictureObjectUrl != null" >
        <img :src="cantoUserProfilePictureObjectUrl"/>
      </v-avatar>
      <v-avatar left v-else>
        <img
          src="@/assets/default-user-avatar.jpg"
          alt="Virgina Woolf in Hue"
          v-bind:style="cantoUserHue"
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
import { GetUserHue } from '@/utils/generators'
import { GetElapsedTimeBetween } from '@/utils/typeUtils'

export default {
  name: 'BriefCantoCard',
  props: ['canto'],
  data () {
    return {
      cantoUserProfilePictureObjectUrl: null,
      cantoUserHue: null
    }
  },
  async mounted () {
    this.cantoUserHue = GetUserHue(this.canto.user.username)

    this.cantoUserProfilePictureObjectUrl = (this.authenticatedUser && this.canto.user.profilePictureKey != null)
      ? await Storage.get(this.canto.user.profilePictureKey, { level: 'protected' })
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
    timeSpentForCanto () {
      return GetElapsedTimeBetween(this.canto.startTime, this.canto.lastUpdateTime)
    }
  },
  methods: {
    onToCantoButtonClick () {
      this.$router.push({ name: 'canto', params: { id: this.canto.id } })
    },
    onToAuthorProfileClick (username) {
      this.$router.push({ name: 'profile', params: { username: username } })
    }
  }
}
</script>
