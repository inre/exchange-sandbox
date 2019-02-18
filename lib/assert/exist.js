const { curry } = require('ramda')

function exist (table, key) {
  if (table.hasOwnProperty(key)) {
    throw new Error('Already exist')
  }
}

module.exports = curry(exist)
