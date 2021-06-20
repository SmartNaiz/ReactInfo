import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyA6egm8OAK_dOnvd4ZexzypfbYQ42ZCh9M",
  authDomain: "production-90234.firebaseapp.com",
  databaseURL: "https://production-90234-default-rtdb.firebaseio.com",
  projectId: "production-90234",
  storageBucket: "production-90234.appspot.com",
  messagingSenderId: "617448450247",
  appId: "1:617448450247:web:eacafc324301a6573bf6e2",
};

const fBaseApp = firebase.initializeApp(config);

// DB
export const DB = fBaseApp.firestore();
export const { Timestamp } = firebase.firestore;
export const usersCollection = DB.collection("users");
export const reviewsCollection = DB.collection("reviews");
export const messagesCollection = DB.collection("messages");
export const flowMeterCollection = DB.collection("FlowMeter");
export const alarmCollection = DB.collection("Alarms");
export const sanCollection = DB.collection("SanMeter");
export const WorkedTimeCollection = DB.collection("WorkedTime");
export const PumpCtStCollection = DB.collection("PumpCtSt");
