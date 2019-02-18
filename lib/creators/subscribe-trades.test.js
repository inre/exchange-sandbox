const {
  createConfiguredCore,
  initGasSandAssets,
  initGasSandMarket,
  initTwoUsers,
  initTwoLimitOrders
} = require('../utils/test-helpers')
const subscribeTradesCreator = require('./subscribe-trades')

test('subscribe trades', done => {
  const core = createConfiguredCore()
  initGasSandAssets(core)
  initGasSandMarket(core)
  initTwoUsers(core)

  const subscribeTrades = subscribeTradesCreator(core)
  const trade$ = subscribeTrades(['GAS/SAND'])
  trade$.subscribe((trade) => {
    expect(trade.length).toBe(1)
    expect(trade[0]).toEqual(expect.objectContaining({
      id: '1',
      pair: 'GAS/SAND',
      side: 'BUY',
      price: 0.001,
      quantity: 100
    }))
    done()
  })
  // place two order one by one
  initTwoLimitOrders(core)
})
