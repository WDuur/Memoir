// src/firebase.js
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore' // Optional: Firestore
import { getAuth } from 'firebase/auth' // Optional: Authentication

// Your Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAZVjRxjxsFxGa2hMooLBC_le3O2yRpbm4',
  authDomain: 'memo-84a9e.firebaseapp.com',
  projectId: 'memo-84a9e',
  storageBucket: 'memo-84a9e.firebasestorage.app',
  messagingSenderId: '795067140287',
  appId: '1:795067140287:web:59af9cec970200b57c1e0a',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore (if needed)
const db = getFirestore(app)

// Initialize Auth (if needed)
const auth = getAuth(app)

export { app, db, auth }
