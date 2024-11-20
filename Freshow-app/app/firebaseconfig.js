import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCO1nny7grAWytLf60b_THVUopwAYtD2Ho",
    authDomain: "freshow-f9eef.firebaseapp.com",
    projectId: "freshow-f9eef",
    storageBucket: "freshow-f9eef.firebasestorage.app",
    messagingSenderId: "571998176592",
    appId: "1:571998176592:web:035c93fdd55886980d9855",
    measurementId: "G-3B76C34WVN",
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Firebase Auth
const db = getFirestore(app); // Firestore
const analytics = getAnalytics(app); // Analytics

export { auth, db, analytics }; // 필요한 객체를 내보냄
