const { identity, indexBy, map, pipe, path } = require('ramda')

const getCapabilities = ({ getState }) => {
  const { entities } = getState()
  const assetsBySymbols = entities.assets.byId

  const marketPairs = pipe(
    map(({pair, baseAsset, quoteAsset}) => ({
      pair,
      baseAsset,
      quoteAsset,
      basePrecision: path([baseAsset, 'precision'], assetsBySymbols),
      quotePrecision: path([quoteAsset, 'precision'], assetsBySymbols)
    }))
  )(entities.markets.byId)
  const marketSymbols = indexBy(identity, entities.markets.allIds)
  const marketLimits = pipe(
    map(({pair, minOrder}) => ({
      pair,
      minOrder
    }))
  )(entities.markets.byId)

  return {
    title: 'Sandbox',
    slug: 'sandbox',
    website: 'http://botee.co',
    entities: {
      marketPairs,
      marketSymbols,
      marketLimits
    }
  }
}

module.exports = getCapabilities
