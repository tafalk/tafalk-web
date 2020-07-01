import React, { useState, useEffect, useContext } from 'react'
import { BasicDialogProps, UserDataType } from 'types/props'
import {
  DialogContentText,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  CircularProgress,
  RootRef,
  Box,
  Grid,
  Avatar,
  Theme,
  createStyles,
  makeStyles
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { useDropzone } from 'react-dropzone'
import API, { graphqlOperation } from '@aws-amplify/api'
import Storage from '@aws-amplify/storage'
import {
  avatarPictureSizeMinSize,
  avatarPictureSizeMaxSize
} from 'utils/constants'
import { generateProfilePictureFileName } from 'utils/derivations'
import UploadIcon from 'mdi-material-ui/Upload'
import { UpdateUserProfilePictureKey } from 'graphql/custom'
import { AuthUserContext } from 'context/Auth'
import { useSnackbar } from 'notistack'

interface ImageFile extends File {
  objecturl: string
}

interface AvatarUploadDialogProps extends BasicDialogProps {
  user: UserDataType | null
  userProfilePictureObjectUrl?: string
  userColor?: string
}
const avatarThemeSpacing = 28

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      width: theme.spacing(avatarThemeSpacing),
      height: theme.spacing(avatarThemeSpacing),
      fontSize: 72
    },
    dropzone: {
      height: theme.spacing(avatarThemeSpacing * 2),
      border: 'dashed',
      borderWidth: '2px',
      borderRadius: '5px',
      borderColor: '#757575'
    }
  })
)

const AvatarUplaodDialog: React.FC<AvatarUploadDialogProps> = (props) => {
  const { onClose, open, user } = props
  const { enqueueSnackbar } = useSnackbar()
  const [uploadedFile, setUploadedFile] = useState<ImageFile | null>(null)
  const [uploadInProgress, setUploadInProgress] = useState(false)
  const [uploadEnabled, setUploadEnabled] = useState(false)
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    minSize: avatarPictureSizeMinSize,
    maxSize: avatarPictureSizeMaxSize,
    multiple: false,
    onDrop: (acceptedFiles, fileRejections) => {
      // TODO: Do something with the files
      console.log(JSON.stringify(acceptedFiles))
      const acceptedFile = acceptedFiles[0]
      setUploadedFile({
        ...acceptedFile,
        objecturl: URL.createObjectURL(acceptedFile)
      })
      setUploadEnabled(true)
    }
  })
  const classes = useStyles()
  const { t } = useTranslation()
  const { user: authUser, setUser: setAuthUser } = useContext(AuthUserContext)
  const { ref: avatarDialogRef, ...rootProps } = getRootProps()

  // Side effects: Clean up the data URI to avoid memory leaks
  useEffect(() => {
    return uploadedFile
      ? () => URL.revokeObjectURL(uploadedFile.objecturl ?? '')
      : undefined
  }, [uploadedFile])

  // Functions
  const onConfirmUpload = async (): Promise<void> => {
    if (!uploadedFile) return
    setUploadInProgress(true)
    try {
      // TODO: Compress image on the fly
      const profilePictureKey = generateProfilePictureFileName(
        uploadedFile,
        authUser?.id ?? ''
      )
      await Promise.all([
        // Upload to S3 storage
        Storage.put(profilePictureKey, uploadedFile, {
          level: 'protected',
          contentType: uploadedFile?.type
        }),
        // Update User DB Table
        API.graphql(
          graphqlOperation(UpdateUserProfilePictureKey, {
            userId: authUser?.id,
            profilePictureKey
          })
        )
      ])
      // Set the avatar picture of profile and auth user contextuntil it is reloaded some time
      if (user) {
        user.profilePictureObjectUrl = uploadedFile.objecturl
        setAuthUser({
          ...user,
          profilePictureObjectUrl: uploadedFile.objecturl
        })
      }
      // Close
      onClose()
    } catch (err) {
      enqueueSnackbar(err.message ?? err, {
        variant: 'error'
      })
    } finally {
      setUploadInProgress(false)
    }
  }

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle id="avatar-dialog-title">
        {t('profile.dialogs.avatar.title')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="avatar-dialog-body">
          {t('profile.dialogs.avatar.body')}
        </DialogContentText>
        <RootRef rootRef={avatarDialogRef}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={1}
            bgcolor="grey.300"
            {...rootProps}
            className={classes.dropzone}
          >
            <Grid container direction="column" alignItems="center">
              <Avatar
                src={
                  uploadedFile
                    ? uploadedFile.objecturl
                    : user?.profilePictureObjectUrl
                }
                variant="square"
                className={classes.avatar}
                style={{
                  color: '#fff',
                  backgroundColor: user?.color
                }}
              ></Avatar>
              <p>{t('profile.dialogs.avatar.dropzone')}</p>
            </Grid>
            <input {...getInputProps()} />
          </Box>
        </RootRef>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="default">
          {t('common.cancel')}
        </Button>
        <Button
          onClick={onConfirmUpload}
          variant="contained"
          color="primary"
          autoFocus
          disabled={!uploadEnabled || uploadInProgress}
          startIcon={<UploadIcon />}
        >
          {!uploadInProgress ? (
            t('common.upload')
          ) : (
            <CircularProgress size={14} />
          )}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AvatarUplaodDialog
