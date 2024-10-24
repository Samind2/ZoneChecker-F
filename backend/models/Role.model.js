// Role.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Role = sequelize.define("SRole", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Role;
