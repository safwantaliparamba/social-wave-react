import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging"
import { GoogleAuthProvider, getAuth } from "firebase/auth"

const ENV = import.meta.env


const firebaseConfig = {
  apiKey:               ENV.VITE_FIREBASE_API_KEY,
  authDomain:           ENV.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:            ENV.VITE_FIREBASE_PROJECT_ID,
  storageBucket:        ENV.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:    ENV.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:                ENV.VITE_FIREBASE_APP_ID,
  measurementId:        ENV.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const messaging = getMessaging(app)
export const googleAuthProvider = new GoogleAuthProvider();
