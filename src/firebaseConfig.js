import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyC8NLwGLqte23XieIBAoxCgRlizm-0SGsE",
  authDomain: "oliwier-pakula.firebaseapp.com",
  projectId: "oliwier-pakula",
  storageBucket: "oliwier-pakula.appspot.com",
  messagingSenderId: "478464112458",
  appId: "1:478464112458:web:5628d94b39ea4be480b3b3"
};


initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage();