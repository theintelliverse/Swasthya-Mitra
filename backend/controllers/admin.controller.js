// controllers/admin.controller.js
const Appointment = require("../models/appointments/AppointmentModel");
const Queue = require("../models/queue/QueueModel");
const Clinic = require("../models/users/Clinicmodel");
const ClinicUser = require("../models/users/ClinicUsermodel");
const moment = require("moment");

/**
 * GET /admin/clinics/:clinicId/analytics?days=7
 * Returns basic analytics for the clinic
 */
exports.clinicAnalytics = async (req, res) => {
  try {
    const { clinicId } = req.params;
    const days = Number(req.query.days || 7);
    const from = moment().subtract(days, "days").startOf("day").toDate();

    const totalAppointments = await Appointment.countDocuments({ clinicId, createdAt: { $gte: from } });
    const completed = await Appointment.countDocuments({ clinicId, status: "completed", createdAt: { $gte: from } });
    const cancelled = await Appointment.countDocuments({ clinicId, status: "cancelled", createdAt: { $gte: from } });
    const no_show = await Appointment.countDocuments({ clinicId, status: "no_show", createdAt: { $gte: from } });

    const waitingCount = await Queue.countDocuments({ clinicId, status: "waiting" });
    const inConsult = await Queue.countDocuments({ clinicId, status: "in_consultation" });

    return res.json({ totalAppointments, completed, cancelled, no_show, waitingCount, inConsult });
  } catch (err) {
    console.error("clinicAnalytics error", err);
    return res.status(500).json({ error: "Server error" });
  }
};

/**
 * GET /admin/clinic/:clinicId/appointments?dateFrom=&dateTo=
 * Returns appointment list for clinic with filters
 */
exports.clinicAppointments = async (req, res) => {
  try {
    const { clinicId } = req.params;
    const { dateFrom, dateTo, doctorUserId, status, page = 1, limit = 50 } = req.query;

    const q = { clinicId };
    if (doctorUserId) q.doctorUserId = doctorUserId;
    if (status) q.status = status;
    if (dateFrom || dateTo) {
      q.startTime = {};
      if (dateFrom) q.startTime.$gte = new Date(dateFrom);
      if (dateTo) q.startTime.$lte = new Date(dateTo);
    }

    const skip = (Math.max(1, page) - 1) * Math.min(100, limit);
    const items = await Appointment.find(q)
      .sort({ startTime: -1 })
      .skip(skip)
      .limit(Math.min(100, limit))
      .populate("doctorUserId patientProfileId");

    const total = await Appointment.countDocuments(q);
    return res.json({ items, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    console.error("clinicAppointments error", err);
    return res.status(500).json({ error: "Server error" });
  }
};

/**
 * GET /admin/clinic/:clinicId/staff
 */
exports.clinicStaff = async (req, res) => {
  try {
    const { clinicId } = req.params;
    const staff = await ClinicUser.find({ clinicId }).populate("userId");
    return res.json({ staff });
  } catch (err) {
    console.error("clinicStaff error", err);
    return res.status(500).json({ error: "Server error" });
  }
};
