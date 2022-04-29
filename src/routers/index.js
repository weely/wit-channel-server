// routers
const Router = require("koa-router")
const { success, fail, CODE } = require('../utils/utils')
const userController = require('../controllers/UserController')

const router = new Router()

function middleFunc(controllerFunc) {
  return async(ctx, next) => {
    let data;
    ctx.logger.info(ctx.originalUrl)
    try {
      data = await controllerFunc(ctx)
    } catch(err) {
      console.log('------ERROR------/r/n', err, '------ERROR END------/r/n')
      ctx.logger.error(JSON.stringify(err))
      data = fail(null, '错误', CODE.BUSINESS_ERROR)
    }
    ctx.response.status = 200
    ctx.body = data

    await next()
  }
}

router.get('/', middleFunc(success('首页')))
  // 授权
  .post('/auth/login',       middleFunc(userController.login))
  .post('/auth/register',    middleFunc(userController.register))
  .put('/auth/resetPwd',     middleFunc(userController.resetPwd))

  // 用户
  .get('/users',              middleFunc(userController.findAll))
  .get('/users/:id',          middleFunc(userController.find))
  .put('/users/:id',          middleFunc(userController.update))
  // .put('/users/resetPwd',     middleFunc(userController.resetPwd))
  .delete('/users/:id',       middleFunc(userController.delete))

module.exports = router
