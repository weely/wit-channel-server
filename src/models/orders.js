const { Sequelize, DataTypes, Model } = require('sequelize')
const sequelize = require('../core/db')

class Order extends Model {}

Order.init({
  // 定义模型属性
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true
  },
  product_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  client_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cost: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  // 订单状态： 0: 待支付，1。已支付，2。已成交、3.已取消，4.已退单
  status: {
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

