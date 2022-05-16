const { wxLoginApi } = require('../api/wx-api')

class WxController {

  static async wxLogin(ctx){
    const { code } = ctx.query
    if (!code) {
      throw new Error('参数 code 为空')
    }

    const res = await wxLoginApi(code)

    return res.data
  }
}

module.exports = WxController