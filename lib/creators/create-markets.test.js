const createCore = require('../core/create')
const configureCore = require('../core/configure')
const createMarketsCreator = require('./create-markets')
const { getMarketsSymbols } = require('../selectors/markets')

test('create markets', () => {
  const coreStore = configureCore(createCore)
  const createMarkets = createMarketsCreator(coreStore)

  createMarkets([{
    pair: 'GAS/SAND',
    minOrder: 1
  }])

  expect(getMarketsSymbols(coreStore.getState())).toEqual(['GAS/SAND'])
})
