# Example

```javascript
const createSandbox = require('exchange-sandbox')
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

const trade$ = sandbox.subscribeTrades(['GAS/SAND'])
trade$.subscribe((trade) => console.log(trade))

const user1 = sandbox.createUser('user#1', { 'SAND': 1 })
const user2 = sandbox.createUser('user#2', { 'GAS': 100 })

user1.createLimitOrder('GAS/SAND', 'BUY', 100, 0.01)
user2.createLimitOrder('GAS/SAND', 'SELL', 100, 0.01)
```

# Tests

> npm i
> jest

# TODO

* order history
* new order type: market order
* http service
