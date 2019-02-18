const { map, pipe, prop } = require('ramda')
const assertExist = require('../assert/exist')
const assertAsset = require('../assert/asset')
const actionCreators = require('../utils/actions')
const { getAssetsEntity } = require('../selectors/assets')
const { ID_ATTRIBUTE } = require('../entities/assets/constants')

/**
 * ```
 * [
 *   {
 *     name: 'Sand',
 *     symbol: 'SAND',
 *     precision: 6
 *   }
 * ]
 * ```
 */
const createAssetsCreator = ({ dispatch, getState }) => (assets) => {
  const assetsSymbols = map(pipe(prop(ID_ATTRIBUTE), assertAsset), assets)
  assertExist(getAssetsEntity(getState()), assetsSymbols)

  dispatch(actionCreators.assets.create(assets))
}

module.exports = createAssetsCreator
