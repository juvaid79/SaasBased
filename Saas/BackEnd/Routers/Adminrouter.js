const express = require("express");
const router = express.Router();
const AdminController = require('../Controllers/AdminController')

router.post("/adminsingup", AdminController.AdminSingUp)
router.post("/adminlogin", AdminController.AdminLogin)
module.exports = router;
