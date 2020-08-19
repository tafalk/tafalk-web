import React, { useState, useEffect } from 'react'
import Amplify from '@aws-amplify/core'
import Auth from '@aws-amplify/auth'
import API, { graphqlOperation, GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import Storage from '@aws-amplify/storage'
import { GetColor } from '@tafalk/material-color-generator'
import { GetUser, UpdateUserCognitoIdentityId } from 'graphql/custom'
import { GetUserByUsernameQuery, Language } from 'types/appsync/API'
import { useSnackbar } from 'notistack'
import { cognitoNotAuthenticatedMessage } from 'utils/constants'

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

type TriggerDataType = 'initial' | 'login' | 'logout' | undefined

export interface AuthUserContextType {
  user: AuthUserContextDataType | null
  setUser: Function
  trigger: TriggerDataType
  setTrigger: Function
}

export const AuthUserContext = React.createContext<AuthUserContextType>({
  user: null,
  setUser: () => {},
  trigger: undefined,
  setTrigger: () => {}
})

export default ({ children }: any) => {
  const [user, setUser] = useState<AuthUserContextDataType | null>(null)
  const [trigger, setTrigger] = useState<TriggerDataType>('initial')
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    // Closure
    const setNoUserButReady = () => {
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
      Amplify.configure({
        aws_appsync_authenticationType: GRAPHQL_AUTH_MODE.AWS_IAM
      })
    }

    const setAuthenticatedUser = (
      user: Exclude<GetUserByUsernameQuery['getUserByUsername'], null>,
      cognitoGroups: string[],
      profilePictureObjectUrl: string
    ) => {
      setUser({
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
    }

    // Main body
    if (!trigger) return
    ;(async () => {
      try {
        if (trigger === 'logout') {
          setNoUserButReady()
          return
        }
        let [authUser, cognitoCredentials] = await Promise.all([
          Auth.currentAuthenticatedUser(),
          Auth.currentCredentials()
        ])
        if (!authUser) {
          setNoUserButReady()
          return
        }

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
          setNoUserButReady()
          throw new Error('no db record found for the authenticated user')
        }

        // Change authtype here as UpdateUser will be called
        Amplify.configure({
          aws_appsync_authenticationType:
            GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
        })

        if (!user.cognitoIdentityId) {
          console.log('Ener here: ' + JSON.stringify(authUser))
          // If first login, there may be need to update cognito identity id
          const cognitoIdentityId = cognitoCredentials.identityId
          user.cognitoIdentityId = cognitoIdentityId
          await API.graphql(
            graphqlOperation(UpdateUserCognitoIdentityId, {
              userId: user.id,
              cognitoIdentityId: cognitoIdentityId
            })
          )
        }

        // Profile Picture Object Url
        const profilePictureObjectUrl = user.profilePictureKey
          ? ((await Storage.get(user.profilePictureKey, {
              level: 'protected',
              identityId: user.cognitoIdentityId
            })) as string)
          : ''

        setAuthenticatedUser(user, cognitoGroups, profilePictureObjectUrl)
      } catch (err) {
        setNoUserButReady()

        if (![cognitoNotAuthenticatedMessage].includes(err.toString())) {
          enqueueSnackbar(JSON.stringify(err), {
            variant: 'error'
          })
        }
      }
    })()
  }, [enqueueSnackbar, trigger])

  return (
    <AuthUserContext.Provider value={{ user, setUser, trigger, setTrigger }}>
      {children}
    </AuthUserContext.Provider>
  )
}
