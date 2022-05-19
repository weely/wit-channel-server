const Asset = require('../models/assets')
const { success } = require('../utils/utils')

class HomeController {
  static async fetchHome(ctx) {
    const { swiperNum=3 } = ctx.query
    const where = {
      asset_type: 0
    }
    const pager = require('../utils/pager').pager(0, swiperNum)
    const data= await Asset.findAll({
      where,
      ...pager,
      raw: true
    })
    const res = data.map((item) => {
      return {
        id: item.id,
        url: item.url
      }
    })

    return success({
      swiper: [...res]
    })
  }
}

module.exports = HomeController
