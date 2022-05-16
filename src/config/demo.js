
const config = {
  port: 3000,

  // database 配置
  db: {
    HOST: '127.0.0.1',
    PORT: '3306',
    DATABASE: '',
    USERNAME: '',
    PASSWORD: '',
    // PASSWORD: 'weely@123',
  },
  // jwt 配置
  secret: '',   // jwt secret
  expiresIn: 0,    // jwt 过期时间 1 周

  // 微信小程序配置
  wxConfig:{
    wxHost: '',
    APPID:'',
    AppSecret:''
  },

  // 用户重置后默认密码
  defaultPwd: ''
}

module.exports = config
