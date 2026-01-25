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

app.use(cors({
  origin: [
    "http://localhost:5173", // Vite frontend
    "http://localhost:5176", // Vite frontend (alternate port)
    "http://localhost:3000"  // optional: same-origin
  ],
  credentials: true,
}));

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

// Forced restart trigger 2
