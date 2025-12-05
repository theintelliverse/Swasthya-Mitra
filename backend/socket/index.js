// socket/index.js
let io = null;

function initSocket(server) {
  io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Display connected:", socket.id);

    const { clinicId, doctorId } = socket.handshake.query;
    if (clinicId && doctorId) {
      const room = `queue_${clinicId}_${doctorId}`;
      socket.join(room);
      console.log(`Client ${socket.id} joined room ${room}`);
    }

    socket.on("disconnect", () => {
      console.log("Display disconnected:", socket.id);
    });
  });
}

function emitQueueUpdate(clinicId, doctorId, data) {
  if (!io) return;
  const room = `queue_${clinicId}_${doctorId}`;
  io.to(room).emit("queue_update", data);
}

module.exports = { initSocket, emitQueueUpdate };
