<template>
  <v-card>
    <v-card-title primary-title>
      <v-container pa-3 fluid grid-list-md>
        <v-layout align-center column>
          <span class="grey--text"><v-icon size="100">lock</v-icon></span><br/>
          <span class="grey--text headline">{{ $t('nocontent.streamNotAllowed.title') }}</span>
        </v-layout>
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
