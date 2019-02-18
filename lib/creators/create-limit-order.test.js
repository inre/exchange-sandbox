const {
  createConfiguredCore,
  initGasSandAssets,
  initGasSandMarket
} = require('../utils/test-helpers')
const createUserCreator = require('./create-user')
const createLimitOrderCreator = require('./create-limit-order')
const { getUserBalance } = require('../selectors/users')
const { getOrderBookSide } = require('../selectors/orders')
const { OrderSide } = require('../types/order/side')

let core

beforeEach(() => {
  core = createConfiguredCore()
  initGasSandAssets(core)
  initGasSandMarket(core)
})

test('create limit order', () => {
  const createUser = createUserCreator(core)

  createUser('user1', { 'SAND': 1 })
  createUser('user2', { 'GAS': 1000 })

  const createLimitOrderUser1 = createLimitOrderCreator(core)('user1')
  const createLimitOrderUser2 = createLimitOrderCreator(core)('user2')
  // test this
  createLimitOrderUser1('GAS/SAND', OrderSide.BUY, 500, 0.001)
  // we can see the order in the order book
  expect(getOrderBookSide(core.getState(), 'GAS/SAND', OrderSide.BUY)[0])
    .toEqual(expect.objectContaining({
      id: '1',
      pair: 'GAS/SAND',
      username: 'user1',
      type: 'LIMIT',
      side: 'BUY',
      price: 0.001,
      executedQty: 0,
      quantity: 500,
      timeInForce: 'GTC',
      status: 'NEW',
      baseAsset: 'GAS',
      quoteAsset: 'SAND',
      baseOffset: 500,
      quoteOffset: -0.5,
      basePrecision: 0,
      quotePrecision: 6
    }))

  createLimitOrderUser1('GAS/SAND', OrderSide.BUY, 500, 0.001)
  expect(getOrderBookSide(core.getState(), 'GAS/SAND', OrderSide.BUY).length).toBe(2)
  createLimitOrderUser2('GAS/SAND', OrderSide.SELL, 1000, 0.001)

  expect(getUserBalance(core.getState(), 'user1', 'SAND')).toEqual(0)
  expect(getUserBalance(core.getState(), 'user1', 'GAS')).toEqual(1000)
  expect(getUserBalance(core.getState(), 'user2', 'SAND')).toEqual(1)
  expect(getUserBalance(core.getState(), 'user2', 'GAS')).toEqual(0)
})

test('not enough balance when buy', () => {
  const createUser = createUserCreator(core)
  createUser('user1', { 'SAND': 1 })

  const createLimitOrderUser1 = createLimitOrderCreator(core)('user1')
  expect(() => {
    createLimitOrderUser1('GAS/SAND', OrderSide.BUY, 20, 2)
  }).toThrow('Not enough quote asset')
})

test('not enough balance when sell', () => {
  const createUser = createUserCreator(core)
  createUser('user1', { 'GAS': 10 })

  const createLimitOrderUser1 = createLimitOrderCreator(core)('user1')
  expect(() => {
    createLimitOrderUser1('GAS/SAND', OrderSide.SELL, 20, 2)
  }).toThrow('Not enough base asset')
})

test('quantity too low', () => {
  const createUser = createUserCreator(core)
  createUser('user1', { 'SAND': 10 })

  const createLimitOrderUser1 = createLimitOrderCreator(core)('user1')
  expect(() => {
    createLimitOrderUser1('GAS/SAND', OrderSide.SELL, 0.1, 1)
  }).toThrow('Quantity too low')
})

test('return order with id', () => {
  const createUser = createUserCreator(core)

  createUser('user1', { 'SAND': 1 })
  createUser('user2', { 'GAS': 1000 })

  const createLimitOrderUser1 = createLimitOrderCreator(core)('user1')
  const createLimitOrderUser2 = createLimitOrderCreator(core)('user2')

  // test this
  const order1 = createLimitOrderUser1('GAS/SAND', OrderSide.BUY, 100, 0.01)
  expect(order1).toEqual(expect.objectContaining({
    id: '1',
    pair: 'GAS/SAND',
    type: 'LIMIT',
    side: 'BUY',
    price: 0.01,
    executedQty: 0,
    quantity: 100,
    timeInForce: 'GTC',
    status: 'NEW'
  }))

  const order2 = createLimitOrderUser2('GAS/SAND', OrderSide.SELL, 100, 0.01)
  expect(order2).toEqual(expect.objectContaining({
    id: '2',
    pair: 'GAS/SAND',
    type: 'LIMIT',
    side: 'SELL',
    price: 0.01,
    executedQty: 100,
    quantity: 100,
    timeInForce: 'GTC',
    status: 'FILLED'
  }))
})
