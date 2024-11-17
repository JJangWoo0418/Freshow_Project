import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCO1nny7grAWytLf60b_THVUopwAYtD2Ho",
    authDomain: "freshow-f9eef.firebaseapp.com",
    projectId: "freshow-f9eef",
    storageBucket: "freshow-f9eef.firebasestorage.app",
    messagingSenderId: "571998176592",
    appId: "1:571998176592:web:035c93fdd55886980d9855"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };