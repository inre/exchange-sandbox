const { OrderTypeValues } = require('./constants')

function assertOrderSide (value) {
  if (!OrderTypeValues.includes(value)) {
    throw new Error('Side is invalid')
  }
  return value
}

module.exports = assertOrderSide
