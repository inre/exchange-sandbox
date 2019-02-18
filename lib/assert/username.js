const USERNAME_REGEXP = new RegExp('^[a-zA-Z0-9-:._#]{1,18}$')

function assertUsername (username) {
  if (typeof username !== 'string' || !USERNAME_REGEXP.test(username)) {
    throw new Error('Username is invalid')
  }
  return username
}

module.exports = assertUsername
