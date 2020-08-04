import React, { useState, useEffect } from 'react'
import Auth from '@aws-amplify/auth'
import API, { graphqlOperation, GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import Storage from '@aws-amplify/storage'
import { GetColor } from '@tafalk/material-color-generator'
import { GetUser, UpdateUserCognitoIdentityId } from 'graphql/custom'
import { GetUserByUsernameQuery, Language } from 'types/appsync/API'
import { useSnackbar } from 'notistack'
import { cognitoNotAuthenticatedMessage } from 'utils/constants'
import Amplify from '@aws-amplify/core'
import { AwsConfig } from 'config'

interface AuthUserContextDataType
  extends Pick<
    Omit<
      Exclude<GetUserByUsernameQuery['getUserByUsername'], null>,
      '__typename'
    >,
    | 'id'
    | 'username'
    | 'email'
    | 'bio'
    | 'theme'
    | 'language'
    | 'cognitoIdentityId'
    | 'userWatchInteractions'
    | 'userBlockInteractions'
  > {
  color: string
  profilePictureObjectUrl: string
  groups: Array<string>
  contextMeta: {
    isReady: boolean
  }
}

export interface AuthUserContextType {
  user: AuthUserContextDataType | null
  setUser: Function
}

export const AuthUserContext = React.createContext<AuthUserContextType>({
  user: null,
  setUser: () => {}
})

export default ({ children }: any) => {
  const [user, setUser] = useState<AuthUserContextDataType | null>(null)
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    ;(async () => {
      try {
        let [authUser, cognitoCredentials] = await Promise.all([
          Auth.currentAuthenticatedUser(),
          Auth.currentCredentials()
        ])
        if (!authUser) {
          // No auth user: Change AppSync Auth type to IAM
          Amplify.configure({
            ...AwsConfig,
            aws_appsync_authenticationType: GRAPHQL_AUTH_MODE.AWS_IAM
          })
          setUser(null)
          return
        }

        // Auth User exists: Change AppSync Auth type to Cognito User Pools
        Amplify.configure({
          ...AwsConfig,
          aws_appsync_authenticationType:
            GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
        })

        // Extract Cognito Group from token
        const cognitoGroups = authUser.signInUserSession.accessToken.payload[
          'cognito:groups'
        ] as Array<string>
        // DB data
        const userGraphqlResponse = (await API.graphql(
          graphqlOperation(GetUser, { username: authUser.username })
        )) as {
          data: GetUserByUsernameQuery
        }

        let user = userGraphqlResponse.data.getUserByUsername
        // console.log('User: ' + JSON.stringify(user))
        if (!user) {
          throw new Error('no db record found for the authenticated user')
        }

        if (!user.cognitoIdentityId) {
          // If first login, there may be need to update cognito identity id
          const cognitoIdentityId = cognitoCredentials.identityId
          await API.graphql(
            graphqlOperation(UpdateUserCognitoIdentityId, {
              userId: user.id,
              cognitoIdentityId: cognitoIdentityId
            })
          )
          user.cognitoIdentityId = cognitoIdentityId
        }

        // Profile Picture Object Url
        const profilePictureObjectUrl = user.profilePictureKey
          ? ((await Storage.get(user.profilePictureKey, {
              level: 'protected',
              identityId: user.cognitoIdentityId
            })) as string)
          : ''

        setUser({
          // ...user,
          id: user.id,
          username: user.username,
          email: user.email,
          bio: user.bio,
          theme: user.theme,
          language: user.language,
          cognitoIdentityId: user.cognitoIdentityId,
          userWatchInteractions: user.userWatchInteractions,
          userBlockInteractions: user.userBlockInteractions,
          color: GetColor(user.username, 'dark'),
          profilePictureObjectUrl: profilePictureObjectUrl,
          groups: cognitoGroups,
          contextMeta: {
            isReady: true
          }
        })
      } catch (err) {
        // No auth user or error: Change AppSync Auth type to IAM anyway
        Amplify.configure({
          ...AwsConfig,
          aws_appsync_authenticationType: GRAPHQL_AUTH_MODE.AWS_IAM
        })
        setUser({
          id: '',
          username: '',
          email: '',
          bio: '',
          theme: 'light',
          color: '',
          language: Language.en,
          cognitoIdentityId: '',
          profilePictureObjectUrl: '',
          groups: [],
          userWatchInteractions: [],
          userBlockInteractions: [],
          contextMeta: {
            isReady: true
          }
        })

        if (![cognitoNotAuthenticatedMessage].includes(err.toString())) {
          enqueueSnackbar(JSON.stringify(err), {
            variant: 'error'
          })
        }
      }
    })()
  }, [enqueueSnackbar])

  return (
    <AuthUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthUserContext.Provider>
  )
}
