import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBLFXudLtyxQcQq5MoQPRR_dyrXrhufb9M",
  authDomain: "freshow-b0caa.firebaseapp.com",
  projectId: "freshow-b0caa",
  storageBucket: "freshow-b0caa.firebasestorage.app",
  messagingSenderId: "994015821961",
  appId: "1:994015821961:web:41e04dee96031449e40658",
  measurementId: "G-8E35Z985J1"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Firebase Auth
const db = getFirestore(app); // Firestore
const analytics = getAnalytics(app); // Analytics

export { auth, db, analytics }; // 필요한 객체를 내보냄


