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

function generateSalt(len = 16){
  const randomList = `${ALPHABET}${DIGITALS}`.split('')

  return md5(Array.from(Array(len)).map(_ => randomList[randomIndex(randomList.length)]).join(''))
}

function encryptionPwd(pwd, salt) {
  return md5(md5(pwd) + salt)
}

module.exports = {
  generateToken,
  verifyToken,
  generateSalt,
  encryptionPwd
}