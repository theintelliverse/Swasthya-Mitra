// routes/notification.routes.js
const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const notif = require("../controllers/notification.controller");
const { requireClinicRole } = require("../middlewares/clinicRole.middleware");

// send (staff/admin)
router.post("/send", auth, requireClinicRole(["admin","staff"]), notif.send);

// dispatch manual
router.post("/dispatch/:id", auth, requireClinicRole(["admin","staff"]), notif.dispatchNow);

// get notification
router.get("/:id", auth, requireClinicRole(["admin","staff"]), notif.get);

module.exports = router;
