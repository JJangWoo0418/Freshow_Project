// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Firestore 추가

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBLFXudLtyxQcQq5MoQPRR_dyrXrhufb9M",
    authDomain: "freshow-b0caa.firebaseapp.com",
    projectId: "freshow-b0caa",
    storageBucket: "freshow-b0caa.firebasestorage.app",
    messagingSenderId: "994015821961",
    appId: "1:994015821961:web:41e04dee96031449e40658",
    measurementId: "G-8E35Z985J1"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Firestore 초기화

export { db }; // Firestore를 외부에서 사용하도록 내보내기
