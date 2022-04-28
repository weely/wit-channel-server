const User =require('./models/users.js');

User.sync({ force: false }).then(()=>{
  return User.create({
    username: '小明',
    password: 'e10adc3949ba59abbe56e057f20f883e'
  })
}).catch((err) => {
  console.error(err)
})

