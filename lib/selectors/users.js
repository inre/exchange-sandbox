const { path, pipe, prop, map, keys, contains } = require('ramda')
const { getOrderCreator } = require('./orders')

const getUsersEntity = ({ entities: { users } }) => users
const getUser = (state, username) => pipe(getUsersEntity, path(['byId', username]))(state)
const getUserBalance = (state, username, asset) => path(['entities', 'users', 'byId', username, 'balances', asset, 'amount'], state) || 0
const getUserAssets = (state, username) => keys(path(['entities', 'users', 'byId', username, 'balances'], state))
const getUserOrders = (state, username) => map(getOrderCreator(state), prop('orderIds', getUser(state, username)))
const hasUserOrder = (state, username, orderId) => contains(orderId, prop('orderIds', getUser(state, username)))

module.exports = {
  getUser,
  getUserBalance,
  getUserAssets,
  getUserOrders,
  hasUserOrder
}
