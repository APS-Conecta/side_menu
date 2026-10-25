const waitPasswordConfirmation = async () => {
  if (
    typeof OC === 'undefined' ||
    !OC.PasswordConfirmation ||
    typeof OC.PasswordConfirmation.requiresPasswordConfirmation !== 'function' ||
    typeof OC.PasswordConfirmation.requirePasswordConfirmation !== 'function'
  ) {
    return Promise.reject(new Error('Password confirmation service is unavailable'))
  }

  let tries = 0
  let timer = null

  return new Promise((resolve, reject) => {
    const execute = () => {
      if (!OC.PasswordConfirmation.requiresPasswordConfirmation()) {
        if (timer !== null) {
          clearTimeout(timer)
          timer = null
        }

        resolve()
        return
      }

      OC.PasswordConfirmation.requirePasswordConfirmation(() => {})

      if (++tries === 10) {
        reject(new Error('Password confirmation timed out'))
        return
      }

      timer = setTimeout(execute, 2000)
    }

    execute()
  })
}

export { waitPasswordConfirmation }
