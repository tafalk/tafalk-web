import { geocodingRootUrl } from './constants'
import { MapTilerGeooderConfig } from '../config'

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

const GetUserHsl = (userSpecificString) => {
  let hash = 0
  for (let i = 0; i < userSpecificString.length; i++) {
    hash = userSpecificString.charCodeAt(i) + ((hash << 5) - hash)
  }
  let hex = '#'
  for (let j = 0; j < 3; j++) {
    const value = (hash >> (j * 8)) & 0xFF
    hex += ('00' + value.toString(16)).substr(-2)
  }

  // hex to rgb
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b
  })

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  let r = parseInt(result[1], 16) / 255
  let g = parseInt(result[2], 16) / 255
  let b = parseInt(result[3], 16) / 255

  // r /= 255, g /= 255, b /= 255
  let max = Math.max(r, g, b)
  let min = Math.min(r, g, b)

  let h = (max + min) / 2
  let s = (max + min) / 2
  let l = (max + min) / 2

  if (max === min) {
    h = s = 0 // achromatic
  } else {
    var d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
    case r: h = (g - b) / d + (g < b ? 6 : 0); break
    case g: h = (b - r) / d + 2; break
    case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }
  return [h, s, l]
}

const GetUserHue = (userSpecificString) => {
  const userHueDegree = GetUserHsl(userSpecificString)[0] * 360

  return {
    filter: `sepia(100%) hue-rotate(${userHueDegree}deg)`,
    webkitFilter: `sepia(100%) hue-rotate(${userHueDegree}deg)`
  }
}

const GetStreamLink = (streamId) => {
  // TODO: maybe use window.location
  return `https://tafalk.com/stream/${streamId}`
}

const GenerateGeocoderRequestLink = (searchText) => {
  return `${geocodingRootUrl}/q/${encodeURIComponent(searchText)}.js?key=${MapTilerGeooderConfig.apiKey}`
}

export {
  GenerateProfilePictureFileName,
  GenerateUuid4,
  GetUserHue,
  GetUserHsl,
  GetStreamLink,
  GenerateGeocoderRequestLink
}
