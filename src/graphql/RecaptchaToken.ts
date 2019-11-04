import gql from 'graphql-tag'

export const GetRecaptchaTokenResult = gql`
  query GetRecaptchaTokenResult($token: String!, $ip: String) {
    getRecaptchaTokenResult(token: $token, ip: $ip) {
      success
      challengeTimestamp
      hostname
      errorCodes
    }
  }
`
