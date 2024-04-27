// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJboxU9JmFCMLQDmdMAaTywbncLT0NQnA",
  authDomain: "markdown-notes-506ec.firebaseapp.com",
  projectId: "markdown-notes-506ec",
  storageBucket: "markdown-notes-506ec.appspot.com",
  messagingSenderId: "24972064496",
  appId: "1:24972064496:web:cd87e4a510ad3d8fa77435",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const notesCollection = collection(db, "notes");
