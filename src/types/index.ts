export interface TimeDifference {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export interface User {
  username: string
  profilePictureKey?: string
  profilePictureObjectUrl?: string
  theme: string
  language: string
}

export interface UserProfilePicture {
  profilePictureKey?: string
  profilePictureObjectUrl?: string
}

export interface UserBasicInfo {
  bio: string
  location?: string
  site?: string
}

export interface UserProfilePrivacy {
  allowDirectMessages: boolean
}
