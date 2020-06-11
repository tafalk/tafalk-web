import { enUS, tr } from 'date-fns/locale'
import { Language } from 'types/appsync/API'

export const getUserLocale = (userLanguage: Language): Locale => {
  if (userLanguage === 'en') {
    return enUS
  }
  if (userLanguage === 'tr') {
    return tr
  }
  return enUS
}
