const { normalize, schema: { Entity } } = require('normalizr')
const { merge } = require('ramda')
const ActionEntities = require('../../constants/action-entities')
const { ID_ATTRIBUTE, PAIR_SEPARATOR } = require('./constants')

const pickAttributes = ({ pair, minOrder }) => {
  const [baseAsset, quoteAsset] = pair.split(PAIR_SEPARATOR)
  return {
    pair,
    minOrder,
    baseAsset,
    quoteAsset
  }
}

/**
 * ```
 * markets: {
 *   byId: {
 *     'GAS/SAND': {
 *       pair: 'GAS/SAND',
 *       baseAsset: 'SAND',
 *       quoteAsset: 'GAS',
 *       minOrder: 0.1
 *     }
 *   },
 *   allIds: ['GAS/SAND'],
 *   idAttribute: 'pair'
 * }
 * ```
 */

const createMarkets = (entity, markets) => {
  const schema = [
    new Entity(ActionEntities.MARKETS, undefined, {
      idAttribute: ID_ATTRIBUTE,
      processStrategy: pickAttributes
    })
  ]
  const { entities } = normalize(markets, schema)
  const marketsById = merge(entity.byId, entities.markets)

  return {
    ...entity,
    byId: marketsById,
    allIds: Object.keys(marketsById),
    idAttribute: ID_ATTRIBUTE
  }
}

module.exports = createMarkets
