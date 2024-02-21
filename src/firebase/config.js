// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBZDuihlFiLb6D6gy2GFLFZoKZEn_7pf2M",
  authDomain: "e-commerce2024-a4673.firebaseapp.com",
  projectId: "e-commerce2024-a4673",
  storageBucket: "e-commerce2024-a4673.appspot.com",
  messagingSenderId: "696411416820",
  appId: "1:696411416820:web:4d599fda62dd8a8ae116a1",
  measurementId: "G-MTFBJGWT96",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
