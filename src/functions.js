import { doc, getDoc, setDoc } from "@firebase/firestore";
import { db, storage } from "./firebaseConfig";


const databaseRef = doc(db, "images/test");


export const getDataFromDatabase = async (mode) => {
  try {
    const databaseContent = await getDoc(databaseRef);
    if (mode === "photos")
      return [await databaseContent.data().photos, await databaseContent.data().isRandomOrder];
    else
      return [await databaseContent.data().artworks, await databaseContent.data().isRandomOrder];
  }
  catch {
    window.alert("Error with database connection! Try again.");
    return new Error();
  }
}
export const sendDataToDatabase = async (mode, newArray, isRandomOrder) => {
  try {
    if (mode === "photos")
      setDoc(databaseRef, {photos: newArray, isRandomOrder: isRandomOrder}, {merge: true});
    else
      setDoc(databaseRef, {artworks: newArray, isRandomOrder: isRandomOrder}, {merge: true}); 
  }
  catch {
    window.alert("Error with saving changes! Try again.")
  }
}
export const uploadFileToStorage = async () => {

}
export const loadFileFromStorage = async () => {
  
}
export const deleteFileFromStorage = async () => {
  
}
export const getPercentValueFromObjectPosition = (objectPosition, axis) => {
  return objectPosition.split(" ")[axis === "x" ? 0 : 1].split("%")[0];
}