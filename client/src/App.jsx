import socket from "./core/io";
import { HomePage } from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RoomPage } from "./pages/RoomPage";
function App() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
  socket.on("connect", () => {
    console.log("Connected to server", socket.id);

    socket.emit("userInfo", {
      currentUser: currentUser,
    });
  });

  socket.on("setUserId", (data) => {
    const newUser = {
      id: data.user.userId,
      username: currentUser?.username || data.user.userId,
    };
    localStorage.setItem("currentUser", JSON.stringify(newUser));
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/room/:id" element={<RoomPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
