import firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
 
  authDomain: "project2-71fbb.firebaseapp.com",
  projectId: "project2-71fbb",
  storageBucket: "project2-71fbb.appspot.com",
  messagingSenderId: "461304235873",
  appId: "1:461304235873:web:bf259846f2a24d13706720"
  };

  const app = initializeApp(firebaseConfig);
  const db=getFirestore(app);
  export {db};
