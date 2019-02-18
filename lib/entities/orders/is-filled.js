const { OrderStatus } = require('../../types/order/status')

const isFilled = ({ status }) => status === OrderStatus.FILLED

module.exports = isFilled
