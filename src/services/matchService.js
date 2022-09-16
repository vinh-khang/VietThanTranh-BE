import {
  addDoc,
  deleteDoc,
  getDocs,
  setDoc,
  query,
  where,
  collection,
} from "firebase/firestore";

import { db } from "../config/connectDB";

const deleteLobby = async (uid) => {
  // try {
  //   const q = query(collection(db, "Lobby"), where("player1.uid", "==", uid));
  //   const q2 = query(collection(db, "Lobby"), where("player2.uid", "==", uid));
  //   const querySnapshot = await getDocs(q);
  //   const querySnapshot2 = await getDocs(q2);
  //   querySnapshot.forEach((doc) => {
  //     deleteDoc(doc.ref);
  //   });
  //   querySnapshot2.forEach((doc) => {
  //     deleteDoc(doc.ref);
  //   });
  //   console.log("Delete");
  // } catch (e) {
  //   console.log(e);
  // }
};

let createOnlineRoom = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let onlineRoom = await getOnlineRoom(data.room);
      if (onlineRoom.length === 1) {
        onlineRoom.forEach((doc) => {
          if (doc.data().master_uid !== data.uid) {
            setDoc(
              doc.ref,
              {
                guest_uid: data.uid,
              },
              { merge: true }
            );
          }
        });
      } else {
        await addDoc(collection(db, "OnlineRoom"), {
          room: data.room,
          master_uid: data.uid,
          guest_uid: null,
        });
      }

      resolve("OK");
    } catch (e) {
      reject(e);
    }
  });
};

let updateOnlineRoom = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let onlineRoom = await getOnlineRoom(data.room);
      if (onlineRoom.length > 0) {
        onlineRoom.forEach((doc) => {
          setDoc(doc.ref, {
            room: data.room,
            master_uid: data.master_uid,
            guest_uid: data.guest_uid,
          });
        });
      }

      resolve("OK");
    } catch (e) {
      reject(e);
    }
  });
};

let getOnlineRoom = (room) => {
  return new Promise(async (resolve, reject) => {
    try {
      let onlineRoom = [];
      const q = query(collection(db, "OnlineRoom"), where("room", "==", room));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        onlineRoom.push(doc);
      });
      resolve(onlineRoom);
    } catch (e) {
      reject(e);
    }
  });
};

let getOnlineRoomByMID = (mid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let onlineRoom = [];
      const q = query(
        collection(db, "OnlineRoom"),
        where("master_uid", "==", mid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        onlineRoom.push(doc.data());
      });
      if (onlineRoom.length > 0) {
        resolve({ room: onlineRoom, role: "master" });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteOnlineRoom = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let onlineRoom = await getOnlineRoom(data.room);
      if (onlineRoom.length > 0) {
        onlineRoom.forEach((doc) => {
          if (doc.data().master_uid === data.uid) {
            deleteDoc(doc.ref);
          }
        });
      }

      resolve("OK");
    } catch (e) {
      reject(e);
    }
  });
};

let getUsersInRoom = (room) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = [];
      const q = query(collection(db, "OnlineRoom"), where("room", "==", room));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

const cancelSearchingGame = (socketId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const q = query(
        collection(db, "SearchingPlayer"),
        where("socketId", "==", socketId)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });

      resolve("OK");
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createOnlineRoom,
  getOnlineRoom,
  deleteOnlineRoom,
  getOnlineRoomByMID,
  getUsersInRoom,
  updateOnlineRoom,
  cancelSearchingGame,
  deleteLobby,
};
