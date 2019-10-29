// const path = require('path')
// const PrerenderSPAPlugin = require('prerender-spa-plugin')

module.exports = {
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    // For development purposes
    // devtool: 'source-map',
    // Prerender some routes for SEO friendliness in a SPA
    plugins: [
      /*
      new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, 'dist'),
        // Required - Routes to render.
        routes: [ '/', '/home', '/content', '/about' ]
      })
      */
    ]
  },
  pwa: {
    themeColor: '#FFB300'
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    },
    s3Deploy: {
      registry: undefined,
      awsProfile: 'default',
      region: process.env.VUE_APP_AWS_REGION,
      bucket: process.env.VUE_APP_S3_HOSTING_BUCKET,
      createBucket: false,
      staticHosting: true,
      staticIndexPage: 'index.html',
      staticErrorPage: 'index.html',
      assetPath: 'dist',
      assetMatch: '**',
      deployPath: '/',
      acl: 'public-read',
      pwa: false,
      enableCloudfront: false,
      uploadConcurrency: 5,
      pluginVersion: '3.0.0'
    }
  },
  chainWebpack: (config) => {
    // svg loader
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  }
}
