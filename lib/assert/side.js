const { OrderSide } = require('../types/order/side')

function assertSide (side) {
  if (side !== OrderSide.BUY && side !== OrderSide.SELL) {
    throw new Error('Side is invalid')
  }
  return side
}

module.exports = assertSide
