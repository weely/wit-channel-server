
const config = {
  port: 3000,

  // database 配置
  db: {
    HOST: '127.0.0.1',
    PORT: '3306',
    DATABASE: 'wit_channel_db',
    USERNAME: 'root',
    PASSWORD: 'lw123456',
    // PASSWORD: 'weely@123',
  },
  // jwt 配置
  secret: 'wit-channel-secret',   // jwt secret
  expiresIn: 7 * 24 * 60 * 60,    // jwt 过期时间 1 周

  // 微信小程序配置
  wxConfig:{
    APPID:'',
    AppSecret:''
  },

  // 用户重置后默认密码
  defaultPwd: '123456'
}

module.exports = config
