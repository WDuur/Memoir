import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  authDomain: import.meta.env.VITE_GOOGLE_DOMAIN,
  projectId: import.meta.env.VITE_GOOGLE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_GOOGLE_BUCKET,
  messagingSenderId: import.meta.env.VITE_GOOGLE_SENDER_ID,
  appId: import.meta.env.VITE_GOOGLE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { app, db, auth }
