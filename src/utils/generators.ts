import {
  geocodingRootUrl,
  cantoBookmarkId,
  cantoPreBookmarkClass,
  cantoBookmarkClass,
  cantoPostBookmarkClass,
  cantoBookmarkHighlightStyle
} from './constants'
import { MapTilerGeooderConfig } from '@/config'

export const GetPolicyS3BucketRootUrl = () => {
  return `https://${process.env.VUE_APP_S3_SITE_POLICIES_BUCKET}.s3.${process.env.VUE_APP_AWS_REGION}.amazonaws.com/`
}

export const GenerateProfilePictureFileName = (
  fileObject: File,
  userId: string
) => {
  const profilePicSuffix = '_profilepic'
  const fileExtension = fileObject.name.split('.').pop()
  return fileExtension
    ? `${userId}${profilePicSuffix}.${fileExtension}`
    : `${userId}${profilePicSuffix}`
}

export const GetHexColorOfString = (str: string) => {
  let hash = 0
  for (let i = 0; i < str?.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  let hex = '#'
  for (let j = 0; j < 3; j++) {
    const value = (hash >> (j * 8)) & 0xff
    hex += ('00' + value.toString(16)).substr(-2)
  }
  return hex
}

export const GetStreamLink = (streamId: string) => {
  // TODO: maybe use window.location
  return `https://tafalk.com/stream/${streamId}`
}

export const GetCantoLink = (username: string) => {
  return `https://tafalk.com/user/${username}/canto`
}

export const GenerateGeocoderRequestLink = (searchText: string) => {
  return `${geocodingRootUrl}/q/${encodeURIComponent(searchText)}.js?key=${
    MapTilerGeooderConfig.apiKey
  }`
}

export const BookmarkCantoContent = (
  originalBody: { textContent: any },
  indices: Array<number>
) => {
  if (!originalBody) return originalBody
  const originalText = originalBody.textContent // .trim()
  if (!indices?.length)
    return `<span class="unbookmarked">${originalText}</span>`
  return `<span class="${cantoPreBookmarkClass}">${originalText.substring(
    0,
    indices[0]
  )}</span><span id="${cantoBookmarkId}" class="${cantoBookmarkClass}" style="${cantoBookmarkHighlightStyle}">${originalText.substring(
    indices[0],
    indices[1]
  )}</span><span class="${cantoPostBookmarkClass}">${originalText.substring(
    indices[1]
  )}</span>`
}

export const GetSiblings = (elem: { parentNode: { firstChild: any } }) => {
  // Setup siblings array and get the first sibling
  var siblings = []
  var sibling = elem.parentNode.firstChild

  // Loop through each sibling and push to the array
  while (sibling) {
    if (sibling.nodeType === Node.ELEMENT_NODE && sibling !== elem) {
      siblings.push(sibling)
    }
    sibling = sibling.nextSibling
  }

  return siblings
}

export const GetBrowserLanguageInIso6391 = () => {
  return navigator.language.split('-')[0]
}
