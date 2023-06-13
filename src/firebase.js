// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
// import firebase from "firebase/app";
// import "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAa3IsIC9-cDlvrElorRZd_oYPpQ2e1BkM",
  authDomain: "contactapp-2c41e.firebaseapp.com",
  projectId: "contactapp-2c41e",
  storageBucket: "contactapp-2c41e.appspot.com",
  messagingSenderId: "782041406648",
  appId: "1:782041406648:web:ae28dd0ae549324ddaa84d"
};

// Initialize Firebase
const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();
