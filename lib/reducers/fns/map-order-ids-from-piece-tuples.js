const { map, prop } = require('ramda')
const { mapTuples } = require('../../types/tuple')

const mapOrderIdsFromPieceTuples = (orderPieceTuples) => {
  return map(prop('id'), mapTuples(1, orderPieceTuples))
}

module.exports = mapOrderIdsFromPieceTuples
