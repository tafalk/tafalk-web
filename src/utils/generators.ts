import { geocodingRootUrl, cantoBookmarkId, cantoPreBookmarkClass, cantoBookmarkClass, cantoPostBookmarkClass, cantoBookmarkHighlightStyle } from './constants'
import { MapTilerGeooderConfig } from '../config'

const GetPolicyS3BucketRootUrl = () => {
  return `https://${process.env.VUE_APP_S3_SITE_POLICIES_BUCKET}.s3.${process.env.VUE_APP_AWS_REGION}.amazonaws.com/`
}

const GenerateProfilePictureFileName = (fileObject, userId: string) => {
  const profilePicSuffix = '_profilepic'
  const fileExtension = fileObject.name.split('.').pop()
  return fileExtension ? `${userId}${profilePicSuffix}.${fileExtension}` : `${userId}${profilePicSuffix}`
}

// See https://stackoverflow.com/a/2117523/4636715
const GenerateUuid4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c: any) =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

const GetHexColorOfString = (str: string) => {
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

const GetStreamLink = (streamId: string) => {
  // TODO: maybe use window.location
  return `https://tafalk.com/stream/${streamId}`
}

const GetCantoLink = (username: string) => {
  return `https://tafalk.com/user/${username}/canto`
}

const GenerateGeocoderRequestLink = (searchText: string) => {
  return `${geocodingRootUrl}/q/${encodeURIComponent(searchText)}.js?key=${MapTilerGeooderConfig.apiKey}`
}

const BookmarkCantoContent = (originalBody, indices: Array<number>) => {
  if (!originalBody) return originalBody
  const originalText = originalBody.textContent // .trim()
  if (!indices || indices.length === 0) return `<span class="unbookmarked">${originalText}</span>`
  return `<span class="${cantoPreBookmarkClass}">${originalText.substring(0, indices[0])}</span><span id="${cantoBookmarkId}" class="${cantoBookmarkClass}" style="${cantoBookmarkHighlightStyle}">${originalText.substring(indices[0], indices[1])}</span><span class="${cantoPostBookmarkClass}">${originalText.substring(indices[1])}</span>`
}

const GetSiblings = (elem) => {
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

export {
  GetPolicyS3BucketRootUrl,
  GenerateProfilePictureFileName,
  GenerateUuid4,
  GetHexColorOfString,
  GetStreamLink,
  GetCantoLink,
  GenerateGeocoderRequestLink,
  BookmarkCantoContent,
  GetSiblings
}
