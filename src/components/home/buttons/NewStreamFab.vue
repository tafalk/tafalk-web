<template>
  <v-layout column class="fab-container">
    <v-btn
      :large="$vuetify.breakpoint.mdAndUp"
      dark
      fab
      fixed
      bottom
      right
      color="pink"
      @click="onPourNewStreamClick"
    ><v-icon>mdi-feather</v-icon>
    </v-btn>
    <v-btn
      :large="$vuetify.breakpoint.mdAndUp"
      dark
      fab
      fixed
      bottom
      right
      color="pink"
      @click="onPourNewStreamClick"
    ><v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-layout>
</template>

<script>
export default {
  name: 'NewStreamFab',
  methods: {
    onPourNewStreamClick () {
      // Route to Account Deleted Page
      this.$router.push({ name: 'pour' })
    }
  }
}
</script>

<style scoped>
.fab-container {
    position: fixed;
    bottom: 0;
    right: 0;
  }
</style>

