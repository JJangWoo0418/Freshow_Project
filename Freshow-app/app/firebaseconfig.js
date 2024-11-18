// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Firestore 추가

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDdLLeIMp9wKvplBHWyW8mD7bTEg33VLD0",
    authDomain: "freshow-37d2c.firebaseapp.com",
    projectId: "freshow-37d2c",
    storageBucket: "freshow-37d2c.firebasestorage.app",
    messagingSenderId: "1029028050369",
    appId: "1:1029028050369:web:ade74210577c610ccd2b40",
    measurementId: "G-PRBBCJGNJ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Firestore 초기화

export { db }; // Firestore를 외부에서 사용하도록 내보내기
