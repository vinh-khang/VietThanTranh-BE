import matchService from "../services/matchService";

let handleCreateOnlineRoom = async (data) => {
  let message = await matchService.createOnlineRoom(data);
  return message;
};

let handleDeleteRoom = async (data) => {
  let message = await matchService.deleteOnlineRoom(data);
  return message;
};

let handleGetOnlineRoomByMID = async (data) => {
  let message = await matchService.getOnlineRoomByMID(data);
  return message;
};

let handleGetUsersInRoom = async (room) => {
  let message = await matchService.getUsersInRoom(room);
  return message;
};

let handleUpdateOnlineRoom = async (room) => {
  let message = await matchService.updateOnlineRoom(room);
  return message;
};

let handleCancelMatch = async (socketId) => {
  let message = await matchService.cancelSearchingGame(socketId);
  return message;
};

module.exports = {
  handleCreateOnlineRoom,
  handleDeleteRoom,
  handleGetOnlineRoomByMID,
  handleGetUsersInRoom,
  handleUpdateOnlineRoom,
  handleCancelMatch,
};
