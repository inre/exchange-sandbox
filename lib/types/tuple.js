const { curry, map } = require('ramda')

const getTuple = curry((index, tuple) => tuple[index])
const mapTuples = (index, tuples) => map(getTuple(index), tuples)

module.exports = {
  getTuple,
  mapTuples
}
