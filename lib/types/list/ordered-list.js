const { insert, append, remove, findIndex, find, curry, slice } = require('ramda')

const insertOrd = curry((comp, [index, weight], list) => {
  const idx = findIndex((el) => !comp(el[1], weight), list)
  return (idx !== -1)
    ? insert(idx, [index, weight], list)
    : append([index, weight], list)
})

const removeOrd = curry((index, count, list) => {
  const idx = findIndex((el) => el[0] === index, list)
  return (idx === -1) ? list : remove(idx, count, list)
})

const findOrd = curry(([index, weight], list) => {
  return find(
    (el) => (!index || el[0] === index) && (!weight || el[1] === weight),
    list
  )
})

const sliceOrd = curry((comp, weight, list) => {
  const idx = findIndex((el) => !comp(el[1], weight), list)
  return (idx !== -1) ? slice(0, idx, list) : list
})

module.exports = {
  insertOrd,
  removeOrd,
  findOrd,
  sliceOrd
}
