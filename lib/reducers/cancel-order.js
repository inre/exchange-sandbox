const cancelOrdersOrder = require('../entities/orders/cancel')
const removeUserOrder = require('../entities/users/orders/remove')

const cancelOrder = (state, action) => {
  const { entities } = state
  const { payload } = action
  const { username, orderId } = payload

  const orders = cancelOrdersOrder(entities.orders, orderId)
  const users = removeUserOrder(entities.users, username, orderId)

  return {
    ...state,
    entities: {
      ...entities,
      orders,
      users
    }
  }
}

module.exports = cancelOrder
