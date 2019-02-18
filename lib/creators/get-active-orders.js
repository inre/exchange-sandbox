const { map } = require('ramda')
const { pickOrder } = require('../types/order/object')
const { getUserOrders } = require('../selectors/users')

const getActiveOrders = ({ getState }) => username => {
  const state = getState()
  const orders = getUserOrders(state, username)
  return map(pickOrder, orders)
}

module.exports = getActiveOrders
