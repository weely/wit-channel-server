const Asset = require('../models/assets')
const { success, fail, CODE } = require('../utils/utils')
const { isNull } = require('../utils/app')

class AssetController {

  static async add(ctx) {
    const { url, assetType, remark = '' } = ctx.request.body

    if (isNull(url)) {
      return fail(null, "资源 url 为空", CODE.PARAM_ERROR)
    }
    if (isNull(assetType)) {
      return fail(null, "资源类型 assetType 为空", CODE.PARAM_ERROR)
    }

    const data = await Asset.create({
      url,
      assetType,
      status: 0,
      remark
    })
    if (!data) {
      return fail(null, "新增资源失败", CODE.BUSINESS_ERROR)
    }

    return success(data)
  }
  
  static async find(ctx) {
    const { id } = ctx.params

    if (isNull(id)) {
      return fail(null, "参数 id 为空", CODE.PARAM_ERROR)
    }
    const data = await Asset.findByPk(id)
    if (!data) {
      return fail(null, "订单不存在", CODE.BUSINESS_ERROR)
    }

    return success(data)
  }

  static async findAll(ctx) {
    const { assetType, pageNo=1, pageSize=1000 } = ctx.query
    const where = {}

    if (!isNull(assetType)) {
      where.asset_type = assetType
    }
    const pager = require('../utils/pager').pager(pageNo, pageSize)

    const data= await Asset.findAll({
      where,
      ...pager,
      raw: true
    })

    return success(data)
  }

  static async update(ctx) {
    const { id } = ctx.params
    const { assetType, assetStatus } = ctx.request.body

    if (isNull(id)) {
      return fail(null, "参数 id 为空", CODE.PARAM_ERROR)
    }
    const updateParams = { }
    if (!isNull(assetType)) {
      updateParams.asset_type = assetType
    }
    if (!isNull(assetStatus)) {
      updateParams.asset_status = assetStatus
    }

    await Asset.update(updateParams, {
      where: {
        id: id
      }
    })

    return success({ id })
  }

  static async delete(ctx) {
    const { id } = ctx.params
    if (isNull(id)) {
      return fail(null, "参数 id 为空", CODE.PARAM_ERROR)
    }
    // await Asset.destroy
    await Asset.update({
      asset_status: 4
    },{
      where: {
        id
      }
    })

    return success({})
  }
}

module.exports = AssetController
