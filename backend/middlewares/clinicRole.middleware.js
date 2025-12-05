// middlewares/clinicRole.middleware.js
const ClinicUser = require("../models/users/ClinicUsermodel");

/**
 * Middleware: ensure the current user has one of the allowed roles within the clinic.
 * usage: requireClinicRole(['owner','admin'])
 */
function requireClinicRole(allowedRoles = []) {
  return async (req, res, next) => {
    try {
      const clinicId = req.params.clinicId || req.body.clinicId;
      if (!clinicId) return res.status(400).json({ error: "clinicId required" });

      const membership = await ClinicUser.findOne({ clinicId, userId: req.user.id, isActive: true });
      if (!membership) return res.status(403).json({ error: "Not a member of clinic" });

      // Owner string sometimes stored in Clinic.ownerUserId — treat owner as 'admin' here or check separately upstream
      if (allowedRoles.length && !allowedRoles.includes(membership.role)) {
        return res.status(403).json({ error: "Insufficient role" });
      }

      // attach membership for downstream use
      req.clinicMembership = membership;
      next();
    } catch (err) {
      console.error("requireClinicRole error", err);
      res.status(500).json({ error: "Server error" });
    }
  };
}

/**
 * Middleware: check permission string in membership.permissions array
 * usage: requireClinicPermission('clinic.manage')
 */
function requireClinicPermission(permission) {
  return async (req, res, next) => {
    try {
      const clinicId = req.params.clinicId || req.body.clinicId;
      if (!clinicId) return res.status(400).json({ error: "clinicId required" });

      const membership = await ClinicUser.findOne({ clinicId, userId: req.user.id, isActive: true });
      if (!membership) return res.status(403).json({ error: "Not a member of clinic" });

      if (membership.permissions && (membership.permissions.includes("all") || membership.permissions.includes(permission))) {
        req.clinicMembership = membership;
        return next();
      }

      return res.status(403).json({ error: "Insufficient permissions" });
    } catch (err) {
      console.error("requireClinicPermission error", err);
      res.status(500).json({ error: "Server error" });
    }
  };
}

module.exports = {
  requireClinicRole,
  requireClinicPermission,
};
