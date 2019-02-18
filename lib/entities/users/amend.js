const { curry } = require('ramda')

const ammedUser = (entity, username, fn) => ({
  ...entity,
  byId: {
    ...entity.byId,
    [username]: fn(entity.byId[username])
  }
})

module.exports = curry(ammedUser)
