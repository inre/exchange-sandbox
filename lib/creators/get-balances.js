const getBalanceCreator = require('./get-balance')
const { getUserAssets } = require('../selectors/users')

const getBalances = store => (username) => {
  const state = store.getState()
  const getBalance = getBalanceCreator(store)(username)
  const assets = getUserAssets(state, username)
  return assets.map(getBalance)
}

module.exports = getBalances
