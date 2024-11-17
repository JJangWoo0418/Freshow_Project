import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StatusBar, Image, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import styles from './components/css/registerstyle';
import { COLORS } from "../constants";
import { signup } from './firebase'; // firebaseconfig에서 signup 함수 임포트
import { db } from './firebaseconfig'; // Firestore 인스턴스 가져오기
import { collection, addDoc } from 'firebase/firestore';

const Register = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handlePasswordChange = (text) => {
        setPassword(text);
        if (confirmPassword && text !== confirmPassword) {
            setPasswordError('비밀번호가 일치하지 않습니다.');
        } else {
            setPasswordError('');
        }
    };

    const handleConfirmPasswordChange = (text) => {
        setConfirmPassword(text);
        if (password && text !== password) {
            setPasswordError('비밀번호가 일치하지 않습니다.');
        } else {
            setPasswordError('');
        }
    };

    const handleSignup = async () => {
        if (!email || !password || !confirmPassword) {
            Alert.alert('입력 오류', '모든 입력 필드를 채워주세요.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('비밀번호 오류', '비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            // 회원가입 처리
            const user = await signup({ name: email, email, password });
            
            // Firestore에 사용자 데이터 저장
            await addDoc(collection(db, 'users'), {
                uid: user.uid,
                email: user.email,
                name: email,
                createdAt: new Date(),
            });

            Alert.alert('회원가입 성공', `${user.displayName}님, 환영합니다!`);
            router.push('home');
        } catch (error) {
            console.error('Signup Error:', error);
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

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.emailinput}
                        placeholder="이메일"
                        placeholderTextColor={COLORS.gray}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <TouchableOpacity style={styles.duplicateCheckButton}>
                        <Image source={require('../assets/EmailAuthBtn.png')} />
                    </TouchableOpacity>
                </View>

                <TextInput
                    style={styles.input}
                    placeholder="이메일 인증 키"
                    placeholderTextColor={COLORS.gray}
                />

                <TextInput
                    style={styles.input}
                    placeholder="비밀번호"
                    placeholderTextColor={COLORS.gray}
                    secureTextEntry
                    value={password}
                    onChangeText={handlePasswordChange}
                    autoCompleteType="off"
                />
                <TextInput
                    style={styles.input}
                    placeholder="비밀번호 확인"
                    placeholderTextColor={COLORS.gray}
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={handleConfirmPasswordChange}
                    autoCompleteType="off"
                />

                {passwordError ? (
                    <Text style={styles.errorText}>{passwordError}</Text>
                ) : null}

                <Image source={require('../assets/Stick.png')} style={styles.stickBar} />

                <TouchableOpacity style={styles.registerButton} onPress={handleSignup}>
                    <Image source={require('../assets/registerbtn2.png')} />
                </TouchableOpacity>

                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => router.push('home')}>
                        <Image source={require('../assets/registerquestionbtn.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Register;
