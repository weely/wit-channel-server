const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const jwt = require('koa-jwt')
const logger = require('./core/logger')
const router = require('./routers')
const { secret } = require('./config/default')

const app = new Koa()
// app.keys = ['im a newer secret', 'i like turtle']

// 添加 jwt
const routeingWhiteList = ['/', /^\/public/, /^\/auth\/(login|register|wxLogin)/]
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
}).unless({ path: routeingWhiteList }))
// 添加 post 参数解析
app.use(bodyParser())
// 添加路由
app.use(router.routes(), router.allowedMethods())


app.listen(3000)
console.log(`server is running at http://127.0.0.1:3000`)
