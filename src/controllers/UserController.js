const User = require('../models/users')

class UserController {
  static async add(user) {
    const res = await User.create(user)

    if (!res) {
      throw new Error('添加失败')
    }

    return res
  }

  static async update(obj) {
    const res = await User.update(obj, {
      where: {
        id: obj.id
      }
    })
    if (!res) {
      throw new Error('修改失败')
    }
    return res
  }

  static async find(userId) {
    if (!userId) {
      throw new Error('参数id为空')
    }
    const data = await User.findByPk(userId)
    // User.findOne({
    //     where:{
    //         id
    //     }
    // })
    if (!data) {
      throw new Error('查找失败')
    }
    return data
  }

  static async findAll(obj) {
    const data= await User.findAll()

    if (!data) {
      throw new Error('查询失败')
    }
    return data
  }

  static async delete(id) {
    const res = await User.destroy({
      where: {
        id
      }
    })
    if (!res) {
      throw new Error('删除失败')
    }
    return res
  }
}

module.exports = UserController
