<template>
<tafalk-stream-authorization-required v-if="!authenticatedUser"></tafalk-stream-authorization-required>
  <div v-else>
    <tafalk-canto-introduction v-if="isCantoNew"></tafalk-canto-introduction>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TafalkStreamAuthorizationRequired from '@/components/nocontent/AuthorizationRequired.vue'
import TafalkCantoIntroduction from '@/components/canto/dialogs/CantoIntroduction.vue'

export default {
  name: 'PourCanto',
  data () {
    return {
    }
  },
  components: {
    TafalkStreamAuthorizationRequired,
    TafalkCantoIntroduction
  },
  computed: {
    ...mapGetters({
      getAuthenticatedUser: 'authenticatedUser/getUser'
    }),
    authenticatedUser () {
      return this.getAuthenticatedUser
    },
    isCantoNew () {
      return ((this.authenticatedUser || {}).canto || {}).body == null
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>

