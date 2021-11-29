const Sequelize = require("sequelize");
const sequelize = require("../startup/db");

const Url = sequelize.define("Url", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  lurl: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  kurl: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  extraChar:{
    type:Sequelize.STRING
  }
});

module.exports = Url;