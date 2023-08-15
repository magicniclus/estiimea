import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "estiimea.firebaseapp.com",
  databaseURL:
    "https://estiimea-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "estiimea",
  storageBucket: "estiimea.appspot.com",
  messagingSenderId: "479567715320",
  appId: "1:479567715320:web:d77426f290f63e0d04940d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the auth service
const auth = getAuth();

export { app, auth };
