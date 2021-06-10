import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBSKSkopiT-jHh9Gmw_GTnoYEbbTXVXPYI",
    authDomain: "casual-blog-4ea6f.firebaseapp.com",
    projectId: "casual-blog-4ea6f",
    storageBucket: "casual-blog-4ea6f.appspot.com",
    messagingSenderId: "748709450878",
    appId: "1:748709450878:web:2512f924adfe25e96e342f",
    measurementId: "G-MK0B82DRC2"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
// const user = firebase.User();
const storage = firebase.storage();

  export {db , auth, storage};