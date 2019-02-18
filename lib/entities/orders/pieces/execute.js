const { OrderStatus } = require('../../../types/order/status')

const executeOrderPiece = (order, orderPiece) => {
  const executedQty = order.executedQty + orderPiece.quantity
  const baseOffset = order.baseOffset - orderPiece.baseOffset
  const quoteOffset = order.quoteOffset - orderPiece.quoteOffset
  const status = (executedQty >= order.quantity) ? OrderStatus.FILLED : OrderStatus.PARTIALLY_FILLED

  return {
    ...order,
    executedQty,
    baseOffset,
    quoteOffset,
    status
  }
}

module.exports = executeOrderPiece
