<template>
<v-dialog v-model="getIsRetractFlagDialogVisible" persistent max-width="600">
    <v-card>
      <v-card-title class="headline">{{ $t('flag.retractDialog.title') }}</v-card-title>
      <v-card-text>{{ $t('flag.retractDialog.body') }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="red darken-1"
          text
          @click.native="onRetractFlagConfirmClick"
        >{{ $t('common.options.yesButtonText') }}</v-btn>
        <v-btn
          color="light-blue darken-1"
          text
          @click.native="setIsRetractFlagDialogVisible(false)"
        >{{ $t('common.options.noButtonText') }}</v-btn>
      </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { API, graphqlOperation, Logger } from 'aws-amplify'
import { DeleteFlag } from '@/graphql/Flag'

const logger = new Logger('RetractFlagConfirmationDialog')

export default {
  name: 'RetractFlagConfirmationDialog',
  props: ['id'],
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      getStream: 'stream/getStream',
      getIsRetractFlagDialogVisible: 'flag/dialog/getIsRetractFlagDialogVisible'
    })
  },
  methods: {
    ...mapMutations({
      setStream: 'stream/setStream',
      setIsRetractFlagDialogVisible: 'flag/dialog/setIsRetractFlagDialogVisible'
    }),
    ...mapActions({
      setNewSiteError: 'shared/setNewSiteError'
    }),
    async onRetractFlagConfirmClick () {
      try {
        await API.graphql(graphqlOperation(DeleteFlag, {
          id: this.id
        }))
      } catch (err) {
        logger.error('An error occurred while retracting flag', JSON.stringify(err))
        this.setNewSiteError(err.message || err)
      } finally {
        this.setIsRetractFlagDialogVisible(false)
      }
    }
  }
}
</script>
