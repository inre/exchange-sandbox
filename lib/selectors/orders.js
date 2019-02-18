const { path, prop, map } = require('ramda')
const { mapTuples } = require('../types/tuple')
const { isBuy, OrderSide } = require('../types/order/side')

const getOrderBookTuple = (order) => [order.price, order.quantity - order.executedQty]

const getOrdersEntity = ({ entities: { orders } }) => orders
const getOrderCreator = ({ entities: { orders: { byId } } }) => orderId => prop(orderId, byId)
const getOrderMarketTuples = ({ entities: { orders: { byMarket } } }, pair, side) => path([pair, (isBuy(side) ? 'byBuyPriceTuples' : 'bySellPriceTuples')], byMarket)
const getOrderBookSide = (state, pair, side) => map(getOrderCreator(state), mapTuples(0, getOrderMarketTuples(state, pair, side)))
const getOrderBookTuples = (state, pair) => ({
  asks: map(getOrderBookTuple, map(getOrderCreator(state), mapTuples(0, getOrderMarketTuples(state, pair, OrderSide.BUY)))),
  bids: map(getOrderBookTuple, map(getOrderCreator(state), mapTuples(0, getOrderMarketTuples(state, pair, OrderSide.SELL))))
})
const getOrder = (state, id) => getOrderCreator(state)(id)
const getOrders = (state, ids) => map(getOrderCreator(state), ids)
const getOrderFromTupleCreator = (state) => orderTuple => getOrder(state, orderTuple[0])
const getOrderFromTuple = (state, orderTuple) => getOrderFromTupleCreator(state)(orderTuple)
const getOrderFromTuplesCreator = state => orderTuples => map(getOrderFromTupleCreator(state), orderTuples)
const getOrderLastId = ({ entities: { orders: { lastId } } }) => lastId

module.exports = {
  getOrdersEntity,
  getOrderMarketTuples,
  getOrderBookTuples,
  getOrderBookSide,
  getOrderCreator,
  getOrder,
  getOrders,
  getOrderFromTuple,
  getOrderFromTuplesCreator,
  getOrderLastId
}
