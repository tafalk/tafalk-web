// Keyboard Input
export const GetKeyName = (keyCode: number) => {
  let keyName = ''

  switch (keyCode) {
  case 8:
    keyName = 'backspace'; break
  case 46:
    keyName = 'delete'; break
  default:
    break
  }

  return keyName
}
