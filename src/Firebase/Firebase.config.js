//DANGER!!!!!!!!!!

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCy4O6l6KT-3oS1SS03qMw7HHSyuRhnFKw",
  authDomain: "book-pilot-2c633.firebaseapp.com",
  projectId: "book-pilot-2c633",
  storageBucket: "book-pilot-2c633.firebasestorage.app",
  messagingSenderId: "105675668342",
  appId: "1:105675668342:web:099a9c96dcdc5b7e5f1857",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
