const { handleActions } = require('redux-actions')
const { services } = require('../utils/actions')
const createLimitOrder = require('./create-limit-order')
const cancelOrder = require('./cancel-order')
const tryFillOrder = require('./try-fill-order')

const serviceReducers = handleActions({
  [services.createLimitOrder]: createLimitOrder,
  [services.cancelOrder]: cancelOrder,
  [services.tryFillOrder]: tryFillOrder
}, {})

module.exports = serviceReducers
