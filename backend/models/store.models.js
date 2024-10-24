const { DataTypes } = require("sequelize");
const sequelize = require("./db");

// กำหนด Schema ของฐานข้อมูลสำหรับตาราง Store
const store = sequelize.define("store", {
  storeId: {
    type: DataTypes.INTEGER, // ประเภทข้อมูลเป็นจำนวนเต็ม
    primaryKey: true, // กำหนดให้เป็น Primary Key
    autoIncrement: true, // ให้ค่าเพิ่มขึ้นอัตโนมัติเมื่อเพิ่มข้อมูลใหม่
  },
  storeName: {
    type: DataTypes.STRING, // ประเภทข้อมูลเป็นข้อความ
    allowNull: false, // ไม่อนุญาตให้ค่านี้เป็นค่าว่าง
  },
  adminId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "SUsers",
      key: "userId",
    },
  },
  address: {
    type: DataTypes.STRING, // ประเภทข้อมูลเป็นข้อความ
    allowNull: false, // ไม่อนุญาตให้ค่านี้เป็นค่าว่าง
    unique: true, // กำหนดให้ที่อยู่มีค่าไม่ซ้ำกัน
  },
  latitude: {
    type: DataTypes.FLOAT, // เก็บตัวเลขแบบทศนิยม
    allowNull: false, // ไม่อนุญาตให้ค่านี้เป็นค่าว่าง
  },
  longitude: {
    type: DataTypes.FLOAT, // เก็บตัวเลขแบบทศนิยม
    allowNull: false, // ไม่อนุญาตให้ค่านี้เป็นค่าว่าง
  },
  deliveryRadius: {
    type: DataTypes.FLOAT, // เก็บตัวเลขแบบทศนิยม
    allowNull: false, // ไม่อนุญาตให้ค่านี้เป็นค่าว่าง
  },
});

// สร้างตารางในฐานข้อมูลโดยไม่ลบข้อมูลเก่า
// store
//   .sync({ alter: true })
//   .then(() => {
//     console.log("store table created successfully.");
//   })
//   .catch((err) => {
//     console.log("Failed to create table:", err);
//   });

module.exports = store;
