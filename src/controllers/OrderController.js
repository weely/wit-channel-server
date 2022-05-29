const { Op } = require("sequelize")
const Order = require('../models/orders')
const { success, fail, CODE } = require('../utils/utils')
const { generateOrderId, validateMobile } = require('../utils/app')

class OrderController {

  static async createOrderId () {
    let orderId = generateOrderId()

    const order = await Order.findOne({
      where: {
        id: orderId
      }
    })
    if (!order) {
      return orderId
    }
    return await createOrderId()
  }

  static async add(ctx) {
    const { productId, clientId, cost, mobile, receivingAddr, remark = '' } = ctx.request.body

    if (!productId) {
      return fail(null, "产品 productId 为空", CODE.PARAM_ERROR)
    }
    if (!clientId) {
      return fail(null, "clientId 为空", CODE.PARAM_ERROR)
    }
    if (!cost || cost <= 0) {
      return fail(null, "订单金额参数错误", CODE.PARAM_ERROR)
    }
    if (!validateMobile(mobile)) {
      return fail(null, "手机号码参数错误", CODE.PARAM_ERROR)
    }
    if (!receivingAddr) {
      return fail(null, "参数 receivingAddr 收货地址为空", CODE.PARAM_ERROR)
    }
    const orderId = await OrderController.createOrderId()

    const order = await Order.create({
      id: orderId,
      product_id: productId,
      client_id: clientId,
      cost,
      status: 0,
      pay_status: 0,
      mobile,
      receiving_addr: receivingAddr,
      remark
    })
    if (!Order) {
      return fail(null, "创建订单失败", CODE.BUSINESS_ERROR)
    }

    return success({id: order.id})
  }
  
  static async find(ctx) {
    const { id } = ctx.params

    if (!id) {
      return fail(null, "参数 id 为空", CODE.PARAM_ERROR)
    }
    const order = await Order.findByPk(id, { raw: true })
    if (!Order) {
      return fail(null, "订单不存在", CODE.BUSINESS_ERROR)
    }

    return success(order)
  }

  static async findAll(ctx) {
    const { ids, product, client, status, pageNo=1, pageSize=1000 } = ctx.query
    const where = {}
    if (ids !== undefined && ids !== '') {
      const idList = id.split(',')
      where.id = {
        [Op.in]: idList
      }
    }
    if (product !== undefined && product !== '') {
      where.product_id = product
      // where.product = {
      //   [Op.substring]: product
      // }
    }
    if (client !== undefined && client !== '') {
      where.client_id = {
        [Op.substring]: client
      }
    }
    if (status !== undefined && status !== '') {
      where.status = status
    }
    const pager = require('../utils/pager').pager(pageNo, pageSize)

    const data= await Order.findAll({
      where,
      ...pager,
      raw: true
    })

    return success(data)
  }

  /**
   * 师傅接收或取消订单
   * @param {*} ctx 
   * @returns 
   */
  static async confirm (ctx) {
    const { id } = ctx.params
    const { status } = ctx.request.body
    const allowStatus = [0,1,2]

    if (!id) {
      return fail(null, "参数 id 为空", CODE.PARAM_ERROR)
    }
    if (!allowStatus.includes(+status)) {
      return fail(null, `参数错误：status is invalid`, CODE.PARAM_ERROR)
    }
    const updateParams = { }
    if (status !== undefined) {
      updateParams.status = +status
    }

    await Order.update(updateParams, {
      where: {
        id: id
      }
    })

    return success({ id })
  }

  // static async delete(ctx) {
  //   const { id } = ctx.params
  //   if (!id) {
  //     return fail(null, "参数 id 为空", CODE.PARAM_ERROR)
  //   }
  //   // await Order.destroy
  //   await Order.update({
  //     status: 4
  //   },{
  //     where: {
  //       id
  //     }
  //   })

  //   return success({})
  // }
}

module.exports = OrderController
