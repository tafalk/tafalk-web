<template>
  <v-dialog v-model="getIsShareCantoLinkDialogVisible" persistent max-width="400">
    <v-card>
      <v-card-title class="headline">{{ $t('common.share.title') }}</v-card-title>
      <v-card-text>
        <v-text-field
          ref="linktext"
          dense
          v-model="getShareCantoLink"
          outline
          readonly
          label="Link"
          type="text"
        >
          <v-tooltip
            slot="append-outer"
            right
          >
            <v-icon
              slot="activator"
              @click="onCopyLinkClick"
            >mdi-content-copy</v-icon>
            {{ tooltipText }}
          </v-tooltip>
        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="light-blue darken-1"
          flat
          @click.native="onDoneClick">{{ $t('common.options.okButtonText') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ShareCantoLinkDialog',
  data () {
    return {
      showCopiedTooltip: false,
      defaultCopyTooltipValue: this.$i18n.t('canto.share.dialog.copyLinkTooltip'),
      copiedTooltipValue: this.$i18n.t('canto.share.dialog.copiedLinkTooltip'),
      tooltipText: this.$i18n.t('canto.share.dialog.tooltip'),
      copiedTooltipTimeout: 3000
    }
  },
  computed: {
    ...mapGetters({
      getIsShareCantoLinkDialogVisible: 'canto/dialog/getIsShareCantoLinkDialogVisible',
      getShareCantoLink: 'canto/getShareCantoLink'
    })
  },
  methods: {
    ...mapMutations({
      hideShareCantoLinkDialog: 'canto/dialog/hideShareCantoLinkDialog',
      clearShareCantoLink: 'canto/clearShareCantoLink'
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
      this.clearShareCantoLink()
      this.hideShareCantoLinkDialog()
    },
    sleep (ms) {
      return new Promise((resolve, reject) => setTimeout(resolve, ms))
    }
  }
}
</script>
