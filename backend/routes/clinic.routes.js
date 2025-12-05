// routes/clinic.routes.js
const router = require("express").Router();
const clinicCtrl = require("../controllers/clinic.controller");
const { requireClinicRole, requireClinicPermission } = require("../middlewares/clinicRole.middleware");
const auth = require("../middlewares/auth.middleware");

// Create clinic
router.post("/", auth, clinicCtrl.createClinic);

// List clinics for user
router.get("/my-clinics", auth, clinicCtrl.getMyClinics);

// Get single clinic
router.get("/:clinicId", auth, clinicCtrl.getClinic);

// Update clinic (admin or owner)
router.put("/:clinicId", auth, requireClinicRole(["admin"]), clinicCtrl.updateClinic);

// Delete clinic (owner only) -- we treat owner as admin in membership; if you use explicit owner field check, add extra check
router.delete("/:clinicId", auth, requireClinicRole(["admin"]), clinicCtrl.deleteClinic);

module.exports = router;
