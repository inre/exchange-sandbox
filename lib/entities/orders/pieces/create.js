const { OrderSide } = require('../../../types/order/side')
const floor = require('lodash/floor')
const ceil = require('lodash/ceil')

function createOrderPiece (side, quantity, price, basePrecision, quotePrecision) {
  switch (side) {
    case OrderSide.BUY:
      return {
        quantity: quantity,
        baseOffset: floor(quantity, basePrecision),
        quoteOffset: ceil(-quantity * price, quotePrecision)
      }
    case OrderSide.SELL:
      return {
        quantity: quantity,
        baseOffset: ceil(-quantity, basePrecision),
        quoteOffset: floor(quantity * price, quotePrecision)
      }
    default:
      throw new Error('Side is invalid')
  }
}

module.exports = createOrderPiece
