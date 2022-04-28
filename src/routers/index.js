// routers
const Router = require("koa-router")
const { success } = require('../utils/utils')

const indexRouter = new Router()


indexRouter.get('/', async (ctx, next) => {

  ctx.logger.info('请求首页')
  ctx.response.status = 200
  ctx.body = success('首页')

  await next()
})

module.exports = indexRouter
