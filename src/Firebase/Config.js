import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyBQ42UVznabZNaMsbBACmjVfLyB_QCb0Zc",
  authDomain: "books-app-44af4.firebaseapp.com",
  projectId: "books-app-44af4",
  storageBucket: "books-app-44af4.appspot.com",
  messagingSenderId: "65044803472",
  appId: "1:65044803472:web:7dda699d67a1e33f6b8d15",
  measurementId: "G-QPHD6XELBC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);


export {db , storage} ;

