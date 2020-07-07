import React, { useEffect, useContext, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import API, { graphqlOperation } from '@aws-amplify/api'
import { useTranslation } from 'react-i18next'
import { AuthUserContext } from 'context/Auth'
import { GetCantoQuery } from 'types/appsync/API'
import { useSnackbar } from 'notistack'
import { GetCantoById, UpdateCantoAllFields } from 'graphql/custom'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1
    }
  })
)

const Canto: React.FC = () => {
  const { t } = useTranslation()
  const classes = useStyles()
  let routerHistory = useHistory()
  const bodyRef = useRef<HTMLInputElement | HTMLTextAreaElement>()
  const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState(
    false
  )
  const recognition = useRef<SpeechRecognition | null>(null)
  const [cantoCreated, setCantoCreated] = useState(false)
  const [firstCantoDialogOpen, setFirstCantoDialogOpen] = useState(false)
  const [pourState, setPourState] = useState<
    'saved' | 'saving' | 'error' | undefined
  >(undefined)
  const [deleteTimeoutId, setDeleteTimeoutId] = useState<
    NodeJS.Timeout | undefined
  >(undefined)
  const [body, setBody] = useState('')
  const [listening, setListening] = useState(false)
  const [routeLeaveSafe, setRouteLeaveSafe] = useState(false)
  const { user: authUser } = useContext(AuthUserContext)
  const { enqueueSnackbar } = useSnackbar()

  const cantoId = authUser?.id ?? ''

  // Side effects: Load initial profile data
  useEffect(() => {
    ;(async () => {
      // Check if auth user info ready
      if (!authUser?.contextMeta.isReady || !authUser?.id) return
      try {
        // Redirect to login if not logged in
        if (!authUser?.username) {
          routerHistory.push('/auth/login')
          return
        }
        const cantoGraphqlResponse = (await API.graphql(
          graphqlOperation(GetCantoById, {
            id: cantoId
          })
        )) as { data: GetCantoQuery }
        const authUserCantoResult = cantoGraphqlResponse.data.getCanto

        setFirstCantoDialogOpen(
          !authUserCantoResult || authUserCantoResult.body.length === 0
        )
      } catch (err) {
        enqueueSnackbar(JSON.stringify(err), {
          variant: 'error'
        })
      }
    })()
  }, [authUser, cantoId, enqueueSnackbar, routerHistory])

  // Side Effects: Safe unload
  useEffect(() => {
    const onBeforeUnload = async (e: BeforeUnloadEvent) => {
      // An attempt to leave
      if (!routeLeaveSafe && !!body) {
        // Cancel the event as stated by the standard.
        e.preventDefault()
        // Update once more before leave
        await API.graphql(
          graphqlOperation(UpdateCantoAllFields, {
            id: cantoId,
            body: bodyRef.current?.value
          })
        )
        e.returnValue = ''
      } else {
        // the absence of a returnValue property on the event will guarantee the browser unload happens
        delete e['returnValue']
      }
    }
    document.addEventListener('beforeunload', onBeforeUnload)
    return () => document.removeEventListener('beforeunload', onBeforeUnload)
  }, [body, cantoId, routeLeaveSafe])

  // Side Effects: Check SpeechRecognitioin availability in browser
  useEffect(() => {
    if (typeof window === 'undefined') return
    const SpeechRecognition = window.SpeechRecognition // ?? window.webkitSpeechRecognition
    if (SpeechRecognition) {
      setSpeechRecognitionSupported(true)
      recognition.current = new SpeechRecognition()

      recognition.current.continuous = true
      recognition.current.interimResults = true
    }
  }, [])

  // TODO: Functions

  // TODO: Implement Functional React Component below
  return (
    <React.Fragment>
      {/** HTML Document Header */}
      <Helmet>
        <title>{`🎤 ${t('pour.canto.windowTitle')}`}</title>
      </Helmet>
    </React.Fragment>
  )
}

export default Canto
