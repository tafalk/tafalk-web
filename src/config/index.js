// Google

export const GoogleRecaptchaV3Config = {
  siteKey: process.env.VUE_APP_GOOGLE_RECAPTCHA_V3_SITE_KEY
}

export const GoogleAnalyticsConfig = {
  trackingId: process.env.VUE_APP_GOOGLE_ANALYTICS_TRACKING_ID
}

// AWS
export const AwsConfig = {
  // S3
  Storage: {
    AWSS3: {
      bucket: process.env.VUE_APP_S3_USER_STORAGE_BUCKET,
      region: process.env.VUE_APP_AWS_REGION
    }
  },
  // Cognito
  Auth: {
    mandatorySignIn: false,
    region: process.env.VUE_APP_AWS_REGION,
    userPoolId: process.env.VUE_APP_COGNITO_USER_POOL_ID,
    identityPoolId: process.env.VUE_APP_COGNITO_IDENTITY_POOL_ID,
    userPoolWebClientId: process.env.VUE_APP_COGNITO_USER_POOL_CLIENT_ID
  },
  // AppSync
  aws_appsync_graphqlEndpoint: process.env.VUE_APP_APPSYNC_GRAPHQL_ENDPOINT,
  aws_appsync_region: process.env.VUE_APP_AWS_REGION,
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: process.env.VUE_APP_APPSYNC_API_KEY
}

// MapTiler Geocoder
export const MapTilerGeooderConfig = {
  apiKey: process.env.VUE_APP_MAPTILER_GEOCODER_API_KEY
}
