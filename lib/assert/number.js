
function assertNumber (num) {
  if (typeof num !== 'number') {
    throw new Error(`Expected number`)
  }
}

module.exports = assertNumber
