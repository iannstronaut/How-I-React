import { createServer } from "http";
import { createSocketServer } from "./src/services";

const httpServer = createServer((req, res) => {
  res.writeHead(200);
  res.end("Socket.IO with Bun and TypeScript!");
});

createSocketServer(httpServer);

httpServer.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
