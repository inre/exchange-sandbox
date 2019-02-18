const createCore = require('./create')
const ActionMethods = require('../constants/action-methods')

test('get state', () => {
  const reducer = (state, action = {}) => ({
    ...state,
    ...action
  })
  const core = createCore(reducer)
  expect(core.getState()).toEqual({ type: ActionMethods.INIT })
})

test('subscribe', done => {
  const reducer = (state, action = {}) => ({
    ...state,
    ...action
  })
  const core = createCore(reducer)
  core.subscribe(() => {
    expect(core.getState()).toEqual({ type: ActionMethods.TEST })
    done()
  })
  core.dispatch({ type: ActionMethods.TEST })
})
