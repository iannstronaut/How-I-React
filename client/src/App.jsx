import socket from "./core/io";
function App() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
  socket.on("connect", () => {
    console.log("Connected to server", socket.id);

    socket.emit("userInfo", {
      currentUser: currentUser
    });
  });

  socket.on("setUserId", (data)=>{
    console.log("User ID set:", data.user);
    localStorage.setItem("currentUser", JSON.stringify(data.user));
  })

  return <></>;
}

export default App;
