const { pipe } = require('ramda')
const { getOrder, getOrderFromTuplesCreator } = require('../../selectors/orders')
const mapAppropriateOrders = require('./map-appropriate-orders')
const fillOrders = require('./fill-orders')

// Filling market's orders
const createOrderPieceTuples = (state, sourceOrderId, orderTuples) => {
  const sourceOrder = getOrder(state, sourceOrderId)
  return pipe(
    mapAppropriateOrders(sourceOrder),
    getOrderFromTuplesCreator(state),
    fillOrders(sourceOrder)
  )(orderTuples)
}

module.exports = createOrderPieceTuples
