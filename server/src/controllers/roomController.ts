import type { Server, Socket } from "socket.io";
import type { PlayerType, RoomType } from "../types/gameType";
import { RoomList } from "../tools/cache";

export const RoomController = (socket: Socket, io: Server) => {
  socket.on(
    "join-room",
    (player: { userId: string; username: string }, roomId: string) => {
      const room = RoomList.joinRoom({ ...player, isReady: false }, roomId);
      if (room.status && room.room) {
        console.log(`Player ${player.username} joined room ${roomId}`);
        socket.join(roomId);
        socket.emit("roomJoined", {
          roomId: room.room.id,
          message: room.message,
        });
        io.to(room.room.id).emit("roomInfo", { rooms: room.room });
      } else {
        console.log(`Failed to join room ${roomId}: ${room.message}`);
        socket.emit("roomError", { roomId: null, message: room.message });
      }
    }
  );

  socket.on("exit-room", (playerId: string, roomId: string) => {
    const room = RoomList.exitRoom(playerId, roomId);
    if (room.room) {
      console.log(`Player ${playerId} exited room ${roomId}`);
      socket.leave(roomId);
      socket.emit("roomExited", {
        roomId: room.room.id,
        message: room.message,
      });
      io.to(room.room.id).emit("roomInfo", { rooms: room.room });
    } else if (room.status) {
        console.log(`Room ${roomId} exited successfully`);
        socket.emit("roomExited", { roomId: null, message: room.message });
        io.to(roomId).emit("roomInfo", { rooms: null });
    } else {
      console.log(`Failed to exit room ${roomId}: ${room.message}`);
      socket.emit("roomError", { roomId: null, message: room.message });
    }
  });

  socket.on("create-room", (host: { userId: string; username: string }) => {
    const generateRoomId = () => Math.random().toString(36).substr(2, 6);
    const newRoom: RoomType = {
      id: generateRoomId(),
      hostId: host.userId,
      players: [
        { userId: host.userId, username: host.username, isReady: false },
      ],
      status: "waiting",
    };
    RoomList.addRoom(newRoom);
    console.log(`Room created with ID: ${newRoom.id}`);
    socket.join(newRoom.id);
    socket.emit("roomCreated", {
      roomId: newRoom.id,
      message: "Room created successfully",
    });
  });

  socket.on("get-rooms", (roomId: string) => {
    console.log(`Fetching room with ID: ${roomId}`);
    const rooms = RoomList.getRooms(roomId);
    if (rooms) {
      console.log(`Retrieved room_${rooms.id}`);
      io.to(rooms.id).emit("roomInfo", { rooms });
    } else {
      console.log("No rooms available");
      socket.emit("roomError", {});
    }
  });
};
