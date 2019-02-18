const { curry } = require('ramda')

const ammedOrder = (entity, id, fns) => {
  return {
    ...entity,
    byId: {
      ...entity.byId,
      [id]: fns(entity.byId[id])
    }
  }
}

module.exports = curry(ammedOrder)
