const request = require('../utils/request')
const { wxConfig } = require('../config/config')

function wxLoginApi(code) {
  //  https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
  const { wxHost, APPID, AppSecret } = wxConfig
  const url = `${wxHost}/sns/jscode2session`

  params = {
    appid: APPID,
    secret: AppSecret,
    js_code: code,
    grant_type: 'authorization_code'
  }

  return request({
    url: url,
    method: 'get',
    params: params
  })
}

module.exports = {
  wxLoginApi
}