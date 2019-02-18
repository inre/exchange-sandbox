const { curry, filter } = require('ramda')
const { OrderKey } = require('./constants')

const removeOrder = (order, orderList) => curry(filter(order[OrderKey], orderList))

module.exports = removeOrder
