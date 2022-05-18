process.env.NODE_ENV = "production";

const User = require("../src/models/users");
const Order = require("../src/models/orders");
const TradeRecord = require("../src/models/trade_records");
const Product = require("../src/models/products");
const { generateSalt, encryptionPwd } = require("../src/utils/auth");
const { generateOrderId } = require("../src/utils/app");

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

Product.sync({ force: true })
  .then(() => {
    const { jsonStrify } = require('../src/utils/app')
    const { defaultProductIcon } = require('../src/config/config')

    return Product.bulkCreate([
      {
        title: "车辆内外清洗",
        resume:
          "采用最新配方的洗车液和高分子纳米活性物的水蜡，对您爱车内外充分清洗",
        min_sale_price: 2888,
        max_sale_price: 3888,
        primary_image: defaultProductIcon,
        product_detail: jsonStrify({
          images: [
            "https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-08a.png",
            "https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-08a1.png",
            "https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-08b.png",
          ],
        }),
      },
      {
        title: "内饰全面清洗",
        resume:
          "采用最先进清洁剂，无损全面清洗内饰，用采用蒸汽枪进行消毒杀菌处理",
        min_sale_price: 9800,
        max_sale_price: 12800,
        primary_image: defaultProductIcon,
        product_detail: jsonStrify({
          images: [
            "https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-17a.png",
            "https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-17a1.png",
            "https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-17b.png",
            "https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-17b1.png",
          ],
        }),
      },
    ])
  })
  .catch((err) => {
    console.error(err);
  });
