<template>
<v-dialog v-model="getIsRetractFlagDialogVisible" persistent max-width="600">
    <v-card>
      <v-card-title class="headline">{{ $t('flag.retractDialog.title') }}</v-card-title>
      <v-card-text>{{ $t('flag.retractDialog.body') }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="red darken-1"
          flat
          @click.native="onRetractFlagConfirmClick"
        >{{ $t('common.options.yesButtonText') }}</v-btn>
        <v-btn
          color="light-blue darken-1"
          flat
          @click.native="setIsRetractFlagDialogVisible(false)"
        >{{ $t('common.options.noButtonText') }}</v-btn>
      </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { API, graphqlOperation, Logger } from 'aws-amplify'
import { print as gqlToString } from 'graphql/language'
import { DeleteFlag } from '@/graphql/Flag'

const logger = new Logger('RetractFlagConfirmationDialog')

export default {
  name: 'RetractFlagConfirmationDialog',
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      getStream: 'stream/getStream',
      getIsRetractFlagDialogVisible: 'flag/dialog/getIsRetractFlagDialogVisible',
      getRetractFlag: 'flag/getRetractFlag'
    })
  },
  methods: {
    ...mapMutations({
      setStream: 'stream/setStream',
      setIsRetractFlagDialogVisible: 'flag/dialog/setIsRetractFlagDialogVisible',
      clearRetractFlag: 'flag/clearRetractFlag'
    }),
    ...mapActions({
      setNewSiteError: 'shared/setNewSiteError'
    }),
    async onRetractFlagConfirmClick () {
      try {
        await API.graphql(graphqlOperation(gqlToString(DeleteFlag), {
          id: this.getRetractFlag.retractFlagId
        }))

        if (this.getRetractFlag.type === 'stream') {
          // let currentStream = Object.assign({}, this.getStream) // shallow copy
          let currentStream = JSON.parse(JSON.stringify(this.getStream)) // deep copy
          currentStream.flags = this.getStream.flags.filter(f => f.id !== this.getRetractFlag.retractFlagId)
          this.setStream(currentStream)
        } else if (this.getRetractFlag.type === 'comment') {
          // TODO: make it responsive as the stream
        }
      } catch (err) {
        logger.error('An error occurred while retracting flag', JSON.stringify(err))
        this.setNewSiteError(err.message || err)
      } finally {
        this.clearRetractFlag()
        this.setIsRetractFlagDialogVisible(false)
      }
    }
  }
}
</script>
