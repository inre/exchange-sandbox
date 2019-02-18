const { all, pick } = require('ramda')
const { ATTRIBUTES } = require('./constants')

const updateOrders = (entity, orders) => {
  const { byId } = entity
  if (all(({ id }) => byId.hasOwnProperty(id), orders)) {
    throw new Error('Order is missing')
  }
  const ordersById = orders.reduce((acc, order) => {
    acc[order.id] = pick(ATTRIBUTES, order)
    return acc
  }, {})

  return {
    ...entity,
    byId: {
      ...entity.byId,
      ...ordersById
    }
  }
}

module.exports = updateOrders
