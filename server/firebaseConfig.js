// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDCFwHZ3LNh7pirUqECABi5RtQ4sCDeGHs",
  authDomain: "arwaportfolio-82eae.firebaseapp.com",
  projectId: "arwaportfolio-82eae",
  storageBucket: "arwaportfolio-82eae.firebasestorage.app",
  messagingSenderId: "150016306582",
  appId: "1:150016306582:web:d93a426b5cde1987d601b7",
  measurementId: "G-CTB152NLNE",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
