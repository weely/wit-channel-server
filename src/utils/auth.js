const jwt = require('jsonwebtoken')
const md5 = require('md5')
const { secret, expiresIn } = require('../config/config')
const { ALPHABET, DIGITALS } = require('./utils')

function generateToken(name) {
  const token = jwt.sign({
    name
  }, secret, {
    expiresIn
  })

  return token
}

function verifyToken(token) {
  return jwt.verify(token, secret)
}

function randomIndex(maxLen) {
  return Math.ceil(Math.random() * maxLen)
}

function generateRandomStr(len = 16){
  const randomList = `${ALPHABET}${DIGITALS}`.split('')

  return md5(Array.from(Array(len)).map(_ => randomList[randomIndex(randomList.length)]).join(''))
}

function encryptionPwd(pwd, salt) {
  return md5(md5(pwd) + salt)
}

function createSign(obj){	//签名算法（把全部的非空的参数，按字典顺序组合起来+key,而后md5加密，再把加密结果都转成大写的便可）
	var stringA = 'appid='+obj.appid+'&body='+obj.body+'&mch_id='+obj.mch_id+'&nonce_str='+obj.nonce_str+'&notify_url='+obj.notify_url+'&openid='+obj.openid+'&out_trade_no='+obj.out_trade_no+'&spbill_create_ip='+obj.spbill_create_ip+'&total_fee='+obj.total_fee+'&trade_type='+obj.trade_type;
	
	var stringSignTemp = stringA+'&key=本身的商户号key';
		stringSignTemp = md5(stringSignTemp);
	var signValue = stringSignTemp.toUpperCase();
	return signValue
}

module.exports = {
  generateToken,
  verifyToken,
  generateRandomStr,
  encryptionPwd,
  createSign
}