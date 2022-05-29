
// 配置，所有配置需在此文件中先配置key
const ROUTER_PREFIX = '/api'

const config = {
  port: 3000,
  wssPort: 3008,

  // database 配置
  db: {
    HOST: '127.0.0.1',
    PORT: '3306',
    DATABASE: '',
    USERNAME: '',
    PASSWORD: '',
  },
  // jwt 配置
  secret: 'wit-channel-secret',   // jwt secret
  expiresIn: 7 * 24 * 60 * 60,    // jwt 过期时间 1 周

  // 微信小程序配置
  wxConfig: {
    wxHost: 'https://api.weixin.qq.com',
    APPID: '',
    AppSecret: ''
  },

  // 用户重置后默认密码
  defaultPwd: '123456',
  defaultProductIcon: 'https://weely.cc/static-assets/default_pro_icon.jpg',
  routerPreFix: ROUTER_PREFIX,
  // 路由白名单，不需要校验 access_token,   method参数需要大写
  whiteRoutes: [
    // 正则匹配
    { path: /^\/api\/auth\/(login|register|wxLogin)/, method: ['GET','POST'] },
    { path: /^\/api\/public\// },
    { path: /^\/api\/wx\// },
    { path: /^\/api\/$/ },
    { path: /^\/api\/products/ },
  ]
}

module.exports = config
