import { initializeApp } from 'firebase/app';
import {
getAuth,
createUserWithEmailAndPassword,
updateProfile,
onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
// import config from '../firebase.json'; // firebase 설정 파일

// Firebase 초기화
const app = initializeApp(config);
export const db = getFirestore(app);
const auth = getAuth(app);

// 현재 사용자 가져오기
export const getCurrentUser = () => {
const user = auth.currentUser;
if (user) {
const { uid, displayName, email } = user;
return { uid, name: displayName, email };
}
return null;
};

// Firebase Authentication 상태 변경 감지
export const onUserStateChange = (callback) => {
onAuthStateChanged(auth, callback);
};

// 회원가입 함수
export const signup = async ({ name, email, password }) => {
try {
const userCredential = await createUserWithEmailAndPassword(auth, email, password);
const user = userCredential.user;

// 사용자 프로필 업데이트
await updateProfile(user, { displayName: name });
return user;
} catch (error) {
console.error('Error during signup:', error.message);
throw error;
}
};

// 바코드 Firestore에 저장
export const saveBarcodeToFirestore = async (barcode) => {
try {
const user = auth.currentUser;
if (!user) throw new Error('User not authenticated. Please log in first.');

const docRef = await addDoc(collection(db, 'barcodes'), {
    barcode,
    userId: user.uid,
    timestamp: serverTimestamp(),
});

console.log('Barcode successfully saved to Firestore with ID:', docRef.id);
return docRef.id;
} catch (error) {
console.error('Error saving barcode to Firestore:', error.message);
throw error;
}
};

// Firestore에서 바코드 데이터 가져오기
export const getBarcodesFromFirestore = async () => {
try {
const user = auth.currentUser;
if (!user) throw new Error('User not authenticated. Please log in first.');

const querySnapshot = await getDocs(collection(db, 'barcodes'));
return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
} catch (error) {
console.error('Error fetching barcodes from Firestore:', error.message);
throw error;
}
};
