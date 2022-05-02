const { Op } = require("sequelize")
const TradeRecord = require('../models/trade_records')
const { success, fail, CODE } = require('../utils/utils')

class TradeRecordController {

  static async add(ctx) {

    const { order_id, client_id, cost } = ctx.request.body

    if (!order_id) {
      return fail(null, "订单 order_id 为空，请选择有效产品", CODE.PARAM_ERROR)
    }
    if (!client_id) {
      return fail(null, "client_id 为空", CODE.PARAM_ERROR)
    }
    if (!cost || cost <= 0) {
      return fail(null, "请输入有效订单金额", CODE.PARAM_ERROR)
    }
    const createdAt = new Date().getTime()

    const TradeRecord = await TradeRecord.create({
      order_id,
      client_id,
      cost,
      createdAt
    })
    if (!TradeRecord) {
      return fail(null, "创建订单失败", CODE.BUSINESS_ERROR)
    }

    return success(TradeRecord)
  }
  
  static async find(ctx) {
    const { id } = ctx.params

    if (!id) {
      return fail(null, "参数 id 为空", CODE.PARAM_ERROR)
    }
    const TradeRecord = await TradeRecord.findByPk(id)
    if (!TradeRecord) {
      return fail(null, "订单不存在", CODE.BUSINESS_ERROR)
    }

    return success(TradeRecord)
  }

  static async findAll(ctx) {
    const { order_ids, client_ids } = ctx.query
    const where = {}
    if (order_ids !== undefined) {
      const orderIds = order_ids.split(',')
      where.order_id = {
        [Op.in]: orderIds
      }
    }
    if (client_ids !== undefined) {
      const clientIds = client_ids.split(',')
      where.client_id = {
        [Op.substring]: clientIds
      }
    }

    const data= await TradeRecord.findAll({
      where
    })

    return success(data)
  }

}

module.exports = TradeRecordController
