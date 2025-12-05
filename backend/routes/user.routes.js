const router = require("express").Router();
const user = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");

router.get("/me", auth, user.me);

module.exports = router;
