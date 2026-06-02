import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKF58weZh-m1KAFms8Zyf_l-ufjqQJT5w",
  authDomain: "portfolio-messa.firebaseapp.com",
  projectId: "portfolio-messa",
  storageBucket: "portfolio-messa.firebasestorage.app",
  messagingSenderId: "1028337451476",
  appId: "1:1028337451476:web:d68060cdb4e8f832db9641",
  measurementId: "G-J1JQXC4S1F",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
