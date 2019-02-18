const sumOrderOffsets = require('../entities/orders/sum-offsets')
const { getUserOrders } = require('./users')

const getUserLockedBalance = (state, username, asset) => {
  return sumOrderOffsets(getUserOrders(state, username), asset)
}

module.exports = getUserLockedBalance
