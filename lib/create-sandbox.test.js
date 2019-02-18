const createSandbox = require('./create-sandbox')
const { OrderSide } = require('./types/order/side')

const initSandbox = () => {
  const sandbox = createSandbox()

  sandbox.createAssets([{
    name: 'Sand',
    symbol: 'SAND',
    precision: 6
  }, {
    name: 'Gas',
    symbol: 'GAS',
    precision: 0
  }])

  sandbox.createMarkets([{
    pair: 'GAS/SAND',
    minOrder: 1
  }])

  return sandbox
}

test('fullful the order', () => {
  const sandbox = initSandbox()

  const userWithSand = sandbox.createUser('userWithSand', { 'SAND': 1 })
  const userWithGas = sandbox.createUser('userWithGas', { 'GAS': 100 })

  userWithSand.createLimitOrder('GAS/SAND', OrderSide.BUY, 100, 0.01)
  userWithGas.createLimitOrder('GAS/SAND', OrderSide.SELL, 100, 0.01)

  expect(userWithSand.getBalance('GAS').free).toBe(100)
  expect(userWithSand.getBalance('SAND').free).toBe(0)
  expect(userWithGas.getBalance('GAS').free).toBe(0)
  expect(userWithGas.getBalance('SAND').free).toBe(1)
})

test('paritial fill the order', () => {
  const sandbox = initSandbox()

  const userWithSand = sandbox.createUser('userWithSand', { 'SAND': 1 })
  const userWithGas = sandbox.createUser('userWithGas', { 'GAS': 100 })

  userWithSand.createLimitOrder('GAS/SAND', OrderSide.BUY, 100, 0.01)
  userWithGas.createLimitOrder('GAS/SAND', OrderSide.SELL, 50, 0.005)

  expect(userWithSand.getBalance('GAS').free).toBe(50)
  expect(userWithSand.getBalance('SAND').free).toBe(0)
  expect(userWithGas.getBalance('GAS').free).toBe(50)
  expect(userWithGas.getBalance('SAND').free).toBe(0.25)

  expect(userWithSand.getBalance('SAND').locked).toBe(0.5)
  expect(userWithGas.getBalance('SAND').locked).toBe(0)
})

test('fill first order and half of second', () => {
  const sandbox = initSandbox()

  const userWithSand = sandbox.createUser('userWithSand', { 'SAND': 1 })
  const userWithGas = sandbox.createUser('userWithGas', { 'GAS': 100 })

  userWithSand.createLimitOrder('GAS/SAND', OrderSide.BUY, 50, 0.004)
  userWithSand.createLimitOrder('GAS/SAND', OrderSide.BUY, 50, 0.005)
  userWithGas.createLimitOrder('GAS/SAND', OrderSide.SELL, 80, 0.004)

  expect(userWithSand.getBalance('GAS').free).toBe(80)
  expect(userWithSand.getBalance('SAND').locked).toBe(0.08)
  expect(userWithGas.getBalance('GAS').free).toBe(20)
  expect(userWithGas.getBalance('SAND').free).toBe(0.32)
})

test('fill two sell orders with different prices', () => {
  const sandbox = initSandbox()

  const userWithSand = sandbox.createUser('userWithSand', { 'SAND': 1 })
  const userWithGas = sandbox.createUser('userWithGas', { 'GAS': 100 })

  userWithSand.createLimitOrder('GAS/SAND', OrderSide.BUY, 250, 0.002)
  userWithSand.createLimitOrder('GAS/SAND', OrderSide.BUY, 50, 0.004)
  userWithSand.createLimitOrder('GAS/SAND', OrderSide.BUY, 50, 0.006)
  userWithGas.createLimitOrder('GAS/SAND', OrderSide.SELL, 100, 0.004)

  expect(userWithSand.getBalance('GAS').free).toBe(100)
  expect(userWithSand.getBalance('SAND').locked).toBe(0.5)
  expect(userWithGas.getBalance('GAS').free).toBe(0)
  expect(userWithGas.getBalance('SAND').free).toBe(0.4)
})
