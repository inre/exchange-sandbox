const createLimitOrderCreator = require('./create-limit-order')
const { OrderSide } = require('../types/order/side')
const {
  createConfiguredCore,
  initGasSandAssets,
  initGasSandMarket,
  initTwoUsers
} = require('../utils/test-helpers')
const getActiveOrdersCreator = require('./get-active-orders')

test('get order', () => {
  const core = createConfiguredCore()
  initGasSandAssets(core)
  initGasSandMarket(core)
  initTwoUsers(core)

  const createLimitOrderUser1 = createLimitOrderCreator(core)('user1')
  createLimitOrderUser1('GAS/SAND', OrderSide.BUY, 100, 0.0005)
  createLimitOrderUser1('GAS/SAND', OrderSide.BUY, 100, 0.0003)
  createLimitOrderUser1('GAS/SAND', OrderSide.BUY, 100, 0.0002)

  const getActiveOrders = getActiveOrdersCreator(core)
  const orders = getActiveOrders('user1')

  expect(orders).toEqual([expect.objectContaining({
    id: '1',
    side: 'BUY',
    type: 'LIMIT',
    pair: 'GAS/SAND',
    price: 0.0005,
    executedQty: 0,
    quantity: 100,
    timeInForce: 'GTC',
    status: 'NEW'
  }), expect.objectContaining({
    id: '2',
    side: 'BUY',
    type: 'LIMIT',
    pair: 'GAS/SAND',
    price: 0.0003,
    executedQty: 0,
    quantity: 100,
    timeInForce: 'GTC',
    status: 'NEW'
  }), expect.objectContaining({
    id: '3',
    side: 'BUY',
    type: 'LIMIT',
    pair: 'GAS/SAND',
    price: 0.0002,
    executedQty: 0,
    quantity: 100,
    timeInForce: 'GTC',
    status: 'NEW'
  })])
})
