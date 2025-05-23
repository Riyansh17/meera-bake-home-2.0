// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDz42OiIEuM7wdHUpkGSHnE6ydtULqKzSs",
  authDomain: "meera-bake-home.firebaseapp.com",
  projectId: "meera-bake-home",
  storageBucket: "meera-bake-home.firebasestorage.app",
  messagingSenderId: "880996192833",
  appId: "1:880996192833:web:f36a2fd007d4355e76acc0",
  measurementId: "G-VS77DP80M4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};