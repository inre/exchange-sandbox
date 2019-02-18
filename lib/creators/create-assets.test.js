const createCore = require('../core/create')
const configureCore = require('../core/configure')
const createAssetsCreator = require('./create-assets')
const { getAssetsSymbols } = require('../selectors/assets')

test('create assets', () => {
  const coreStore = configureCore(createCore)
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

  expect(getAssetsSymbols(coreStore.getState())).toEqual(['SAND', 'GAS'])
})
