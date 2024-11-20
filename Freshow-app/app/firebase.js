import { auth, db } from './firebaseconfig'; // firebaseconfig.js에서 가져옴
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

// 현재 사용자 가져오기
export const getCurrentUser = () => {
    const user = auth.currentUser;
    if (user) {
        const { uid, displayName, email } = user;
        return { uid, name: displayName, email };
    }
    return null;
};

// 회원가입 함수
export const signup = async ({ name, email, password }) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 사용자 프로필 업데이트
    await updateProfile(user, { displayName: name });

    return user;
};

export { db }; // Firestore 인스턴스 내보내기