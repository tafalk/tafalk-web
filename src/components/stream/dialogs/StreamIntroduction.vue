<template>
  <v-dialog
    persistent
    v-model="isCantoIntroductionDialogVisible"
    width="600"
  >
    <v-card>
      <v-img
        :src="virginiaWoolfDoodleSrc"
        contain
        aspect-ratio="2.25"
      >
        <template v-slot:placeholder>
          <v-row
            align="center"
            justify="center"
            class="ma-0"
          >
            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <v-card-title
        class="headline grey darken-2 white--text"
        primary-title
      >
        {{ $t('stream.pour.introduction.title') }}
      </v-card-title>

      <v-card-text>
        {{ $t('stream.pour.introduction.body') }}
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          aria-label="Close"
          color="primary"
          text
          @click="isCantoIntroductionDialogVisible = false"
        >
          {{ $t('stream.pour.introduction.closeButtonText') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { siteImagesBaseUrl } from '@/utils/constants'
export default {
  name: 'StreamIntroduction',
  data () {
    return {
      isCantoIntroductionDialogVisible: true,
      virginiaWoolfDoodleSrc: siteImagesBaseUrl + '/webp/virginia-woolf-doodle.webp'
    }
  }
}
</script>

<style scoped>

</style>
