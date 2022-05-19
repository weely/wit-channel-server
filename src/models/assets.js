const { Sequelize, DataTypes, Model } = require('sequelize')
const sequelize = require('../core/db')

class Asset extends Model {}

Asset.init({
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // 0: swiper 图片， 1：'', 2: ''
  asset_type: {
    type: Sequelize.TINYINT.UNSIGNED,
    allowNull: false,
    defaultValue: 0
  },
  // 状态： 0: 
  asset_status: {
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
  modelName: 'Asset' // 我们需要选择模型名称
});

module.exports = Asset

