import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// eslint-disable-next-line
const firebaseConfig = {
  apiKey:
    process.env.REACT_API_KEY || "AIzaSyBJaL-g85dLnVigwWZNiC2Ek_duHgG-w3g",
  authDomain:
    process.env.REACT_AUTH_DOMAIN || "netflixgpt-a327b.firebaseapp.com",
  projectId: process.env.REACT_PROJECT_ID || "netflixgpt-a327b",
  storageBucket:
    process.env.REACT_STORAGE_BUCKET || "netflixgpt-a327b.appspot.com",
  messagingSenderId: process.env.REACT_MESSAGE_SENDER_ID || "467482989858",
  appId:
    process.env.REACT_APP_ID || "1:467482989858:web:a4a8f8b3a355cb21a5817b",
  measurementId: process.env.REACT_MEASUREMENT_ID || "G-S0GL2GTWMS",
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);
export const auth = getAuth();
