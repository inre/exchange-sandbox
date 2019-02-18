const { mapTuples } = require('../../types/tuple')
const sumOrderPieces = require('../../entities/orders/pieces/sum')
const createOrderPiece = require('../../entities/orders/pieces/create')

const createSourcePieceTuple = (sourceOrder, orderPieceTuples) => {
  const { side, price, basePrecision, quotePrecision } = sourceOrder
  const sourcePieceReversed = sumOrderPieces(sourceOrder, mapTuples(0, orderPieceTuples))
  return [
    createOrderPiece(side, sourcePieceReversed.quantity, price, basePrecision, quotePrecision),
    sourceOrder
  ]
}

module.exports = createSourcePieceTuple
