const { getAsset } = require('../selectors/assets')
const { getMarket } = require('../selectors/markets')
const { getOrderLastId, getOrder } = require('../selectors/orders')
const assertSide = require('../assert/side')
const assertNumber = require('../assert/number')
const assertUsername = require('../assert/username')
const actionCreators = require('../utils/actions')
const createOrderPiece = require('../entities/orders/pieces/create')
const getUserFreeBalance = require('../selectors/user-free-balance')
const { pickOrder } = require('../types/order/object')
const { OrderType } = require('../types/order/type')
const { OrderStatus } = require('../types/order/status')
const { TimeInForce } = require('../types/order/time-in-force')

const createLimitOrder = ({ dispatch, getState }) => (username) => (pair, side, quantity, price) => {
  const state = getState()
  assertUsername(username)
  assertSide(side)
  assertNumber(quantity)
  assertNumber(price)
  if (price === 0) {
    throw new Error('Price cannot be zero')
  }

  const market = getMarket(state, pair)
  if (market.minOrder > quantity) {
    throw new Error('Quantity too low')
  }

  const baseAssetEntity = getAsset(state, market.baseAsset)
  const quoteAssetEntity = getAsset(state, market.quoteAsset)
  const baseAsset = baseAssetEntity.symbol
  const quoteAsset = quoteAssetEntity.symbol

  if (baseAsset === quoteAsset) {
    throw new Error('Assets inconsistency')
  }

  const baseFreeBalance = getUserFreeBalance(state, username, baseAssetEntity)
  const quoteFreeBalance = getUserFreeBalance(state, username, quoteAssetEntity)
  const {
    baseOffset,
    quoteOffset
  } = createOrderPiece(
    side,
    quantity,
    price,
    baseAssetEntity.precision,
    quoteAssetEntity.precision
  )
  const order = {
    type: OrderType.LIMIT,
    side,
    quantity,
    price,
    timeInForce: TimeInForce.GTC,
    status: OrderStatus.NEW,
    baseAsset,
    quoteAsset,
    basePrecision: baseAssetEntity.precision,
    quotePrecision: quoteAssetEntity.precision,
    baseOffset,
    quoteOffset
  }

  if (baseOffset + baseFreeBalance < 0) {
    throw new Error('Not enough base asset')
  }
  if (quoteOffset + quoteFreeBalance < 0) {
    throw new Error('Not enough quote asset')
  }

  dispatch(actionCreators.services.createLimitOrder(username, pair, order))
  // read id from new state
  const id = getOrderLastId(getState())
  dispatch(actionCreators.services.tryFillOrder(id))

  const orderResult = pickOrder(getOrder(getState(), id))
  return orderResult
}

module.exports = createLimitOrder
