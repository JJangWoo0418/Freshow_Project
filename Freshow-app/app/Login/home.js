import React, { useState } from 'react';
import { 
    View, 
    Alert, 
    TextInput, 
    SafeAreaView, 
    Image, 
    TouchableOpacity, 
    StatusBar, 
    KeyboardAvoidingView, 
    Platform, 
    ScrollView, 
    Keyboard 
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { COLORS } from "../../constants";
import styles from '../components/css/Login/homestyle';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { TouchableWithoutFeedback } from 'react-native';

const Home = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth();

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('🚨 입력 오류', '아이디와 비밀번호를 모두 입력해주세요.');
            return;
        }

        try {
            const email = `${username}@example.com`;
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            Alert.alert('👏 로그인 성공', `${username}님, 환영합니다!`);
            router.push('Fridge/fridgeselect');
        } catch (error) {
            console.error('Login Error:', error);
            Alert.alert('🚨 로그인 실패', '아이디 또는 비밀번호를 확인해주세요.');
        }
    };

    const kakaologin = () => {
        Alert.alert('😭 서비스 준비 중입니다! 😭');
    };

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
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} // iOS와 Android의 적절한 오프셋 설정
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1 }}>
                        <ScrollView
                            contentContainerStyle={{
                                flexGrow: 1,
                                justifyContent: 'center',
                            }}
                            keyboardShouldPersistTaps="handled" // 스크롤 시 키보드 닫힘 처리
                        >
                            <View style={styles.topContent}>
                                <Image
                                    source={require('../../assets/Freshow Intro.png')}
                                    style={styles.mascot}
                                />
                            </View>
                            <View style={styles.bottomContent}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="아이디"
                                    placeholderTextColor={COLORS.gray}
                                    value={username}
                                    onChangeText={(text) => setUsername(text)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="비밀번호"
                                    placeholderTextColor={COLORS.gray}
                                    secureTextEntry
                                    value={password}
                                    onChangeText={(text) => setPassword(text)}
                                    autoCompleteType="off"
                                />
                                <TouchableOpacity
                                    style={styles.loginButton}
                                    onPress={handleLogin}
                                >
                                    <Image source={require('../../assets/LoginBtn.png')} />
                                </TouchableOpacity>
                                <Image source={require('../../assets/Stick.png')} style={styles.stickBar} />
                                <TouchableOpacity style={styles.kakaoButton} onPress={kakaologin}>
                                    <Image
                                        source={require('../../assets/KakaoBtn.png')}
                                        style={styles.socialIcon}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => router.push('Login/register')}>
                                    <Image 
                                        source={require('../../assets/RegisterBtn.png')}
                                        style={styles.registerBtn}
                                    />
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Home;
