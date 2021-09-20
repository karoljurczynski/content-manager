import { doc, getDoc, setDoc } from "@firebase/firestore";
import { db } from "./firebaseConfig";


const databaseRef = doc(db, "images/test");


export const getDataFromDatabase = async (mode) => {
  try {
    const databaseContent = await getDoc(databaseRef);
    if (mode === "photos")
      return await databaseContent.data().photos;
    else
      return await databaseContent.data().artworks;
  }
  catch {
    window.alert("Error with database connection! Try again.");
    return new Error();
  }
}
export const sendDataToDatabase = async (mode, newArray) => {
  try {
    if (mode === "photos")
      setDoc(databaseRef, {photos: newArray}, {merge: true});
    else
      setDoc(databaseRef, {artworks: newArray}, {merge: true}); 
  }
  catch {
    window.alert("Error with saving changes! Try again.")
  }
}
export const getPercentValueFromObjectPosition = (objectPosition, axis) => {
  return objectPosition.split(" ")[axis === "x" ? 0 : 1].split("%")[0];
}