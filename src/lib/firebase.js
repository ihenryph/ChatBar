// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8NHWXBBqI-xRfbAtw1LLt-qxfODIg-PI",
  authDomain: "chatbar-web.firebaseapp.com",
  projectId: "chatbar-web",
  storageBucket: "chatbar-web.firebasestorage.app",
  messagingSenderId: "765964277345",
  appId: "1:765964277345:web:1d87cfc313f7e4659ebc20"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta o Firestore para ser usado no app
export const db = getFirestore(app);
