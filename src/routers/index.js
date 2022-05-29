// routers
const Router = require("koa-router")
const { success, fail, CODE } = require('../utils/utils')
const { isFunction, isPromise, isAsyncFunction } = require('../utils/app')
const userController = require('../controllers/UserController')
const orderController = require('../controllers/OrderController')
const productController = require('../controllers/ProductController')
const tradeRecordController = require('../controllers/TradeRecordController')
const assetController = require('../controllers/AssetController')
const homeController = require('../controllers/HomeController')
const wxController = require('../controllers/WxController')

const router = new Router()
const { routerPreFix } = require('../config/config')
router.prefix(routerPreFix)

function middleFunc(cfn) {
  return async(ctx, next) => {
    let data;
    const request = JSON.parse(JSON.stringify(ctx.request))
    request.body = { ...ctx.request.body }
    ctx.logger.info(JSON.stringify(request))
    try {
      if (isAsyncFunction(cfn) || isPromise(cfn)) {
        data = await  cfn(ctx)
      } else if (isFunction(cfn)) {
        data = cfn(ctx)
      } else {
        data = cfn
      }
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

// restful api
router.get('/', middleFunc(success('首页')))
  // 微信接口
  .post('/auth/wxLogin', middleFunc(userController.wxLogin))

  // 授权
  .post('/auth/login',       middleFunc(userController.login))
  .post('/auth/register',    middleFunc(userController.register))

  // 用户
  .get('/users',              middleFunc(userController.findAll))
  .get('/users/:id',          middleFunc(userController.find))
  .put('/users/:id',          middleFunc(userController.update))
  .put('/users/resetPwd',     middleFunc(userController.resetPwd))
  .delete('/users/:id',       middleFunc(userController.delete))

  // 产品
  .post('/products',          middleFunc(productController.add))
  .get('/products',           middleFunc(productController.findAll))
  .get('/products/:id',       middleFunc(productController.find))
  .put('/products/:id',       middleFunc(productController.update))
  //.delete('/products/',       middleFunc(productController.delete))

  // 订单
  .post('/orders',            middleFunc(orderController.add))
  .get('/orders',             middleFunc(orderController.findAll))
  .get('/orders/:id',         middleFunc(orderController.find))
  .put('/orders/:id/confirm', middleFunc(orderController.confirm))
  // .delete('/orders/',       middleFunc(orderController.delete))

  // 交易记录
  .post('/trade_records',     middleFunc(tradeRecordController.add))
  .get('/trade_records',      middleFunc(tradeRecordController.findAll))

  // 资源管理
  .post('/assets',            middleFunc(assetController.add))
  .get('/assets',             middleFunc(assetController.findAll))
  .put('/assets:id',          middleFunc(assetController.update))
  .delete('/assets:id',       middleFunc(assetController.delete))

  // wx 小程序接口
  .get('/wx/fetchHome',       middleFunc(homeController.fetchHome))
  .get('/wx/pay',            middleFunc(wxController.toPay))

module.exports = router
