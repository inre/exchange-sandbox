const createCore = require('./core/create')
const configureCore = require('./core/configure')
const createAssetsCreator = require('./creators/create-assets')
const createMarketsCreator = require('./creators/create-markets')
const createUserCreator = require('./creators/create-user')
const subscribeTradesCreator = require('./creators/subscribe-trades')
const getCapabilitiesCreator = require('./creators/get-capabilities')
const getOrderBookCreator = require('./creators/get-order-book')

function createSandbox () {
  const core = configureCore(createCore)
  const createAssets = createAssetsCreator(core)
  const createMarkets = createMarketsCreator(core)
  const createUser = createUserCreator(core)
  const subscribeTrades = subscribeTradesCreator(core)
  const getCapabilities = () => getCapabilitiesCreator(core)
  const getOrderBook = () => getOrderBookCreator(core)

  return {
    ...core,
    createAssets,
    createMarkets,
    createUser,
    subscribeTrades,
    getCapabilities,
    getOrderBook
  }
}

module.exports = createSandbox
