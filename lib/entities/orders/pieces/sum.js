const round = require('lodash/round')

const sumOrderPieces = ({ side, price, basePrecision, quotePrecision }, orderPieces) => {
  return orderPieces.reduce(({
    quantity,
    baseOffset,
    quoteOffset
  }, piece) => ({
    quantity: quantity + piece.quantity,
    baseOffset: round(baseOffset + piece.baseOffset, basePrecision),
    quoteOffset: round(quoteOffset + piece.quoteOffset, quotePrecision)
  }), {quantity: 0, baseOffset: 0, quoteOffset: 0})
}

module.exports = sumOrderPieces
