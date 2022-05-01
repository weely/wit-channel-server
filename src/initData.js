const User =require('./models/users')
const Order =require('./models/orders')
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

Order.sync({ force: true }).then(()=>{
  return Order.create({
    id: 'O0000001',
    product_id: 1,
    client_id: '1',
    cost: 100,
    amount: 1,
    status: 0,
    remark: '测试'
  })
}).catch((err) => {
  console.error(err)
})