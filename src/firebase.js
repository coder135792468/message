import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyAth7AAvoSHSZsOcHDcObmbHy2gy-oWFQM",
  authDomain: "chat-app-a7488.firebaseapp.com",
  projectId: "chat-app-a7488",
  storageBucket: "chat-app-a7488.appspot.com",
  messagingSenderId: "434842093533",
  appId: "1:434842093533:web:463ed141897e363a5e9834",
  measurementId: "G-8Y19BEZQK0",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { db, auth, storage };
