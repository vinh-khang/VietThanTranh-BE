import userService from "../services/userService";

let handleOnlineUser = async (data) => {
  let message = await userService.onlineUser(data);
  return message;
};

let handleGetOnlineUserBySocket = async (socketId) => {
  let message = await userService.getOnlineUserBySocket(socketId);
  return message;
};

let handleOfflineUser = async (uid) => {
  let message = await userService.offlineUser(uid);
  return message;
};

let handleGetOnlineUserByID = async (uid) => {
  let message = await userService.getOnlineUserByID(uid);
  return message;
};

module.exports = {
  handleOnlineUser,
  handleGetOnlineUserBySocket,
  handleOfflineUser,
  handleGetOnlineUserByID,
};
