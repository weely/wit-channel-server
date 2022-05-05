const { Op } = require("sequelize")
const TradeRecord = require('../models/trade_records')
const { success, fail, CODE } = require('../utils/utils')
const { checkUnique } = require('../utils/ctrlUtils')

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
    const exitsOrder = await checkUnique(TradeRecord, 'order_id', order_id)
    if (exitsOrder){
      return fail(null, "订单号不能重复", CODE.PARAM_ERROR)
    }
    const createdAt = new Date().getTime()

    const tradeRecord = await TradeRecord.create({
      order_id,
      client_id,
      cost,
      createdAt
    })
    if (!tradeRecord) {
      return fail(null, "创建订单失败", CODE.BUSINESS_ERROR)
    }

    return success(tradeRecord)
  }
  
  static async findAll(ctx) {
    const { order_ids, client_ids } = ctx.query
    if (!order_ids) {
      return fail(null, "参数 order_ids 为空", CODE.PARAM_ERROR)
    }
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

    const data = await TradeRecord.findAll({
      where
    })

    return success(data)
  }

}

module.exports = TradeRecordController
