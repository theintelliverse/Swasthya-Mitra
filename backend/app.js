require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const http = require("http");              // <-- needed for socket.io
require("./configuration/mongoose_connection");

const routes = require("./routes/index");
const { initSocket } = require("./socket"); // <-- socket initializer
const { startNotificationJob } = require("./jobs/notificationJobs");

const app = express();
app.use(express.json());
app.use(cookieParser());

// Wrap express in HTTP server
const server = http.createServer(app);

// Initialize socket.io
initSocket(server);

// Start scheduled notification jobs
startNotificationJob();

// API routes
app.use("/api", routes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date() });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Swasthya-Mitra backend running with Socket.IO on port ${PORT}`);
});
