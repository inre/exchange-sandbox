const now = require('lodash/now')
const { append } = require('ramda')
const increment = require('../../types/increment')

const createTrade = (entity, pair, side, price, quantity) => {
  const { byId, allIds, lastId, idAttribute } = entity
  const id = increment(lastId)
  const trade = {
    id,
    time: now(),
    pair,
    side,
    price,
    quantity
  }

  return {
    ...entity,
    byId: {
      ...byId,
      [id]: trade
    },
    allIds: append(id, allIds),
    lastId: id,
    idAttribute
  }
}

module.exports = createTrade
