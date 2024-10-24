// User.models.js
const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const User = sequelize.define("SUser", {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0.0,  // กำหนดค่าเริ่มต้นเป็น 0.0
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0.0,  // กำหนดค่าเริ่มต้นเป็น 0.0
  },
});

module.exports = User;
