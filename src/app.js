const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const jwt = require('koa-jwt')
const { parseProcessArgs } = require('./utils/processUtils')

const app = new Koa()
// app.keys = ['im a newer secret', 'i like turtle']
const processConfig = parseProcessArgs(process.argv)
app.env = processConfig.env || 'development'
process.env.NODE_ENV = app.env
// 由于要配置环境变量，需要注意包的引用顺序
const { secret, port } = require('./config/config')
const router = require('./routers')
const logger = require('./core/logger')
const { parseTime } = require('./utils/app')
// 添加 jwt
app.use(async (ctx, next) => {
  try {
    // 添加日志工具
    ctx.logger = logger
    await next()
  } catch (err) {
    if (401 == err.status) {
      ctx.status = 401
      ctx.body = '请求失败，未授权！'
    }
  }
})
app.use(jwt({
  secret: secret, cookie: 'token'
}).unless({ custom: require('./utils/jwtUnless') }))
// 添加 post 参数解析
app.use(bodyParser())
// 添加路由
app.use(router.routes(), router.allowedMethods())

if (processConfig.ssl) {  // 此ssl 仅用于本地调试用，
  const fs =  require('fs')
  const http = require('http')
  const https =  require('https')
  const path = require('path')
  const sslify = require('koa-sslify').default

  app.use(sslify)
  // 安装证书
  const options = {
    key: fs.readFileSync(path.join(__dirname, '../ssl/7604531_weely.cc.key')),
    cert: fs.readFileSync(path.join(__dirname, '../ssl/7604531_weely.cc.pem'))
  }
  // 开启http
  http.createServer(app.callback()).listen(port, () => {
    console.log(`server is running at http://127.0.0.1:${port}`)
  })
  // 开启https
  https.createServer(options, app.callback()).listen(443, () => {
    console.log(`server is running at https://127.0.0.1:443`)
  })
} else {
  app.listen(port)
  console.log(`server is running at http://127.0.0.1:${port}`)
}
logger.info(`\**------ Server is running At NODE_ENV:${app.env} StartTime:${parseTime(new Date().getTime())} -----**\\r\n`)

// 开启websocket 推送
require('./ws/wss')
