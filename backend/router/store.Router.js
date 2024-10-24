const express = require("express");
const router = express.Router();
const storecontrollers = require("../controllers/store.controllers");
const { verifyToken, isAdmin, isUser } = require("../middlewares/authJwt");

// Route สำหรับ CRUD ร้านค้า
router.post("/", [verifyToken, isAdmin], storecontrollers.create); // admin เท่านั้นที่สามารถสร้างร้านค้า
router.get("/", storecontrollers.getAll); // ผู้ใช้สามารถดูร้านค้าได้
router.get("/:storeId", [verifyToken, isUser], storecontrollers.getById); // ผู้ใช้สามารถดูร้านค้าได้
router.put("/:storeId", [verifyToken, isAdmin], storecontrollers.update); // admin เท่านั้นที่สามารถอัปเดตร้านค้า
router.delete("/:storeId", [verifyToken, isAdmin], storecontrollers.delete); // admin เท่านั้นที่สามารถลบร้านค้า

module.exports = router;
