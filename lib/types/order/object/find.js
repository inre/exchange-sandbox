const { curry, findIndex, propEq } = require('ramda')
const { OrderKey } = require('./constants')

const findOrder = (order, orderList) => curry(
  findIndex(
    propEq(OrderKey, order[OrderKey])
  )(orderList)
)

module.exports = findOrder
