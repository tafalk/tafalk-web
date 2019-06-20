<template>
  <tafalk-stream-authorization-required v-if="!authenticatedUser"></tafalk-stream-authorization-required>
  <v-container v-else fluid grid-list-md>
    <!-- full page loader -->
    <v-layout v-if="!pageReady" align-center fill-height row>
      <v-flex offset-md5 md2 offset-sm5 sm2 offset-xs5-and-up xs2>
        <img src="@/assets/page-preloader.gif" alt="">
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <tafalk-canto-introduction v-if="isCantoNew"></tafalk-canto-introduction>
      <v-flex xs12 sm12 offset-md2 md8>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { API, graphqlOperation, Logger } from 'aws-amplify'
import { GetCantoBody } from '@/graphql/Canto'
import TafalkStreamAuthorizationRequired from '@/components/nocontent/AuthorizationRequired.vue'
import TafalkCantoIntroduction from '@/components/canto/dialogs/CantoIntroduction.vue'

const logger = new Logger('PourCanto')

export default {
  name: 'PourCanto',
  data () {
    return {
      pageReady: false,
      isCantoNew: false
    }
  },
  components: {
    TafalkStreamAuthorizationRequired,
    TafalkCantoIntroduction
  },
  async created () {
    try {
      const cantoId = this.authenticatedUser.id
      console.log('cantoId: ' + cantoId)
      const cantoGraphqlResult = await API.graphql(graphqlOperation(GetCantoBody, { id: cantoId }))
      if (!(cantoGraphqlResult.data.getCanto || {}).body) {
        this.isCantoNew = true
      }
    } catch (err) {
      logger.error('Error occurred while getting canto info', JSON.stringify(err))
      this.setNewSiteError(err.message || err)
    } finally {
      this.pageReady = true
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
    ...mapActions({
      setNewSiteError: 'shared/setNewSiteError'
    })
  }
}
</script>

<style scoped>

</style>
