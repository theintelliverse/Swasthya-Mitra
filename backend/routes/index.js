const router = require("express").Router();

router.use("/auth", require("./auth.routes"));
router.use("/clinics", require("./clinic.routes"));
router.use("/users", require("./user.routes"));
router.use("/queue", require("./queue.routes")); 
router.use("/clinics", require("./clinicUser.routes"));
router.use("/appointments", require("./appointment.routes"));
router.use("/doctor", require("./doctor.routes"));
router.use("/patient", require("./patient.routes"));
router.use("/admin", require("./admin.routes"));
router.use("/notifications", require("./notification.routes"));
router.use("/queue-display", require("./queueDisplay.routes"));


module.exports = router;
