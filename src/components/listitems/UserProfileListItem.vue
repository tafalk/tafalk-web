<template>
  <!-- C A R D   D I S P L A Y -->
  <v-card
    v-if="displayType === cardDisplayType"
    flat
    :max-height="maxHeight"
    @click.native="onToUserProfileClick"
    role="listitem"
  >
    <!-- Card Title -->
    <v-card-title
      :dense="dense"
      class="title grey--text"
    >
      <!-- avatar -->
      <v-avatar>
        <!-- User is not active -->
        <v-icon left v-if="!user" class="white--text">mdi-account-circle</v-icon>
        <!-- User active but no profile picture set -->
        <v-img
          v-else-if="!userProfilePictureObjectUrl"
          :src="require('@/assets/default-user-avatar.webp')"
          alt="Virgina Woolf in Hue"
          :style="{backgroundColor: userColor}"
        ></v-img>
        <!-- User active and has profile pic -->
        <v-img
          v-else
          :src="userProfilePictureObjectUrl"
        ></v-img>
      </v-avatar>
      <span class="display-1 grey--text">&nbsp;@{{ user.username }}</span>
      <v-spacer />
    </v-card-title>
  </v-card>

  <!-- I T E M   D I S P L A Y -->
  <v-list-item
    v-else
    :style="{ 'cursor': 'pointer' }"
    :two-line="!dense"
    :three-line="dense"
  >
    <!-- Avatar -->
    <v-list-item-avatar
      :style="{ 'cursor': 'pointer' }"
      @click.stop="onToUserProfileClick"
    >
      <!-- User is not active -->
        <v-icon left v-if="!user" class="white--text">mdi-account-circle</v-icon>
        <!-- User active but no profile picture set -->
        <v-img
          v-else-if="!userProfilePictureObjectUrl"
          :src="require('@/assets/default-user-avatar.webp')"
          alt="Virgina Woolf in Hue"
          :style="{backgroundColor: userColor}"
        ></v-img>
        <!-- User active and has profile pic -->
        <v-img
          v-else
          :src="userProfilePictureObjectUrl"
        ></v-img>
    </v-list-item-avatar>

    <!-- Content -->
    <v-list-item-content>
      <v-list-item-title class="title grey--text text--darken-2">
        @{{ user.username }}
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import Storage from '@aws-amplify/storage'
import { mapGetters } from 'vuex'
import { GetHexColorOfString } from '@/utils/generators'

export default {
  name: 'UserListItem',
  props: ['displayType', 'user', 'dense'],
  data () {
    return {
      cardDisplayType: 'card',
      userProfilePictureObjectUrl: null,
      userColor: null
    }
  },
  async mounted () {
    this.userColor = GetHexColorOfString(this.user.username)

    this.userProfilePictureObjectUrl = (this.authenticatedUser && this.user.profilePictureKey != null)
      ? await Storage.get(this.user.profilePictureKey, { level: 'protected', identityId: this.user.cognitoIdentityId })
      : null
  },
  computed: {
    ...mapGetters({
      getAuthenticatedUser: 'authenticatedUser/getUser'
    }),
    maxHeight () {
      return this.dense ? 180 : 200
    },
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
