const router = require("express").Router();
const aiController = require("../controllers/ai.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/predict", auth, aiController.predictWaitTime);

module.exports = router;
