// routes/queueDisplay.routes.js
const router = require("express").Router();
const controller = require("../controllers/queueDisplay.controller");

router.get("/", controller.getDisplay);

module.exports = router;
