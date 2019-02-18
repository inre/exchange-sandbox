const createOrderPiece = require('./create')
const { reverseOrderSide } = require('../../../types/order/side')

const fillOrderPiece = (sourceOrder, targetOrder) => {
  const oppositeSide = reverseOrderSide(sourceOrder.side)
  const leftSourceQty = sourceOrder.quantity - sourceOrder.executedQty
  const leftTargetQty = targetOrder.quantity - targetOrder.executedQty
  const { price, basePrecision, quotePrecision } = targetOrder
  const quantity = (leftSourceQty < leftTargetQty) ? leftSourceQty : leftTargetQty

  return createOrderPiece(
    oppositeSide,
    quantity,
    price,
    basePrecision,
    quotePrecision
  )
}

module.exports = fillOrderPiece
