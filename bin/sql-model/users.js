const User = require("../../src/models/users")
const { generateSalt, encryptionPwd } = require("../../src/utils/auth")

function initTable(force = false) {
  User.sync({ force }).then(() => {
    const salt = generateSalt()
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