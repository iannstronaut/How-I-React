import { useEffect, useState } from "react";
import socket from "../core/io";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem("currentUser")) || {};
  });

  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    socket.on("setUserId", (data) => {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      setCurrentUser(currentUser);
    });
  }, [currentUser]);

  const handleCreateRoom = () => {
    socket.emit("create-room", {
      userId: currentUser.id,
      username: currentUser.username,
    });

    socket.on("roomCreated", (data) => {
      if (data.roomId) {
        navigate(`/room/${data.roomId}`);
        socket.off("roomCreated");
      }
    });
  };

  const handleJoinRoom = () => {
    if (roomId) {
      socket.emit(
        "join-room",
        {
          userId: currentUser.id,
          username: currentUser.username,
        },
        roomId.trim()
      );
    }

    socket.on("roomJoined", (data) => {
      if (data.roomId) {
        navigate(`/room/${data.roomId}`);
        socket.off("roomJoined");
      } else {
        console.error("Failed to join room:", data.message);
      }
    });
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>Current User ID: {currentUser.id}</p>
      <input
        type="text"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button onClick={handleJoinRoom}>join room</button>
      <button onClick={handleCreateRoom}>create room</button>
    </div>
  );
};
