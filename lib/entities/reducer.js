const { combineReducers } = require('redux')
const assetsReducer = require('./assets/reducer')
const marketsReducer = require('./markets/reducer')
const usersReducer = require('./users/reducer')
const ordersReducer = require('./orders/reducer')
const tradesReducer = require('./trades/reducer')

const entitiesReducer = combineReducers({
  assets: assetsReducer,
  markets: marketsReducer,
  users: usersReducer,
  orders: ordersReducer,
  trades: tradesReducer
})

module.exports = entitiesReducer
