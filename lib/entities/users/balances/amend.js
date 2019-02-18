const { curry } = require('ramda')

const amendUserBalance = (user, asset, fn) => ({
  ...user,
  balances: {
    ...user.balances,
    [asset]: fn(user.balances[asset] || { asset, amount: 0 })
  }
})

module.exports = curry(amendUserBalance)
