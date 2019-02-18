const { handleActions } = require('redux-actions')
const { orders } = require('../../utils/actions')
const createOrder = require('./create')
// const performOrder = require('./perform')

const ordersReducer = handleActions({
  [orders.create]: (state, { payload: { username, pair, order } }) => createOrder(state, username, pair, order)
  // [orders.perform]: performOrder
}, {
  byId: {},
  byMarket: {},
  lastId: '0',
  idAttribute: 'id'
})

module.exports = ordersReducer
