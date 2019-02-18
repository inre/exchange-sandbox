const { without } = require('ramda')
const amendUser = require('../amend')

const removeUserOrder = (entity, username, orderId) => amendUser(entity, username, (user) => ({
  ...user,
  orderIds: without([orderId], user.orderIds)
}))

module.exports = removeUserOrder
