const { prop } = require('ramda')

const getAssetsEntity = ({ entities: { assets } }) => assets
const getAssetsSymbols = ({ entities: { assets: { allIds } } }) => allIds
const hasAssetCreator = ({ entities: { assets: { byId } } }) => (symbol) => byId.hasOwnProperty(symbol)
const getAssetCreator = ({ entities: { assets: { byId } } }) => (symbol) => prop(symbol, byId)
const getAsset = (state, symbol) => getAssetCreator(state)(symbol)
const hasAsset = (state, symbol) => hasAssetCreator(state)(symbol)

module.exports = {
  getAssetsEntity,
  getAssetsSymbols,
  hasAssetCreator,
  getAsset,
  hasAsset
}
