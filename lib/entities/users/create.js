const { pipe, toPairs, map, indexBy, prop } = require('ramda')

/**
 * ```
 * users: {
 *   byId: {
 *     'username': {
 *       username: 'user1',
 *       balances: {
 *         'BTC': {
 *           asset: 'BTC',
 *           amount: 1.1
 *       },
 *       orderIds: [1, 2, 3]
 *     }
 *   },
 *   allIds: ['user1'],
 *   idAttribute: 'username'
 * }
 * ```
 */

const createUser = (entity, username, initialBalances = {}) => {
  const { idAttribute, byId } = entity
  const balances = pipe(
    toPairs,
    map(([asset, amount]) => ({ asset, amount })),
    indexBy(prop('asset'))
  )(initialBalances)

  const assetsById = {
    ...byId,
    [username]: {
      username,
      balances,
      orderIds: []
    }
  }

  return {
    ...entity,
    byId: assetsById,
    allIds: Object.keys(assetsById),
    idAttribute
  }
}

module.exports = createUser
