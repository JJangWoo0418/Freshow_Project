import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDdLLeIMp9wKvplBHWyW8mD7bTEg33VLD0",
    authDomain: "freshow-37d2c.firebaseapp.com",
    projectId: "freshow-37d2c",
    storageBucket: "freshow-37d2c.firebasestorage.app",
    messagingSenderId: "1029028050369",
    appId: "1:1029028050369:web:ade74210577c610ccd2b40",
    measurementId: "G-PRBBCJGNJ9"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Firebase Auth
const db = getFirestore(app); // Firestore
const analytics = getAnalytics(app); // Analytics

export { auth, db, analytics }; // 필요한 객체를 내보냄
