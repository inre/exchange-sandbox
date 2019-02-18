const { reverseOrderSide } = require('../../../types/order/side')
const createOrderPiece = require('./create')

const reverseUserOrdersPieces = (order, piece) => {
  const oppositeSide = reverseOrderSide(order.side)
  return createOrderPiece(order, oppositeSide, piece.quantity)
}

module.exports = reverseUserOrdersPieces
