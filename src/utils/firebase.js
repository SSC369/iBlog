import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "iblog-398410.firebaseapp.com",
  projectId: "iblog-398410",
  storageBucket: "iblog-398410.appspot.com",
  messagingSenderId: "933444793496",
  appId: "1:933444793496:web:eda9ff9f8feca3137f0ced",
  measurementId: "G-FJ2Q4HFYZ5",
};

export const app = initializeApp(firebaseConfig);
