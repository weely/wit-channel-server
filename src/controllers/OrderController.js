const { Op } = require("sequelize")
const Order = require('../models/orders')
const { success, fail, CODE } = require('../utils/utils')
const { generateOrderId } = require('../utils/app')

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
    const { product_id, client_id, cost, remark = '' } = ctx.request.body

    if (!product_id) {
      return fail(null, "产品 product_id 为空，请选择有效产品", CODE.PARAM_ERROR)
    }
    if (!client_id) {
      return fail(null, "client_id 为空", CODE.PARAM_ERROR)
    }
    if (!cost || cost <= 0) {
      return fail(null, "请输入有效订单金额", CODE.PARAM_ERROR)
    }
    const orderId = await OrderController.createOrderId()

    const order = await Order.create({
      id: orderId,
      product_id,
      client_id,
      cost,
      status: 0,
      remark
    })
    if (!Order) {
      return fail(null, "创建订单失败", CODE.BUSINESS_ERROR)
    }

    return success(order)
  }
  
  static async find(ctx) {
    const { id } = ctx.params

    if (!id) {
      return fail(null, "参数 id 为空", CODE.PARAM_ERROR)
    }
    const Order = await Order.findByPk(id)
    if (!Order) {
      return fail(null, "订单不存在", CODE.BUSINESS_ERROR)
    }

    return success(Order)
  }

  static async findAll(ctx) {
    const { ids, product, client, status } = ctx.query
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

    const data= await Order.findAll({
      where
    })

    return success(data)
  }

  static async trade (ctx) {
    const { id } = ctx.params
    const { status } = ctx.request.body
    const allowStatus = [0,1,2,3,4]

    if (!id) {
      return fail(null, "参数 id 为空", CODE.PARAM_ERROR)
    }
    if (!allowStatus.includes(+status)) {
      return fail(null, "订单交易失败", CODE.PARAM_ERROR)
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
