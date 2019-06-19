<template>
  <v-dialog
    v-model="isCantoIntroductionDialogVisible"
    width="600"
    persistent
  >
    <v-card>
      <v-img
        :src="ezraPoundDoodle"
        contain
        aspect-ratio="2.25"
      ></v-img>
      <v-card-title
        class="headline grey lighten-2"
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
          flat
          @click="isCantoIntroductionDialogVisible = false"
        >
          {{ $t('canto.pour.introduction.closeButtonText') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'CantoIntroduction',
  data () {
    return {
      isCantoIntroductionDialogVisible: true,
      ezraPoundDoodle: require('@/assets/ezra-pound-doodle.png')
    }
  }
}
</script>

<style scoped>

</style>
