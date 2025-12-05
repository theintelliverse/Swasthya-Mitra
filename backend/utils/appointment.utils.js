// utils/appointment.utils.js
const Appointment = require("../models/appointments/AppointmentModel");
const moment = require("moment");

/**
 * Check overlapping appointments for a doctor in a clinic.
 * Returns true if there is a conflict.
 *
 * For flexible slotless: an appointment A conflicts with B if
 * A.start < B.end and B.start < A.end  (standard interval overlap)
 */
async function hasConflict(doctorUserId, clinicId, startTime, endTime, ignoreAppointmentId = null) {
  const filter = {
    doctorUserId,
    clinicId,
    status: { $in: ["scheduled", "checked_in", "in_consultation"] } // active appointments
  };

  if (ignoreAppointmentId) filter._id = { $ne: ignoreAppointmentId };

  // Query for any appointment where intervals overlap
  const overlapping = await Appointment.findOne({
    ...filter,
    $or: [
      { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
    ]
  });

  return !!overlapping;
}

/**
 * Build JS Date from YYYY-MM-DD + "HH:mm"
 */
function combineDateTime(dateStr, timeStr) {
  // dateStr like "2025-12-06" or a Date object
  if (!timeStr) return new Date(dateStr);
  return moment(`${dateStr} ${timeStr}`, "YYYY-MM-DD HH:mm").toDate();
}

/**
 * Utility: mark appointment history
 */
const AppointmentHistory = require("../models/appointments/AppointmentHistoryModel");
async function addHistory(appointmentId, oldStatus, newStatus, changedBy = null, remarks = "") {
  try {
    await AppointmentHistory.create({
      appointmentId,
      oldStatus,
      newStatus,
      changedBy,
      remarks
    });
  } catch (err) {
    console.error("addHistory error", err);
  }
}

module.exports = {
  hasConflict,
  combineDateTime,
  addHistory
};
