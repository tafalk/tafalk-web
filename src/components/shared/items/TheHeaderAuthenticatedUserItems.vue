<template>
  <div>
    <!-- User Notifications & Inbox items -->
    <!--
    <v-badge overlap>
      <span slot="badge">{{ userUnreadNotificationCount }}</span>
      <v-avatar size="28px" color="grey lighten-1">
        <v-icon dark>mdi-bell</v-icon>
      </v-avatar>
    </v-badge>

    &nbsp;&nbsp;

    <v-badge overlap>
      <span slot="badge">{{ userUnreadMessageCount }}</span>
      <v-avatar size="28px" color="grey lighten-1">
        <v-icon dark>mdi-inbox</v-icon>
      </v-avatar>
    </v-badge>

    &nbsp;
    -->

    <!-- User Profile item (Large screen) -->
    <v-chip
      v-if="$vuetify.breakpoint.mdAndUp"
      @click="onProfileClick"
      pill>
      <v-avatar left v-if="authenticatedUser.profilePictureObjectUrl">
        <v-img :src="authenticatedUser.profilePictureObjectUrl" />
      </v-avatar>
      <v-avatar left size="200" v-else>
        <v-img
          :src="require('@/assets/default-user-avatar.webp')"
          alt="Virgina Woolf in Hue"
          :style="{backgroundColor: userColor}"
        />
      </v-avatar>
        {{authenticatedUser.username}}
    </v-chip>

    <!-- User Profile item (Small screen) -->
    <v-avatar
      @click="onProfileClick"
      v-if="$vuetify.breakpoint.smAndDown && authenticatedUser.profilePictureObjectUrl"
      size="28"
      small
    >
      <v-img :src="authenticatedUser.profilePictureObjectUrl" />
    </v-avatar>
    <v-avatar
      size="28"
      v-else-if="$vuetify.breakpoint.smAndDown && !authenticatedUser.profilePictureObjectUrl"
      @click="onProfileClick">
      <v-img
        :src="require('@/assets/default-user-avatar.webp')"
        alt="Virgina Woolf in Hue"
        :style="{backgroundColor: userColor}"
      />
    </v-avatar>

    <!-- Side drawer icon -->
    <v-app-bar-nav-icon
      @click.stop="toggleDrawer"
    ></v-app-bar-nav-icon>

    <!-- The Logout confirmation dialog -->
    <logout-confirmation-dialog/>

    <!-- The user language edit dialog -->
    <user-language-edit-dialog/>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import LogoutConfirmationDialog from '@/components/shared/dialogs/LogoutConfirmationDialog.vue'
import UserLanguageEditDialog from '@/components/user/dialogs/UserLanguageEditDialog.vue'

export default {
  name: 'TheHeaderAuthenticatedUserItems',
  data () {
    return {
      userUnreadNotificationCount: 3,
      userUnreadMessageCount: 3,
    }
  },
  components: {
    LogoutConfirmationDialog,
    UserLanguageEditDialog
  },
  computed: {
    ...mapGetters({
      getAuthenticatedUser: 'authenticatedUser/getUser',
      getMenuDrawer: 'shared/getMenuDrawer'
    }),
    authenticatedUser () {
      return this.getAuthenticatedUser
    },
    userColor () {
      return this.authenticatedUser.color
    },
    menuDrawer () {
      return this.menuDrawer
    }
  },
  methods: {
    ...mapMutations({
      setMenuDrawer: 'shared/setMenuDrawer',
      toggleMenuDrawer: 'shared/toggleMenuDrawer'
    }),
    toggleDrawer () {
      this.toggleMenuDrawer()
    },
    onProfileClick () {
      this.$router.push({ name: 'profile', params: { username: this.authenticatedUser.username } })
    }
  }
}
</script>
