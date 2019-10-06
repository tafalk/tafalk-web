import Vue from 'vue'
import vuetify from '@/plugins/vuetify'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/registerServiceWorker'
import i18n from '@/i18n'
import { GoogleRecaptchaV3Config, GoogleAnalyticsConfig, AwsConfig } from '@/config'
import { GetPolicyS3BucketRootUrl } from '@/utils/generators'

import Amplify from 'aws-amplify'

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

// Other
Amplify.Logger.LOG_LEVEL = 'INFO'

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App)
}).$mount('#app')
