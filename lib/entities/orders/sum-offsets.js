const round = require('lodash/round')

const sumOrderOffsets = (orders, { symbol, precision }) => {
  const assetOffset = orders.reduce((amount, order) => {
    if (order.baseAsset === symbol && order.baseOffset < 0) {
      amount -= order.baseOffset
    }
    if (order.quoteAsset === symbol && order.quoteOffset < 0) {
      amount -= order.quoteOffset
    }
    return amount
  }, 0)
  return round(assetOffset, precision)
}

module.exports = sumOrderOffsets
