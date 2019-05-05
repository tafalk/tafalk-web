import i18n from '../i18n'
import { timeUnitChars } from './Constants'

const GetElapsedTimeTillNow = (nowTime, referenceTimeISOString) => {
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

const GetElapsedTimeBetween = (startReferenceTimeISOString, endReferenceTimeISOString) => {
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

export { GetElapsedTimeTillNow, GetElapsedTimeBetween }
