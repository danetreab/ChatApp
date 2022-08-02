import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBoHMiQu7hGAyTpt9kpleO_5YuHIQHnY5Q",
  authDomain: "nextjs-chatapp-70d39.firebaseapp.com",
  projectId: "nextjs-chatapp-70d39",
  storageBucket: "nextjs-chatapp-70d39.appspot.com",
  messagingSenderId: "947374015005",
  appId: "1:947374015005:web:0554641358f79be9c33cf4",
  measurementId: "G-QXR8VCEDM1"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
