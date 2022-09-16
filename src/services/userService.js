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

const addOnlineUser = async (uid) => {
  try {
    const q = query(collection(db, "OnlineUsers"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    let onlineUsers = [];
    querySnapshot.forEach((doc) => {
      onlineUsers.push(doc.data());
    });

    if (onlineUsers.length === 0) {
      addDoc(collection(db, "OnlineUsers"), {
        uid: uid,
        socketId: socket.id,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const removeOnlineUser = async (uid) => {
  try {
    const q = query(collection(db, "OnlineUsers"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  } catch (e) {
    console.log(e);
  }
};

let getOnlineUserBySocket = async (socketId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let onlineUser = [];
      const q = query(
        collection(db, "OnlineUsers"),
        where("socketId", "==", socketId)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        onlineUser.push(doc.data());
      });
      resolve(onlineUser);
    } catch (e) {
      reject(e);
    }
  });
};

let getOnlineUserByID = async (uid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let onlineUser = [];
      const q = query(collection(db, "OnlineUsers"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        onlineUser.push(doc);
      });
      resolve(onlineUser);
    } catch (e) {
      reject(e);
    }
  });
};

let offlineUser = (uid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let onlineUser = await getOnlineUserByID(uid);
      if (onlineUser.length > 0) {
        onlineUser.forEach((doc) => {
          deleteDoc(doc.ref);
        });
      }

      resolve("OK");
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  addOnlineUser,
  removeOnlineUser,
  getOnlineUserBySocket,
  offlineUser,
  getOnlineUserByID,
};
