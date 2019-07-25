<template>
  <v-snackbar
    v-model="isCookieLawVisible"
    color="info"
    :timeout="timeout"
    :multi-line="$vuetify.breakpoint.xsOnly"
  >
  {{ $t('common.cookieLaw.message') }}
    <v-btn
      dark
      color="success"
      @click.stop="onAcceptCookiesClick"
    >
      🍪&nbsp;{{ $t('common.cookieLaw.button') }}
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'TheCookieLaw',
  data () {
    return {
      isCookieLawVisible: true,
      timeout: 0
    }
  },
  methods: {
    ...mapActions({
      setHasAcceptedCookies: 'setHasAcceptedCookies'
    }),
    onAcceptCookiesClick () {
      this.setHasAcceptedCookies('true')
      this.isCookieLawVisible = false
    }
  }
}
</script>
