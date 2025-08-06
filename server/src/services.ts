import { Server } from "socket.io";
import { Server as HTTPServer } from "http";
import { UserController } from "./controllers/userController";

export function createSocketServer(httpServer: HTTPServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: ["http://localhost:5173"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    //User controller to handle user-related events
    UserController(socket);

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });

  return io;
}
