const { Sequelize } = require("sequelize"); // นำเข้า Sequelize จากโมดูล sequelize
require("dotenv").config(); // นำเข้า dotenv เพื่อใช้ environment variables
const dbConfig = require("../config/db.config"); // นำเข้าการตั้งค่าฐานข้อมูลจากไฟล์ db.config
// สร้าง instance ของ Sequelize โดยใช้ค่าการตั้งค่าฐานข้อมูล
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST, // โฮสต์ของฐานข้อมูล
  dialect: dbConfig.dialect, // ประเภทของฐานข้อมูล (เช่น postgres, mysql เป็นต้น)
  dialectOptions: {
    ssl: {
      require: true, // ต้องการใช้การเชื่อมต่อแบบ SSL
      rejectUnauthorized: false, // ไม่ปฏิเสธการเชื่อมต่อที่ไม่ได้รับอนุญาต
    },
  },
});

// ฟังก์ชันทดสอบการเชื่อมต่อกับฐานข้อมูล
testConnection = async () => {
  try {
    // พยายามเชื่อมต่อกับฐานข้อมูล
    await sequelize.authenticate();
    console.log("Connection has been established successfully."); // แสดงข้อความว่าเชื่อมต่อสำเร็จ
  } catch (error) {
    // แสดงข้อผิดพลาดหากไม่สามารถเชื่อมต่อได้
    console.error("Unable to connect to the database:", error);
  }
};

// เรียกใช้ฟังก์ชันทดสอบการเชื่อมต่อ
testConnection();

// ส่งออก instance ของ sequelize เพื่อให้สามารถใช้งานในไฟล์อื่นๆ ได้
module.exports = sequelize;
