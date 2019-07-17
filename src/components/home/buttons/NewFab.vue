<template>
  <v-speed-dial
      v-model="fab"
      bottom
      right
      fixed
      open-on-hover
      transition="slide-x-reverse-transition"
  >
    <template v-slot:activator>
      <v-btn
        :x-large="$vuetify.breakpoint.smAndUp"
        :large="$vuetify.breakpoint.xsOnly"
        v-model="fab"
        :color="mainButtonColor"
        depressed
        dark
        fab
      >
        <v-icon v-if="!fab">mdi-plus</v-icon>
        <v-icon v-else>mdi-close</v-icon>
      </v-btn>
    </template>
    <v-tooltip left dark :color="streamButtonColor">
      <template v-slot:activator="{ on }">
        <v-btn
          dark
          depressed
          fab
          :large="$vuetify.breakpoint.smAndUp"
          :color="streamButtonColor"
          v-on="on"
          @click="onPourNewStreamClick"
        >
          <v-icon>mdi-feather</v-icon>
        </v-btn>
      </template>
      <span>{{ $t('home.addFab.stream.tooltip') }}</span>
    </v-tooltip>
    <v-tooltip left dark :color="cantoButtonColor">
      <template v-slot:activator="{ on }">
        <v-btn
          dark
          depressed
          fab
          :large="$vuetify.breakpoint.smAndUp"
          :color="cantoButtonColor"
          v-on="on"
          @click="onOpenCantoClick"
        >
          <v-icon>mdi-all-inclusive</v-icon>
        </v-btn>
      </template>
      <span>{{ $t('home.addFab.canto.tooltip') }}</span>
    </v-tooltip>
  </v-speed-dial>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NewFab',
  data () {
    return {
      fab: null,
      mainButtonColor: 'pink',
      streamButtonColor: 'blue darken-1',
      cantoButtonColor: 'cyan darken-1'
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
    onPourNewStreamClick () {
      // Route to Account Deleted Page
      this.$router.push({ name: 'pour' })
    },
    onOpenCantoClick () {
      this.$router.push({ name: 'pourCanto', params: { username: this.authenticatedUser.username } })
    }
  }
}
</script>

<style scoped>
</style>
