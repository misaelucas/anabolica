// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDjjRXDMfUESgADuiGgHqjNeOrbqt4qZY",
  authDomain: "anabolica-439e6.firebaseapp.com",
  projectId: "anabolica-439e6",
  storageBucket: "anabolica-439e6.appspot.com",
  messagingSenderId: "829708313570",
  appId: "1:829708313570:web:d74621f6cca01b22ef8fbb",
  measurementId: "G-C0X663Q44V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
