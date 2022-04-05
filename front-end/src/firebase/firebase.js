// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNMJDGK0pc6sklvk0eHnutZyFO2E5eugo",
  authDomain: "village-345022.firebaseapp.com",
  projectId: "village-345022",
  storageBucket: "village-345022.appspot.com",
  messagingSenderId: "1059450499873",
  appId: "1:1059450499873:web:d202c0b796f92795f5c460",
  measurementId: "G-NDJ9KSQRWT",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(app);
