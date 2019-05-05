<template>
    <v-card
      hover
      max-height=150
      @click.native="onToUserProfileClick">
        <v-card-title dense primary>
          <v-avatar v-if="authenticatedUser && userProfilePictureObjectUrl != null" size="60">
            <img :src="userProfilePictureObjectUrl" />
          </v-avatar>
          <v-avatar v-else size="60">
            <img
              src="@/assets/default-user-avatar.jpg"
              alt="Virgina Woolf in Hue"
              v-bind:style="userHue"
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
import { GetUserHue } from '@/utils/DefaultProfilePainter'

export default {
  name: 'BriefUserCard',
  props: ['user'],
  data () {
    return {
      userProfilePictureObjectUrl: null,
      userHue: null
    }
  },
  mounted () {
    this.userHue = GetUserHue(this.user.username)

    if (this.authenticatedUser && this.user.profilePictureKey != null) {
      Storage.get(this.user.profilePictureKey, {
        level: 'protected'
      }).then(resp => (this.userProfilePictureObjectUrl = resp))
    }
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
