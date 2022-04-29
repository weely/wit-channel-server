
const config = {
  port: 3000,

  // database 配置
  db: {
    HOST: '127.0.0.1',
    PORT: '3306',
    DATABASE: 'wit_channel_db',
    USERNAME: 'root',
    PASSWORD: 'lw123456',
  },

  wxConfig:{
    APPID:'',
    AppSecret:''
  },

  secret: 'wit-channel-secret',
  expiresIn: 7 * 24 * 60 * 60,   // 1 周

  defaultPwd: '123456'
}

module.exports = config
