<template>
  <v-btn
    large
    dark
    fab
    fixed
    bottom
    right
    color="pink"
    @click="onPourNewStreamClick"
  ><v-icon>add</v-icon>
  </v-btn>
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
