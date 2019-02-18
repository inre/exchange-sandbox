const { OrderSide } = require('./constants')

const isBuy = (side) => side === OrderSide.BUY

module.exports = isBuy
