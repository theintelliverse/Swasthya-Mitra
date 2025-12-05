const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const queue = require("../controllers/queue.controller");

router.post("/add", auth, queue.addToQueue);
router.get("/status", auth, queue.getStatus);
router.post("/next", auth, queue.moveNext);
router.post("/skip", auth, queue.skip);
router.post("/recall", auth, queue.recall);
router.post("/complete", auth, queue.complete);

module.exports = router;
