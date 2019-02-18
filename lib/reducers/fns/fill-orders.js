const { curry } = require('ramda')
const isFilled = require('../../entities/orders/is-filled')
const fillOrderPiece = require('../../entities/orders/pieces/fill')
const executeOrderPiece = require('../../entities/orders/pieces/execute')

const fillOrders = curry((sourceOrder, targetOrders) => {
  let order = sourceOrder
  let orderPieceTuples = []
  let index = 0
  while (!isFilled(order) && (index < targetOrders.length)) {
    const piece = fillOrderPiece(order, targetOrders[index])
    order = executeOrderPiece(order, piece)
    orderPieceTuples.push([piece, targetOrders[index]])
    index++
  }
  return orderPieceTuples
})

module.exports = fillOrders
