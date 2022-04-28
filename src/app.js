const Koa = require('koa')
const logger = require('./core/logger')
const indexRouter = require('./routers/index')
const userRouter = require('./routers/user')

const app = new Koa()

app.keys = ['im a newer secret', 'i like turtle']
// app.keys = new KeyGrip(['im a newer secret', 'i like turtle'], 'sha256');

app.use(async (ctx, next) => {
  ctx.logger = logger
  await next()
})
app.use(indexRouter.routes())
  .use(userRouter.routes())

app.listen(3000)
console.log(`server is running at 127.0.0.1:3000`)
