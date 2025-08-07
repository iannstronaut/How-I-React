import type { PlayerType, RoomType } from "../types/gameType";

const rooms: RoomType[] = []; // acting as cache

const RoomList = {
  addRoom(room: RoomType) {
    rooms.push(room); // mutate the cache
    console.log(`Room added: ${room.id}`);
    console.log(`Room List: ${rooms.map((r) => r.id).join(", ")}`);
  },

  getRooms(roomId: string) {
    console.log(`Room List: ${rooms.map((r) => r.id).join(", ")}`);
    const room = rooms.find((room) => room.id === roomId);
    if (room) {
      return room;
    }
    return null;
  },

  joinRoom(player: PlayerType, id: string) {
    const room = rooms.find((room) => room.id === id);
    if (room && room.status === "waiting") {
      room.players.push(player);
      return {
        status: true,
        room: room,
        message: "Joined room successfully",
      };
    } else if (room && room.status === "playing") {
      return {
        status: false,
        room: null,
        message: "Room is currently in play",
      };
    } else if (room && room.status === "finished") {
      return { status: false, room: null, message: "Room has finished" };
    }

    return { status: false, room: null, message: "Room not found" };
  },

  exitRoom(playerId: string, id: string) {
    const room = rooms.find((room) => room.id === id);
    if (room) {
      if (room.hostId === playerId) {
        const remainingPlayers = room.players.filter(
          (player) => player.userId !== playerId
        );
        if (remainingPlayers.length === 0) {
          rooms.splice(rooms.indexOf(room), 1);
          return {
            status: true,
            room: null,
            message: "Room removed successfully",
          };
        } else {
          room.hostId = remainingPlayers[0].userId; // assign new host
        }
      }
      room.players = room.players.filter(
        (player) => player.userId !== playerId
      );
      return {
        status: true,
        room: room,
        message: "Exited room successfully",
      };
    }
    return { status: false, room: null, message: "Room not found" };
  },
};

export { RoomList };
