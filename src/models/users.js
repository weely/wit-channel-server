const { Sequelize, DataTypes, Model } = require('sequelize')
const sequelize = require('../core/db')

class User extends Model {}

User.init({
  // 定义模型属性
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true
  },
  loginname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[0-9a-z-#_]{2,16}$/i,
      notNull: {
        msg: '请输入登录名'
      }
    },
    unique: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: '请输入用户名'
      }
    }
  },
  passsalt: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: 32
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: 32
    },
    defaultValue: 'e10adc3949ba59abbe56e057f20f883e'
  },
  // 账户类型： 0: 普通用户，1：管理员
  account_type: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  // 账户状态： 0: 正常，4：删除
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  // 这是其他模型参数
  sequelize, // 我们需要传递连接实例
  modelName: 'User' // 我们需要选择模型名称
});

module.exports = User

