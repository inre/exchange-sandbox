const round = require('lodash/round')
const { getUserBalance } = require('./users')
const getUserLockedBalance = require('./user-locked-balance')

const getUserFreeBalance = (state, username, { symbol, precision }) => {
  const total = getUserBalance(state, username, symbol)
  const locked = getUserLockedBalance(state, username, { symbol, precision })
  return round(total - locked, precision)
}

module.exports = getUserFreeBalance
