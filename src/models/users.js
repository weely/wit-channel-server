const { Sequelize, DataTypes, Model } = require('sequelize')
const sequelize = require('../core/db')

class User extends Model {}

User.init({
  // 定义模型属性
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true
  },
  loginname: {
    type: DataTypes.STRING(32),
    allowNull: false,
    validate: {
      notNull: {
        msg: '请输入登录名'
      }
    },
    unique: true
  },
  username: {
    type: DataTypes.STRING(32),
    allowNull: false,
    validate: {
      notNull: {
        msg: '请输入用户名'
      }
    }
  },
  openid: {
    type: DataTypes.STRING(28),
    allowNull: false,
    defaultValue: ''
  },
  unionid: {
    type: DataTypes.STRING(28),
    allowNull: false,
    defaultValue: ''
  },
  mobile: {
    type: DataTypes.STRING(18),
    allowNull: false,
    defaultValue: ''
  },
  passsalt: {
    type: DataTypes.STRING(32),
    allowNull: false,
    validate: {
      len: 32
    }
  },
  password: {
    type: DataTypes.STRING(32),
    allowNull: false,
    validate: {
      len: 32
    },
    defaultValue: 'e10adc3949ba59abbe56e057f20f883e'
  },
  // 账户类型： 0: 普通用户，1：管理员
  user_type: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: false,
    defaultValue: 0
  },
  // 账户状态： 0: 正常，4：删除
  user_status: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: false,
    defaultValue: 0
  }
}, {
  // 这是其他模型参数
  sequelize, // 我们需要传递连接实例
  modelName: 'User' // 我们需要选择模型名称
});

module.exports = User

