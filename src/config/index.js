// Google
export const GooglePlacesConfig = {
  apiKey: 'AIzaSyAZDyvHWVChGlunHwqM5h0S87IFCEUR4-M'
}

export const GoogleRecaptchaV3Config = {
  siteKey: '6Lcro5kUAAAAAJ8zyW2CrSTuoC6s9Ld2kWRqMNy3'
}

export const GoogleAnalyticsConfig = {
  trackingId: 'UA-136943115-1'
}

// AWS
export const AwsConfig = {
  // S3
  Storage: {
    bucket: 'eu-central-1',
    region: 'YOUR_S3_UPLOADS_BUCKET_NAME'
  },
  // Cognito
  Auth: {
    mandatorySignIn: false,
    region: 'eu-central-1',
    userPoolId: 'YOUR_COGNITO_USER_POOL_ID',
    identityPoolId: 'YOUR_COGNITO_APP_CLIENT_ID',
    userPoolWebClientId: 'YOUR_IDENTITY_POOL_ID'
  },
  // AppSync
  aws_appsync_graphqlEndpoint: 'YOUR_APPSYNC_GRAPHQL_HTTPS_ENDPOINT',
  aws_appsync_region: 'eu-central-1',
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: 'YOUR_APPSYNC_API_KEY'
}

// Tilehosting Geocoder
export const TilehostingGeooderConfig = {
  apiKey: 'J6LZrA2ovfGZ6XBccdTI'
}
