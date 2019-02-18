const createCore = require('../core/create')
const configureCore = require('../core/configure')
const createAssetsCreator = require('./create-assets')
const createUserCreator = require('./create-user')
const { getUserBalance } = require('../selectors/users')

test('create user', () => {
  const coreStore = configureCore(createCore)
  const createUser = createUserCreator(coreStore)
  const createAssets = createAssetsCreator(coreStore)

  createAssets([{
    name: 'Sand',
    symbol: 'SAND',
    precision: 6
  }, {
    name: 'Gas',
    symbol: 'GAS',
    precision: 0
  }])

  createUser('user1', {
    'SAND': 0.1
  })

  createUser('user2', {
    'GAS': 1000
  })

  expect(getUserBalance(coreStore.getState(), 'user1', 'SAND')).toBe(0.1)
  expect(getUserBalance(coreStore.getState(), 'user2', 'GAS')).toBe(1000)
})
