import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StatusBar, Image, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import styles from './components/css/registerstyle';
import { COLORS } from "../constants";
import { signup } from './firebaseauth'; // firebaseconfig에서 signup 함수 임포트
import { db } from './firebaseconfig'; // Firestore 인스턴스 가져오기
import { collection, addDoc } from 'firebase/firestore';

const Register = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
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
        if (!username || !password || !confirmPassword) {
            Alert.alert('🚨 모든 입력 필드를 채워주세요.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('🚨 비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            // `signup` 함수 호출
            const user = await signup({
                name: username,
                email: `${username}@example.com`,
                password,
            });

            // Firestore에 사용자 정보 추가
            await addDoc(collection(db, '계정'), {
                uid: user.uid, // 사용자 고유 ID
                username, // 사용자 아이디
                createdAt: new Date(), // 생성 날짜
            });

            Alert.alert('🎉 회원가입 성공', `${username}님, 환영합니다!`);
            router.push('home');
        } catch (error) {
            console.error('Signup Error:', error);
            Alert.alert('🚨 회원가입 오류', error.message);
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
                        placeholder="아이디"
                        placeholderTextColor={COLORS.gray}
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                    />
                </View>

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
