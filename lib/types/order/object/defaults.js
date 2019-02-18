const { merge } = require('ramda')
const { OrderType } = require('../order-type')
const { TimeInForce } = require('../time-in-force')

const defaultsOrder = merge({
  'type': OrderType.LIMIT,
  'timeInForce': TimeInForce.GTC
})

module.exports = defaultsOrder
