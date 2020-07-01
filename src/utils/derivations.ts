import { GridListTileCardProps, TileCardProps } from 'types/props'
import { strikethroughChar } from './constants'

export const getContentRoute = (
  item: GridListTileCardProps['item'] | TileCardProps['item']
): string => {
  if (item.__typename === 'Stream') {
    return `/s/${item.id}`
  }
  if (item.__typename === 'Canto') {
    return `/c/${item.id}`
  }
  if (item.__typename === 'User') {
    return `/u/${item.username}`
  }
  return ''
}

export const pathJoin = (parts: Array<string>) => {
  const separator = '/'
  return parts
    .join(separator)
    .replace(new RegExp(separator + '{1,}', 'g'), separator)
}

export const generateProfilePictureFileName = (
  fileObject: File,
  userId: string
) => {
  const fileExtension = fileObject.name.split('.').pop()
  return fileExtension
    ? `${userId}_profilepic.${fileExtension}`
    : `${userId}_profilepic`
}

export const getSiblings = (elem: Node | null) => {
  // Setup siblings array and get the first sibling
  var siblings = []
  var sibling = (elem?.parentNode as HTMLElement).firstChild

  // Loop through each sibling and push to the array
  while (sibling) {
    if (sibling.nodeType === Node.ELEMENT_NODE && sibling !== elem) {
      siblings.push(sibling)
    }
    sibling = sibling.nextSibling
  }

  return siblings
}

export const getStrikethroughStr = (str: string) => {
  return [...str].reduce((acc, char) => {
    return acc + char + strikethroughChar
  }, '')
}
