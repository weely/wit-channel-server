const TradeRecord = require("../../src/models/trade_records");

function initTable(force = false) {
  TradeRecord.sync({ force }).then(()=>{
    // return TradeRecord.create({
    //   order_id: 1,
    //   client_id: '1',
    //   cost: 100,
    //   createdAt: new Date().getTime()
    // })
  }).catch((err) => {
    console.error(err)
  })
}

module.exports = {
  initTable
}