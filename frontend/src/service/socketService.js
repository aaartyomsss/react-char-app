import socketIOClient from "socket.io-client";
let socket;

export const initiateSocket = (room) => {
  socket = socketIOClient("http://localhost:8000");
  if (socket && room) socket.emit("join-room", room);
};

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};

export const subscribeToChat = (cb) => {
  if (!socket) return true;

  socket.on("message", (msg) => {
    return cb(null, msg);
  });
};

export const sendMessage = (room, message, username) => {
  if (socket) socket.emit("message", { room, message, username });
};
