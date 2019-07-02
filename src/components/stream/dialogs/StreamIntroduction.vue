<template>
  <v-dialog
    persistent
    v-model="isCantoIntroductionDialogVisible"
    width="600"
  >
    <v-card>
      <v-img
        :src="virginiaWoolfDoodle"
        contain
        aspect-ratio="2.25"
      ></v-img>
      <v-card-title
        class="headline grey lighten-2"
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
          color="primary"
          flat
          @click="isCantoIntroductionDialogVisible = false"
        >
          {{ $t('stream.pour.introduction.closeButtonText') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'StreamIntroduction',
  data () {
    return {
      isCantoIntroductionDialogVisible: true,
      virginiaWoolfDoodle: require('@/assets/virginia-woolf-doodle.png')
    }
  }
}
</script>

<style scoped>

</style>
