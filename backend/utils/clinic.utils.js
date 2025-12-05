// utils/clinic.utils.js
const ClinicUser = require("../models/users/ClinicUsermodel");

/**
 * Helper: get membership for user & clinic (returns null if not found)
 */
async function getMembership(userId, clinicId) {
  return ClinicUser.findOne({ userId, clinicId, isActive: true });
}

/**
 * Helper: check if user has at least one of the roles
 */
async function hasRole(userId, clinicId, roles = []) {
  const m = await getMembership(userId, clinicId);
  if (!m) return false;
  return roles.includes(m.role) || (m.permissions && m.permissions.includes("all"));
}

module.exports = {
  getMembership,
  hasRole,
};
