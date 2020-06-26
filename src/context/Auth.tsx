import React, { useState, useEffect } from 'react'
import Auth from '@aws-amplify/auth'
import API, { graphqlOperation } from '@aws-amplify/api'
import Storage from '@aws-amplify/storage'
import { GetColor } from '@tafalk/material-color-generator'
import { GetUser, UpdateUserCognitoIdentityId } from 'graphql/custom'
import { GetUserByUsernameQuery, Language } from 'types/appsync/API'
import { useSnackbar } from 'notistack'

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
          setUser(null)
          return
        }
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
          contextMeta: {
            isReady: true
          }
        })
      } catch (err) {
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
          userWatchInteractions: [],
          userBlockInteractions: [],
          contextMeta: {
            isReady: true
          }
        })
        if (err.toString() === 'not authenticated') {
          // Guest User, do nothing
        } else {
          // console.log(err.message || err)
          enqueueSnackbar(err.message ?? err, {
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
