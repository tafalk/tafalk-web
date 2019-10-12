export const CheckPassword = (password: string) => {
  // see https://stackoverflow.com/a/40923568/4636715
  // min 8 letter password, with at least a symbol, upper and lower case letters and a number

  const re = /^(?=.*\d)(?=.*[.!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
  return re.test(password)
}

export const CheckUserAge = (birthdayISOString: string) => {
  let today = new Date()
  let birth = new Date(birthdayISOString)
  let age = today.getFullYear() - birth.getFullYear()
  let m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  return age >= 18
}
