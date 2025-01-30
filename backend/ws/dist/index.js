"use strict";
const { WebSocketServer } = require("ws");

const wss = new WebSocketServer({ port: 8080 });
let allSockets = [];

wss.on("connection", (socket) => {
  allSockets.push(socket);
  console.log("User connected. Total users:", allSockets.length);

  socket.on("message", (message) => {
    console.log("Received:", message.toString());

   
    allSockets.forEach((s) => {
      if (s !== socket && s.readyState === s.OPEN) {
        s.send(message.toString());
      }
    });
  });

  socket.on("close", () => {
    allSockets = allSockets.filter((s) => s !== socket);
    console.log("User disconnected. Total users:", allSockets.length);
  });
});
