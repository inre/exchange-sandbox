const { lte, gte, curry } = require('ramda')
const { sliceOrd } = require('../../types/list/ordered-list')
const { isBuy } = require('../../types/order/side')

const mapAppropriateOrders = curry(({ price, side }, orderTuples) => {
  const comp = (isBuy(side)) ? lte : gte
  const appropriateOrderTuples = sliceOrd(comp, price, orderTuples)
  return appropriateOrderTuples
})

module.exports = mapAppropriateOrders
