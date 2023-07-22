import firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "moviez-be6bd.firebaseapp.com",
  projectId: "moviez-be6bd",
  storageBucket: "moviez-be6bd.appspot.com",
  messagingSenderId: "317146093180",
  appId: "1:317146093180:web:0aa5647e0f260983e25bf9"
  };

  const app = initializeApp(firebaseConfig);
  const db=getFirestore(app);
  export {db};
