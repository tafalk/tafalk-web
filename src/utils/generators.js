import { geocodingRootUrl, cantoBookmarkClass, cantoBookmarkHighlightStyle } from './constants'
import { MapTilerGeooderConfig } from '../config'

const GetPolicyS3BucketRootUrl = () => {
  return `https://${process.env.VUE_APP_S3_SITE_POLICIES_BUCKET}.s3.${process.env.VUE_APP_AWS_REGION}.amazonaws.com/`
}

const GenerateProfilePictureFileName = (fileObject, userId) => {
  const profilePicSuffix = '_profilepic'
  const fileExtension = fileObject.name.split('.').pop()
  return fileExtension ? `${userId}${profilePicSuffix}.${fileExtension}` : `${userId}${profilePicSuffix}`
}

// See https://stackoverflow.com/a/2117523/4636715
const GenerateUuid4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

const GetHexColorOfString = (str) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  let hex = '#'
  for (let j = 0; j < 3; j++) {
    const value = (hash >> (j * 8)) & 0xFF
    hex += ('00' + value.toString(16)).substr(-2)
  }
  return hex
}

const GetStreamLink = (streamId) => {
  // TODO: maybe use window.location
  return `https://tafalk.com/stream/${streamId}`
}

const GetCantoLink = (username) => {
  return `https://tafalk.com/user/${username}/canto`
}

const GenerateGeocoderRequestLink = (searchText) => {
  return `${geocodingRootUrl}/q/${encodeURIComponent(searchText)}.js?key=${MapTilerGeooderConfig.apiKey}`
}

const BookmarkCantoContent = (originalBody, indices) => {
  if (!originalBody) return originalBody
  if (!indices || indices.length === 0) return originalBody.textContent
  const originalText = originalBody.textContent.trim()
  return `${originalText.substring(0, indices[0])}<span class="${cantoBookmarkClass}" style="${cantoBookmarkHighlightStyle}">${originalText.substring(indices[0], indices[1])}</span>${originalText.substring(indices[1])}`
}

export {
  GetPolicyS3BucketRootUrl,
  GenerateProfilePictureFileName,
  GenerateUuid4,
  GetHexColorOfString,
  GetStreamLink,
  GetCantoLink,
  GenerateGeocoderRequestLink,
  BookmarkCantoContent
}
