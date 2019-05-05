<template>
<v-container fluid grid-list-md>
  <v-layout row wrap>
      <v-flex d-flex xs12 sm12 offset-md2 md8>
    <v-card>
      <v-card-title class="headline">{{ $t('auth.farewell.title') }}</v-card-title>
      <v-card-text>{{ $t('auth.farewell.body') }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          @click.native="onHomeClick"
        >{{ $t('auth.farewell.returnHomeButtonText') }}</v-btn>
      </v-card-actions>
    </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  name: 'Farewell',
  methods: {
    onHomeClick: function () {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
