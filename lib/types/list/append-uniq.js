const { curry } = require('ramda')

const appendUniq = (item, array) => {
  return (array.includes(item)) ? array : [...array, item]
}

module.exports = curry(appendUniq)
