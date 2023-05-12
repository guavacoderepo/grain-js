const express = require("express");
const protect = require("../middlewares/authmiddleware")
const {
  handleLogin,
  handleRegister,
  handleForgotPassword,
  handleChangePassword,
  handleResetPasswordToken,
  handleResetPassword,
  handleFetchme
} = require("../controllers/authController");


const router = express.Router();

router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.get("/me", protect,handleFetchme);
router.put("/forgotpassword", handleForgotPassword);
router.put("/resetpasswordtoken/:resettoken", handleResetPasswordToken);
router.get("/resetpasswordtoken/:resettoken", handleResetPasswordToken);
router.post("/changepassword", protect, handleChangePassword);
router.post("/updatepassword", protect, handleResetPassword);

module.exports = router;
