const amendOrder = require('../amend')
const executeOrderPiece = require('./execute')

const executeOrderPieceTuples = (entity, orderPieceTuples) => {
  return orderPieceTuples.reduce(
    (entity, [piece, order]) => {
      return amendOrder(entity, order.id, (order) => executeOrderPiece(order, piece))
    },
    entity
  )
}

module.exports = executeOrderPieceTuples
