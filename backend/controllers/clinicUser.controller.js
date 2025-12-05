// controllers/clinicUser.controller.js
const ClinicUser = require("../models/users/ClinicUsermodel");
const Clinic = require("../models/users/Clinicmodel");
const mongoose = require("mongoose");

/**
 * Add a user to a clinic (admin/owner only)
 * body: { userId, role, permissions }
 */
exports.addUser = async (req, res) => {
  try {
    const { clinicId } = req.params;
    const { userId, role, permissions } = req.body;

    if (!mongoose.isValidObjectId(userId)) return res.status(400).json({ error: "Invalid userId" });
    if (!role) return res.status(400).json({ error: "Role required" });

    const clinic = await Clinic.findById(clinicId);
    if (!clinic) return res.status(404).json({ error: "Clinic not found" });

    // Upsert membership
    const membership = await ClinicUser.findOneAndUpdate(
      { clinicId, userId },
      { $set: { role, permissions: permissions || [], isActive: true } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return res.json({ message: "User added/updated in clinic", membership });
  } catch (err) {
    console.error("addUser error", err);
    return res.status(500).json({ error: "Server error" });
  }
};

/**
 * Remove a user from clinic (admin/owner only)
 */
exports.removeUser = async (req, res) => {
  try {
    const { clinicId, clinicUserId } = req.params;

    const membership = await ClinicUser.findOne({ _id: clinicUserId, clinicId });
    if (!membership) return res.status(404).json({ error: "Membership not found" });

    // Soft deactivate
    membership.isActive = false;
    await membership.save();

    return res.json({ message: "User removed from clinic" });
  } catch (err) {
    console.error("removeUser error", err);
    return res.status(500).json({ error: "Server error" });
  }
};

/**
 * Update role/permissions of a clinic user (admin/owner only)
 * body: { role, permissions, isActive }
 */
exports.updateUser = async (req, res) => {
  try {
    const { clinicId, clinicUserId } = req.params;
    const updates = {};
    const allowed = ["role", "permissions", "isActive"];

    allowed.forEach(k => { if (req.body[k] !== undefined) updates[k] = req.body[k]; });

    if (Object.keys(updates).length === 0) return res.status(400).json({ error: "Nothing to update" });

    const membership = await ClinicUser.findOneAndUpdate(
      { _id: clinicUserId, clinicId },
      { $set: updates },
      { new: true }
    );

    if (!membership) return res.status(404).json({ error: "Membership not found" });

    return res.json({ message: "Membership updated", membership });
  } catch (err) {
    console.error("updateUser error", err);
    return res.status(500).json({ error: "Server error" });
  }
};

/**
 * List clinic users (optionally filter by role)
 */
exports.listUsers = async (req, res) => {
  try {
    const { clinicId } = req.params;
    const { role } = req.query;

    const filter = { clinicId, isActive: true };
    if (role) filter.role = role;

    const users = await ClinicUser.find(filter).populate("userId", "-__v -passwordHash");
    return res.json({ users });
  } catch (err) {
    console.error("listUsers error", err);
    return res.status(500).json({ error: "Server error" });
  }
};
