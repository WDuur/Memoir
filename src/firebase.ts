// src/firebase.js
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// Your Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  authDomain: import.meta.env.VITE_GOOGLE_DOMAIN,
  projectId: import.meta.env.VITE_GOOGLE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_GOOGLE_BUCKET,
  messagingSenderId: import.meta.env.VITE_GOOGLE_SENDER_ID,
  appId: import.meta.env.VITE_GOOGLE_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore (if needed)
const db = getFirestore(app)

// Initialize Auth (if needed)
const auth = getAuth(app)

export { app, db, auth }
