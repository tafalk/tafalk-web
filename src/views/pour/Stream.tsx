import React, { useEffect, useContext, useState, useRef } from 'react'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'
import { AuthUserContext } from 'context/Auth'
import { useSnackbar } from 'notistack'
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Theme,
  IconButton,
  Button,
  useMediaQuery,
  useTheme,
  TextField,
  debounce,
  Collapse,
  Typography
} from '@material-ui/core'
import API, { graphqlOperation } from '@aws-amplify/api'
import {
  ListUserStreamsForProfile,
  CreateNewStream,
  UpdateStreamBody,
  GetRandomUncloggerPromptForStream
} from 'graphql/custom'
import {
  Language,
  ListUserStreamsForProfileQuery,
  GetRandomUncloggerPromptForStreamQuery
  // UncloggerPromptCategory
} from 'types/appsync/API'
import TafalkFirstStreamInfoDialog from 'components/pour/dialogs/TheFirstStreamInfoDialog'
import MicrophoneIcon from 'mdi-material-ui/Microphone'
import MicrophoneOffIcon from 'mdi-material-ui/MicrophoneOff'
import CheckCircleOutlineIcon from 'mdi-material-ui/CheckCircleOutline'
import CachedIcon from 'mdi-material-ui/Cached'
import CloseCircleOutlineIcon from 'mdi-material-ui/CloseCircleOutline'
import HeadFlashOutlineIcon from 'mdi-material-ui/HeadFlashOutline'
import CloseIcon from 'mdi-material-ui/Close'
import { getStrikethroughStr } from 'utils/derivations'
import {
  deleteTimeToIdleDuration,
  persistDelayDuration,
  naTimeValue
} from 'utils/constants'
import { v4 as uuidv4 } from 'uuid'
import { Alert, AlertTitle } from '@material-ui/lab'

type UncloggerPromptType = {
  body: string
  username: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    card: {
      flexGrow: 1
    },
    avatar: {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main
    }
  })
)

const Stream: React.FC = () => {
  const { t } = useTranslation()
  const theme = useTheme()
  const classes = useStyles()
  let routerHistory = useHistory()
  const bodyRef = useRef<HTMLInputElement | HTMLTextAreaElement>()
  const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState(
    false
  )
  const recognition = useRef<SpeechRecognition | null>(null)
  const [streamCreated, setStreamCreated] = useState(false)
  const [firstStreamDialogOpen, setFirstStreamDialogOpen] = useState(false)
  const [pourState, setPourState] = useState<
    'saved' | 'saving' | 'error' | undefined
  >(undefined)
  const [uncloggerPrompt, setUncloggerPrompt] = useState<
    UncloggerPromptType | undefined
  >(undefined)
  const [uncloggerPromptAlertOpen, setUncloggerPromptAlertOpen] = useState(
    false
  )
  const [deleteTimeoutId, setDeleteTimeoutId] = useState<
    NodeJS.Timeout | undefined
  >(undefined)
  const [streamId, setStreamId] = useState('')
  const [body, setBody] = useState('')
  const [listening, setListening] = useState(false)
  const { user: authUser } = useContext(AuthUserContext)
  const { enqueueSnackbar } = useSnackbar()
  const isSmallPlus = useMediaQuery(theme.breakpoints.up('sm'))

  // Side effects: Load initial profile data
  useEffect(() => {
    ;(async () => {
      // Check if auth user info ready
      if (!authUser?.contextMeta.isReady) return
      try {
        // Redirect to login if not logged in
        if (!authUser?.username) {
          routerHistory.push('/auth/login')
          return
        }

        // Check if first time streaming of user (if so, show dialog)
        // ... and get a random prompt
        const authUserStreamsGraphqlQuery = API.graphql(
          graphqlOperation(ListUserStreamsForProfile, {
            userId: authUser?.id,
            limit: 1,
            nextToken: null
          })
        ) as PromiseLike<{ data: ListUserStreamsForProfileQuery }>
        const randomUncloggerPromptGraphqlQuery = API.graphql(
          graphqlOperation(GetRandomUncloggerPromptForStream, {
            // category: UncloggerPromptCategory.Trivia,
            language: authUser?.language ?? Language.en
          })
        ) as PromiseLike<{ data: GetRandomUncloggerPromptForStreamQuery }>

        const [
          authUserStreamsGraphqlResponse,
          randomUncloggerPromptGraphqlResponse
        ] = (await Promise.all([
          authUserStreamsGraphqlQuery,
          randomUncloggerPromptGraphqlQuery
        ])) as [
          { data: ListUserStreamsForProfileQuery },
          { data: GetRandomUncloggerPromptForStreamQuery }
        ]
        const authUserStreamsResult =
          authUserStreamsGraphqlResponse.data.listStreamsByUser
        const randomUncloggerPromptGraphqlResult =
          randomUncloggerPromptGraphqlResponse.data.getRandomUncloggerPrompt
        setFirstStreamDialogOpen(
          !authUserStreamsResult?.items ||
            authUserStreamsResult.items.length === 0
        )
        setUncloggerPrompt({
          body: randomUncloggerPromptGraphqlResult?.body ?? '',
          username:
            randomUncloggerPromptGraphqlResult?.creatorUser?.username ?? ''
        })
      } catch (err) {
        enqueueSnackbar(err.message ?? err, {
          variant: 'error'
        })
      }
    })()
  }, [authUser, enqueueSnackbar, routerHistory])

  //Side Effects: Check SpeechRecognitioin availability in browser
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

  // Side effects: On body change, save
  useEffect(() => {
    const delayedPersistBody = debounce(async (body: string) => {
      await API.graphql(
        graphqlOperation(UpdateStreamBody, {
          id: streamId,
          body: bodyRef.current?.value
        })
      )
      return
    }, persistDelayDuration)
    ;(async () => {
      // Do not run when save in progress
      if (pourState === 'saving') return
      try {
        setPourState('saving')
        if (!streamCreated) {
          const genId = uuidv4()
          setStreamId(genId)
          await API.graphql(
            graphqlOperation(CreateNewStream, {
              id: genId,
              body: bodyRef.current?.value,
              startTime: new Date().toISOString(),
              sealTime: naTimeValue,
              userId: authUser?.id
            })
          )
          setStreamCreated(true)
        } else {
          delayedPersistBody(body)
        }
        setPourState('saved')
      } catch (err) {
        setPourState('error')
        enqueueSnackbar(err.message ?? err, {
          variant: 'error'
        })
      }
    })()
  }, [authUser, body, enqueueSnackbar, pourState, streamCreated, streamId])

  // Functions
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
    // TODO: Maybe a logic for not a singlr cursor position, but rather a selection range?
  }

  const onBodyKeyUp = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const keyName = e.key
    // Neither Backspace nor Delete? Do nothing special
    if (!['Backspace', 'Delete'].includes(keyName)) return
    // No body? Do nothing
    if (!bodyRef.current || !body) return
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

  return (
    <React.Fragment>
      {/** HTML Document Header */}
      <Helmet>
        <title>{`🌊 ${t('pour.stream.windowTitle')}`}</title>
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
                  <CheckCircleOutlineIcon color="inherit" />{' '}
                  {t('pour.messages.processState.saved')}
                </span>
              ) : pourState === 'saving' ? (
                <span>
                  <CachedIcon color="inherit" />{' '}
                  {t('pour.messages.processState.saving')}
                </span>
              ) : (
                <span>
                  <CloseCircleOutlineIcon color="inherit" />{' '}
                  {t('pour.messages.processState.error')}
                </span>
              )
            ) : undefined
          }
          action={
            <React.Fragment>
              <Button
                size={isSmallPlus ? 'medium' : 'small'}
                color="primary"
                startIcon={<HeadFlashOutlineIcon />}
                onClick={() => setUncloggerPromptAlertOpen(true)}
                disabled={uncloggerPromptAlertOpen}
              >
                {t('pour.stream.buttons.showUncloggerPrompt')}
              </Button>
              {!listening ? (
                <Button
                  size={isSmallPlus ? 'medium' : 'small'}
                  color="primary"
                  startIcon={<MicrophoneIcon />}
                  disabled={!speechRecognitionSupported}
                  onClick={startMic}
                >
                  {t('pour.stream.buttons.secretaryMode')}
                </Button>
              ) : (
                <Button
                  size={isSmallPlus ? 'medium' : 'small'}
                  color="secondary"
                  startIcon={<MicrophoneOffIcon />}
                  onClick={stopMic}
                >
                  {t('pour.stream.buttons.secretaryMode')}
                </Button>
              )}
            </React.Fragment>
          }
        ></CardHeader>
        <CardContent>
          {/** Unclogger Prompt Alert */}
          <Collapse in={uncloggerPromptAlertOpen}>
            <Alert
              icon={<HeadFlashOutlineIcon fontSize="inherit" />}
              severity="info"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setUncloggerPromptAlertOpen(false)
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {uncloggerPrompt?.body}
              <AlertTitle>
                <Typography variant="body2" color="textSecondary">
                  {`/ ${uncloggerPrompt?.username}`}
                </Typography>
              </AlertTitle>
            </Alert>
          </Collapse>

          {/** Input */}
          <TextField
            placeholder={t('pour.stream.input.placeholder')}
            multiline
            rowsMax={6}
            fullWidth
            inputRef={bodyRef}
            inputProps={{
              'aria-label': t('pour.stream.input.label'),
              onKeyDown: (event) => onBodyKeyDown(event),
              onKeyUp: (event) => onBodyKeyUp(event),
              onMouseUp: (event) => event.preventDefault(),
              onMouseDown: (event) => event.preventDefault(),
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
      </Card>
      {/** Dialogs */}
      <TafalkFirstStreamInfoDialog
        open={firstStreamDialogOpen}
        onClose={() => setFirstStreamDialogOpen(false)}
      ></TafalkFirstStreamInfoDialog>
    </React.Fragment>
  )
}

export default Stream
