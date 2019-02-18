const { handleActions } = require('redux-actions')
const { users } = require('../../utils/actions')
const createUser = require('./create')
const { ID_ATTRIBUTE } = require('./constants')

const usersReducer = handleActions({
  [users.create]: (state, { payload: { username, balances } }) => createUser(state, username, balances)
}, {
  byId: {},
  allIds: [],
  idAttribute: ID_ATTRIBUTE
})

module.exports = usersReducer
