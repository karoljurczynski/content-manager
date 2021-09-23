import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyD8wdP6AYncPrNA_2JeUQFPf-yyz2AzduA",
  authDomain: "content-manager-2e6a6.firebaseapp.com",
  projectId: "content-manager-2e6a6",
  storageBucket: "content-manager-2e6a6.appspot.com",
  messagingSenderId: "911971298101",
  appId: "1:911971298101:web:c8f3b4d81107f7aa73fa7c"
};


initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage();