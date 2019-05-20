const CheckPassword = (password) => {
  // see https://stackoverflow.com/a/40923568/4636715
  // min 8 letter password, with at least a symbol, upper and lower case letters and a number

  const re = /^(?=.*\d)(?=.*[.!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
  return re.test(password)
}

export { CheckPassword }
