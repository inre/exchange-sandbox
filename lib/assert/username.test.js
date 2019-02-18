const assertUsername = require('./username')

test('valid usernames', () => {
  expect(() => {
    assertUsername('user1')
    assertUsername('user#1')
    assertUsername('user-1')
    assertUsername('__user__')
    assertUsername('123')
  }).not.toThrow()
})

test('invalid usernames', () => {
  expect(() => { assertUsername('@#$') }).toThrow()
  expect(() => { assertUsername('user$') }).toThrow()
  expect(() => { assertUsername('***user') }).toThrow()
  expect(() => { assertUsername('uuuuuuuuuuuuuuuuuuuu') }).toThrow()
  expect(() => { assertUsername(123) }).toThrow()
})
