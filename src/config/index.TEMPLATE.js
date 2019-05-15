// Google
export const GooglePlacesConfig = {
  apiKey: '{YOUR_GOOGLE_API_KEY}'
}

export const GoogleRecaptchaV3Config = {
  siteKey: '{YOUR_GOOGLE_RECAPTCHA_V3_SITE_KEY}'
}

export const GoogleAnalyticsConfig = {
  trackingId: '{YOUR_GOOGLE_ANALYTICS_TRACKING_ID}'
}

// AWS
export const AwsConfig = {
  // S3
  Storage: {
    bucket: 'YOUR_S3_UPLOADS_BUCKET_REGION',
    region: 'YOUR_S3_UPLOADS_BUCKET_NAME'
  },
  // Cognito
  Auth: {
    mandatorySignIn: false,
    region: 'YOUR_COGNITO_REGION',
    userPoolId: 'YOUR_COGNITO_USER_POOL_ID',
    identityPoolId: 'YOUR_COGNITO_APP_CLIENT_ID',
    userPoolWebClientId: 'YOUR_IDENTITY_POOL_ID'
  },
  // AppSync
  aws_appsync_graphqlEndpoint: 'YOUR_APPSYNC_GRAPHQL_HTTPS_ENDPOINT',
  aws_appsync_region: 'YOUR_APPSYNC_REGION',
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: 'YOUR_APPSYNC_API_KEY'
}

// Tilehosting Geocoder
export const TilehostingGeooderConfig = {
  apiKey: '{YOUR_TILEHOSTING_API_KEY}'
}
