const { gt, lt } = require('ramda')
const { OrderSide } = require('../../types/order/side')
const { insertOrd } = require('../../types/list/ordered-list')
const increment = require('../../types/increment')

const createOrder = (entity, username, pair, inOrder) => {
  const {
    type,
    side,
    quantity,
    price,
    timeInForce,
    status,
    baseAsset,
    quoteAsset,
    baseOffset,
    quoteOffset,
    basePrecision,
    quotePrecision
  } = inOrder
  const { byId, byMarket, lastId, idAttribute } = entity
  const id = increment(lastId)
  const time = Date.now()
  const order = {
    id,
    username,
    pair,
    type,
    side,
    executedQty: 0,
    quantity: quantity,
    price,
    timeInForce,
    status,
    baseAsset,
    quoteAsset,
    baseOffset,
    quoteOffset,
    basePrecision,
    quotePrecision,
    time
  }
  const ascInsertOrd = insertOrd(gt)
  const descInsertOrd = insertOrd(lt)
  const byMarketHash = byMarket[pair] || { byBuyPriceTuples: [], bySellPriceTuples: [] }

  const byBuyPriceTuples = (side === OrderSide.BUY)
    ? ascInsertOrd([order.id, order.price], byMarketHash.byBuyPriceTuples)
    : byMarketHash.byBuyPriceTuples

  const bySellPriceTuples = (side === OrderSide.SELL)
    ? descInsertOrd([order.id, order.price], byMarketHash.bySellPriceTuples)
    : byMarketHash.bySellPriceTuples

  return {
    ...entity,
    byId: {
      ...byId,
      [id]: order
    },
    byMarket: {
      ...byMarket,
      [pair]: {
        byBuyPriceTuples,
        bySellPriceTuples
      }
    },
    lastId: id,
    idAttribute
  }
}

module.exports = createOrder
