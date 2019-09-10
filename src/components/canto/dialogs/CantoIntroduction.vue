<template>
  <v-dialog
    v-model="isCantoIntroductionDialogVisible"
    width="600"
    persistent
  >
    <v-card>
      <v-img
        :src="ezraPoundDoodleSrc"
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
        {{ $t('canto.pour.introduction.title') }}
      </v-card-title>

      <v-card-text>
        {{ $t('canto.pour.introduction.body') }}
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          @click="isCantoIntroductionDialogVisible = false"
        >
          {{ $t('canto.pour.introduction.closeButtonText') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { siteImagesBaseUrl } from '@/utils/constants'
export default {
  name: 'CantoIntroduction',
  data () {
    return {
      isCantoIntroductionDialogVisible: true,
      ezraPoundDoodleSrc: siteImagesBaseUrl + '/webp/ezra-pound-doodle.webp'
    }
  }
}
</script>

<style scoped>

</style>
