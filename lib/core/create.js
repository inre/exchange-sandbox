const { createStore } = require('redux')
const ActionMethods = require('../constants/action-methods')

function createCore (reducer, enhancer) {
  const store = createStore(reducer)
  store.dispatch({ type: ActionMethods.INIT })
  return store
}

module.exports = createCore
