const Asset = require("../../src/models/assets")

function initTable(force = false) {
  Asset.sync({ force })
    .then(() => {
      return Asset.bulkCreate([
        {
          url: "https://tva1.sinaimg.cn/large/9bd9b167gy1g4c8qcc821j21hc0u0ay3.jpg",
          asset_type: 0,
          remark:''
        },
        {
          url: "https://tva1.sinaimg.cn/large/9bd9b167gy1g4lhilz3ukj21hc0xc4am.jpg",
          asset_type: 0,
          remark:''
        },
        {
          url: "https://tva1.sinaimg.cn/large/0072Vf1pgy1foxkfkejbbj31hc0u0k7e.jpg",
          asset_type: 0,
          remark:''
        },
      ])
    })
    .catch((err) => {
      console.error(err)
    })
}

module.exports = {
  initTable
}