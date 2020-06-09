// See
// https://dev.to/nazmifeeroz/using-usecontext-and-usestate-hooks-as-a-store-mnm
// https://github.com/aws-amplify/amplify-js/issues/3090
// https://reactjs.org/docs/hooks-reference.html#usecontext

import React, { useState, useEffect } from 'react'
import Auth from '@aws-amplify/auth'
import API, { graphqlOperation } from '@aws-amplify/api'
import Storage from '@aws-amplify/storage'
import { GetColor } from '@tafalk/material-color-generator'
import { GetUser, UpdateUserCognitoIdentityId } from 'graphql/custom'
import { useSiteMessage } from 'hooks'
import { GetUserByUsernameQuery } from 'types/appsync/API'

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
  user: AuthUserContextDataType
  setUser: Function
}

export const AuthUserContext = React.createContext<AuthUserContextType>({
  user: {
    id: '',
    username: '',
    email: '',
    bio: '',
    theme: 'light',
    cognitoIdentityId: '',
    color: '',
    profilePictureObjectUrl: '',
    userWatchInteractions: [],
    userBlockInteractions: [],
    contextMeta: {
      isReady: false
    }
  },
  setUser: () => {}
})

export default ({ children }: any) => {
  const [user, setUser] = useState<AuthUserContextDataType>({
    id: '',
    username: '',
    email: '',
    bio: '',
    theme: 'light',
    cognitoIdentityId: '',
    color: '',
    profilePictureObjectUrl: '',
    userWatchInteractions: [],
    userBlockInteractions: [],
    contextMeta: {
      isReady: false
    }
  })
  const [, setSiteMessageData] = useSiteMessage()

  useEffect(() => {
    const currUser = async (): Promise<void> => {
      try {
        let [authUser, cognitoCredentials] = await Promise.all([
          Auth.currentAuthenticatedUser(),
          Auth.currentCredentials()
        ])
        if (!authUser) {
          setUser({
            id: '',
            username: '',
            email: '',
            bio: '',
            theme: 'light',
            color: '',
            cognitoIdentityId: '',
            profilePictureObjectUrl: '',
            userWatchInteractions: [],
            userBlockInteractions: [],
            contextMeta: {
              isReady: false
            }
          })
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
          ...user,
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
          setSiteMessageData({
            show: true,
            type: 'error',
            text: err.message ?? err,
            timeout: null
          })
        }
      }
    }
    currUser()
  }, [setSiteMessageData])

  return (
    <AuthUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthUserContext.Provider>
  )
}
