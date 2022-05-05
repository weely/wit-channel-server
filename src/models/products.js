const { Sequelize, DataTypes, Model } = require('sequelize')
const sequelize = require('../core/db')

class Product extends Model {}

Product.init({
  // 定义模型属性
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(6, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  type: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0
  },
  describe: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // 产品状态： 默认： 1，正常可用，0：未上线，4：删除
  status: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 1
  }
}, {
  // 这是其他模型参数
  sequelize, // 我们需要传递连接实例
  modelName: 'Product' // 我们需要选择模型名称
});

module.exports = Product
