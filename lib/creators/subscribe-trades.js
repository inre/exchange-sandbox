const { Observable } = require('rxjs')
const { head, last } = require('ramda')
const zipObject = require('lodash/zipObject')
const increment = require('../types/increment')

const subscribeTrades = ({subscribe, getState}) => (pairs) => {
  const pairsObject = zipObject(pairs, pairs)
  let idx
  const trade$ = Observable.create((observer) => {
    subscribe(() => {
      const state = getState()
      const { byId, allIds } = state.entities.trades
      if (allIds.length === 0) {
        return
      }
      const endId = parseInt(last(allIds))
      idx = idx || head(allIds)
      let trades = []
      for (;parseInt(idx) <= endId; idx = increment(idx)) {
        const trade = byId[idx]
        if (pairsObject.hasOwnProperty(trade.pair)) {
          trades.push(trade)
        }
      }
      if (trades.length !== 0) {
        observer.next(trades)
      }
    })
  })
  return trade$
}

module.exports = subscribeTrades
