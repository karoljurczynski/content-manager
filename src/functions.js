import { doc, getDoc, setDoc } from "@firebase/firestore";
import { db } from "./firebaseConfig";


const databaseRef = doc(db, "images/content");
const testRef = doc(db, "images/test");


export const getDataFromDatabase = async (typeOfContent) => {
  const databaseContent = await getDoc(databaseRef);
  if (typeOfContent === "photos")
    return await databaseContent.data().photos;
  else
    return await databaseContent.data().artworks;
}
export const sendDataToDatabase = async (typeOfContent, newArray) => {
  let contentToSend = {};
  typeOfContent === "photos" ? contentToSend = {photos: newArray} : contentToSend = {artworks: newArray};
  setDoc(databaseRef, contentToSend, { merge: true });
}
