const createOrder = require('../entities/orders/create')
const addUserOrder = require('../entities/users/orders/add')

const createLimitOrder = (state, action) => {
  const { entities } = state
  const { payload } = action
  const { username, pair, order } = payload
  const orders = createOrder(entities.orders, username, pair, order)
  const users = addUserOrder(entities.users, username, orders.lastId)

  return {
    ...state,
    entities: {
      ...entities,
      orders,
      users
    }
  }
}

module.exports = createLimitOrder
