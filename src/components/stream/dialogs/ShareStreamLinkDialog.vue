<template>
  <v-dialog v-model="getIsShareStreamLinkDialogVisible" persistent max-width="400">
    <v-card>
      <v-card-title class="headline">{{ $t('common.share.title') }}</v-card-title>
      <v-card-text>
        <v-text-field
          ref="linktext"
          dense
          v-model="getShareStreamLink"
          outline
          readonly
          label="Link"
          type="text"
        >
          <v-tooltip slot="append-outer" right>
            <template v-slot:activator="{ on }">
              <v-icon
                v-on="on"
                @click="onCopyLinkClick"
              >
                mdi-content-copy
              </v-icon>
            </template>
            {{ tooltipText }}
          </v-tooltip>
        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          aria-label="Ok"
          color="light-blue darken-1"
          text
          @click.native="onDoneClick">{{ $t('common.options.okButtonText') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ShareStreamLinkDialog',
  data () {
    return {
      showCopiedTooltip: false,
      defaultCopyTooltipValue: this.$i18n.t('stream.share.dialog.copyLinkTooltip'),
      copiedTooltipValue: this.$i18n.t('stream.share.dialog.copiedLinkTooltip'),
      tooltipText: this.$i18n.t('stream.share.dialog.tooltip'),
      copiedTooltipTimeout: 3000
    }
  },
  computed: {
    ...mapGetters({
      getIsShareStreamLinkDialogVisible: 'stream/dialog/getIsShareStreamLinkDialogVisible',
      getShareStreamLink: 'stream/getShareStreamLink'
    })
  },
  methods: {
    ...mapMutations({
      hideShareStreamLinkDialog: 'stream/dialog/hideShareStreamLinkDialog',
      clearShareStreamLink: 'stream/clearShareStreamLink'
    }),
    async onCopyLinkClick (e) {
      // Select the text
      this.$refs.linktext.$el.querySelector('input').select()
      // Copy the text to clipboard
      document.execCommand('copy')

      this.tooltipText = this.copiedTooltipValue
      // Sleep for a while
      await this.sleep(this.copiedTooltipTimeout)
      this.tooltipText = this.defaultCopyTooltipValue
    },
    onDoneClick () {
      this.clearShareStreamLink()
      this.hideShareStreamLinkDialog()
    },
    sleep (ms) {
      return new Promise((resolve, reject) => setTimeout(resolve, ms))
    }
  }
}
</script>
