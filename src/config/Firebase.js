import firebase from "firebase";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyCFqOYzDs7uqfzwMzJA9iTvyTdx36V9Ukk",
  authDomain: "ibism-b8e2f.firebaseapp.com",
  projectId: "ibism-b8e2f",
  storageBucket: "ibism-b8e2f.appspot.com",
  messagingSenderId: "307227939732",
  appId: "1:307227939732:web:488999fbae789c5413b581",
  measurementId: "G-J4KFP2XJQ5",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
