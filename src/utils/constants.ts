export const supportedLanguages = [{ text: 'English', value: 'en' }]

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

export const itemsPerFetch = 10
export const avatarPictureSizeMinSize = 1_024 // bytes
export const avatarPictureSizeMaxSize = 2_097_152 // bytes

// Interaction
export const watchUserValue = 'Watch'
export const blockUserValue = 'Block'
export const bookmarkContentValue = 'Bookmark'

//URLs
export const sitePoliciesBucketBaseUrl = `https://${process.env.REACT_APP_S3_SITE_POLICIES_BUCKET}.s3.${process.env.REACT_APP_AWS_REGION}.amazonaws.com/`
