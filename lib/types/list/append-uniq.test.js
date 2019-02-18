const appendUniq = require('./append-uniq')

test('append item', () => {
  expect(appendUniq(3, [1, 2])).toEqual([1, 2, 3])
})

test('append dublicate item', () => {
  expect(appendUniq(2, [1, 2])).toEqual([1, 2])
})
