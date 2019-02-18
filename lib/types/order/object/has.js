const { curry, any, propEq } = require('ramda')
const { OrderKey } = require('./constants')

const hasOrder = curry((order, orderList) => {
  return any(propEq(OrderKey, order))
})

module.exports = hasOrder
