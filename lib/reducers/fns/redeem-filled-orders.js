const { pipe, filter } = require('ramda')
const { getOrders } = require('../../selectors/orders')
const isFilled = require('../../entities/orders/is-filled')
const removeOrder = require('../../entities/orders/remove')
const removeUserOrder = require('../../entities/users/orders/remove')

const redeemFilledOrders = (state, orderIds) => {
  const { entities } = state
  const filledOrders = pipe(
    getOrders,
    filter(isFilled)
  )(state, orderIds)

  const orders = filledOrders.reduce(
    (entity, { id }) => removeOrder(entity, id),
    entities.orders
  )

  const users = filledOrders.reduce(
    (entity, { id, username }) => removeUserOrder(entity, username, id),
    entities.users
  )

  return {
    ...state,
    entities: {
      ...entities,
      orders,
      users
    }
  }
}

module.exports = redeemFilledOrders
