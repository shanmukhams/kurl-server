const Sequelize = require("sequelize");
const sequelize = require("../startup/db");


const Log = sequelize.define("Log", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  kurl: {
    type: Sequelize.STRING
  },
  lurl: {
    type: Sequelize.STRING
  },
  user: {
    type: Sequelize.STRING
  },
  action: {
    type: Sequelize.STRING
  }
});

module.exports = Log;