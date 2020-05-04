import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCYSOUeL1WyIb2YD9XoIjsV98EMBxMPwTE",
  authDomain: "task-manager-a7d6a.firebaseapp.com",
  databaseURL: "https://task-manager-a7d6a.firebaseio.com/",
  projectId: "task-manager-a7d6a",
  storageBucket: "task-manager-a7d6a.appspot.com",
  messagingSenderId: "459147592206",
  appId: "1:459147592206:web:2b9179cc229dfd21a5725f",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore().collection("cardList");

export default db;
