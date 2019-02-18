const { reverseOrderSide } = require('../types/order/side')
const { getOrder, getOrderMarketTuples } = require('../selectors/orders')
const createOrderPieceTuples = require('./fns/create-order-piece-tuples')
const redeemFilledOrders = require('./fns/redeem-filled-orders')
const executeOrderPieceTuples = require('../entities/orders/pieces/execute-tuples')
const reduceUserOrderPieces = require('../entities/users/orders/pieces/reduce')
const createTradesOrderPieces = require('../entities/trades/orders/pieces/create')
const mapOrderIdsFromPieceTuples = require('./fns/map-order-ids-from-piece-tuples')
const createSourcePieceTuple = require('./fns/create-source-piece-tuple')

// Without any optimizations
const tryFillOrder = (state, { payload: { id } }) => {
  const { entities } = state
  const sourceOrder = getOrder(state, id)
  const { side, pair } = sourceOrder

  const oppositeSide = reverseOrderSide(side)
  const orderTuples = getOrderMarketTuples(state, pair, oppositeSide)

  const orderPieceTuples = createOrderPieceTuples(state, id, orderTuples)
  // Nothing to fill with the order
  if (orderPieceTuples.length === 0) {
    return state
  }
  // Don't forget about the source order
  const sourcePieceTuple = createSourcePieceTuple(sourceOrder, orderPieceTuples)
  const allOrderPieceTuples = [sourcePieceTuple, ...orderPieceTuples]
  // update orders
  const orders = executeOrderPieceTuples(entities.orders, allOrderPieceTuples)
  // update user accounts
  const users = reduceUserOrderPieces(entities.users, allOrderPieceTuples)
  // create trades
  const trades = createTradesOrderPieces(entities.trades, orderPieceTuples)

  const intermediateState = {
    ...state,
    entities: {
      ...entities,
      orders,
      users,
      trades
    }
  }
  const affectedOrderIds = mapOrderIdsFromPieceTuples(allOrderPieceTuples)
  // redeem all filled orders
  const finalState = redeemFilledOrders(intermediateState, affectedOrderIds)

  return finalState
}

module.exports = tryFillOrder
