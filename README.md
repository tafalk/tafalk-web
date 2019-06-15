# tafalk-web

[![CircleCI](https://circleci.com/gh/tafalk/tafalk-web.svg?style=svg)](https://circleci.com/gh/tafalk/tafalk-web)

This is the frontend project for [tafalk.com](https://tafalk.com) featuring:

- [Vue](https://vuejs.org/)

- [Vuetify](https://vuetifyjs.com/)

- [AWS Amplify](https://aws-amplify.github.io/)

- [MapTiler Geocoding](https://cloud.maptiler.com/geocoding/)

- [Google Analytics](https://analytics.google.com/analytics/web/)

- [Google Recaptcha V3](https://developers.google.com/recaptcha/docs/v3)

and many other precious facilities.

## Prerequisities

### CircleCI environment variables

Some

- sensitive

- user-specific

 information are preferred to be kept in CircleCI environment variables.

 So, the following should be added to CircleCI environment variables beforehand:

|  **Environment Variable Key**        | **Environment Variable Value**                                |
|--------------------------------------|---------------------------------------------------------------|
| AWS_ACCESS_KEY_ID                    | `{YOUR_AWS_ACCESS_KEY_ID}`                                    |
| AWS_SECRET_ACCESS_KEY                | `{SECRET_KEY_FOR_THE_ACCESS_KEY}`                             |
| VUE_APP_AWS_REGION                   | `eu-central-1` *or another region*                            |
| VUE_APP_APPSYNC_API_KEY              | `{YOUR_APPSYNC_API_KEY}`                                      |
| VUE_APP_APPSYNC_GRAPHQL_ENDPOINT     | `https://{api_id}.appsync-api.{region}.amazonaws.com/graphql` |
| VUE_APP_COGNITO_IDENTITY_POOL_ID     | `{region}:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`               |
| VUE_APP_COGNITO_USER_POOL_CLIENT_ID  | `xxxxxxxxxxxxxxxxxxxxxxxxxx`                                  |
| VUE_APP_COGNITO_USER_POOL_ID         | `{region}_xxxxxxxxx`                                          |
| VUE_APP_GOOGLE_ANALYTICS_TRACKING_ID | `XX-xxxxxxxxx-x`                                              |
| VUE_APP_GOOGLE_RECAPTCHA_V3_SITE_KEY | `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`                    |
| VUE_APP_MAPTILER_GEOCODER_API_KEY    | `xxxxxxxxxxxxxxxxxxxx`                                        |
| VUE_APP_S3_USER_STORAGE_BUCKET       | `{USER_STORAGE_BUCKET_NAME}`                                  |
| VUE_APP_S3_SITE_POLICIES_BUCKET      | `{SITE_POLICIES_BUCKET_NAME}`                                 |
| VUE_APP_S3_HOSTING_BUCKET            | `{HOSTING_BUCKET_NAME}`                                       |
