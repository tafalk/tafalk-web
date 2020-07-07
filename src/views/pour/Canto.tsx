import React, {
  useEffect,
  useContext,
  useRef,
  useState,
  useCallback
} from 'react'
import { useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import API, { graphqlOperation } from '@aws-amplify/api'
import { useTranslation } from 'react-i18next'
import { AuthUserContext } from 'context/Auth'
import { GetCantoQuery } from 'types/appsync/API'
import { useSnackbar } from 'notistack'
import {
  GetCantoById,
  UpdateCantoAllFields,
  UpdateCantoBody,
  CreateNewCanto
} from 'graphql/custom'
import { debounce } from 'debounce'
import { deleteTimeToIdleDuration, persistDelayDuration } from 'utils/constants'
import { getStrikethroughStr } from 'utils/derivations'

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

  // Functions
  const delayedUpdateBody = useCallback(
    debounce(async () => {
      setPourState('saving')
      await API.graphql(
        graphqlOperation(UpdateCantoBody, {
          id: cantoId,
          body: bodyRef.current?.value
        })
      )
      setPourState('saved')
    }, persistDelayDuration),
    []
  )

  const onBodyKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const keyName = e.key
    // Neither Backspace nor Delete? Do nothing special
    if (!['Backspace', 'Delete'].includes(keyName)) return
    // No body? Do nothing
    if (!bodyRef.current || !body) return
    e.preventDefault()

    if (bodyRef.current.selectionStart === bodyRef.current.selectionEnd) {
      // There is a cursor, but no selection indeed
      let cursorPosition = bodyRef.current.selectionEnd ?? 0
      if (keyName === 'Backspace' && cursorPosition > 0) {
        setBody(
          (prevBody) =>
            prevBody.substring(0, cursorPosition - 1) +
            getStrikethroughStr(prevBody.charAt(cursorPosition - 1)) +
            prevBody.substring(cursorPosition)
        )

        // Set new cursor position
        cursorPosition--
      } else if (keyName === 'Delete' && cursorPosition < body.length) {
        setBody(
          (prevBody) =>
            prevBody.substring(0, cursorPosition) +
            getStrikethroughStr(prevBody.charAt(cursorPosition)) +
            prevBody.substring(cursorPosition + 1)
        )
        // Set new cursor position
        cursorPosition += 2
      }
      // Move cursor position programmatically
      setTimeout(() =>
        bodyRef.current?.setSelectionRange(cursorPosition, cursorPosition)
      )
      return
    }
    // TODO: Later, maybe add a logic for not a single cursor position, but rather a selection range?
  }

  const onBodyKeyUp = async (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // No body? Do nothing
    if (!bodyRef.current || !bodyRef.current?.value || !body) return

    const keyName = e.key
    // Neither Backspace nor Delete? Save or update
    if (!['Backspace', 'Delete'].includes(keyName)) {
      // Do not run when save in progress
      if (pourState === 'saving' || !authUser?.id) {
        return
      }
      try {
        if (!cantoCreated) {
          setPourState('saving')
          // TODO: Update fields
          await API.graphql(
            graphqlOperation(CreateNewCanto, {
              id: cantoId,
              body: bodyRef.current?.value,
              startTime: new Date().toISOString(),
              lastUpdateTime: new Date().toISOString()
            })
          )
          setPourState('saved')
          setCantoCreated(true)
          return
        }
        // console.log('ref: ' + bodyRef.current?.value)
        // console.log('body: ' + body)
        // Update with debounced function
        delayedUpdateBody()
      } catch (err) {
        setPourState('error')
        enqueueSnackbar(JSON.stringify(err), {
          variant: 'error'
        })
      }
      return
    }

    // Backspace or Delete?
    e.preventDefault()
    const bodyLength = body.length
    if (deleteTimeoutId) {
      clearTimeout(deleteTimeoutId)
    }
    const timeoutId = setTimeout(() => {
      bodyRef.current?.setSelectionRange(bodyLength, bodyLength)
    }, deleteTimeToIdleDuration)
    setDeleteTimeoutId(timeoutId)
  }

  const startMic = () => {
    if (!recognition?.current) return
    setListening(true)
    recognition.current.onresult = (event) => {
      var transcript = event.results[0][0].transcript
      console.log('You told: ' + transcript)
    }
    recognition.current.onerror = (event: any) => {
      if (recognition?.current && event.error === 'not-allowed') {
        recognition.current.onend = () => {}
        setListening(false)
      }
      enqueueSnackbar(event.error, {
        variant: 'error'
      })
    }
    // SpeechRecognition stops automatically after inactivity
    // We want it to keep going until we tell it to stop
    recognition.current.onend = () => {
      if (!recognition.current) return
      recognition.current.start()
    }
    recognition.current.start()
  }

  const stopMic = () => {
    setListening(false)
    if (!recognition?.current) return
    recognition.current.onresult = () => {}
    recognition.current.onend = () => {}
    recognition.current.onerror = () => {}
    recognition.current.stop()
  }

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
