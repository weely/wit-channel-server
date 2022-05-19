
/**
 * 检查 model 是否已经存在
 * @param {*} Model 
 * @param {*} key 查询 key
 * @param {*} value 查询 value
 * @param {*} options 其他匹配条件
 * { operator, key, value }
 * @returns 
 */
async function checkUnique (Model, key, value, options=null) {
  if (!Model) {
    throw new Error(`Model 参数为空`)
  }
  if (!key || !value) {
    throw new Error(`key:${key} 或 value:${value} 为空`)
  }
  const where = {
    [key]: value
  }
  if (options && options.operator && options.key && options.value){
    where[options.key] = {
      [options.operator]: options.value
    }
  }

  const obj = await Model.findOne({
    where: where,
    raw: true
  })

  return obj ? true : false
}

module.exports = {
  checkUnique
}
