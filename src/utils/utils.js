const logger = require('../core/logger')

const CODE = {
  SUCCESS: 200,               // 成功
  PARAM_ERROR: 10001,         // 参数错误
  USER_ACCOUNT_ERROR: 20001,  // 账号或密码错误
  USER_LOGIN_ERROR: 30001,    // 用户未登录
  BUSINESS_ERROR: 40001,      // 业务请求失败
  AUTH_ERROR: 50001,          // 认证失败或TOKEN过期
}

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'
const DIGITALS = '0123456789'

module.exports = {
  // 成功回调
  success(data = {}, msg = 'success', code = CODE.SUCCESS) {
    return { code, data, msg }
  },
  // 失败回调
  fail(data = {}, msg = 'error', code = CODE.BUSINESS_ERROR) {
    logger.error(msg)

    return { code, data, msg }
  },
  CODE,
  ALPHABET,
  DIGITALS
}
