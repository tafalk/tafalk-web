import React, {
  useEffect,
  useContext,
  useRef,
  useState,
  useCallback
} from 'react'
import {
  Link as RouterLink,
  useHistory,
  Prompt as RouterPrompt
} from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { green } from '@material-ui/core/colors'
import {
  TextField,
  Card,
  CardHeader,
  IconButton,
  Avatar,
  CardContent,
  Theme,
  CardActions,
  Button,
  CircularProgress
} from '@material-ui/core'
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
  CreateNewCanto,
  PauseAndUpdateCantoAllFields
} from 'graphql/custom'
import { debounce } from 'debounce'
import { deleteTimeToIdleDuration, persistDelayDuration } from 'utils/constants'
import { getStrikethroughStr, getContentRoute } from 'utils/derivations'
import MicrophoneIcon from 'mdi-material-ui/Microphone'
import MicrophoneOffIcon from 'mdi-material-ui/MicrophoneOff'
import CheckCircleOutlineIcon from 'mdi-material-ui/CheckCircleOutline'
import CachedIcon from 'mdi-material-ui/Cached'
import CloseCircleOutlineIcon from 'mdi-material-ui/CloseCircleOutline'
import ShareVariantIcon from 'mdi-material-ui/ShareVariant'
import MusicRestQuarterIcon from 'mdi-material-ui/MusicRestQuarter'
import SpeechRecognition, {
  useSpeechRecognition
} from 'react-speech-recognition'

import TafalkFirstCantoInfoDialog from 'components/pour/dialogs/TheFirstCantoInfoDialog'
import TafalkShareContentDialog from 'components/content/dialogs/GenericShareContentDialog'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1
    },
    card: {
      flexGrow: 1
    },
    avatar: {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main
    },
    bodyInput: {
      marginBottom: '25px'
    },
    shareButton: {
      color: green['700']
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
  // const recognition = useRef<SpeechRecognition | null>(null)
  const [firstCantoDialogOpen, setFirstCantoDialogOpen] = useState(false)
  const [pourState, setPourState] = useState<
    'saved' | 'saving' | 'error' | undefined
  >(undefined)
  const [deleteTimeoutId, setDeleteTimeoutId] = useState<
    NodeJS.Timeout | undefined
  >(undefined)
  const [cantoId, setCantoId] = useState('')
  const [body, setBody] = useState('')
  const [shareContentDialogOpen, setShareContentDialogOpen] = useState(false)
  // const [listening, setListening] = useState(false)
  const [routeLeaveSafe, setRouteLeaveSafe] = useState(false)
  const [pauseInProgress, setPauseInProgress] = useState(false)
  const { user: authUser } = useContext(AuthUserContext)
  const { transcript, listening } = useSpeechRecognition()
  const { enqueueSnackbar } = useSnackbar()

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
        setCantoId(authUser?.id ?? '')
        const cantoGraphqlResponse = (await API.graphql(
          graphqlOperation(GetCantoById, {
            id: cantoId
          })
        )) as { data: GetCantoQuery }
        const authUserCantoResult = cantoGraphqlResponse.data.getCanto

        if (!authUserCantoResult?.id) {
          // Canto has not been created before
          const nowTimeStr = new Date().toISOString()
          // Create the canto
          await API.graphql(
            graphqlOperation(CreateNewCanto, {
              id: cantoId,
              startTime: nowTimeStr,
              lastUpdateTime: nowTimeStr
            })
          )
          // Dialog
          setFirstCantoDialogOpen(!authUserCantoResult?.id)
        }
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
            body: bodyRef.current?.value,
            lastUpdateTime: new Date().toISOString()
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
    // if (typeof window === 'undefined') return
    // const SpeechRecognition =
    //   window.SpeechRecognition ?? (window as any).webkitSpeechRecognition
    // if (SpeechRecognition) {
    //   setSpeechRecognitionSupported(true)
    //   recognition.current = new SpeechRecognition()
    //   recognition.current.continuous = true
    //   recognition.current.interimResults = true
    // }
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      setSpeechRecognitionSupported(false)
      return
    }
    setSpeechRecognitionSupported(true)
  }, [])

  // Side effects: get transcript
  useEffect(() => {
    console.log('transcript: ' + transcript)
  }, [transcript])

  // Functions
  const delayedUpdateBody = useCallback(
    debounce(async () => {
      setPourState('saving')
      await API.graphql(
        graphqlOperation(UpdateCantoBody, {
          id: cantoId,
          body: bodyRef.current?.value,
          lastUpdateTime: new Date().toISOString()
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
    SpeechRecognition.startListening({
      continuous: true
    })
    console.log('Started')
    // if (!recognition?.current) return
    // setListening(true)
    // recognition.current.onresult = (event) => {
    //   var transcript = event.results[0][0].transcript
    //   console.log('You told: ' + transcript)
    // }
    // recognition.current.onerror = (event: any) => {
    //   if (recognition?.current && event.error === 'not-allowed') {
    //     recognition.current.onend = () => {}
    //     setListening(false)
    //   }
    //   enqueueSnackbar(event.error, {
    //     variant: 'error'
    //   })
    // }
    // recognition.current.onend = () => {
    //   // SpeechRecognition stops automatically after inactivity
    //   // We want it to keep going until we tell it to stop
    //   if (!recognition.current) return
    //   recognition.current.start()
    // }
    // recognition.current.start()
  }

  const stopMic = () => {
    SpeechRecognition.stopListening()
    // setListening(false)
    // if (!recognition?.current) return
    // recognition.current.onresult = () => {}
    // recognition.current.onend = () => {}
    // recognition.current.onerror = () => {}
    // recognition.current.stop()
  }

  const onPauseClick = async () => {
    try {
      setPauseInProgress(true)
      await API.graphql(
        graphqlOperation(PauseAndUpdateCantoAllFields, {
          id: cantoId,
          body: bodyRef.current?.value,
          lastUpdateTime: new Date().toISOString()
        })
      )
      setRouteLeaveSafe(true)
      routerHistory.push(`/c/${cantoId}`)
    } catch (err) {
      enqueueSnackbar(JSON.stringify(err), {
        variant: 'error'
      })
    } finally {
      setPauseInProgress(false)
    }
  }

  return (
    <React.Fragment>
      {/** HTML Document Header */}
      <Helmet>
        <title>{`🎤 ${t('pour.canto.windowTitle')}`}</title>
      </Helmet>
      {/** main card */}
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <IconButton
              disableRipple
              component={RouterLink}
              to={`/u/${authUser?.username ?? ''}`}
            >
              <Avatar
                alt={authUser?.username}
                className={classes.avatar}
                src={authUser?.profilePictureObjectUrl}
              />
            </IconButton>
          }
          title={authUser?.username}
          subheader={
            pourState ? (
              pourState === 'saved' ? (
                <span>
                  <CheckCircleOutlineIcon color="inherit" fontSize="small" />{' '}
                  {t('pour.messages.processState.saved')}
                </span>
              ) : pourState === 'saving' ? (
                <span>
                  <CachedIcon color="inherit" fontSize="small" />{' '}
                  {t('pour.messages.processState.saving')}
                </span>
              ) : (
                <span>
                  <CloseCircleOutlineIcon color="inherit" fontSize="small" />{' '}
                  {t('pour.messages.processState.error')}
                </span>
              )
            ) : undefined
          }
          action={
            <React.Fragment>
              <IconButton
                className={classes.shareButton}
                aria-label={t('pour.canto.buttons.share')}
                onClick={() => setShareContentDialogOpen(true)}
              >
                <ShareVariantIcon />
              </IconButton>
              {!listening ? (
                <IconButton
                  aria-label={t('pour.canto.buttons.secretaryMode')}
                  color="primary"
                  disabled={!speechRecognitionSupported}
                  onClick={startMic}
                >
                  <MicrophoneIcon />
                </IconButton>
              ) : (
                <IconButton
                  aria-label={t('pour.canto.buttons.secretaryMode')}
                  color="secondary"
                  onClick={stopMic}
                >
                  <MicrophoneOffIcon />
                </IconButton>
              )}
            </React.Fragment>
          }
        ></CardHeader>
        <CardContent>
          {/** Input */}
          <TextField
            placeholder={t('pour.canto.input.placeholder')}
            multiline
            className={classes.bodyInput}
            rows={5}
            fullWidth
            inputRef={bodyRef}
            inputProps={{
              'aria-label': t('pour.canto.input.label'),
              style: { fontFamily: 'Monospace' },
              onKeyDown: (event) => onBodyKeyDown(event),
              onKeyUp: (event) => onBodyKeyUp(event),
              onContextMenu: (event) => {
                event.preventDefault()
                return false
              },
              onPaste: (event) => event.preventDefault(),
              onCut: (event) => event.preventDefault(),
              onKeyPress: (event) => {
                if (event.ctrlKey) {
                  // Disable any action featuring ctrl key press
                  event.preventDefault()
                }
              }
            }}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </CardContent>
        <CardActions>
          <div className={classes.grow} />
          <Button
            onClick={onPauseClick}
            variant="contained"
            color="primary"
            startIcon={<MusicRestQuarterIcon />}
            disableElevation
            disabled={pauseInProgress}
          >
            {!pauseInProgress ? (
              t('pour.canto.buttons.pause')
            ) : (
              <CircularProgress size={14} />
            )}
          </Button>
        </CardActions>
      </Card>
      {/** Dialogs */}
      <TafalkShareContentDialog
        open={shareContentDialogOpen}
        onClose={() => setShareContentDialogOpen(false)}
        contentLink={`https://tafalk.com${getContentRoute({
          __typename: 'Canto',
          id: cantoId
        })}`}
      />
      <TafalkFirstCantoInfoDialog
        open={firstCantoDialogOpen}
        onClose={() => setFirstCantoDialogOpen(false)}
      ></TafalkFirstCantoInfoDialog>
      {/** Router Prompt */}
      <RouterPrompt
        when={!routeLeaveSafe && !!body}
        message={t('pour.canto.messages.beforeLeaveConfirmation')}
      />
    </React.Fragment>
  )
}

export default Canto
