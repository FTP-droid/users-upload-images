// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA47JufZ_iWQQJrSEztNZj62nujAuYrWQo",
  authDomain: "users-upload-images.firebaseapp.com",
  projectId: "users-upload-images",
  storageBucket: "users-upload-images.appspot.com",
  messagingSenderId: "781457186500",
  appId: "1:781457186500:web:de7fb9ec4df389edcd3391",
  measurementId: "G-74HQ9CCS0M"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);