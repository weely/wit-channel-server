const { Op } = require("sequelize")
const TradeRecord = require('../models/trade_records')
const { success, fail, CODE } = require('../utils/utils')
const { checkUnique } = require('../utils/ctrlUtils')

class TradeRecordController {

  static async add(ctx) {
    const { order_id, client_id, cost } = ctx.request.body
    const { isNull } = require('../utils/app')

    if (isNull(order_id)) {
      return fail(null, "订单 order_id 为空，请选择有效产品", CODE.PARAM_ERROR)
    }
    if (isNull(client_id)) {
      return fail(null, "client_id 为空", CODE.PARAM_ERROR)
    }
    if (isNull(cost) || +cost <= 0) {
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
    const { order_ids, client_ids, pageNo=1, pageSize=1000 } = ctx.query
    const { isNull } = require('../utils/app')

    const where = {}
    if (!isNull(order_ids)) {
      const orderIds = order_ids.split(',')
      where.order_id = {
        [Op.in]: orderIds
      }
    }
    if (!isNull(client_ids)) {
      const clientIds = client_ids.split(',')
      where.client_id = {
        [Op.substring]: clientIds
      }
    }
    const pager = require('../utils/pager').pager(pageNo, pageSize)

    const data = await TradeRecord.findAll({
      where,
      ...pager
    })

    return success(data)
  }

}

module.exports = TradeRecordController
