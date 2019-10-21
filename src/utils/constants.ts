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

export const watchTypeUserConnectionValue = 'Watch'
export const blockTypeUserConnectionValue = 'Block'
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
  { text: `🤬 ${i18n.t('stream.pouringMetadata.mood.aroused')}`, value: 'Aroused' },
  { text: `😐 ${i18n.t('stream.pouringMetadata.mood.asUsual')}`, value: 'AsUsual' },
  { text: `😶 ${i18n.t('stream.pouringMetadata.mood.hardToExplain')}`, value: 'HardToExplain' },
  { text: `🍼 ${i18n.t('stream.pouringMetadata.mood.drunk')}`, value: 'Drunk' },
  { text: `🕶️ ${i18n.t('stream.pouringMetadata.mood.high')}`, value: 'High' },
  { text: `🙁 ${i18n.t('stream.pouringMetadata.mood.melancholic')}`, value: 'Melancholic' },
  { text: `😌 ${i18n.t('stream.pouringMetadata.mood.relieved')}`, value: 'Relieved' }
]

export const streamPositionOptions = [
  { text: i18n.t('stream.pouringMetadata.position.allFours'), value: 'AllFours' },
  { text: i18n.t('stream.pouringMetadata.position.kneeling'), value: 'Kneeling' },
  { text: i18n.t('stream.pouringMetadata.position.lying'), value: 'Lying' },
  { text: i18n.t('stream.pouringMetadata.position.sitting'), value: 'Sitting' },
  { text: i18n.t('stream.pouringMetadata.position.squatting'), value: 'Squatting' },
  { text: i18n.t('stream.pouringMetadata.position.standing'), value: 'Standing' },
  { text: i18n.t('stream.pouringMetadata.position.walking'), value: 'Walking' }
]

export const languageOptions = [
  { text: 'Default (Browser Language)', value: '' },
  { text: 'English', value: 'en' }
]

export const siteImagesBaseUrl = 'https://tafalk-sitefiles.s3.eu-central-1.amazonaws.com/images'

export const geocodingRootUrl = 'https://geocoder.tilehosting.com'
