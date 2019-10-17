const FMex = require('./FMex')
const userConfig = require('./config')

const $CONFIG = {
  perAmount: userConfig.shishang.perAmount, // 每个订单多少张，最多只能挂50个订单，自己算多少合适。
}

const fm = new FMex({
  key: userConfig.key, // 输入您的key
  secret: userConfig.secret, // 输入您的secret
  BASEURL: userConfig.BASEURL // 请求的baseUrl, 目前是模拟盘，正式还未规定。
})

// 主要程序
async function main() {
  let ticker = await fm.getTicker('BTCUSD_P').then(res => res.ticker)
  let lastPrice = ticker[0] // 最新价
  let buyPrice = ticker[2] // 最佳买一价格
  let sellPrice = ticker[4] // 最佳卖一价格

  if (lastPrice == buyPrice) {
    sellPrice = (buyPrice + 0.5).toFixed(1)
  }
  if (lastPrice == sellPrice) {
    buyPrice = (sellPrice - 0.5).toFixed(1)
  }

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
}

main()