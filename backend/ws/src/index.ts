import { userInfo } from "os";
import { WebSocket, WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 8080 });
let usserCount = 0;
interface User {
  socket: WebSocket;
  room: string;
}
let allsocket: User[] = [];
wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    const parsedmessage = JSON.parse(message as unknown as string);
    if (parsedmessage.type === "join") {
      allsocket.push({
        socket,
        room: parsedmessage.payload.roomId,
      });
    }
    if (parsedmessage.type == "chat") {
      let currentuserRoom = null;
      for (let i = 0; i < allsocket.length; i++) {
        currentuserRoom = allsocket[i].room;
      }
      for (let i = 0; i < allsocket.length; i++) {
        if (allsocket[i].room == currentuserRoom) {
          allsocket[i].socket.send(parsedmessage.payload.message);
        }
      }
    }
  });
});
