module.exports = {
  key: 'c07fc99f6bff48608edbd92ef7dca73c', // 输入您的key
  secret: '28d5929b87274df882ab51ee563c9b0b', // 输入您的secret
  BASEURL: "https://api.fmex.com", // 请求的baseUrl, 目前是模拟盘，正式还未规定。
  guadan: { // 挂单程序的配置写在这里
    minPercent: 1, // 挂单挖矿的下限，离最新价的百分比，如果是 1% 则填写 1，千万不要填写0.01
    maxPercent: 5, // 挂单挖矿的上限，离最新价的百分比，如果是 1% 则填写 1，千万不要填写0.01
    perAmount: 2, // 每个订单多少张，最多只能挂50个订单，自己算多少合适。
  }, 
  
  shishang: { // 市商程序的配置写在这里
    perAmount: 10 // 市商单个订单大小
  }
}
