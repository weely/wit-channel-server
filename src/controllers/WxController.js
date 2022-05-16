const { wxLoginApi } = require('../api/wx-api')

class WxController {

  static async wxLogin(code){
    if (!code) {
      throw new Error('参数 code 为空')
    }
    const res = await wxLoginApi(code)

    return res
  }
}