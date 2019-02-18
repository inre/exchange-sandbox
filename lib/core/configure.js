const entitiesReducer = require('../entities/reducer')
const serviceReducers = require('../reducers')
const { combineReducers } = require('redux')
const reduceReducers = require('reduce-reducers')

function configureCore (createCore) {
  const splitReducers = combineReducers({
    entities: entitiesReducer
  })
  const mainReducer = reduceReducers(serviceReducers, splitReducers)
  const core = createCore(mainReducer)
  return core
}

module.exports = configureCore
