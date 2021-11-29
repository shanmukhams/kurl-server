const Sequelize = require("sequelize");
const sequelize = require("../startup/db");

const User = sequelize.define("User", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  lurl: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  user: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  }
});

module.exports = User;