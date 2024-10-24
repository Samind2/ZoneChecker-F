require("dotenv").config();

module.exports = {
  HOST: process.env.POSTGRES_HOST, // แก้ให้ตรงกับในไฟล์ .env
  USER: process.env.POSTGRES_USER, // แก้ให้ตรงกับในไฟล์ .env
  PASSWORD: process.env.POSTGRES_PASSWORD, // แก้ให้ตรงกับในไฟล์ .env
  DB: process.env.POSTGRES_DATABASE, // แก้ให้ตรงกับในไฟล์ .env
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
