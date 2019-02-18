const createLimitOrderCreator = require('./create-limit-order')
const { OrderSide } = require('../types/order/side')
const {
  createConfiguredCore,
  initGasSandAssets,
  initGasSandMarket,
  initTwoUsers
} = require('../utils/test-helpers')
const getOrderBookCreator = require('./get-order-book')

test('get order', () => {
  const core = createConfiguredCore()
  initGasSandAssets(core)
  initGasSandMarket(core)
  initTwoUsers(core)

  const createLimitOrderUser1 = createLimitOrderCreator(core)('user1')
  createLimitOrderUser1('GAS/SAND', OrderSide.BUY, 100, 0.0005)
  createLimitOrderUser1('GAS/SAND', OrderSide.BUY, 100, 0.0003)
  const createLimitOrderUser2 = createLimitOrderCreator(core)('user2')
  createLimitOrderUser2('GAS/SAND', OrderSide.SELL, 100, 0.0006)

  const getOrderBook = getOrderBookCreator(core)
  const orderBook = getOrderBook('GAS/SAND')

  expect(orderBook).toEqual({
    asks: [
      [0.0005, 100],
      [0.0003, 100]
    ],
    bids: [
      [0.0006, 100]
    ]
  })
})
