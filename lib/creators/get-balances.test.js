const createUserCreator = require('./create-user')
const {
  createConfiguredCore,
  initGasSandAssets
} = require('../utils/test-helpers')

const getBalances = require('./get-balances')

test('get balances', () => {
  const core = createConfiguredCore()
  initGasSandAssets(core)

  const createUser = createUserCreator(core)
  createUser('user1', { 'SAND': 0.1, 'GAS': 1 })

  const balances = getBalances(core)('user1')

  expect(balances).toEqual([{
    asset: 'SAND',
    free: 0.1,
    locked: 0
  }, {
    asset: 'GAS',
    free: 1,
    locked: 0
  }])
})
