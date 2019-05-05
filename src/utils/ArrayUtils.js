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

export { GetFirstOrDefaultIdStr }
