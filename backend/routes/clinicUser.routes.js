// routes/clinicUser.routes.js
const router = require("express").Router({ mergeParams: true });
const userCtrl = require("../controllers/clinicUser.controller");
const auth = require("../middlewares/auth.middleware");
const { requireClinicRole } = require("../middlewares/clinicRole.middleware");

// Add or update user in clinic - admin only
router.post("/:clinicId/users", auth, requireClinicRole(["admin"]), userCtrl.addUser);

// List users - admin/staff can list
router.get("/:clinicId/users", auth, requireClinicRole(["admin", "staff"]), userCtrl.listUsers);

// Update membership - admin only
router.put("/:clinicId/users/:clinicUserId", auth, requireClinicRole(["admin"]), userCtrl.updateUser);

// Remove user - admin only
router.delete("/:clinicId/users/:clinicUserId", auth, requireClinicRole(["admin"]), userCtrl.removeUser);

module.exports = router;
