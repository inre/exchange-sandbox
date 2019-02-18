const { OrderSide } = require('./constants')

const reverse = (side) => {
  switch (side) {
    case OrderSide.BUY:
      return OrderSide.SELL
    case OrderSide.SELL:
      return OrderSide.BUY
    default:
      throw new Error('Order side is invalid')
  }
}

module.exports = reverse
