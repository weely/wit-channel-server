const { Op } = require("sequelize")
const User = require('../models/users')
const { generateToken, encryptionPwd, generateRandomStr } = require('../utils/auth')
const { success, fail, CODE } = require('../utils/utils')
const { isNull } = require('../utils/app')
const safeAttrs = ['id', 'loginname', 'username', 'mobile', 'openid', 'unionid','user_type', 'createdAt', 'updatedAt']

class UserController {

  static async register(ctx) {
    const { loginname, username=loginname, password, password2 } = ctx.request.body
    if (isNull(loginname)) {
      return fail(null, "登录名不能未空", CODE.PARAM_ERROR)
    }
    const validLogin = /^[0-9a-z-#_]{2,16}$/i
    if (!validLogin.test(loginname)) {
      return fail(null, "登录名为字母、数字及“#-”等特殊字符组成", CODE.PARAM_ERROR)
    }
    if (isNull(password)) {
      return fail(null, "密码不能为空", CODE.PARAM_ERROR)
    }
    if (isNull(password2)) {
      return fail(null, "请输入确认密码", CODE.PARAM_ERROR)
    }
    if (password.trim() !== password2.trim()) {
      return fail(null, "输入二次密码不一致", CODE.PARAM_ERROR)
    }
    const { checkUnique } = require('../utils/ctrlUtils')

    const hasUser = await checkUnique(User, 'loginname', loginname)
    if (hasUser) {
      return fail(null, "用户已存在", CODE.PARAM_ERROR)
    }
    const salt = generateRandomStr()
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
    const { mobile='', username='微信用户' } = ctx.request.body
    if (!code) {
      throw new Error('参数 code 为空')
    }
    const { wxLoginApi } = require('../api/wx-api')
    const res = await wxLoginApi(code)
    const { openid, unionid } = res.data

    if (isNull(openid)) {
      return fail(res.data, `微信登录失败：errmsg: ${JSON.stringify(res.data)}`, CODE.PARAM_ERROR)
    }

    let user = await User.findOne({
      attributes: ['id','username', 'mobile'],
      where: {
        openid: openid
      }
    })
    if (!user) {
      const salt = generateRandomStr()
      const encryptPwd = encryptionPwd(openid.trim(), salt)

      user = await User.create({
        loginname: openid,
        username: username,
        mobile: mobile,
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
  }

  static async login(ctx) {
    const { loginname, password } = ctx.request.body
    if (isNull(loginname)) {
      return fail(null, "请输入登录名", CODE.PARAM_ERROR)
    }
    if (isNull(password)) {
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

    if (isNull(id)) {
      return fail(null, "参数 id 为空", CODE.PARAM_ERROR)
    }
    const user = await User.findByPk(id, { raw: true })
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
    const { id, username, user_type, pageNo=1, pageSize=1000 } = ctx.query
    const where = {}
    if (!isNull(id)) {
      const ids = id.split(',')
      where.id = {
        [Op.in]: ids
      }
    }
    if (!isNull(username)) {
      where.username = {
        [Op.substring]: username
      }
    }
    if (!isNull(user_type)) {
      where.user_type = user_type
    }
    const pager = require('../utils/pager').pager(pageNo, pageSize)

    const data= await User.findAll({
      attributes: [...safeAttrs],
      ...pager,
      where
    })

    return success(data)
  }

  static async update(ctx) {
    const { id } = ctx.params
    const { username, user_type, mobile } = ctx.request.body

    if (isNull(id)) {
      return fail(null, "参数 id 为空", CODE.PARAM_ERROR)
    }
    const updateParams = { }
    if (!isNull(username)) {
      updateParams.username = username
    }
    if (!isNull(mobile)) {
      updateParams.mobile = mobile
    }
    if (!isNull(user_type)) {
      updateParams.user_type = user_type
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
    if (isNull(id)) {
      return fail(null, "未找到账户", CODE.PARAM_ERROR)
    }
    const { defaultPwd } = require('../config/config')
    const passsalt = generateRandomStr()
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
    if (isNull(id)) {
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
