const { Sequelize } = require('sequelize')
const config = require('../config/default.js')

const sequelize = new Sequelize({
  /*dialect: 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
  dialect: 'mysql',
  host: config.db.host,
  username: config.db.USERNAME,
  password: config.db.PASSWORD,
  database: config.db.DATABASE,
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  },
  //解决中文输入问题
  define: {
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci'
    }
  }
})

async function testConnection(){
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

sequelize.testConnection = testConnection

module.exports = sequelize
