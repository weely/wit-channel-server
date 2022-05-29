const { Sequelize, DataTypes, Model } = require('sequelize')
const sequelize = require('../core/db')

class Order extends Model {}

Order.init({
  // 定义模型属性
  id: {
    type: DataTypes.STRING(16),
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  product_id: {
    type: Sequelize.INTEGER.UNSIGNED,
    allowNull: false,
  },
  client_id: {
    type: DataTypes.STRING(24),
    allowNull: false
  },
  cost: {
    type: DataTypes.BIGINT,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  mobile: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  receiving_addr: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  // amount: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   validate: {
  //     min: 0
  //   }
  // },
  // 订单状态： 0: 待确认，1: 已接单，2: 已取消
  status: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0
  },
  // 订单状态： 0: 待支付，2: 已支付，3: 已取消
  pay_status: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0
  },
  remark: {
    type: DataTypes.STRING
  }
}, {
  // 这是其他模型参数
  sequelize, // 我们需要传递连接实例
  modelName: 'Order' // 我们需要选择模型名称
});

module.exports = Order

