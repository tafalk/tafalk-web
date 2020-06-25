import React, { useState } from 'react'
import { BasicDialogProps } from 'types/props'
import {
  DialogContentText,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  InputLabel,
  Select
} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import { supportedLanguages } from 'utils/constants'

interface LanguageSelectionDialogProps extends BasicDialogProps {
  onConfirm: () => Promise<void>
}

const TheLanguageSelectionDialog: React.FC<LanguageSelectionDialogProps> = (
  props
) => {
  const { onClose, open, onConfirm } = props
  const { t } = useTranslation()
  const [language, setLanguage] = useState('')

  // Functions
  const onLanguageChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    setLanguage(event.target.value as string)
  }

  return (
    <Dialog open={open} maxWidth="md" fullWidth={true}>
      <DialogTitle>{t('languageDialog.title')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('languageDialog.body')}</DialogContentText>
        <InputLabel htmlFor="language-select">
          {t('languageDialog.input.label')}
        </InputLabel>
        <Select
          native
          value={language}
          onChange={onLanguageChange}
          inputProps={{
            name: 'language',
            id: 'language-select'
          }}
        >
          {supportedLanguages.map((l) => (
            <option key={l.value} value={l.value}>
              {l.text}
            </option>
          ))}
        </Select>
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
