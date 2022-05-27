const { success } = require('../utils/utils')
const { createSign } = require('../utils/auth')

class WxController {

  // 小程序下单
  static async toPay(ctx){
    const { openId } = ctx.query

    // 生成签名
    // const sign = createSign({
    //   appid: appid,
		// 	body: '微信支付，商品详细描述',
		// 	mch_id: mch_id,
		// 	nonce_str: nonce_str,
		// 	notify_url: 'https://www.kdsou.com/kdchange/service_bak/notify.php',
		// 	openid: openId,
		// 	out_trade_no: time,
		// 	spbill_create_ip: '127.0.0.1',
		// 	total_fee: total_fee,
		// 	trade_type: 'JSAPI'
    // })


    return success({})
  }
}

module.exports = WxController