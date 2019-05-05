<template>
  <div>
    <!-- User Notifications & Inbox items -->
    <!--
    <v-badge overlap>
      <span slot="badge">{{ userUnreadNotificationCount }}</span>
      <v-avatar size="28px" color="grey lighten-1">
        <v-icon dark>notifications</v-icon>
      </v-avatar>
    </v-badge>

    &nbsp;&nbsp;

    <v-badge overlap>
      <span slot="badge">{{ userUnreadMessageCount }}</span>
      <v-avatar size="28px" color="grey lighten-1">
        <v-icon dark>inbox</v-icon>
      </v-avatar>
    </v-badge>

    &nbsp;
    -->

    <!-- User Profile item -->
    <v-chip @click="onProfileClick">
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

    <v-menu :nudge-width="110">
      <v-btn slot="activator" icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile @click="onAboutClick">
          <v-list-tile-title>{{ $t('about.text') }}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-title>{{ $t('theme.darkMode.text') }}</v-list-tile-title>
          &nbsp;&nbsp;
          <v-list-tile-action>
            <v-switch color="primary" v-model="isDarkTheme"></v-switch>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile @click="setIsLogoutConfirmationDialogVisible(true)">
          <v-list-tile-title>{{ $t('auth.logout.text') }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <!-- The Logout confirmation dialog -->
    <logout-confirmation-dialog/>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import LogoutConfirmationDialog from '@/components/shared/dialogs/LogoutConfirmationDialog.vue'

export default {
  name: 'TheHeaderAuthenticatedUserItems',
  data () {
    return {
      isDarkTheme: false,
      userUnreadNotificationCount: 3,
      userUnreadMessageCount: 3
    }
  },
  components: {
    LogoutConfirmationDialog
  },
  computed: {
    ...mapGetters({
      getAuthenticatedUser: 'authenticatedUser/getUser'
    }),
    authenticatedUser () {
      return this.getAuthenticatedUser
    },
    userHue () {
      return this.authenticatedUser.hue
    }
  },
  created () {
    this.isDarkTheme = this.authenticatedUser.theme === 'dark'
  },
  watch: {
    async isDarkTheme (val) {
      const selectedTheme = val ? 'dark' : 'light'

      await this.setTheme({
        userId: this.authenticatedUser.id,
        theme: selectedTheme
      })
    }
  },
  methods: {
    ...mapMutations({
      setIsLogoutConfirmationDialogVisible: 'authenticatedUser/dialog/setIsLogoutConfirmationDialogVisible'
    }),
    ...mapActions({
      setTheme: 'authenticatedUser/setTheme'
    }),
    onAboutClick () {
      // redirect to metadata page
      this.$router.push({ name: 'about' })
    },
    onProfileClick () {
      this.$router.push({ name: 'profile', params: { username: this.authenticatedUser.username } })
    }
  }
}
</script>
