import i18n from '../i18n'

// auth
export const minFirstNameLength = 1
export const maxFirstNameLength = 50
export const minLastNameLength = 1
export const maxLastNameLength = 50
export const minUsernameLength = 2
export const maxUsernameLength = 24
export const minUsernameOrEmailLength = 2
export const maxUsernameOrEmailLength = 254
export const minPasswordLength = 8

// pour
export const pourStrikethroughTimeToIdle = 1000

// search
export const minSiteSearchTextLength = 3
export const strikethroughChar = '\u0336'

// theme
export const themeOptions = ['light', 'dark']

// load items
export const homeStreamFetchLength = 5
export const streamCommentFetchLength = 4

// other
export const timeUnitChars = {
  second: i18n.t('common.time.second'),
  minute: i18n.t('common.time.minute'),
  hour: i18n.t('common.time.hour'),
  day: i18n.t('common.time.day')
}

export const streamMoodOptions = [
  { displayValue: '🤬 ' + i18n.t('stream.pouringMetadata.mood.aroused'), backendValue: 'Aroused' },
  { displayValue: '😐 ' + i18n.t('stream.pouringMetadata.mood.asUsual'), backendValue: 'AsUsual' },
  { displayValue: '😶 ' + i18n.t('stream.pouringMetadata.mood.hardToExplain'), backendValue: 'HardToExplain' },
  { displayValue: '🍼 ' + i18n.t('stream.pouringMetadata.mood.drunk'), backendValue: 'Drunk' },
  { displayValue: '🕶️ ' + i18n.t('stream.pouringMetadata.mood.high'), backendValue: 'High' },
  { displayValue: '🙁 ' + i18n.t('stream.pouringMetadata.mood.melancholic'), backendValue: 'Melancholic' },
  { displayValue: '😌 ' + i18n.t('stream.pouringMetadata.mood.relieved'), backendValue: 'Relieved' }
]

export const streamPositionOptions = [
  { displayValue: i18n.t('stream.pouringMetadata.position.allFours'), backendValue: 'AllFours' },
  { displayValue: i18n.t('stream.pouringMetadata.position.kneeling'), backendValue: 'Kneeling' },
  { displayValue: i18n.t('stream.pouringMetadata.position.lying'), backendValue: 'Lying' },
  { displayValue: i18n.t('stream.pouringMetadata.position.sitting'), backendValue: 'Sitting' },
  { displayValue: i18n.t('stream.pouringMetadata.position.squatting'), backendValue: 'Squatting' },
  { displayValue: i18n.t('stream.pouringMetadata.position.standing'), backendValue: 'Standing' },
  { displayValue: i18n.t('stream.pouringMetadata.position.walking'), backendValue: 'Walking' }
]
