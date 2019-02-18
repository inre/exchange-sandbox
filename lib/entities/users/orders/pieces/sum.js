const round = require('lodash/round')
const { pipe, __ } = require('ramda')
const amendUser = require('../../amend')
const amendUserBalance = require('../../balances/amend')

const sumUserOrderPiece = (entity, order, orderPiece) => {
  const {
    username,
    baseAsset,
    quoteAsset,
    basePrecision,
    quotePrecision
  } = order
  const {
    baseOffset,
    quoteOffset
  } = orderPiece

  const amendFn = pipe(
    amendUserBalance(__, baseAsset, ({ amount }) => ({
      asset: baseAsset,
      amount: round(amount + baseOffset, basePrecision)
    })),
    amendUserBalance(__, quoteAsset, ({ amount }) => ({
      asset: quoteAsset,
      amount: round(amount + quoteOffset, quotePrecision)
    }))
  )

  return amendUser(entity, username, amendFn)
}

module.exports = sumUserOrderPiece
