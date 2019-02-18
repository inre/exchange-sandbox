const createAssets = require('./create')

test('create assets in entity', () => {
  const entity = createAssets({}, [{
    name: 'Sand',
    symbol: 'SAND',
    precision: 6
  }, {
    name: 'Gas',
    symbol: 'GAS',
    precision: 0
  }])

  expect(entity).toEqual({
    allIds: ['SAND', 'GAS'],
    byId: {
      'GAS': {
        symbol: 'GAS',
        name: 'Gas',
        precision: 0
      },
      'SAND': {
        name: 'Sand',
        precision: 6,
        symbol: 'SAND'
      }
    },
    idAttribute: 'symbol'
  })
})
