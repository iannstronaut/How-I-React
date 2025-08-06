import type { Socket } from "socket.io";

export const UserController = (socket: Socket) => {
  socket.on("userInfo", (data) => {
    const currentUser = data.currentUser;
    console.log("User Connected:", currentUser.userId);
    if (!currentUser || Object.keys(currentUser).length === 0) {
      console.log("No current user found, creating a new user.");
      const randomUser = `user_${socket.id}`;
      const newUser = { userId: randomUser };
      console.log("New user created:", newUser);
      socket.emit("setUserId", { user: newUser });
    }
  });
};
