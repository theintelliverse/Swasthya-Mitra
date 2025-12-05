// services/notification.service.js
// Simple pluggable notification service
const Notification = require("../models/NotificationModel");
const axios = require("axios");

const PROVIDER = process.env.NOTIF_PROVIDER || "mock"; // 'mock' or 'whatsapp_cloud'

async function sendViaMock(to, channel, body) {
  console.log("[NOTIF MOCK] send to:", to, "channel:", channel, "body:", body);
  return { ok: true, providerId: "mock-123" };
}

async function sendViaWhatsAppCloud(to, body) {
  // expect env: WA_API_URL, WA_TOKEN, WA_PHONE_NUMBER_ID
  const url = process.env.WA_API_URL;
  const token = process.env.WA_TOKEN;
  if (!url || !token) throw new Error("WhatsApp config missing");

  // this is a simplified example; you must adapt payload to WhatsApp Cloud API
  const res = await axios.post(url, body, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

async function dispatch(notificationId) {
  const n = await Notification.findById(notificationId);
  if (!n) throw new Error("Notification not found");

  try {
    let res;
    const body = { template: n.template, payload: n.payload, to: n.to };

    if (PROVIDER === "whatsapp_cloud") {
      res = await sendViaWhatsAppCloud(n.to, body);
    } else {
      res = await sendViaMock(n.to, n.channel, body);
    }

    n.status = "sent";
    n.sentAt = new Date();
    n.error = "";
    await n.save();
    return { ok: true, res };
  } catch (err) {
    console.error("dispatch error", err);
    n.status = "failed";
    n.error = String(err.message || err);
    await n.save();
    return { ok: false, error: n.error };
  }
}

async function scheduleNotification({ clinicId, to, channel = "whatsapp", template, payload = {}, scheduledAt = null }) {
  const n = await Notification.create({ clinicId, to, channel, template, payload, scheduledAt });
  // if scheduledAt is null or in the past, dispatch now
  if (!scheduledAt || new Date(scheduledAt) <= new Date()) {
    dispatch(n._id).catch(e => console.error(e));
  }
  return n;
}

module.exports = { dispatch, scheduleNotification, Notification };
