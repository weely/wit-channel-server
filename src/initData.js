const User =require('./models/users.js')
const { generateSalt, encryptionPwd } = require('./utils/auth')

User.sync({ force: true }).then(()=>{
  const salt = generateSalt()
  return User.create({
    loginname: 'xiaoming',
    username: '小明',
    passsalt: salt,
    password: encryptionPwd('123456', salt)
  })
}).catch((err) => {
  console.error(err)
})

