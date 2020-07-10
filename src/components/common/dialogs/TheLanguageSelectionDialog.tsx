import React, { useState, useContext } from 'react'
import { BasicDialogProps } from 'types/props'
import {
  DialogContentText,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  TextField
} from '@material-ui/core'
import API, { graphqlOperation } from '@aws-amplify/api'
import { useTranslation } from 'react-i18next'
import { UpdateUserLanguage } from 'graphql/custom'
import { AuthUserContext } from 'context/Auth'
import { Language } from 'types/appsync/API'

const supportedLanguages = [{ text: 'English [en]', value: Language.en }]

interface LanguageSelectionDialogProps extends BasicDialogProps {}

const TheLanguageSelectionDialog: React.FC<LanguageSelectionDialogProps> = (
  props
) => {
  const { onClose, open } = props
  const { t } = useTranslation()
  const [language, setLanguage] = useState<Language | null>(null)
  const { user: authUser, setUser: setAuthUser } = useContext(AuthUserContext)

  // Functions
  const onConfirm = async (): Promise<void> => {
    // TODO: Test Language Change
    const languageOrDefault = language ?? Language.en
    await API.graphql(
      graphqlOperation(UpdateUserLanguage, {
        userId: authUser?.id,
        language: languageOrDefault
      })
    )
    setAuthUser({ ...authUser, language: languageOrDefault })
    onClose()
  }

  return (
    <Dialog open={open} maxWidth="md" fullWidth={true}>
      <DialogTitle>{t('languageDialog.title')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('languageDialog.body')}</DialogContentText>
        <TextField
          select
          label={t('languageDialog.input.label')}
          value={language}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLanguage(e.target.value as Language)
          }
          SelectProps={{
            native: true
          }}
        >
          {supportedLanguages.map((l) => (
            <option key={l.value} value={l.value}>
              {l.text}
            </option>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="default">
          {t('common.cancel')}
        </Button>
        <Button onClick={onConfirm} color="primary">
          {t('common.ok')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TheLanguageSelectionDialog
