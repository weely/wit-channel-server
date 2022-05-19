const Product = require("../../src/models/products")

function initTable(force = false) {
  Product.sync({ force })
    .then(() => {
      const { jsonStrify } = require('../../src/utils/app')
      const { defaultProductIcon } = require('../../src/config/config')

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
}


module.exports = {
  initTable
}