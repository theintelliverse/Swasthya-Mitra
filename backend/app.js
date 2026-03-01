require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const http = require("http");              // <-- needed for socket.io
require("./configuration/mongoose_connection");
const cors = require("cors");

const routes = require("./routes/index");
const { initSocket } = require("./socket"); // <-- socket initializer
const { startNotificationJob } = require("./jobs/notificationJobs");

const app = express();
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173,http://localhost:5176,http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// API routes
app.use("/api", routes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date() });
});

const PORT = process.env.PORT || 3000;

if (!process.env.VERCEL) {
  const server = http.createServer(app);
  initSocket(server);
  startNotificationJob();

  server.listen(PORT, () => {
    console.log(`Swasthya-Mitra backend running with Socket.IO on port ${PORT}`);
  });
} else {
  console.log("Running in Vercel serverless mode: Socket.IO and cron jobs are disabled.");
}

module.exports = app;

// Forced restart trigger 2
