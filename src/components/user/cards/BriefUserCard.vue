<template>
    <v-card
      hover
      max-height=150
      @click.native="onToUserProfileClick">
        <v-card-title dense primary>
          <v-avatar v-if="authenticatedUser && userProfilePictureObjectUrl != null" size="60">
            <v-img :src="userProfilePictureObjectUrl" />
          </v-avatar>
          <v-avatar v-else size="60">
            <v-img
              :src="require('@/assets/default-user-avatar.webp')"
              alt="Virgina Woolf in Hue"
              :style="{backgroundColor: userColor}"
            />
          </v-avatar>
          <span class="display-1 grey--text">&nbsp;@{{ user.username }}</span>
          <v-spacer />
        </v-card-title>
    </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { Storage } from 'aws-amplify'
import { GetHexColorOfString } from '@/utils/generators'

export default {
  name: 'BriefUserCard',
  props: ['user'],
  data () {
    return {
      userProfilePictureObjectUrl: null,
      userColor: null
    }
  },
  async mounted () {
    this.userColor = GetHexColorOfString(this.user.username)

    this.userProfilePictureObjectUrl = (this.authenticatedUser && this.user.profilePictureKey != null)
      ? await Storage.get(this.user.profilePictureKey, { level: 'protected' })
      : null
  },
  computed: {
    ...mapGetters({
      getAuthenticatedUser: 'authenticatedUser/getUser'
    }),
    authenticatedUser () {
      return this.getAuthenticatedUser
    }
  },
  methods: {
    onToUserProfileClick (username) {
      this.$router.push({ name: 'profile', params: { username: this.user.username } })
    }
  }
}
</script>
