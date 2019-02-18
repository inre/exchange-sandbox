const { isNil } = require('ramda')
const actionCreators = require('../utils/actions')
const { getOrder } = require('../selectors/orders')
const { OrderStatus } = require('../types/order/status')
const { pickOrder } = require('../types/order/object')

const cancelOrder = ({ getState, dispatch }) => username => orderId => {
  const state = getState()
  const order = getOrder(state, orderId)

  if (isNil(order)) {
    throw new Error('Order is missing')
  }

  if (order.username !== username) {
    throw new Error('The order does not belongs to this user')
  }

  if (order.status !== OrderStatus.NEW && order.status !== OrderStatus.PARTIALLY_FILLED) {
    throw new Error('Invalid order status')
  }

  dispatch(actionCreators.services.cancelOrder(username, order.id))

  const orderResult = pickOrder(getOrder(getState(), orderId))
  return orderResult
}

module.exports = cancelOrder
