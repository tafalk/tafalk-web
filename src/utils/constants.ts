// Limitations
export const passwordRegex = /^(?=.*\d)(?=.*[.!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/i
export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
export const usernameMinLength = 3
export const usernameMaxLength = 32
export const emailMinLength = 3
export const emailMaxLength = 320
export const passwordMinLength = 3
export const passwordMaxLength = 320
export const nameMinLength = 1
export const nameMaxLength = 50
export const maxNumOfSearchResults = 3
export const commentMinLength = 3
export const commentMaxLength = 255

export const streamTitleMaxLength = 64

export const itemsPerFetch = 10
export const avatarPictureSizeMinSize = 1_024 // bytes
export const avatarPictureSizeMaxSize = 2_097_152 // bytes

export const maxNotistackSnacks = 3

// Interaction
export const watchUserValue = 'Watch'
export const blockUserValue = 'Block'
export const bookmarkContentValue = 'Bookmark'

// URLs
export const sitePoliciesBucketBaseUrl = `https://${process.env.REACT_APP_S3_SITE_POLICIES_BUCKET}.s3.${process.env.REACT_APP_AWS_REGION}.amazonaws.com/`
export const siteImagesBaseUrl = `https://tafalk-prod-sitefiles.s3-${process.env.REACT_APP_AWS_REGION}.amazonaws.com/images`

// Cookie names
export const hasVisitedBeforeCookieName = 'hasVisitedTafalkBefore'

// Durations
export const defaultSnackbarAutoHideDuration = 6000
export const deleteTimeToIdleDuration = 1000
export const persistDelayDuration = 1000

// Char & String
export const strikethroughChar = '\u0336'

// User groups
export const cognitoDefaultUserGroup = 'tafalk-default-ug'
export const cognitoAdminUserGroup = 'tafalk-admin-ug'

// Misc
export const naTimeValue = 'NA'
export const cognitoNotAuthenticatedMessage = 'not authenticated'
export const cognitoNoCurrentUserMessage = 'No current user'
