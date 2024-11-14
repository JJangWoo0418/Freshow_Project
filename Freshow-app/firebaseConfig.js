// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase 설정 정보 (Firebase Console에서 가져오기)
const firebaseConfig = {
    apiKey: "AIzaSyAKXfPZTvEQ__pcD3amkQpFQ3cGl6ljd1I",
    authDomain: "freshow-36a43.firebaseapp.com",
    projectId: "freshow-36a43",
    storageBucket: "freshow-36a43.firebasestorage.app",
    messagingSenderId: "909173738270",
    appId: "1:909173738270:web:0f4d6e5ab297280951d70f"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firestore 인스턴스 생성
const db = getFirestore(app);

export { db };
