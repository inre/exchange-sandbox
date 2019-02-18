const amendOrder = require('./amend')
const removeOrder = require('./remove')
const { OrderStatus } = require('../../types/order/status')

const cancelOrder = (entity, orderId) =>
  amendOrder(removeOrder(entity, orderId), orderId, (order) => ({
    ...order,
    status: OrderStatus.CANCELED
  }))

module.exports = cancelOrder
