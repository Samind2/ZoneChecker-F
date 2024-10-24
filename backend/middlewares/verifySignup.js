const User = require("../models/User.models")
const Role = require("../models/Role.model")
const {Op} = require("sequelize")

checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
      let user = await User.findOne({ where: { userName: req.body.userName } });
      if (user) {
        res.status(400).send({ message: "ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว!" });
        return;
      }
  
      user = await User.findOne({ where: { email: req.body.email } });
      if (user) {
        res.status(400).send({ message: "อีเมลนี้ถูกใช้ไปแล้ว!" });
        return;
      }
  
      next();
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
  //Check rold are valid
checkRolesExisted = async (req, res, next) => {
    if (req.body.roles) {
      try {
        const roles = await Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        });
  
        if (roles.length !== req.body.roles.length) {
          res.status(400).send({ message: "Failed! Role does not exist" });
          return;
        }
        next();
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    } else {
      next();
    }
  };

  const verifySignup = {
    checkRolesExisted,
    checkDuplicateUsernameOrEmail,
  };
  module.exports = verifySignup;