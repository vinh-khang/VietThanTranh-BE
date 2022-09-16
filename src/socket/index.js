import {
  handleCreateOnlineRoom,
  handleDeleteRoom,
  handleGetOnlineRoomByMID,
  handleGetUsersInRoom,
  handleUpdateOnlineRoom,
  handleCancelMatch,
} from "../controllers/matchController";
import _ from "lodash";

import {
  handleOnlineUser,
  handleGetOnlineUserBySocket,
  handleOfflineUser,
  handleGetOnlineUserByID,
} from "../controllers/userController";

import { removeOnlineUser } from "../services/userService";
import { deleteLobby } from "../services/matchService";

const socketConnect = (socketIo) => {
  socketIo.on("connection", async (socket) => {
    console.log("New client connected");

    // socket.on("joinRoom", async function ({ room, uid }, callback) {
    //   await handleCreateOnlineRoom({
    //     room,
    //     uid,
    //   });

    //   //   if (error) return callback(error);

    //   socket.join(room);
    //   let [usersInRoom] = await handleGetUsersInRoom(room);
    //   if (usersInRoom) {
    //     let master = handleGetOnlineUserByID(usersInRoom.master_uid);
    //     let guest = null;
    //     if (usersInRoom.guest_uid) {
    //       guest = handleGetOnlineUserByID(usersInRoom.guest_uid);
    //     }
    //     socketIo.to(room).emit("roomData", {
    //       users: [master, guest],
    //     });
    //   }

    //   callback();
    // });

    // socket.on("outRoom", (value, callback) => {
    //   handleDeleteRoom(value);

    //   callback();
    // });

    // socket.on("sendMessage", (message, callback) => {
    //   const user = getUser(socket.id);

    //   socketIo
    //     .to(user.room)
    //     .emit("message", { user: user.name, text: message });

    //   callback();
    // });

    // socket.on("actackPlayer1", (value, callback) => {
    //   const user = getUser(socket.id);
    //   socketIo.to(user.room).emit("squareActackPlayer1", value);

    //   callback();
    // });

    // socket.on("actackPlayer2", (value, callback) => {
    //   const user = getUser(socket.id);
    //   socketIo.to(user.room).emit("squareActackPlayer2", value);

    //   callback();
    // });

    // socket.on("readyForBattle1", (value) => {
    //   const user = getUser(socket.id);
    //   socketIo.to(user.room).emit("readyForBattle1", value);
    // });

    // socket.on("readyForBattle2", (value) => {
    //   const user = getUser(socket.id);
    //   socketIo.to(user.room).emit("readyForBattle2", value);
    // });

    // socket.on("actackPlayer2", (value, callback) => {
    //   const user = getUser(socket.id);
    //   socketIo.to(user.room).emit("square", { user: user.name, square: value });

    //   callback();
    // });

    socket.on("disconnect", async () => {
      console.log(`${socket.id} has left.`);
      let user = await handleGetOnlineUserBySocket(socket.id);
      user.forEach(async (item) => {
        await removeOnlineUser(item.uid);
        await deleteLobby(item.uid);
      });
    });
  });
};

export default socketConnect;
