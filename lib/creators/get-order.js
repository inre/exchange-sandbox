const { isNil } = require('ramda')
const getOrderSelector = require('../selectors/orders').getOrder
const { pickOrder } = require('../types/order/object')

const getOrder = ({ getState }) => username => orderId => {
  const state = getState()
  const order = getOrderSelector(state, orderId)

  if (isNil(order)) {
    throw new Error('Order is missing')
  }

  if (order.username !== username) {
    throw new Error('The order does not belongs to the user')
  }

  return pickOrder(order)
}

module.exports = getOrder
