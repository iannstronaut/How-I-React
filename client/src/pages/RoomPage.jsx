import { useEffect, useState } from "react";
import socket from "../core/io";
import { useNavigate } from "react-router-dom";

export const RoomPage = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem("currentUser")) || {};
  });

  const [roomInfo, setRoomInfo] = useState({});

  useEffect(() => {
    const roomId = window.location.pathname.split("/").pop();
    socket.emit("get-rooms", roomId);

    socket.on("roomInfo", (data) => {
      console.log("Received room info:", data.rooms);
      if (data.rooms.id) {
        setRoomInfo(data.rooms);
        socket.off("get-rooms");
      } else {
        console.error("Room not found");
        navigate("/"); // Redirect to home if room not found
      }
    });
  }, []);

  if (!roomInfo.id) {
    return <div>Loading...</div>;
  }

  const handleExitRoom = () => {
    socket.emit("exit-room", currentUser.id, roomInfo.id);
    socket.on("roomExited", (data) => {
      navigate("/");
    });
  };

  return (
    <div>
      <h1>
        Room Page: {roomInfo.id} {roomInfo.status}
      </h1>
      {roomInfo.players.map((element) => (
        <p key={element.userId}>
          {element.username} {element.isReady ? "✅" : "❌"}{" "}
          {element.userId === currentUser.id ? "(You)" : ""}
          {roomInfo.hostId === element.userId ? " (Host)" : ""}
        </p>
      ))}
      <button onClick={handleExitRoom}>Exit Room</button>
    </div>
  );
};
