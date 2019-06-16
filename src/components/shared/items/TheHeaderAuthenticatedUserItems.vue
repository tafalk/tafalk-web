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
      @click="onProfileClick">
      <v-avatar v-if="authenticatedUser.profilePictureObjectUrl">
        <img :src="authenticatedUser.profilePictureObjectUrl" />
      </v-avatar>
      <v-avatar size="200" v-else>
        <img
          src="@/assets/default-user-avatar.jpg"
          alt="Virgina Woolf in Hue"
          v-bind:style="userHue" />
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
      <img :src="authenticatedUser.profilePictureObjectUrl" />
    </v-avatar>
    <v-avatar
      size="28"
      v-else-if="$vuetify.breakpoint.smAndDown && !authenticatedUser.profilePictureObjectUrl"
      @click="onProfileClick">
      <img
        src="@/assets/default-user-avatar.jpg"
        alt="Virgina Woolf in Hue"
        v-bind:style="userHue" />
    </v-avatar>

    <!-- Side drawer icon -->
    <v-toolbar-side-icon
      @click.stop="toggleDrawer"
      clipped-right
    ></v-toolbar-side-icon>

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
      userUnreadMessageCount: 3
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
    userHue () {
      return this.authenticatedUser.hue
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
