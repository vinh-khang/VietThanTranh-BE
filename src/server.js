const http = require("http");
const express = require("express");
const cors = require("cors");
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import socketConnect from "./socket";

const app = express();
app.use(cors());
const server = http.createServer(app);
const socketIo = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

viewEngine(app);
initWebRoutes(app);
socketConnect(socketIo);

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);
