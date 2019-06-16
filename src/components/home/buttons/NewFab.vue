<template>
  <v-speed-dial
      v-model="fab"
      bottom
      right
      fixed
      transition="slide-x-reverse-transition"
  >
    <template v-slot:activator>
      <v-btn
        :large="$vuetify.breakpoint.mdAndUp"
        v-model="fab"
        :color="mainButtonColor"
        dark
        fab
      >
        <v-icon>mdi-plus</v-icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
    <v-tooltip left dark :color="streamButtonColor">
      <template v-slot:activator="{ on }">
        <v-btn
          dark
          fab
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
          fab
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
  methods: {
    onPourNewStreamClick () {
      // Route to Account Deleted Page
      this.$router.push({ name: 'pour' })
    },
    onOpenCantoClick () {

    }
  }
}
</script>

<style scoped>
</style>
