// Import Firebase modules
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration (PASTE YOUR CONFIG HERE!)
const firebaseConfig = {
  apiKey: "AIzaSyB8GQ_SgQjTu-Didk8VQODUYBt53iNNeC0",
  authDomain: "job-tracker-app-b4918.firebaseapp.com",
  projectId: "job-tracker-app-b4918",
  storageBucket: "job-tracker-app-b4918.firebasestorage.app",
  messagingSenderId: "523204633295",
  appId: "1:523204633295:web:3fb2ec16f1935e483f0dba"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore Database
export const db = getFirestore(app);

// Initialize Authentication (for Day 24)
export const auth = getAuth(app);

// Export app instance
export default app;