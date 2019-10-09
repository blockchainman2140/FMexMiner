const FMex = require('./FMex')

const $CONFIG = {
  minPercent: 1, // 挂单挖矿的下限，离最新价的百分比，如果是 1% 则填写 1，千万不要填写0.01
  maxPercent: 5, // 挂单挖矿的上限，离最新价的百分比，如果是 1% 则填写 1，千万不要填写0.01
  perAmount: 2, // 每个订单多少张，最多只能挂50个订单，自己算多少合适。
}

const fm = new FMex({
  key: 'a69142c0c99554d8ea2baafa958fda4b4', // 输入您的key
  secret: 'a9c33a157243f4d859dc2b409361b3094', // 输入您的secret
  BASEURL: "https://api.testnet.fmex.com" // 请求的baseUrl, 目前是模拟盘，正式还未规定。
})

async function clearOrders(lastPrice) {
  let orders = await fm.getOrders().then(res => res.results)
  orders.forEach(it => {
    let diffPercent = Math.abs(lastPrice - it.price) / lastPrice * 100
    if ( diffPercent < $CONFIG.minPercent || diffPercent > $CONFIG.maxPercent ) {
      fm.cancelOrder(it.id).then(res => {
        console.log(it.price)
        console.log(res)
      })
    }
  })
}
async function clearPosition() {
  fm.getPosition().then(res => {
    res.results.forEach(it => {
      if (it.symbol == 'BTCUSD_P') {
        if (it.quantity) {
          fm.createOrder({
            symbol: "BTCUSD_P",
            type: "MARKET",
            direction: it.direction.toUpperCase() == 'LONG' ? "SHORT" : "LONG",
            quantity: it.quantity,
          }).then(res => {
            console.log('平仓')
            console.log(it.price, it.quantity)
            console.log(res)
          })
        }
      }
    })
  })
}

function getToOrderPrice(basePrice, direct) {
  return parseInt(basePrice * (direct * ($CONFIG.minPercent + Math.random() * ($CONFIG.maxPercent - $CONFIG.minPercent)) / 100 + 1))
}

// 主要程序
async function main() {
  let ticker = await fm.getTicker('BTCUSD_P').then(res => res.ticker)
  let lastPrice = ticker[0] // 最新价
  let buyPrice = getToOrderPrice(lastPrice, -1)
  let sellPrice = getToOrderPrice(lastPrice, 1)
  fm.createOrder({
    symbol: "BTCUSD_P",
    type: "LIMIT",
    direction: "LONG",
    post_only: true,
    price: buyPrice,
    quantity: $CONFIG.perAmount,
  })
  fm.createOrder({
    symbol: "BTCUSD_P",
    type: "LIMIT",
    direction: "SHORT",
    post_only: true,
    price: sellPrice,
    quantity: $CONFIG.perAmount,
  })
  clearOrders(lastPrice)
  clearPosition()
}

main()