const { path, pipe, prop } = require('ramda')
const { getAssetCreator } = require('./assets')

const getMarketsEntity = ({ entities: { markets } }) => markets
const getMarketsSymbols = ({ entities: { markets: { allIds } } }) => allIds
const getMarket = (state, pair) => pipe(getMarketsEntity, path(['byId', pair]))(state)
const getMarketBaseAsset = (state, pair) => pipe(getMarket, prop('baseAsset'), getAssetCreator(state))(state, pair)
const getMarketQuoteAsset = (state, pair) => pipe(getMarket, prop('quoteAsset'), getAssetCreator(state))(state, pair)

module.exports = {
  getMarketsEntity,
  getMarketsSymbols,
  getMarket,
  getMarketBaseAsset,
  getMarketQuoteAsset
}
