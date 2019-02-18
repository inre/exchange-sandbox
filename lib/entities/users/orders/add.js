const appendUniq = require('../../../types/list/append-uniq')
const amendUser = require('../amend')

const addUserOrder = (entity, username, orderId) => amendUser(entity, username, (user) => ({
  ...user,
  orderIds: appendUniq(orderId, user.orderIds)
}))

module.exports = addUserOrder
