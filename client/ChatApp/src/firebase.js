// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBW17lqMW3JXmSO0QdSLUJ_ODBvHeg2X0s",
  authDomain: "ip-chatapp-4bdee.firebaseapp.com",
  projectId: "ip-chatapp-4bdee",
  storageBucket: "ip-chatapp-4bdee.appspot.com",
  messagingSenderId: "61200064776",
  appId: "1:61200064776:web:2ec9112763651545a14cbd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)