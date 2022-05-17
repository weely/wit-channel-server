const { Sequelize, DataTypes, Model } = require('sequelize')
const sequelize = require('../core/db')

class TradeRecord extends Model {}

TradeRecord.init({
  // 定义模型属性
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true
  },
  order_id: {
    type: DataTypes.STRING(16),
    allowNull: false,
    unique: true
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
  createdAt: {
    type: DataTypes.STRING(20),
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
