// routers
const Router = require("koa-router")
const userController = require('../controllers/UserController')
const { success, fail, CODE } = require('../utils/utils')

const userRouter = new Router()

userRouter.get('/user', async (ctx, next) => {
  let res;
  try {
    const { id } = ctx.query
    if (!id) {
      ctx.body = fail({}, '参数 id 为空', CODE.PARAM_ERROR)
    }

    const data = await userController.find(ctx.query.id)
    ctx.response.status = 200
    ctx.body = success(data)
  } catch (err) {
    console.log('-------', err)
    ctx.body = fail(err)
  }
  await next()
})

module.exports = userRouter
