import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StatusBar, Image, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import styles from './components/css/registerstyle';
import { COLORS } from "../constants";
import { signup } from './firebase'; // firebaseconfig에서 signup 함수 임포트
import { db } from './firebaseconfig'; // Firestore 인스턴스 가져오기
import { collection, addDoc } from 'firebase/firestore';

const Register = () => {
    const router = useRouter(); // 화면 이동을 위한 useRouter
    const [email, setEmail] = useState(''); // 이메일 입력 상태
    const [password, setPassword] = useState(''); // 비밀번호 입력 상태
    const [confirmPassword, setConfirmPassword] = useState(''); // 비밀번호 확인 입력 상태
    const [passwordError, setPasswordError] = useState(''); // 비밀번호 오류 메시지 상태

    // 비밀번호 입력 시 호출, 비밀번호와 확인 비밀번호가 다른 경우 오류 메시지 설정
    const handlePasswordChange = (text) => {
        setPassword(text);
        if (confirmPassword && text !== confirmPassword) {
            setPasswordError('비밀번호가 일치하지 않습니다.');
        } else {
            setPasswordError('');
        }
    };

    // 확인 비밀번호 입력 시 호출, 비밀번호와 확인 비밀번호가 다른 경우 오류 메시지 설정
    const handleConfirmPasswordChange = (text) => {
        setConfirmPassword(text);
        if (password && text !== password) {
            setPasswordError('비밀번호가 일치하지 않습니다.');
        } else {
            setPasswordError('');
        }
    };

    // 회원가입 처리 함수
    const handleSignup = async () => {
        // 입력 필드가 비어 있으면 경고창 출력
        if (!email || !password || !confirmPassword) {
            Alert.alert('입력 오류', '모든 입력 필드를 채워주세요.');
            return;
        }

        // 비밀번호와 확인 비밀번호가 다르면 경고창 출력
        if (password !== confirmPassword) {
            Alert.alert('비밀번호 오류', '비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            // Firebase Authentication을 사용해 회원가입 처리
            const user = await signup({ name: email, email, password });
            
            // Firestore 데이터베이스에 사용자 정보 저장
            await addDoc(collection(db, 'users'), {
                uid: user.uid, // 사용자 고유 ID
                email: user.email, // 이메일
                name: email, // 이름 (여기서는 이메일과 동일)
                createdAt: new Date(), // 생성 날짜
            });

            // 성공 메시지와 함께 홈 화면으로 이동
            Alert.alert('회원가입 성공', `${user.displayName}님, 환영합니다!`);
            console.log('회원가입 성공!');
            router.push('home'); // 'home' 화면으로 이동
        } catch (error) {
            // 오류 발생 시 콘솔 출력 및 경고창 표시
            console.error('Signup Error:', error);
            console.log('회원가입 실패!');
            Alert.alert('회원가입 실패', error.message);
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: '#FFFFFF' }]}>
            
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            
            <Stack.Screen
                options={{
                    headerTitle: "회원가입", 
                    headerStyle: { backgroundColor: "#FFFFFF" }, 
                    headerShadowVisible: false, 
                }}
            />

            <View style={styles.content}>
                <Text style={styles.title}>회원가입</Text> 

                {/* 이메일 입력 */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.emailinput}
                        placeholder="이메일"
                        placeholderTextColor={COLORS.gray}
                        value={email}
                        onChangeText={(text) => setEmail(text)} // 이메일 상태 업데이트
                    />
                    <TouchableOpacity style={styles.duplicateCheckButton}>
                        <Image source={require('../assets/EmailAuthBtn.png')} /> {/* 이메일 인증 버튼 */}
                    </TouchableOpacity>
                </View>

                {/* 이메일 인증 키 입력 */}
                <TextInput
                    style={styles.input}
                    placeholder="이메일 인증 키"
                    placeholderTextColor={COLORS.gray}
                />

                {/* 비밀번호 입력 */}
                <TextInput
                    style={styles.input}
                    placeholder="비밀번호"
                    placeholderTextColor={COLORS.gray}
                    secureTextEntry // 비밀번호 숨김
                    value={password}
                    onChangeText={handlePasswordChange} // 비밀번호 상태 업데이트
                    autoCompleteType="off"
                />
                {/* 비밀번호 확인 입력 */}
                <TextInput
                    style={styles.input}
                    placeholder="비밀번호 확인"
                    placeholderTextColor={COLORS.gray}
                    secureTextEntry // 비밀번호 숨김
                    value={confirmPassword}
                    onChangeText={handleConfirmPasswordChange} // 확인 비밀번호 상태 업데이트
                    autoCompleteType="off"
                />

                {/* 비밀번호 오류 메시지 출력 */}
                {passwordError ? (
                    <Text style={styles.errorText}>{passwordError}</Text>
                ) : null}

                {/* 구분선 */}
                <Image source={require('../assets/Stick.png')} style={styles.stickBar} />

                {/* 회원가입 버튼 */}
                <TouchableOpacity style={styles.registerButton} onPress={handleSignup}>
                    <Image source={require('../assets/registerbtn2.png')} />
                </TouchableOpacity>

                {/* 하단 푸터 버튼 */}
                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => router.push('home')}> {/* 홈 화면으로 이동 */}
                        <Image source={require('../assets/registerquestionbtn.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Register;
