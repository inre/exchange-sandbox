const { pipe, gt, lt, lte } = require('ramda')
const {
  insertOrd,
  removeOrd,
  findOrd,
  sliceOrd
} = require('./ordered-list')

test('insert into ordered list (ascending list)', () => {
  const insertOrdAsc = insertOrd(lt)
  let list = pipe(
    insertOrdAsc([1, 10]),
    insertOrdAsc([2, 20]),
    insertOrdAsc([3, 5]),
    insertOrdAsc([4, 30]),
    insertOrdAsc([5, 1])
  )([])

  expect(list).toEqual([[5, 1], [3, 5], [1, 10], [2, 20], [4, 30]])
})

test('insert into ordered list (descending list)', () => {
  const insertOrdDesc = insertOrd(gt)

  let list = pipe(
    insertOrdDesc([1, 10]),
    insertOrdDesc([2, 20]),
    insertOrdDesc([3, 5]),
    insertOrdDesc([4, 30]),
    insertOrdDesc([5, 1])
  )([])

  expect(list).toEqual([[4, 30], [2, 20], [1, 10], [3, 5], [5, 1]])
})

test('remove by index', () => {
  const list = removeOrd(2, 1, [[1, 1], [2, 5], [3, 10]])
  expect(list).toEqual([[1, 1], [3, 10]])
})

test('remove nothing', () => {
  const list = removeOrd(2, 1, [[1, 2]])
  expect(list).toEqual([[1, 2]])
})

test('find tuple', () => {
  const tuple = findOrd([2, undefined], [[1, 1], [2, 5], [3, 10]])
  expect(tuple).toEqual([2, 5])
})

test('slice by weight', () => {
  const slice = sliceOrd(lte, 5, [[1, 1], [2, 5], [3, 10]])
  expect(slice).toEqual([[1, 1], [2, 5]])
})
