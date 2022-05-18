const { Sequelize, DataTypes, Model } = require('sequelize')
const sequelize = require('../core/db')

class Product extends Model {}

Product.init({
  // 定义模型属性
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  min_sale_price: {
    type: DataTypes.BIGINT,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  max_sale_price: {
    type: DataTypes.BIGINT,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  primary_image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resume: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  images: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  product_type: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: false,
    defaultValue: 0
  },
  // 产品状态： 默认： 0：待上线，1，正常可用，4：删除
  product_status: {
    type: DataTypes.TINYINT.UNSIGNED,
    allowNull: false,
    defaultValue: 0
  }
}, {
  // 这是其他模型参数
  sequelize, // 我们需要传递连接实例
  modelName: 'Product' // 我们需要选择模型名称
});

module.exports = Product
