// Google
export const GoogleRecaptchaV3Config = {
  siteKey: process.env.REACT_APP_GOOGLE_RECAPTCHA_V3_SITE_KEY
}
export const GoogleAnalyticsConfig = {
  trackingId: process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID
}

// AWS
export const AwsConfig = {
  // S3
  Storage: {
    AWSS3: {
      bucket: process.env.REACT_APP_S3_USER_STORAGE_BUCKET,
      region: process.env.REACT_APP_AWS_REGION
    }
  },
  // Cognito
  Auth: {
    mandatorySignIn: false,
    region: process.env.REACT_APP_AWS_REGION,
    userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    identityPoolId: process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_COGNITO_USER_POOL_CLIENT_ID
  },
  // AppSync
  // aws_project_region: process.env.REACT_APP_AWS_REGION,
  // aws_cognito_identity_pool_id: process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID,
  aws_appsync_graphqlEndpoint: process.env.REACT_APP_APPSYNC_GRAPHQL_ENDPOINT,
  aws_appsync_region: process.env.REACT_APP_AWS_REGION,
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS'
}

// MapTiler Geocoder
export const MapTilerGeooderConfig = {
  apiKey: process.env.REACT_APP_MAPTILER_GEOCODER_API_KEY
}
