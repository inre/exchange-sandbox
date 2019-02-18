const { handleActions } = require('redux-actions')
const { orders } = require('../../utils/actions')
const createTrade = require('./create')

const tradesReducer = handleActions({
  [orders.create]: (state, { payload: { pair, side, price, quantity } }) => createTrade(state, pair, side, price, quantity)
  // [orders.perform]: performOrder
}, {
  byId: {},
  allIds: [],
  lastId: '0',
  idAttribute: 'id'
})

module.exports = tradesReducer
