const { filter, prop } = require('ramda')
const { isBuy, isSell } = require('../../types/order/side')

const removeOrder = (entity, orderId) => {
  const { byId, byMarket } = entity
  const { pair, side } = prop(orderId, byId)
  const marketHash = byMarket[pair]

  const isNotOrder = ([id, value]) => id !== orderId

  const byBuyPriceTuples = isBuy(side)
    ? filter(isNotOrder, marketHash.byBuyPriceTuples)
    : marketHash.byBuyPriceTuples

  const bySellPriceTuples = isSell(side)
    ? filter(isNotOrder, marketHash.bySellPriceTuples)
    : marketHash.bySellPriceTuples

  return {
    ...entity,
    // byId: omit(orderId, byId),
    byMarket: {
      ...byMarket,
      [pair]: {
        byBuyPriceTuples,
        bySellPriceTuples
      }
    }
  }
}

module.exports = removeOrder
