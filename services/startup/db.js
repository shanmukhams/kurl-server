const logger = require('./logging');
const config = require('config');
const Sequelize = require("sequelize");
const db = config.get('db');

//process.env.DATABASE_URL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

sequelize
  .authenticate()
  .then(() => {
    logger.info('Connection has been established successfully.');
  })
  .catch(err => {
    logger.error('Unable to connect to the database:', err);
  });

sequelize.sync().then(result=>{
  logger.info("success")
}).catch(err=>{
  logger.error(err)
})

module.exports = sequelize;
