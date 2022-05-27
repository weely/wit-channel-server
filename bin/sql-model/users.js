const User = require("../../src/models/users")
const { generateRandomStr, encryptionPwd } = require("../../src/utils/auth")

function initTable(force = false) {
  User.sync({ force }).then(() => {
    const salt = generateRandomStr()
    return User.create({
      loginname: 'admin',
      username: 'admin',
      passsalt: salt,
      password: encryptionPwd('admin123', salt)
    })
  }).catch((err) => {
    console.error(err)
  })
}

module.exports = {
  initTable
}