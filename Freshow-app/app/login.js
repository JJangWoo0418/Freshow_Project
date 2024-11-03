import React from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import styles from './components/css/loginstyle';
import { COLORS } from "../constants";

const Login = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.lightWhite} />
            <Stack.Screen
                options={{
                    headerTitle: "프래시오",
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                }}
            />

            <View style={styles.topContent}>
                <Image source={require('../assets/LoginLogo.png')} style={styles.mascot} />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.socialButton}>
                    <Image source={require('../assets/GoogleLoginBtn.png')} style={styles.socialIcon} />             
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <Image source={require('../assets/FacebookLoginbtn.png')} style={styles.socialIcon} />                   
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <Image source={require('../assets/AppleLoginBtn.png')} style={styles.socialIcon} />                   
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder="아이디" placeholderTextColor={COLORS.gray} />
                <TextInput style={styles.input} placeholder="비밀번호" placeholderTextColor={COLORS.gray} secureTextEntry />
            </View>

            <TouchableOpacity style={styles.startButton} onPress={() => router.push('Main')}>
                <Text style={styles.startButtonText}>프래시오 이용하기</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
                <TouchableOpacity>
                    <Text style={styles.footerText}>비밀번호 찾기</Text>
                </TouchableOpacity>
                <Text style={styles.footerSeparator}>|</Text>
                <TouchableOpacity onPress={() => router.push('Signup')}>
                    <Text style={styles.footerText}>아직 계정이 없으세요? 회원가입하기</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Login;
