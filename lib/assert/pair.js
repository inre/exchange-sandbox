const assertAsset = require('./asset')
const { PAIR_SEPARATOR } = require('../entities/markets/constants')

function assertPair (pair) {
  if (typeof pair !== 'string') {
    throw new Error('Pair is invalid')
  }
  const assets = pair.split(PAIR_SEPARATOR)
  if (assets.length !== 2) {
    throw new Error('Pair is invalid')
  }
  try {
    assets.forEach((assertAsset))
  } catch (err) {
    throw new Error('Pair is invalid')
  }
  return pair
}

module.exports = assertPair
