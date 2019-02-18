const { handleActions } = require('redux-actions')
const { assets } = require('../../utils/actions')
const createAssets = require('./create')

const assetsReducer = handleActions({
  [assets.create]: (state, { payload: { assets } }) => createAssets(state, assets)
}, {})

module.exports = assetsReducer
