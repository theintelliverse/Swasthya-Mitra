const router = require("express").Router();
const auth = require("../controllers/auth.controller");

router.post("/send-otp", auth.sendOtp);
router.post("/verify-otp", auth.verifyOtp);
router.post("/register", auth.register);
router.post("/login", auth.login);

module.exports = router;
