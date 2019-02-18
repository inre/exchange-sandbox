const createLimitOrderCreator = require('./create-limit-order')
const { OrderSide } = require('../types/order/side')
const {
  createConfiguredCore,
  initGasSandAssets,
  initGasSandMarket,
  initTwoUsers
} = require('../utils/test-helpers')
const cancelOrderCreator = require('./cancel-order')
const getBalance = require('./get-balance')

test('cancel order', () => {
  const core = createConfiguredCore()
  initGasSandAssets(core)
  initGasSandMarket(core)
  initTwoUsers(core)

  const createLimitOrderUser1 = createLimitOrderCreator(core)('user1')
  const { id } = createLimitOrderUser1('GAS/SAND', OrderSide.BUY, 100, 0.001)

  expect(getBalance(core)('user1')('SAND'))
    .toEqual({asset: 'SAND', 'free': 0, 'locked': 0.1})

  const cancelOrder = cancelOrderCreator(core)('user1')
  const resultOrder = cancelOrder(id)

  expect(resultOrder).toEqual(expect.objectContaining({
    id: '1',
    pair: 'GAS/SAND',
    type: 'LIMIT',
    side: 'BUY',
    price: 0.001,
    executedQty: 0,
    quantity: 100,
    timeInForce: 'GTC',
    status: 'CANCELED'
  }))

  expect(getBalance(core)('user1')('SAND'))
    .toEqual({asset: 'SAND', 'free': 0.1, 'locked': 0})
})
