const round = require('lodash/round')
const getUserLockedBalance = require('../selectors/user-locked-balance')
const { getUserBalance } = require('../selectors/users')
const { getAsset } = require('../selectors/assets')

const getBalance = ({ getState }) => username => asset => {
  const state = getState()
  const { symbol, precision } = getAsset(state, asset)
  const amount = getUserBalance(state, username, symbol)
  const locked = getUserLockedBalance(state, username, { symbol, precision })

  return {
    asset,
    locked,
    free: round(amount - locked, precision)
  }
}

module.exports = getBalance
