
import { strikethroughChar } from './Constants'

const IsNullOrWhitespace = (str) => {
  return str === null || str.match(/^ *$/) !== null
}

const StrikethroughStr = (str) => {
  return [...str].reduce((acc, char) => {
    return acc + char + strikethroughChar
  }, '')
}

export { IsNullOrWhitespace, StrikethroughStr }
