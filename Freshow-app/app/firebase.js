import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import config from '../firebase.json'; // firebase.json 위치

// Firebase 초기화
const app = initializeApp(config);
export const db = getFirestore(app);
const auth = getAuth(app);

// 현재 사용자 가져오기
export const getCurrentUser = () => {
    const { uid, displayName, email } = auth.currentUser;
    return { uid, name: displayName, email };
};

// 회원가입 함수
export const signup = async ({ name, email, password }) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 사용자 프로필 업데이트
    await updateProfile(user, {
        displayName: name,
    });

    return user;
};
