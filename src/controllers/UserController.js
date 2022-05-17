const { Op } = require("sequelize")
const User = require('../models/users')
const { generateToken, encryptionPwd, generateSalt } = require('../utils/auth')
const { defaultPwd } = require('../config/config')
const { success, fail, CODE } = require('../utils/utils')
const { wxLoginApi } = require('../api/wx-api')

const safeAttrs = ['id', 'loginname', 'username', 'user_type', 'createdAt', 'updatedAt']
const validLogin = /^[0-9a-z-#_]{2,16}$/i

class UserController {

  static async hasUserFunc (loginname) {
    if (!loginname) {
      throw new Error('参数 loginname 为空')
    }
    const user = await User.findOne({
      where: {
        loginname
      }
    })

    return user ? true : false
  }

  static async register(ctx) {
    const { loginname, username=loginname, password, password2 } = ctx.request.body

    if (!loginname) {
      return fail(null, "登录名不能未空", CODE.PARAM_ERROR)
    }
    if (!validLogin.test(loginname)) {
      return fail(null, "登录名为字母、数字及“#-”等特殊字符组成", CODE.PARAM_ERROR)
    }
    if (!password) {
      return fail(null, "密码不能为空", CODE.PARAM_ERROR)
    }
    if (!password2) {
      return fail(null, "请输入确认密码", CODE.PARAM_ERROR)
    }
    if (password.trim() !== password2.trim()) {
      return fail(null, "输入二次密码不一致", CODE.PARAM_ERROR)
    }
    const hasUser = await UserController.hasUserFunc(loginname)
    if (hasUser) {
      return fail(null, "用户已存在", CODE.PARAM_ERROR)
    }
    const salt = generateSalt()
    const encryptPwd = encryptionPwd(password.trim(), salt)
    const user = await User.create({
      loginname: loginname.trim(),
      username: username.trim(),
      passsalt: salt,
      password: encryptPwd
    })

    if (!user) {
      return fail(null, "注册失败", CODE.BUSINESS_ERROR)
    }

    return success({
      id: user.id,
      loginname: user.loginname,
      username: user.username
    })
  }

  static async wxLogin(ctx){
    const { code } = ctx.query
    if (!code) {
      throw new Error('参数 code 为空')
    }
    const res = await wxLoginApi(code)
    const { openid, unionid } = res.data
    if (!openid) {
      return fail(res.data, `微信登录失败：errmsg: ${JSON.stringify(res.data)}`, CODE.PARAM_ERROR)
    }

    try {
      let user = await User.findOne({
        attributes: ['id','username', 'mobile'],
        where: {
          openid: openid
        }
      })
      if (!user) {
        const salt = generateSalt()
        const encryptPwd = encryptionPwd(openid.trim(), salt)
        user = await User.create({
          loginname: openid,
          username: '微信用户',
          openid: openid,
          unionid: unionid,
          passsalt: salt,
          password: encryptPwd
        })
      }
      const access_token = generateToken(openid)
  
      return {
        access_token: access_token,
        userInfo: {
          id: user.id,
          username: user.username,
          mobile: user.mobile
        },
        ...res.data
      }
    } catch(err) {
      const errmsg = typeof err === 'string' ? err : JSON.stringify(err)
      ctx.logger.error(errmsg)

      return res.data
    }
  }

  static async login(ctx) {
    const { loginname, password } = ctx.request.body
    if (!loginname) {
      return fail(null, "请输入登录名", CODE.PARAM_ERROR)
    }
    if (!password) {
      return fail(null, "请输入密码", CODE.PARAM_ERROR)
    }

    const user = await User.findOne({
      attributes: ['id', 'password', 'passsalt'],
      where: {
        loginname
      }
    })

    if (!user) {
      return fail(null, "登录失败，账户不存在", CODE.PARAM_ERROR)
    }
    if (encryptionPwd(password.trim(), user.passsalt) !== user.password) {

      return fail(null, "登录失败，账户密码不匹配", CODE.PARAM_ERROR)
    }
    const token = generateToken(loginname)

    return success({ token: token })
  }
  
  static async find(ctx) {
    const { id } = ctx.params

    if (!id) {
      return fail(null, "参数 id 为空", CODE.PARAM_ERROR)
    }
    const user = await User.findByPk(id)
    if (!user) {
      return fail(null, "用户不存在", CODE.BUSINESS_ERROR)
    }

    const data = safeAttrs.reduce((pre, k) => {
      pre[k] = user[k]
      return pre
    }, {})

    return success(data)
  }

  static async findAll(ctx) {
    const { id, username, user_type } = ctx.query
    const where = {}
    if (id !== undefined) {
      const ids = id.split(',')
      where.id = {
        [Op.in]: ids
      }
    }
    if (username !== undefined) {
      where.username = {
        [Op.substring]: username
      }
    }
    if (user_type !== undefined) {
      where.user_type = user_type
    }

    const data= await User.findAll({
      attributes: [...safeAttrs],
      where
    })

    return success(data)
  }

  static async update(ctx) {
    const { id } = ctx.params
    const { username, user_type, mobile } = ctx.request.body

    if (!id) {
      return fail(null, "参数 id 为空", CODE.PARAM_ERROR)
    }
    const updateParams = { }
    if (username !== undefined) {
      updateParams.username = username
    }
    if (user_type !== undefined ) {
      updateParams.user_type = user_type
    }
    if (mobile !== undefined ) {
      updateParams.mobile = mobile
    }

    await User.update(updateParams, {
      where: {
        id: id
      }
    })

    return success({ id })
  }

  static async resetPwd(ctx) {
    const { id } = ctx.query
    if (!id) {
      return fail(null, "未找到账户", CODE.PARAM_ERROR)
    }
    const passsalt = generateSalt()
    const password = encryptionPwd(defaultPwd, passsalt)
    await User.update({
      passsalt,
      password
    }, {
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
    // await User.destroy
    await User.update({
      user_status: 4
    },{
      where: {
        id
      }
    })

    return success({})
  }
}

module.exports = UserController
