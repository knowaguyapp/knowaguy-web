import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqfBolYVdcWcgVdy9FhJqJdLakJbkyIQY",
  authDomain: "knowaguy-d83b8.firebaseapp.com",
  projectId: "knowaguy-d83b8",
  storageBucket: "knowaguy-d83b8.appspot.com",
  messagingSenderId: "587821929222",
  appId: "1:587821929222:web:1ff8911d3eb2d89fb88487",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
