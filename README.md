# tafalk-web

![build](https://github.com/tafalk/tafalk-web/workflows/Deploy%20to%20AWS%20S3/badge.svg?branch=master)

This is the frontend project for [tafalk.com](https://tafalk.com) featuring:

- [React](https://reactjs.org/) for making the site live, talk back and sleepwalk

- [Material UI](https://material-ui.com/) for UI components

- [AWS Amplify](https://aws-amplify.github.io/) for connecting to the AWS backend resources

- [MapTiler Geocoding](https://cloud.maptiler.com/geocoding/) for location autocomplete

- [Google Analytics](https://analytics.google.com/analytics/web/) for collecting data, or serving a better user experience?

- [Google Recaptcha V3](https://developers.google.com/recaptcha/docs/v3) for kindly warning robots

- [Autodraw](https://www.autodraw.com/) for most of the doodles

and many other precious facilities.

## Prerequisities

### Local Development

Create an `.env.development.local` file with some content like:

```env
REACT_APP_APPSYNC_GRAPHQL_ENDPOINT=https://{api_id}.appsync-api.{region}.amazonaws.com/graphql
REACT_APP_COGNITO_IDENTITY_POOL_ID={region}:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
REACT_APP_COGNITO_USER_POOL_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_COGNITO_USER_POOL_ID={region}_xxxxxxxxx
REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID=XX-xxxxxxxxx-x
REACT_APP_GOOGLE_RECAPTCHA_V3_SITE_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
REACT_APP_MAPTILER_GEOCODER_API_KEY=xxxxxxxxxxxxxxxxxxxx
REACT_APP_S3_USER_STORAGE_BUCKET={USER_STORAGE_BUCKET_NAME}
REACT_APP_S3_SITE_POLICIES_BUCKET={SITE_POLICIES_BUCKET_NAME}
REACT_APP_S3_HOSTING_BUCKET={HOSTING_BUCKET_NAME}
```

### Github actions secrets

Some

- sensitive

- user-specific

information are preferred to be kept in Github secrets.

So, the following should be added to the repo secrets beforehand:

| **Secret Key**                         | **Secret Value**                                              |
| -------------------------------------- | ------------------------------------------------------------- |
| AWS_ACCESS_KEY_ID                      | `{YOUR_AWS_ACCESS_KEY_ID}`                                    |
| AWS_SECRET_ACCESS_KEY                  | `{SECRET_KEY_FOR_THE_ACCESS_KEY}`                             |
| REACT_APP_AWS_REGION                   | `eu-west-1` _or another region_                               |
| REACT_APP_APPSYNC_GRAPHQL_ENDPOINT     | `https://{api_id}.appsync-api.{region}.amazonaws.com/graphql` |
| REACT_APP_COGNITO_IDENTITY_POOL_ID     | `{region}:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`               |
| REACT_APP_COGNITO_USER_POOL_CLIENT_ID  | `xxxxxxxxxxxxxxxxxxxxxxxxxx`                                  |
| REACT_APP_COGNITO_USER_POOL_ID         | `{region}_xxxxxxxxx`                                          |
| REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID | `XX-xxxxxxxxx-x`                                              |
| REACT_APP_GOOGLE_RECAPTCHA_V3_SITE_KEY | `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`                    |
| REACT_APP_MAPTILER_GEOCODER_API_KEY    | `xxxxxxxxxxxxxxxxxxxx`                                        |
| REACT_APP_S3_USER_STORAGE_BUCKET       | `{USER_STORAGE_BUCKET_NAME}`                                  |
| REACT_APP_S3_SITE_POLICIES_BUCKET      | `{SITE_POLICIES_BUCKET_NAME}`                                 |
| REACT_APP_S3_HOSTING_BUCKET            | `{HOSTING_BUCKET_NAME}`                                       |

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

```

```
