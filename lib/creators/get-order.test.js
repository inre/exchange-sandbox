const createLimitOrderCreator = require('./create-limit-order')
const { OrderSide } = require('../types/order/side')
const {
  createConfiguredCore,
  initGasSandAssets,
  initGasSandMarket,
  initTwoUsers
} = require('../utils/test-helpers')
const getOrderCreator = require('./get-order')

test('get order', () => {
  const core = createConfiguredCore()
  initGasSandAssets(core)
  initGasSandMarket(core)
  initTwoUsers(core)

  const createLimitOrderUser1 = createLimitOrderCreator(core)('user1')
  const { id } = createLimitOrderUser1('GAS/SAND', OrderSide.BUY, 100, 0.001)

  const getOrder = getOrderCreator(core)('user1')
  const order = getOrder(id)

  expect(order).toEqual(expect.objectContaining({
    id: '1',
    pair: 'GAS/SAND',
    type: 'LIMIT',
    side: 'BUY',
    price: 0.001,
    executedQty: 0,
    quantity: 100,
    timeInForce: 'GTC',
    status: 'NEW'
  }))
})
