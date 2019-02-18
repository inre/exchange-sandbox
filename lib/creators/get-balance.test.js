const createUserCreator = require('./create-user')
const createLimitOrderCreator = require('./create-limit-order')
const {
  createConfiguredCore,
  initGasSandAssets,
  initGasSandMarket
} = require('../utils/test-helpers')
const { OrderSide } = require('../types/order/side')

const getBalance = require('./get-balance')

test('get balance', () => {
  const core = createConfiguredCore()
  initGasSandAssets(core)

  const createUser = createUserCreator(core)
  createUser('user1', { 'SAND': 0.1 })

  const balance = getBalance(core)('user1')('SAND')

  expect(balance)
    .toEqual({
      asset: 'SAND',
      locked: 0,
      free: 0.1
    })
})

test('should locked an amount', () => {
  const core = createConfiguredCore()
  initGasSandAssets(core)
  initGasSandMarket(core)

  const createUser = createUserCreator(core)
  createUser('user1', { 'SAND': 1 })
  const createLimitOrder = createLimitOrderCreator(core)('user1')
  createLimitOrder('GAS/SAND', OrderSide.BUY, 100, 0.002)

  const balance = getBalance(core)('user1')('SAND')
  expect(balance).toEqual({asset: 'SAND', 'free': 0.8, 'locked': 0.2})
})
