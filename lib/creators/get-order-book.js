const { getOrderBookTuples } = require('../selectors/orders')

const getOrderBook = ({ getState }) => pair => {
  const state = getState()
  const orderBook = getOrderBookTuples(state, pair)
  return orderBook
}

module.exports = getOrderBook
