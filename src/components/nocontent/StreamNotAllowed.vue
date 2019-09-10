<template>
  <v-card>
    <v-card-title primary-title>
      <v-container pa-3 grid-list-lg>
        <v-row align="center">
          <span class="grey--text"><v-icon size="100">mdi-lock</v-icon></span>
        </v-row>
        <v-row align="center">
          <span class="grey--text headline">{{ $t('nocontent.streamNotAllowed.title') }}</span>
        </v-row>
      </v-container>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: 'StreamNotAllowed',
  data () {
    return {
    }
  }
}
</script>
