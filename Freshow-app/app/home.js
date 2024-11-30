import React, { useState } from 'react';
import { View, Alert, TextInput, SafeAreaView, Image, TouchableOpacity, StatusBar } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { COLORS } from "../constants";
import styles from './components/css/homestyle';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Home = () => {
    const router = useRouter(); // 페이지 이동을 위한 router
    const [username, setUsername] = useState(''); // 아이디 입력 상태
    const [password, setPassword] = useState(''); // 비밀번호 입력 상태

    // Firebase Authentication 인스턴스 가져오기
    const auth = getAuth();

    // 로그인 처리 함수
    const handleLogin = async () => {
        if (!username || !password) {
            // 아이디 또는 비밀번호가 입력되지 않았을 경우 경고 메시지 표시
            Alert.alert('🚨 입력 오류', '아이디와 비밀번호를 모두 입력해주세요.');
            console.log('입력 오류', '아이디와 비밀번호를 모두 입력해주세요.');
            return;
        }

        try {
            // 입력받은 아이디를 이메일 형식으로 변환
            const email = `${username}@example.com`;

            // Firebase Authentication을 통해 사용자 로그인 처리
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // 로그인 성공 시 메시지와 함께 메인 페이지로 이동
            Alert.alert('👏 로그인 성공', `${username}님, 환영합니다!`);
            console.log('로그인 성공', `${username}님, 환영합니다!`);
            router.push('fridgeselect'); // 메인 페이지로 이동
        } catch (error) {
            // 로그인 실패 시 오류 메시지 표시
            console.error('Login Error:', error);
            console.log('로그인 실패', '아이디 또는 비밀번호를 확인해주세요.');
            Alert.alert('🚨 로그인 실패', '아이디 또는 비밀번호를 확인해주세요.');
        }
    };

    const kakaologin = () => {
        Alert.alert('😭 서비스 준비 중입니다! 😭');
        console.log('😭 서비스 준비 중입니다! 😭')
    }

    return (        
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.White} />
            <Stack.Screen
                options={{
                    headerTitle: "프래시오",
                    headerStyle: { backgroundColor: COLORS.White },
                    headerShadowVisible: false,
                }}
            />
            <View style={styles.topContent}>
                {/* 상단에 마스코트 이미지 */}
                <Image
                    source={require('../assets/Freshow Intro.png')}
                    style={styles.mascot}
                />
            </View>

            <View style={styles.bottomContent}>
                {/* 아이디 입력 필드 */}
                <TextInput
                    style={styles.input}
                    placeholder="아이디"
                    placeholderTextColor={COLORS.gray}
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />

                {/* 비밀번호 입력 필드 */}
                <TextInput
                    style={styles.input}
                    placeholder="비밀번호"
                    placeholderTextColor={COLORS.gray}
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    autoCompleteType="off"
                />

                {/* 로그인 버튼 */}
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleLogin} // 로그인 함수 호출
                >
                    <Image source={require('../assets/LoginBtn.png')} />
                </TouchableOpacity>
                {/* 구분선 */}
                <Image source={require('../assets/Stick.png')} style={styles.stickBar} />

                {/* 소셜 로그인 버튼 (예: 카카오) */}
                <TouchableOpacity style={styles.kakaoButton} onPress={kakaologin}>
                    <Image
                        source={require('../assets/KakaoBtn.png')}
                        style={styles.socialIcon}
                    />
                </TouchableOpacity>
                

                {/* 회원가입 버튼 */}
                <TouchableOpacity onPress={() => router.push('register')}>
                    <Image 
                        source={require('../assets/RegisterBtn.png')}
                        style={styles.registerBtn}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}


export default Home;
