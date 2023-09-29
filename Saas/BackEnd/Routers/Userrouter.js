const express = require('express')
const router = express.Router();
const UserController = require("../Controllers/UserController");

router.post("/usersingup", UserController.UserSingUp);
router.post("/userlogin", UserController.UserLogin);
router.get("/getalluser", UserController.GetAllUser);
router.patch("/updatestatus/:_id", UserController.UpdateStatus)
router.post("/forgetpassword", UserController.ForgetPassword);


module.exports = router;