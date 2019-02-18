const { curry } = require('ramda')
const { OrderKey } = require('./constants')

const updateOrder = curry((order, orderList) => {
  const key = order[OrderKey]
  return orderList.map((current) => {
    if (current[OrderKey] !== key) {
      return order
    }
    return {
      ...current,
      ...order
    }
  })
})

module.exports = updateOrder
