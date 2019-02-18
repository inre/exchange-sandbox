const { OrderSide } = require('./constants')

const isSell = (side) => side === OrderSide.SELL

module.exports = isSell
