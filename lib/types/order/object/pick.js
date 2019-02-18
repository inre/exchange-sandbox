const { pick } = require('ramda')
const { OrderProps } = require('./constants')

const pickOrder = pick(OrderProps)

module.exports = pickOrder
