<template>
  <v-card flat>
    <v-card-title primary-title>
      <v-container pa-3>
        <v-row align="center" justify="center">
          <span class="grey--text"><v-icon size="100">mdi-lock</v-icon></span>
        </v-row>
        <v-row align="center" justify="center">
          <span class="grey--text headline">{{ $t('nocontent.contentNotAllowed.title') }}</span>
        </v-row>
      </v-container>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: 'ContentNotAllowed',
  data () {
    return {
    }
  }
}
</script>
