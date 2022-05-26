const Order = require("../../src/models/orders")

function initTable(force = false) {
  Order.sync({ force }).then(() => {
    // const { generateOrderId } = require("../../src/utils/app")
    // return Order.create({
    //   id: generateOrderId(),
    //   product_id: 1,
    //   client_id: '1',
    //   cost: 100,
    //   amount: 1,
    //   status: 0,
    //   remark: '测试',
    //   mobile: '13211112222',
    //   receiving_addr: '测试',
    // })
  }).catch((err) => {
    console.error(err)
  })
}


module.exports = {
  initTable
}
