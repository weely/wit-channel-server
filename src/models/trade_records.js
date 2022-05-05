const { Sequelize, DataTypes, Model } = require('sequelize')
const sequelize = require('../core/db')

class TradeRecord extends Model {}

TradeRecord.init({
  // 定义模型属性
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true
  },
  order_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  client_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cost: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  createdAt: {
    type: DataTypes.STRING,
    allowNull: false
  }
  // amount: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   validate: {
  //     min: 0
  //   }
  // },
}, {
  // 这是其他模型参数
  sequelize,
  modelName: 'trade_records',
  timestamps: false
});

module.exports = TradeRecord

