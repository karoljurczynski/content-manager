import { doc, getDoc, setDoc } from "@firebase/firestore";
import { db, storage } from "./firebaseConfig";
import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from "@firebase/storage";


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
export const uploadFileToStorage = async (mode, file) => {
  const storageRef = ref(storage, `${mode}/${file.name}`);
  try { await uploadBytes(storageRef, file) }
  catch { window.alert("Error with file uploading! Try again.") }
}
export const loadFileFromStorage = async (mode, fileName) => {
  const storageRef = ref(storage, `${mode}/${fileName}`);
  try { return await getDownloadURL(storageRef) }
  catch { window.alert("Error with file loading! Try again.") }
}
export const checkIfFileNameExist = async (mode) => {
  const storageRef = ref(storage, `${mode}`);
  const imagesNames = [];
  try {
    const images = await listAll(storageRef);
    images.items.forEach(image => imagesNames.push(image.name));
    return imagesNames;
  }
  catch { return false }
}
export const deleteFileFromStorage = async (mode, fileName) => {
  const storageRef = ref(storage, `${mode}/${fileName}`);
  try { await deleteObject(storageRef) }
  catch { window.alert("Error with file removing! Try again.") }
}
export const getPercentValueFromObjectPosition = (objectPosition, axis) => {
  return objectPosition.split(" ")[axis === "x" ? 0 : 1].split("%")[0];
}