const { map, pipe, prop } = require('ramda')
const assertExist = require('../assert/exist')
const assertPair = require('../assert/pair')
const actionCreators = require('../utils/actions')
const { getMarketsEntity } = require('../selectors/markets')
const { ID_ATTRIBUTE } = require('../entities/markets/constants')
const subscribeTradesCreator = require('./subscribe-trades')

/**
 * Create sandbox markets
 *
 * ```
 * sandbox.createMarkets([
 *   {
 *     pair: 'GAS/SAND',
 *     minOrder: 0.1
 *   }
 * ])
 * ```
 */
const createMarkets = ({ dispatch, getState }) => markets => {
  const marketPairs = map(pipe(prop(ID_ATTRIBUTE), assertPair), markets)
  const pairs = marketPairs.map(prop(ID_ATTRIBUTE))
  assertExist(getMarketsEntity(getState()), marketPairs)
  dispatch(actionCreators.markets.create(markets))

  const subscribeTrades = () => subscribeTradesCreator(pairs)
  return {
    subscribeTrades
  }
}

module.exports = createMarkets
