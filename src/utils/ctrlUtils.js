
async function checkUnique (Model, key, value) {
  if (!Model) {
    throw new Error(`Model 参数为空`)
  }
  if (!key || !value) {
    throw new Error(`key:${key} 或 value:${value} 为空`)
  }

  const obj = await Model.findOne({
    where: {
      [key]: value
    }
  })

  return obj ? true : false
}

module.exports = {
  checkUnique
}
