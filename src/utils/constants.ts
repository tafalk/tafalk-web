import i18n from '@/i18n'

export const copyrightStartYear = 2019

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

// user
export const activeUserAccountStatus = 'active'
// pour
export const pourStrikethroughTimeToIdle = 1000

// search
export const minSiteSearchTextLength = 3
export const postTypeDelay = 300 // ms
export const strikethroughChar = '\u0336'

// theme
export const themeOptions = ['light', 'dark']

// load items
export const homeStreamFetchLength = 5
export const streamCommentFetchLength = 4

// time
export const timeRefreshIntervalSeconds = 60

// css classes
export const cantoPreBookmarkClass = 'canto-pre-bm-hl'
export const cantoBookmarkId = 'canto-bookmark-1'
export const cantoBookmarkClass = 'canto-bm-hl'
export const cantoPostBookmarkClass = 'canto-post-bm-hl'
export const cantoBookmarkHighlightStyle = 'background-color: yellow; border-radius: 3px;'

// other
export const timeUnitChars = {
  second: i18n.t('common.time.second'),
  minute: i18n.t('common.time.minute'),
  hour: i18n.t('common.time.hour'),
  day: i18n.t('common.time.day')
}

// LocalStorage Keys
export const introDismissedKey = 'intro:dismissed'
export const cookiesAcceptedKey = 'cookies:accepted'

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

export const languageOptions = [
  { displayValue: 'Default (Browser Language)', backendValue: '' },
  { displayValue: 'English', backendValue: 'en' }
]

export const siteImagesBaseUrl = 'https://tafalk-sitefiles.s3.eu-central-1.amazonaws.com/images'

export const geocodingRootUrl = 'https://geocoder.tilehosting.com'
