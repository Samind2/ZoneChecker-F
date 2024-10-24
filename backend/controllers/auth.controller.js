require("dotenv").config(); // โหลดค่า.env
const { Op } = require("sequelize");
const User = require("../models/User.models"); // นำเข้าโมเดล User จากไฟล์โมเดลที่เกี่ยวข้อง
const Role = require("../models/Role.model");
const bcrypt = require("bcryptjs"); // ใช้ bcrypt เพื่อเข้ารหัสรหัสผ่าน
const jwt = require("jsonwebtoken"); // ใช้ jwt เพื่อสร้าง JSON Web Token สำหรับการยืนยันตัวตน
const config = require("../config/auth.config");

exports.signup = async (req, res) => {
  const { userName, email, password, address, latitude, longitude, roles } =
    req.body;

  if (!userName || !email || !password || !address) {
    return res.status(400).send({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  //การเข้ารหัสรหัสผ่านด้วย bcrypt
  const hashedPassword = bcrypt.hashSync(password, 8); // เข้ารหัสรหัสผ่าน

  try {
    const user = await User.create({
      // สร้างผู้ใช้ใหม่
      userName,
      email,
      password: hashedPassword,
      address,
      latitude: latitude || null, // ถ้าไม่มีข้อมูลจะใส่เป็น null
      longitude: longitude || null, // ถ้าไม่มีข้อมูลจะใส่เป็น null
    });

    if (roles) {
      const roleEntities = await Role.findAll({
        where: { name: { [Op.or]: roles } },
      });
      await user.addSRole(roleEntities); // กำหนดบทบาทให้กับผู้ใช้
    } else {
      await user.setSRole([1]); // กำหนดบทบาทเริ่มต้น
    }

    res.send({ message: "ผู้ใช้ลงทะเบียนสำเร็จ!" });
  } catch (error) {
    res.status(500).send({
      message: error.message || "เกิดข้อผิดพลาดระหว่างการสร้างผู้ใช้.",
    });
  }
};

exports.signin = async (req, res) => {
  // ค้นหาชื่อผู้ใช้จากตาราง User โดยใช้ userName ในการหา
  const { userName, password } = req.body;

  // ตรวจสอบว่ามรผู้ใช้หรือไม่
  try {
    const user = await User.findOne({ where: { userName: userName } });

    if (!user) {
      return res.status(404).send({ message: "ไม่พบผู้ใช้." });
    }

    // ตรวจสอบรหัสผ่าน
    const passwordIsValid = bcrypt.compareSync(password, user.password); // ตรวจสอบรหัสผ่าน
    if (!passwordIsValid) {
      return res
        .status(401)
        .send({ accessToken: null, message: "รหัสผ่านไม่ถูกต้อง!" });
    }

    // สร้าง JWT token
    const token = jwt.sign({ id: user.userId }, config.secret, {
      expiresIn: 86400, // 24 ชั่วโมง
    });

    // ดึงบทบาทของผู้ใช้
    const authorities = [];
    const roles = await user.getSRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }

    // ส่งข้อมูลของผู้ใช้กลับไป
    res.status(200).send({
      id: user.userId,
      userName: user.userName,
      email: user.email,
      address: user.address,
      latitude: user.latitude, // เพิ่ม latitude
      longitude: user.longitude,
      roles: authorities,
      accessToken: token,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "เกิดข้อผิดพลาดระหว่างการเข้าสู่ระบบ.",
    });
  }
};
