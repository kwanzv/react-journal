// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpb1rVtrE_6DMX7BHIaMuIUYRQiRG2DVU",
  authDomain: "spotify-clone-fc83b.firebaseapp.com",
  projectId: "spotify-clone-fc83b",
  storageBucket: "spotify-clone-fc83b.appspot.com",
  messagingSenderId: "284972563489",
  appId: "1:284972563489:web:cfafd55c50fa1a6dcf3760",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const notesCollection = collection(db, "notes");
