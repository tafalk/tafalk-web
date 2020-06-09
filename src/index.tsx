import React from 'react'
import ReactDOM from 'react-dom'
import Amplify from '@aws-amplify/core'
import API from '@aws-amplify/api'
import PubSub from '@aws-amplify/pubsub'

import * as serviceWorker from './serviceWorker'
import App from 'App'
import 'i18n'
import { AwsConfig } from 'config'

// AWS Amplify configurations
Amplify.configure(AwsConfig)
API.configure(AwsConfig)
PubSub.configure(AwsConfig)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
