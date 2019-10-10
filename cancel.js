const FMex = require('./FMex')
const userConfig = require('./config')

const fm = new FMex({
  key: userConfig.key, // 输入您的key
  secret: userConfig.secret, // 输入您的secret
  BASEURL: userConfig.BASEURL // 请求的baseUrl, 目前是模拟盘，正式还未规定。
})

async function clearOrders() {
  let orders = await fm.getOrders().then(res => res.results)
  orders.forEach(it => {
      fm.cancelOrder(it.id).then(res => {
        console.log(it.price)
        console.log(res)
      })
  })
}

clearOrders()