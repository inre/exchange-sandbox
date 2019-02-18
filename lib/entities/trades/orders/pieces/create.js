const createTrade = require('../../create')

const createTradesOrderPieces = (entity, orderPieceTuples) => {
  return orderPieceTuples.reduce((entity, [piece, order]) => {
    return createTrade(entity, order.pair, order.side, order.price, piece.quantity)
  }, entity)
}

module.exports = createTradesOrderPieces
