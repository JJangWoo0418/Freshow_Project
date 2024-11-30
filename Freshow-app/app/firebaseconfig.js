import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAKXfPZTvEQ__pcD3amkQpFQ3cGl6ljd1I",
    authDomain: "freshow-36a43.firebaseapp.com",
    projectId: "freshow-36a43",
    storageBucket: "freshow-36a43.firebasestorage.app",
    messagingSenderId: "909173738270",
    appId: "1:909173738270:web:0f4d6e5ab297280951d70f",
    measurementId: "G-VCDHQNV8J2"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Firebase Auth
const db = getFirestore(app); // Firestore
const analytics = getAnalytics(app); // Analytics

export { auth, db, analytics }; // 필요한 객체를 내보냄


