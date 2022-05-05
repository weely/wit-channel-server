const User =require('./models/users')
const Order =require('./models/orders')
const TradeRecord =require('./models/trade_records')
const Product =require('./models/products')
const { generateSalt, encryptionPwd } = require('./utils/auth')
const { generateOrderId } = require('./utils/app')

// User.sync({ force: true }).then(()=>{
//   const salt = generateSalt()
//   return User.create({
//     loginname: 'xiaoming',
//     username: '小明',
//     passsalt: salt,
//     password: encryptionPwd('123456', salt)
//   })
// }).catch((err) => {
//   console.error(err)
// })

// Order.sync({ force: true }).then(()=>{
//   return Order.create({
//     id: generateOrderId(),
//     product_id: 1,
//     client_id: '1',
//     cost: 100,
//     amount: 1,
//     status: 0,
//     remark: '测试'
//   })
// }).catch((err) => {
//   console.error(err)
// })

// TradeRecord.sync({ force: true }).then(()=>{
//   return TradeRecord.create({
//     order_id: 1,
//     client_id: '1',
//     cost: 100,
//     createdAt: 0
//   })
// }).catch((err) => {
//   console.error(err)
// })

Product.sync({ force: true }).then(()=>{
  return Product.create({
    product_name: '车辆内外清洗',
    product_describe: '采用最新配方的洗车液和高分子纳米活性物的水蜡，对您爱车内外充分清洗',
    product_price: 28.88,
  })
}).catch((err) => {
  console.error(err)
})
