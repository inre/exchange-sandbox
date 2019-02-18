const sumUserOrderPiece = require('./sum')

const reduceUserOrderPieces = (entity, orderPieceTuples) => {
  return orderPieceTuples.reduce(
    (entity, [piece, order]) => sumUserOrderPiece(entity, order, piece),
    entity
  )
}

module.exports = reduceUserOrderPieces
