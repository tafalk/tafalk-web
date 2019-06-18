<template>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PourCanto',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      getAuthenticatedUser: 'authenticatedUser/getUser'
    }),
    authenticatedUser () {
      return this.getAuthenticatedUser
    },
    isCantoNew () {
      return this.authenticatedUser.canto == null
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>

