import Vue from 'vue'
import './plugins/vuetify'
import TafalkGoogleFindAndAutocompletePlugin from './plugins/googlePlacesFindAndAutoComplete'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import i18n from './i18n'
import { GooglePlacesConfig, GoogleRecaptchaV3Config, GoogleAnalyticsConfig, AwsConfig } from './config'

import Amplify from 'aws-amplify'

import InfiniteLoading from 'vue-infinite-loading'
import { VueReCaptcha } from 'vue-recaptcha-v3'
import VueAnalytics from 'vue-analytics'

Vue.config.productionTip = false

// Plugins
Vue.use(InfiniteLoading, {
  props: {
    spinner: 'waveDots'
  },
  slots: {
    noResults: '',
    noMore: 'see all data above'
  }
})

Vue.use(VueReCaptcha, {
  siteKey: GoogleRecaptchaV3Config.siteKey,
  loaderOptions: {
    autoHideBadge: true
  }
})

Vue.use(TafalkGoogleFindAndAutocompletePlugin, {
  apiKey: GooglePlacesConfig.apiKey
})

Vue.use(VueAnalytics, {
  id: GoogleAnalyticsConfig.trackingId
})

// Configurations
Amplify.configure(AwsConfig)

// Other
Amplify.Logger.LOG_LEVEL = 'INFO'

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
