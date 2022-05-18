const { Op } = require("sequelize")
const Product = require('../models/products')
const { success, fail, CODE } = require('../utils/utils')
const { checkUnique } = require('../utils/ctrlUtils')

class ProductController {

  static async add(ctx) {
    const { title, minSalePrice, resume } = ctx.request.body

    if (!title) {
      return fail(null, "产品名称为空，请选择有效产品", CODE.PARAM_ERROR)
    }
    const exitsProduct = await checkUnique(Product, 'title', title)
    if (exitsProduct){
      return fail(null, "产品不能重复", CODE.PARAM_ERROR)
    }
    if (!minSalePrice || +minSalePrice < 0) {
      return fail(null, "产品价格不符合要求", CODE.PARAM_ERROR)
    }
    if (!resume) {
      return fail(null, "产品描述为空", CODE.PARAM_ERROR)
    }

    const data = await Product.create({
      title,
      min_sale_price: minSalePrice,
      resume
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
    const { title, product_status } = ctx.query
    const where = {}

    if (title !== undefined) {
      where.title = {
        [Op.substring]: title
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
    const { title, minSalePrice, resume } = ctx.request.body

    if (!id) {
      return fail(null, "参数 id 为空", CODE.PARAM_ERROR)
    }
    const updateParams = { }
    if (title !== undefined && title !== '') {
      updateParams.title = title
    }
    if (minSalePrice !== undefined) {
      if (+minSalePrice <= 0) {
        return fail(null, "参数 minSalePrice 无效", CODE.PARAM_ERROR)
      }
      updateParams.min_sale_price = minSalePrice
    }
    if (resume !== undefined && title !== '') {
      updateParams.min_sale_price = resume
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
