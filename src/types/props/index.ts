import {
  watchUserValue,
  blockUserValue,
  bookmarkContentValue
} from 'utils/constants'

const userInteractionTypes = [watchUserValue, blockUserValue] as const

const contentInteractionTypes = [bookmarkContentValue] as const

export interface BasicDialogProps {
  open: boolean
  onClose: () => void
}

export interface GridListTileCardProps {
  item: any
  status: 'live' | 'sealed' | 'paused' | undefined
}

export interface SearchResultTileCardProps {
  item: any
}

export interface TileCardProps {
  type: 'stream' | 'canto' | 'user' | 'comment'
  userInteractionType?: typeof userInteractionTypes[number]
  contentInteractionType?: typeof contentInteractionTypes[number]
  item: any
  showUserInfo: boolean
}
