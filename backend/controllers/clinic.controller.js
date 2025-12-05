// controllers/clinic.controller.js
const Clinic = require("../models/users/Clinicmodel");
const ClinicUser = require("../models/users/ClinicUsermodel");

/**
 * Create a clinic (owner = req.user.id)
 */
exports.createClinic = async (req, res) => {
  try {
    const { name, address } = req.body;
    if (!name) return res.status(400).json({ error: "Clinic name required" });

    const clinic = await Clinic.create({
      name,
      address: address || "",
      ownerUserId: req.user.id,
    });

    await ClinicUser.create({
      clinicId: clinic._id,
      userId: req.user.id,
      role: "admin", // creator becomes admin
      permissions: ["all"],
      isActive: true,
    });

    return res.json({ message: "Clinic created", clinicId: clinic._id });
  } catch (err) {
    console.error("createClinic error", err);
    return res.status(500).json({ error: "Server error" });
  }
};

/**
 * Get all clinics current user belongs to (with role info)
 */
exports.getMyClinics = async (req, res) => {
  try {
    const memberships = await ClinicUser.find({ userId: req.user.id, isActive: true }).populate("clinicId");
    const clinics = memberships.map(m => ({
      clinic: m.clinicId,
      role: m.role,
      permissions: m.permissions,
      membershipId: m._id,
      isActive: m.isActive,
    }));
    return res.json({ clinics });
  } catch (err) {
    console.error("getMyClinics error", err);
    return res.status(500).json({ error: "Server error" });
  }
};

/**
 * Get single clinic details (includes owner and optionally basic member count)
 */
exports.getClinic = async (req, res) => {
  try {
    const { clinicId } = req.params;
    const clinic = await Clinic.findById(clinicId).lean();
    if (!clinic) return res.status(404).json({ error: "Clinic not found" });

    // Basic counts & owner info (ownerId already present)
    const memberCount = await ClinicUser.countDocuments({ clinicId, isActive: true });
    return res.json({ clinic, memberCount });
  } catch (err) {
    console.error("getClinic error", err);
    return res.status(500).json({ error: "Server error" });
  }
};

/**
 * Update clinic (only owner or admin depending on middleware)
 */
exports.updateClinic = async (req, res) => {
  try {
    const { clinicId } = req.params;
    const updates = {};

    const allowed = ["name", "address"];
    allowed.forEach(k => { if (req.body[k] !== undefined) updates[k] = req.body[k]; });

    if (Object.keys(updates).length === 0) return res.status(400).json({ error: "Nothing to update" });

    const clinic = await Clinic.findByIdAndUpdate(clinicId, { $set: updates }, { new: true });
    if (!clinic) return res.status(404).json({ error: "Clinic not found" });

    return res.json({ message: "Clinic updated", clinic });
  } catch (err) {
    console.error("updateClinic error", err);
    return res.status(500).json({ error: "Server error" });
  }
};

/**
 * Soft delete clinic (owner-only recommended)
 */
exports.deleteClinic = async (req, res) => {
  try {
    const { clinicId } = req.params;

    // Soft-delete pattern: mark isActive=false on ClinicUser and optionally set a deletedAt on Clinic
    await ClinicUser.updateMany({ clinicId }, { $set: { isActive: false } });
    await Clinic.findByIdAndDelete(clinicId); // if you prefer soft-delete, replace with a flag

    return res.json({ message: "Clinic deleted (members deactivated)" });
  } catch (err) {
    console.error("deleteClinic error", err);
    return res.status(500).json({ error: "Server error" });
  }
};
