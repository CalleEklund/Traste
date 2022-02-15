// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//const firebase = require("firebase");

const admin = require("firebase-admin");

const firebaseConfig = {
  apiKey: "AIzaSyDliWbV-nJmBuJHIr9dy-VDdCOf11v7IJo",
  authDomain: "traste-71a71.firebaseapp.com",
  projectId: "traste-71a71",
  storageBucket: "traste-71a71.appspot.com",
  messagingSenderId: "669815984047",
  appId: "1:669815984047:web:40064b3d52d2221ce4695a",
  measurementId: "G-MLPVS1ZZ6F"
};

// Initialize Firebase
const app = admin.initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = admin.firestore();

module.exports = { db };