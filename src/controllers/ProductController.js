const { Op } = require("sequelize")
const Product = require('../models/products')
const { success, fail, CODE } = require('../utils/utils')
const { checkUnique } = require('../utils/ctrlUtils')

class ProductController {

  static async add(ctx) {
    const { product_name, product_price, product_describe } = ctx.request.body

    if (!product_name) {
      return fail(null, "产品名称为空，请选择有效产品", CODE.PARAM_ERROR)
    }
    const exitsProduct = await checkUnique(Product, 'product_name', product_name)
    if (exitsProduct){
      return fail(null, "产品不能重复", CODE.PARAM_ERROR)
    }
    if (!product_price || +product_price < 0) {
      return fail(null, "产品价格不符合要求", CODE.PARAM_ERROR)
    }
    if (!product_describe) {
      return fail(null, "产品描述为空", CODE.PARAM_ERROR)
    }

    const data = await Product.create({
      product_name,
      product_price,
      product_describe
    })
    if (!data) {
      return fail(null, "新增产品失败", CODE.BUSINESS_ERROR)
    }

    return success(data)
  }
  
  static async find(ctx) {
    const { id } = ctx.params

    if (!id) {
      return fail(null, "参数 id 为空", CODE.PARAM_ERROR)
    }
    const data = await Product.findByPk(id)
    if (!data) {
      return fail(null, "产品不存在", CODE.BUSINESS_ERROR)
    }

    return success(data)
  }

  static async findAll(ctx) {
    const { product_name, product_status } = ctx.query
    const where = {}

    if (product_name !== undefined) {
      where.product_name = {
        [Op.substring]: product_name
      }
    }
    if (product_status !== undefined && product_status !== '') {
      where.product_status = product_status
    }

    const data= await Product.findAll({
      where
    })

    return success(data)
  }

  static async update(ctx) {
    const { id } = ctx.params
    const { product_name, product_price, product_describe } = ctx.request.body

    if (!id) {
      return fail(null, "参数 id 为空", CODE.PARAM_ERROR)
    }
    const updateParams = { }
    if (product_name !== undefined && product_name !== '') {
      updateParams.product_name = product_name
    }
    if (product_price !== undefined) {
      if (+product_price <= 0) {
        return fail(null, "参数 product_price 无效", CODE.PARAM_ERROR)
      }
      updateParams.product_price = product_price
    }
    if (product_describe !== undefined && product_name !== '') {
      updateParams.product_price = product_describe
    }

    await Product.update(updateParams, {
      where: {
        id: id
      }
    })

    return success({ id })
  }

  static async delete(ctx) {
    const { id } = ctx.params
    if (!id) {
      return fail(null, "参数 id 为空", CODE.PARAM_ERROR)
    }
    // await Product.destroy
    await Product.update({
      status: 4
    },{
      where: {
        id
      }
    })

    return success({})
  }
}

module.exports = ProductController
