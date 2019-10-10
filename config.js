module.exports = {
  minPercent: 1, // 挂单挖矿的下限，离最新价的百分比，如果是 1% 则填写 1，千万不要填写0.01
  maxPercent: 5, // 挂单挖矿的上限，离最新价的百分比，如果是 1% 则填写 1，千万不要填写0.01
  perAmount: 2, // 每个订单多少张，最多只能挂50个订单，自己算多少合适。
  key: '69142c0c99554d8ea2baafa958fda4b4', // 输入您的key
  secret: '9c33a157243f4d859dc2b409361b3094', // 输入您的secret
  BASEURL: "https://api.testnet.fmex.com" // 请求的baseUrl, 目前是模拟盘，正式还未规定。
}