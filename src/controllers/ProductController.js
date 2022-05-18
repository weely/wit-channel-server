const { Op } = require("sequelize")
const Product = require('../models/products')
const { success, fail, CODE } = require('../utils/utils')

class ProductController {

  static async add(ctx) {

    const { isNull, jsonStrify } = require('../utils/app')

    const { title, resume, minSalePrice, maxSalePrice, primaryImage, productDetail } = ctx.request.body

    if (isNull(title)) {
      return fail(null, "产品名称为空，请补充产品名称", CODE.PARAM_ERROR)
    }
    const { checkUnique } = require('../utils/ctrlUtils')
    const exitsProduct = await checkUnique(Product, 'title', title)
    if (exitsProduct){
      return fail(null, "产品已存在，产品不能重复", CODE.PARAM_ERROR)
    }
    if (isNull(resume)) {
      return fail(null, "产品简介为空，请补充产品简介", CODE.PARAM_ERROR)
    }
    if (isNull(minSalePrice) || +minSalePrice < 0) {
      return fail(null, "产品价格不符合要求", CODE.PARAM_ERROR)
    }
    const max_sale_price = (isNull(maxSalePrice) || +maxSalePrice < 0) ? +minSalePrice : +maxSalePrice
    const { defaultProductIcon } = require('../config/config')
    const primary_image = primaryImage || defaultProductIcon
    const product_detail = jsonStrify(productDetail)

    console.log(typeof product_detail, product_detail)
    
    const data = await Product.create({
      title,
      resume,
      min_sale_price: +minSalePrice,
      max_sale_price,
      primary_image,
      product_detail
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
    const data = await Product.findByPk(id, { raw: true })
    if (!data) {
      return fail(null, "产品不存在", CODE.BUSINESS_ERROR)
    }
    const { formatKebabToCamelObj } = require('../utils/app')
    const {product_detail, ...rest} = data
    const { images=[] } = JSON.parse(product_detail)

    return success({
      ...formatKebabToCamelObj(rest),
      images
    })
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
      where,
      raw: true
    })
    const { formatKebabToCamelObj } = require('../utils/app')
    const res = data.map((item) => {
      const {product_detail, ...res} = item
      const { images=[] } = JSON.parse(product_detail)
      return {
        ...formatKebabToCamelObj(res),
        images
      }
    })

    return success(res)
  }

  static async update(ctx) {
    const { id } = ctx.params
    const { title, resume, minSalePrice, maxSalePrice, primaryImage, productDetail } = ctx.request.body

    if (!id) {
      return fail(null, "参数 id 为空", CODE.PARAM_ERROR)
    }
    const { isNull, jsonStrify } = require('../utils/app')

    const updateParams = { }
    if (!isNull(title)) {
      updateParams.title = title
    }
    if (!isNull(resume)) {
      updateParams.resume = resume
    }
    if (!isNull(minSalePrice)) {
      if (+minSalePrice <= 0) {
        return fail(null, "参数 minSalePrice 无效", CODE.PARAM_ERROR)
      }
      updateParams.min_sale_price = parseInt(minSalePrice)
    }
    if (!isNull(maxSalePrice)) {
      if (+maxSalePrice <= 0) {
        return fail(null, "参数 maxSalePrice 无效", CODE.PARAM_ERROR)
      }
      if (+maxSalePrice < +minSalePrice) {
        return fail(null, "参数minSalePrice 不能大于 maxSalePrice", CODE.PARAM_ERROR)
      }
      updateParams.max_sale_price = parseInt(maxSalePrice)
    }
    if (!isNull(primaryImage)) {
      updateParams.primaryImage = primaryImage
    }
    if (!isNull(productDetail)) {
      updateParams.productDetail = jsonStrify(productDetail)
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
