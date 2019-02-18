const { handleActions } = require('redux-actions')
const { markets } = require('../../utils/actions')
const createMarkets = require('./create')

const marketsReducer = handleActions({
  [markets.create]: (state, { payload: { markets } }) => createMarkets(state, markets)
}, {})

module.exports = marketsReducer
