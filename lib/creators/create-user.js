const { pipe, all } = require('ramda')
const assertUsername = require('../assert/username')
const assertAsset = require('../assert/asset')
const actionCreators = require('../utils/actions')
const { hasAssetCreator } = require('../selectors/assets')
const createLimitOrderCreator = require('./create-limit-order')
const cancelOrderCreator = require('./cancel-order')
const getBalancesCreator = require('./get-balances')
const getBalanceCreator = require('./get-balance')
const getOrderCreator = require('./get-order')
const getActiveOrdersCreator = require('./get-active-orders')

const createUser = store => (username, balances = {}) => {
  const { dispatch, getState } = store
  assertUsername(username)

  const state = getState()
  const hasAsset = hasAssetCreator(state)
  if (!all(pipe(assertAsset, hasAsset), Object.keys(balances))) {
    throw new Error('Balance has invalid asset')
  }
  dispatch(actionCreators.users.create(username, balances))

  const createLimitOrder = createLimitOrderCreator(store)(username)
  const cancelOrder = cancelOrderCreator(store)(username)
  const getBalances = () => getBalancesCreator(store)(username)
  const getBalance = getBalanceCreator(store)(username)
  const getOrder = getOrderCreator(store)(username)
  const getActiveOrders = () => getActiveOrdersCreator(store)(username)

  return {
    createLimitOrder,
    cancelOrder,
    getBalances,
    getBalance,
    getOrder,
    getActiveOrders
  }
}

module.exports = createUser
