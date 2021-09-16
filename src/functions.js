import { doc, getDoc, setDoc } from "@firebase/firestore";
import { db } from "./firebaseConfig";


const databaseRef = doc(db, "images/content");


export const getDataFromDatabase = async (mode) => {
  const databaseContent = await getDoc(databaseRef);
  if (mode === "photos")
    return await databaseContent.data().photos;
  else
    return await databaseContent.data().artworks;
}
export const sendDataToDatabase = async (mode, newArray) => {
  if (mode === "photos")
    setDoc(databaseRef, {photos: newArray}, {merge: true});
  else
    setDoc(databaseRef, {artworks: newArray}, {merge: true});  
}
export const getPercentValueFromObjectPosition = (objectPosition, axis) => {
  return objectPosition.split(" ")[axis === "x" ? 0 : 1].split("%")[0];
}