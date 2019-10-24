import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import vuetify from '@/plugins/vuetify'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/registerServiceWorker'
import i18n from '@/i18n'
import { GoogleRecaptchaV3Config, GoogleAnalyticsConfig, AwsConfig } from '@/config'
import { GetPolicyS3BucketRootUrl } from '@/utils/generators'

import Amplify from '@aws-amplify/core'

import axios from 'axios'
import InfiniteLoading from 'vue-infinite-loading'
import { VueReCaptcha } from 'vue-recaptcha-v3'
import VueAnalytics from 'vue-analytics'

Vue.config.productionTip = false

// Instance Property for axios base objects
Vue.prototype.$httpSitePoliciesStorage = axios.create({
  baseURL: GetPolicyS3BucketRootUrl()
})

// Plugins
Vue.use(VueCompositionApi)

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

Vue.use(VueAnalytics, {
  id: GoogleAnalyticsConfig.trackingId
})

// Configurations
Amplify.configure(AwsConfig)

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
