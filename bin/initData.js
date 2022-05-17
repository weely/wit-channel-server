process.env.NODE_ENV = 'production'

const User =require('../src/models/users')
const Order =require('../src/models/orders')
const TradeRecord =require('../src/models/trade_records')
const Product =require('../src/models/products')
const { generateSalt, encryptionPwd } = require('../src/utils/auth')
const { generateOrderId } = require('../src/utils/app')

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

// const createdAt = new Date().getTime()
// TradeRecord.sync({ force: true }).then(()=>{
//   return TradeRecord.create({
//     order_id: 1,
//     client_id: '1',
//     cost: 100,
//     createdAt: createdAt
//   })
// }).catch((err) => {
//   console.error(err)
// })

// Product.sync({ force: true }).then(()=>{
//   return Product.bulkCreate([
//     {
//       product_name: '车辆内外清洗',
//       product_describe: '采用最新配方的洗车液和高分子纳米活性物的水蜡，对您爱车内外充分清洗',
//       product_price: 28.88,
//     },
//     {
//       "product_name": "内饰全面清洗",
//       "product_describe": "采用最先进清洁剂，无损全面清洗内饰，用采用蒸汽枪进行消毒杀菌处理",
//       "product_price": 128
//     }
//   ])
// }).catch((err) => {
//   console.error(err)
// })
