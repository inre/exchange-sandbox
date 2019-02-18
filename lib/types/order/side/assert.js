const { OrderSide } = require('../constants')

function assertOrderSide (side) {
  if (side !== OrderSide.BUY && side !== OrderSide.SELL) {
    throw new Error('Side is invalid')
  }
  return side
}

module.exports = assertOrderSide
