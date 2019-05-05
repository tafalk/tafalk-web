const GenerateProfilePictureFileName = (fileObject, userId) => {
  const profilePicSuffix = '_profilepic'
  const fileExtension = fileObject.name.split('.').pop()
  return fileExtension ? `${userId}${profilePicSuffix}.${fileExtension}` : `${userId}${profilePicSuffix}`
}

export { GenerateProfilePictureFileName }
