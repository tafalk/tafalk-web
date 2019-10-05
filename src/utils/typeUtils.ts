import i18n from '../i18n'
import { timeUnitChars, strikethroughChar } from './constants'

// String
const IsNullOrWhitespace = (str: string) => {
  return str === null || str.match(/^ *$/) !== null
}

const StrikethroughStr = (str: string) => {
  return [...str].reduce((acc, char) => {
    return acc + char + strikethroughChar
  }, '')
}

// Array
const GetFirstOrDefaultIdStr = (inputObj) => {
  if (Array.isArray(inputObj)) {
    if (inputObj.length) {
      const firstElem = inputObj[0].id
      return firstElem || ''
    }
  } else {
    return inputObj || ''
  }
}

// Time
const GetElapsedTimeTillNow = (nowTime, referenceTimeISOString: string) => {
  const elapsed = (nowTime - new Date(referenceTimeISOString).getTime()) / 1000
  const diff = {}
  diff.days = Math.floor(elapsed / 86400)
  diff.hours = Math.floor(elapsed / 3600 % 24)
  diff.minutes = Math.floor(elapsed / 60 % 60)
  diff.seconds = Math.floor(elapsed % 60)

  if (diff.days === 0 && diff.hours === 0 && diff.minutes === 0 && diff.seconds === 0) {
    return i18n.t('common.time.almostNow')
  } else if (diff.days === 0 && diff.hours === 0 && diff.minutes === 0 && diff.seconds > 0) {
    return `${diff.seconds}${timeUnitChars.second}`
  } else if (diff.days === 0 && diff.hours === 0 && diff.minutes > 0) {
    return `${diff.minutes}${timeUnitChars.minute}`
  } else if (diff.days === 0 && diff.hours > 0) {
    return `${diff.hours}${timeUnitChars.hour}`
  } else if (diff.days > 0 && diff.days < 30) {
    return `${diff.days}${timeUnitChars.day}`
  } else {
    return referenceTimeISOString.slice(0, 10)
  }
}

const GetElapsedTimeBetween = (startReferenceTimeISOString, endReferenceTimeISOString: string) => {
  const elapsed = (new Date(endReferenceTimeISOString).getTime() - new Date(startReferenceTimeISOString).getTime()) / 1000
  const diff = {}
  diff.days = Math.floor(elapsed / 86400)
  diff.hours = Math.floor(elapsed / 3600 % 24)
  diff.minutes = Math.floor(elapsed / 60 % 60)
  diff.seconds = Math.floor(elapsed % 60)

  if (diff.days === 0 && diff.hours === 0 && diff.minutes === 0 && diff.seconds === 0) {
    return i18n.t('common.time.almostNow')
  } else if (diff.days === 0 && diff.hours === 0 && diff.minutes === 0 && diff.seconds > 0) {
    return `${diff.seconds}${timeUnitChars.second}`
  } else if (diff.days === 0 && diff.hours === 0 && diff.minutes > 0) {
    return `${diff.minutes}${timeUnitChars.minute}`
  } else if (diff.days === 0 && diff.hours > 0) {
    return `${diff.hours}${timeUnitChars.hour}`
  } else {
    return `${diff.days}${timeUnitChars.day}`
  }
}

export {
  IsNullOrWhitespace,
  StrikethroughStr,
  GetFirstOrDefaultIdStr,
  GetElapsedTimeTillNow,
  GetElapsedTimeBetween
}
