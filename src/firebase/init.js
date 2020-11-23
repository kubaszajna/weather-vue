import firebase from "firebase";
//import firestore from "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDN2F4VtGKfeiCF1T8YF9W0sKUUdlF2-yY",
  authDomain: "kubaszajna-geo-ninjas.firebaseapp.com",
  databaseURL: "https://kubaszajna-geo-ninjas.firebaseio.com",
  projectId: "kubaszajna-geo-ninjas",
  storageBucket: "",
  messagingSenderId: "854198427280",
  appId: "1:854198427280:web:b28d13b6c126b09f"
};
// Initialize Firebase

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
