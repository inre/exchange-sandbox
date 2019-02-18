const { OrderSide } = require('../types/order/side')
const createCore = require('../core/create')
const configureCore = require('../core/configure')
const createAssetsCreator = require('../creators/create-assets')
const createUserCreator = require('../creators/create-user')
const createMarketsCreator = require('../creators/create-markets')
const createLimitOrderCreator = require('../creators/create-limit-order')

const initGasSandAssets = (core) => {
  const createAssets = createAssetsCreator(core)

  createAssets([{
    name: 'Sand',
    symbol: 'SAND',
    precision: 6
  }, {
    name: 'Gas',
    symbol: 'GAS',
    precision: 0
  }])
}

const initGasSandMarket = (core) => {
  const createMarkets = createMarketsCreator(core)

  createMarkets([{
    pair: 'GAS/SAND',
    minOrder: 1
  }])
}

const initTwoUsers = (core) => {
  const createUser = createUserCreator(core)
  createUser('user1', { 'SAND': 0.1 })
  createUser('user2', { 'GAS': 100 })
}

const initTwoLimitOrders = (core) => {
  const createLimitOrder = createLimitOrderCreator(core)
  createLimitOrder('user1')('GAS/SAND', OrderSide.BUY, 100, 0.001)
  createLimitOrder('user2')('GAS/SAND', OrderSide.SELL, 100, 0.001)
}

const createConfiguredCore = () => {
  return configureCore(createCore)
}

module.exports = {
  createConfiguredCore,
  initGasSandAssets,
  initGasSandMarket,
  initTwoUsers,
  initTwoLimitOrders
}
