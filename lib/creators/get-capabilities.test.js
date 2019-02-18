const {
  createConfiguredCore,
  initGasSandAssets,
  initGasSandMarket
} = require('../utils/test-helpers')
const getCapabilities = require('./get-capabilities')

test('get capabilities', () => {
  const core = createConfiguredCore()
  initGasSandAssets(core)
  initGasSandMarket(core)

  const capabilities = getCapabilities(core)
  expect(capabilities).toEqual({
    entities: {
      marketLimits: {
        'GAS/SAND': {
          minOrder: 1,
          pair: 'GAS/SAND'
        }
      },
      marketPairs: {
        'GAS/SAND': {
          baseAsset: 'GAS',
          basePrecision: 0,
          pair: 'GAS/SAND',
          quoteAsset: 'SAND',
          quotePrecision: 6
        }
      },
      marketSymbols: {
        'GAS/SAND': 'GAS/SAND'
      }
    },
    slug: 'sandbox',
    title: 'Sandbox',
    website: 'http://botee.co'
  })
})
