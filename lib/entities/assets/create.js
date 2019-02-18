const { normalize, schema: { Entity } } = require('normalizr')
const { pick, merge } = require('ramda')
const ActionEntities = require('../../constants/action-entities')
const { ID_ATTRIBUTE, ATTRIBUTES } = require('./constants')

/**
 * ```
 * assets: {
 *   byId: {
 *     'SAND': {
 *       symbol: 'SAND',
 *       name: '`Sand`',
 *       precision: 6
 *     }
 *   },
 *   allIds: ['SAND'],
 *   idAttribute: 'symbol'
 * }
 * ```
 */

const createAssets = (entity, assets) => {
  const schema = [
    new Entity(ActionEntities.ASSETS, undefined, {
      idAttribute: ID_ATTRIBUTE,
      processStrategy: pick(ATTRIBUTES)
    })
  ]
  const { entities } = normalize(assets, schema)
  const assetsById = merge(entity.byId, entities.assets)

  return {
    ...entity,
    byId: assetsById,
    allIds: Object.keys(assetsById),
    idAttribute: ID_ATTRIBUTE
  }
}

module.exports = createAssets
