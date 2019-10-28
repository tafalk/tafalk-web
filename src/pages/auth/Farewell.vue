<template>
<v-container>
  <v-row>
    <v-col cols="12" offset-md="2" md="8">
      <v-card>
        <v-card-title class="headline">{{ $t('auth.farewell.title') }}</v-card-title>
        <v-card-text>{{ $t('auth.farewell.body') }}</v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            aria-label="To Home"
            color="primary"
            @click="onHomeClick"
          >{{ $t('auth.farewell.returnHomeButtonText') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
export default {
  name: 'Farewell',
  methods: {
    onHomeClick () {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
