const { createActions } = require('redux-actions')
const ActionEntities = require('../constants/action-entities')
const ActionMethods = require('../constants/action-methods')

const actionCreators = createActions({
  [ActionEntities.ASSETS]: {
    [ActionMethods.CREATE]: (assets) => ({ assets })
  },
  [ActionEntities.MARKETS]: {
    [ActionMethods.CREATE]: (markets) => ({ markets })
  },
  [ActionEntities.USERS]: {
    [ActionMethods.CREATE]: (username, balances) => ({ username, balances }),
    [ActionMethods.ADD]: {
      [ActionEntities.ORDER]: (username, pair, order) => ({username, pair, order})
    }
  },
  [ActionEntities.ORDERS]: {
    [ActionMethods.CREATE]: (username, pair, order) => ({username, pair, order})
  },
  'SERVICES': {
    'CREATE_LIMIT_ORDER': (username, pair, order) => ({username, pair, order}),
    'CANCEL_ORDER': (username, orderId) => ({username, orderId}),
    'TRY_FILL_ORDER': (id) => ({ id })
  }
})

module.exports = actionCreators
