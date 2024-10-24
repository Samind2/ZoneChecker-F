const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.SUser;

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"]; // ใช้ 'x-access-token' แทน 'Authorization'
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

// ฟังก์ชัน isAdmin และ isUser ไม่จำเป็นต้องมีการเปลี่ยนแปลง
const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.userId, {
    include: {
      model: db.SRole,
      through: {
        attributes: [], // ไม่ต้องการแสดงข้อมูลจากตาราง User_SRoles
      },
    },
  });
  // ตรวจสอบว่า user มีบทบาท admin
  if (user && user.SRoles && user.SRoles.length > 0) {
    const roles = user.SRoles.map((role) => role.dataValues.name); // เข้าถึงชื่อบทบาท
    console.log("User roles:", roles); // แสดงชื่อบทบาท
    if (roles.includes("admin")) {
      // เปลี่ยนเป็น 'admin'
      return next();
    }
  }
  return res.status(403).send({ message: "Require Admin Role!" });
};

const isUser = async (req, res, next) => {
  const user = await User.findByPk(req.userId);
  if (user) {
    next();
  } else {
    return res.status(403).send({ message: "Require User Role!" });
  }
};

module.exports = { verifyToken, isAdmin, isUser };
